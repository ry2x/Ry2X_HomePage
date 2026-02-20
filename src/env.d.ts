/// <reference types="astro/client" />

import type { Runtime } from '@astrojs/cloudflare';

type CloudflareEnv = {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
};

declare namespace App {
  interface Locals extends Runtime<CloudflareEnv> {}
}

declare global {
  interface Window {
    onTurnstileSuccess: (token: string) => void;
    onTurnstileExpired: () => void;
    turnstile?: {
      reset: (widgetIdOrSelector?: string) => void;
    };
  }
}
