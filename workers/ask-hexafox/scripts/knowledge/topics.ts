/**
 * One-line topic for chunks whose wording doesn't match how visitors ask about them
 * (e.g. the naming story never says "name of the company" in a searchable way).
 * Prepended to the chunk text, so it helps both retrieval and the model. Keys are chunk ids.
 */
export const topics: Record<string, string> = {
  about: 'What HexaFox Technologies is, what it does and where it is based.',
  contact: 'How to get in touch with HexaFox, hire us or start a project.',
  'story-hostel-room': 'How the six HexaFox founders met at college.',
  'story-the-name': 'Where the name HexaFox comes from and what it means.',
  'story-today': 'What the founders did after college and why HexaFox exists.',
  process: 'How a project with HexaFox runs, step by step.',
  team: 'Who founded HexaFox: the six co-founders and their roles.',
  'why-us': 'Why clients choose HexaFox.',
};
