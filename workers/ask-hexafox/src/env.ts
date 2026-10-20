import type { DailyQuota } from './guard/daily-quota.ts';

/** Bindings and settings from wrangler.jsonc, plus secrets uploaded with `npm run secrets`. */
export interface Env {
  AI: Ai;
  BURST_LIMITER: RateLimit;
  DAILY_QUOTA: DurableObjectNamespace<DailyQuota>;

  ALLOWED_ORIGINS: string;
  MODEL_CHAIN: string;
  DAILY_LIMIT_PER_IP: string;
  DAILY_LIMIT_TOTAL: string;

  GROQ_API_KEY?: string;
  GEMINI_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}
