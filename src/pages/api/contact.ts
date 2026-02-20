export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileResponse {
  'success': boolean;
  'error-codes'?: string[];
}

export const POST: APIRoute = async ({ request, locals }) => {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return Response.json({ error: 'Invalid content type' }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, email, message, turnstileToken } = body as {
    name?: string;
    email?: string;
    message?: string;
    turnstileToken?: string;
  };

  // --- Basic validation ---
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    typeof turnstileToken !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !message.trim() ||
    !turnstileToken.trim()
  ) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Length limits
  if (name.trim().length > 100) {
    return Response.json(
      { error: 'Name is too long (max 100 chars)' },
      { status: 400 }
    );
  }
  if (email.trim().length > 254) {
    return Response.json(
      { error: 'Email is too long (max 254 chars)' },
      { status: 400 }
    );
  }
  if (message.trim().length > 5000) {
    return Response.json(
      { error: 'Message is too long (max 5000 chars)' },
      { status: 400 }
    );
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // Sanitize against header injection (strip CR/LF)
  const safeName = name.replace(/[\r\n]/g, ' ').trim();
  const safeEmail = email.replace(/[\r\n]/g, '').trim();

  // --- Turnstile verification ---
  const {
    TURNSTILE_SECRET_KEY: turnstileSecret,
    RESEND_API_KEY: resendApiKey,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL
  } = import.meta.env;

  const toEmail = CONTACT_TO_EMAIL ?? 'contact@ry2x.net';
  const fromEmail = CONTACT_FROM_EMAIL ?? 'Contact Form <noreply@ry2x.net>';

  if (!turnstileSecret) {
    console.error('TURNSTILE_SECRET_KEY is not set');
    return Response.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const tsForm = new FormData();
  tsForm.append('secret', turnstileSecret);
  tsForm.append('response', turnstileToken);
  tsForm.append('remoteip', request.headers.get('CF-Connecting-IP') ?? '');

  let tsData: TurnstileResponse;
  try {
    const tsRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: tsForm
    });
    if (!tsRes.ok) {
      console.error('Turnstile HTTP error:', tsRes.status, tsRes.statusText);
      return Response.json(
        { error: 'CAPTCHA verification unavailable' },
        { status: 502 }
      );
    }
    try {
      tsData = (await tsRes.json()) as TurnstileResponse;
    } catch (parseErr) {
      console.error('Turnstile JSON parse error:', parseErr);
      return Response.json(
        { error: 'CAPTCHA verification unavailable' },
        { status: 502 }
      );
    }
  } catch (fetchErr) {
    console.error('Turnstile fetch error:', fetchErr);
    return Response.json(
      { error: 'CAPTCHA verification unavailable' },
      { status: 502 }
    );
  }

  if (!tsData.success) {
    console.warn('Turnstile failed:', tsData['error-codes']);
    return Response.json(
      { error: 'CAPTCHA verification failed' },
      { status: 400 }
    );
  }

  // --- Send email via Resend ---
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not set');
    return Response.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);

  let resendError: unknown;
  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: safeEmail,
      subject: `[Contact] ${safeName}`,
      text: [`Name: ${safeName}`, `Email: ${safeEmail}`, '', message].join(
        '\n'
      ),
      html: `
      <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
      <hr />
      <pre style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</pre>
    `
    });
    resendError = result.error;
  } catch (err) {
    console.error('Resend exception:', err);
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }

  if (resendError) {
    console.error('Resend error:', resendError);
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }

  return Response.json({ ok: true });
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
