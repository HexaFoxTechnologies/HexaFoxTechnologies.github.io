interface ImportMetaEnv {
  /** Web3Forms access key for the contact form. See .env.example. */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
  /** Ask HexaFox Worker URL. See .env.example. */
  readonly PUBLIC_ASK_API_URL?: string;
  /** Optional Turnstile site key for Ask HexaFox. See .env.example. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
