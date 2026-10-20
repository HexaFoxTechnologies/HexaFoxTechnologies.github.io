/**
 * Embed chunks with the Workers AI REST API. Auth comes from CLOUDFLARE_API_TOKEN (+ optional
 * CLOUDFLARE_ACCOUNT_ID) or, failing that, your `wrangler login`. Uses the free daily allowance.
 */
import { execFileSync } from 'node:child_process';
import { config } from '../../src/config.ts';
import { normalise } from '../../src/rag/embed.ts';
import type { Chunk } from './chunks.ts';

const API = 'https://api.cloudflare.com/client/v4';
const BATCH = 50;
const round = (value: number) => Math.round(value * 1e5) / 1e5;

interface ApiResponse<T> {
  success: boolean;
  result: T;
  errors: { message: string }[];
}

function apiToken(): string {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN;
  const output = execFileSync('npx', ['wrangler', 'auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  const token = output.trim().split('\n').at(-1);
  if (!token) throw new Error('Not logged in: run `npx wrangler login` or set CLOUDFLARE_API_TOKEN');
  return token;
}

async function call<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  const body = (await response.json()) as ApiResponse<T>;
  if (!body.success) throw new Error(`Cloudflare API ${path}: ${body.errors.map((e) => e.message).join('; ')}`);
  return body.result;
}

async function accountId(token: string): Promise<string> {
  if (process.env.CLOUDFLARE_ACCOUNT_ID) return process.env.CLOUDFLARE_ACCOUNT_ID;
  const accounts = await call<{ id: string }[]>(token, '/accounts');
  if (accounts.length !== 1) throw new Error('Set CLOUDFLARE_ACCOUNT_ID: this login can see more than one account');
  return accounts[0]!.id;
}

export async function embedChunks(chunks: Chunk[]): Promise<number[][]> {
  const token = apiToken();
  const account = await accountId(token);

  const vectors: number[][] = [];
  for (let i = 0; i < chunks.length; i += BATCH) {
    const text = chunks.slice(i, i + BATCH).map((chunk) => `${chunk.label}\n${chunk.text}`);
    const result = await call<{ data: number[][] }>(token, `/accounts/${account}/ai/run/${config.embeddingModel}`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    vectors.push(...result.data.map((vector) => normalise(vector).map(round)));
  }
  return vectors;
}
