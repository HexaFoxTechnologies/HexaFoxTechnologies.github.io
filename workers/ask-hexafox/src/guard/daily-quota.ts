import { DurableObject } from 'cloudflare:workers';
import type { Env } from '../env.ts';

/**
 * Daily question counters (per hashed visitor and site-wide), kept in one SQLite-backed
 * Durable Object. Counts reset at midnight UTC and older days are deleted.
 */
export class DailyQuota extends DurableObject<Env> {
  private readonly sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(
      'CREATE TABLE IF NOT EXISTS usage (day TEXT NOT NULL, key TEXT NOT NULL, count INTEGER NOT NULL, PRIMARY KEY (day, key))',
    );
  }

  /** Count one question for `key`; false (and nothing counted) once either cap is reached. */
  consume(key: string, perKeyLimit: number, totalLimit: number): boolean {
    const day = new Date().toISOString().slice(0, 10);
    this.sql.exec('DELETE FROM usage WHERE day < ?', day);

    if (this.count(day, key) >= perKeyLimit || this.count(day, '*') >= totalLimit) return false;

    for (const counter of [key, '*']) {
      this.sql.exec(
        'INSERT INTO usage (day, key, count) VALUES (?, ?, 1) ON CONFLICT (day, key) DO UPDATE SET count = count + 1',
        day,
        counter,
      );
    }
    return true;
  }

  private count(day: string, key: string): number {
    const row = this.sql.exec<{ count: number }>('SELECT count FROM usage WHERE day = ? AND key = ?', day, key).toArray()[0];
    return row?.count ?? 0;
  }
}
