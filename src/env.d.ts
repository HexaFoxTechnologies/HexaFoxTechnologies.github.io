interface ImportMetaEnv {
  /** Web3Forms access key for the contact form. See .env.example. */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
  /** Override the FoxDesk chat widget URL (empty hides the chat). See .env.example. */
  readonly PUBLIC_FOXDESK_WIDGET_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
