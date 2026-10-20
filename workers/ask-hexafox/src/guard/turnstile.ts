/**
 * Cloudflare Turnstile bot check. Only enforced when TURNSTILE_SECRET_KEY is set; the widget then
 * sends a fresh token with every question.
 */
export async function passesBotCheck(secret: string | undefined, token: string | undefined, ip: string | null): Promise<boolean> {
  if (!secret) return true;
  if (!token) return false;

  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}
