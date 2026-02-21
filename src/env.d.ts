/// <reference types="astro/client" />

/**
 * Cloudflare 側の環境変数の定義
 */
type CloudflareEnv = {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
};

declare global {
  namespace App {
    interface Locals {
      runtime: {
        env: CloudflareEnv;
      };
    }
  }

  interface ImportMetaEnv {
    readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface Window {
    onTurnstileSuccess: (token: string) => void;
    onTurnstileExpired: () => void;
    turnstile?: {
      reset: (widgetIdOrSelector?: string) => void;
    };
  }
}

export {};
