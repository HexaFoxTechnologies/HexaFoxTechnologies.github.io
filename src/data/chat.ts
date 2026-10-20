/**
 * "Ask HexaFox" chat, served by FoxDesk (HexaFox's embeddable assistant; private repo
 * HexaFoxTechnologies/foxdesk, client "hexafox"). Its copy, look, models and knowledge live there.
 */
export const chat = {
  /** The widget script. PUBLIC_FOXDESK_WIDGET_URL overrides it (e.g. a local `fd dev`); set it empty to hide the chat. */
  widgetUrl: import.meta.env.PUBLIC_FOXDESK_WIDGET_URL ?? 'https://foxdesk-hexafox.hexafox.workers.dev/widget.js',
  bot: 'hexafox',
} as const;
