import type { Env } from '../env.ts';

export type LimitResult = 'ok' | 'slow_down' | 'daily_limit';

/**
 * Two layers so one visitor can't burn the free model quotas:
 * a per-minute burst limit (rate limiting binding) and per-visitor + site-wide daily caps.
 */
export async function checkLimits(env: Env, key: string): Promise<LimitResult> {
  const burst = await env.BURST_LIMITER.limit({ key });
  if (!burst.success) return 'slow_down';

  const quota = env.DAILY_QUOTA.getByName('global');
  const allowed = await quota.consume(key, Number(env.DAILY_LIMIT_PER_IP), Number(env.DAILY_LIMIT_TOTAL));
  return allowed ? 'ok' : 'daily_limit';
}
