/**
 * Some models cite with full-width brackets (【1】). Map them to [1] character by character,
 * which is safe even when a marker is split across streamed pieces.
 */
export const normaliseCitations = (text: string) => text.replaceAll('【', '[').replaceAll('】', ']');
