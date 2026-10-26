/**
 * "Book a call" popup, served by Cal.com (free plan, one shared "HexaFox" account; no founder names).
 * To change the call, edit `calLink` and `minutes` to match the event type in Cal.com.
 */
export const booking = {
  /** The public booking link without the host: cal.com/<calLink>. */
  calLink: 'hexafox/intro-call',
  minutes: 30,
  /** Serves the popup: its loader (~23 KB) and the calendar (~2 MB) load only after a click. */
  embedOrigin: 'https://app.cal.com',
} as const;

/** The full booking page; the link still works as a plain link when JavaScript is off. */
export const bookingUrl = `https://cal.com/${booking.calLink}`;
