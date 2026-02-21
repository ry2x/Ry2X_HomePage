/// <reference types="astro/client" />

// Extend wrangler-generated Env with bindings not tracked as wrangler secrets
interface Env {
  CONTACT_FROM_EMAIL: string;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals {
    runtime: Runtime['runtime'];
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
