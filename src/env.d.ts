/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals {
    runtime: Runtime;
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
