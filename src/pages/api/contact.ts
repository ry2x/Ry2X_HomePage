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

  // --- Turnstile verification ---
  const runtime = (
    locals as { runtime?: { env: Record<string, string | undefined> } }
  ).runtime;

  if (!runtime?.env) {
    console.error('Runtime environment is not available');
    return Response.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const { env } = runtime;

  const turnstileSecret = env.TURNSTILE_SECRET_KEY;
  const resendApiKey = env.RESEND_API_KEY;
  const toEmail = env.CONTACT_TO_EMAIL ?? 'contact@ry2x.net';

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

  const tsRes = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    body: tsForm
  });
  const tsData = (await tsRes.json()) as TurnstileResponse;

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

  const { error: resendError } = await resend.emails.send({
    from: 'Contact Form <noreply@ry2x.net>',
    to: [toEmail],
    replyTo: email,
    subject: `[Contact] ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, '', message].join('\n'),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr />
      <pre style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</pre>
    `
  });

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
