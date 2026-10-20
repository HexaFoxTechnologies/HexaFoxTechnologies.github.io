/**
 * "Ask HexaFox" chat, served by FoxDesk (HexaFox's embeddable assistant; private repo
 * HexaFoxTechnologies/foxdesk, client "hexafox"). Its copy, look, models and knowledge live there.
 */
export const chat = {
  /**
   * The widget script. The live Worker only answers on the live site, so `npm run dev` leaves the
   * chat out unless PUBLIC_FOXDESK_WIDGET_URL points at a local `fd dev` build.
   */
  widgetUrl: import.meta.env.PUBLIC_FOXDESK_WIDGET_URL ?? (import.meta.env.DEV ? '' : 'https://foxdesk-hexafox.hexafox.workers.dev/widget.js'),
  bot: 'hexafox',
} as const;
