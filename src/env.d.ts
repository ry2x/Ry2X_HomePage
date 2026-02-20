/// <reference types="astro/client" />

import type { Runtime } from '@astrojs/cloudflare';

type CloudflareEnv = {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  CONTACT_TO_EMAIL: string;
};

declare namespace App {
  type Locals = Runtime<CloudflareEnv>;
}
