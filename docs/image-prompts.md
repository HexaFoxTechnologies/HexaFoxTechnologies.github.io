# HexaFox: Image Generation Prompts

Save each finished image into `src/assets/images/` using the **exact filename** given, as PNG or JPG
at the size listed (or larger). The build step compresses and resizes them, so don't shrink them yourself.

All five images share one art direction so the site feels like one piece. Paste the **Style block**
at the end of every prompt.

---

## Style block (append to every prompt)

> Style: minimal, cinematic editorial illustration with soft 3D depth. Restrained palette of deep
> midnight indigo (#0E0B1A) with violet (#8B5CF6) and soft lavender (#C4B5FD) light, plus one small
> warm accent of amber lamp light. Clean composition with generous negative space, soft volumetric
> lighting, subtle film grain. No text, no letters, no logos, no watermarks.

**If we pick palette B (light)**, swap the first sentence of the palette for:
> warm off-white paper background (#F7F5F0) with violet (#6236D9) and soft lavender (#ECE6FB) accents

**Avoid in every image:** text, captions, letters, logos, watermarks, distorted hands, realistic
faces, stock-photo people, neon cyberpunk clutter, rainbow colours.

---

## 1. Hero: "The fox made of six"
- **File:** `hero-fox.png`
- **Size / ratio:** 2400 × 1350 (16:9)
- **Used in:** Home hero, behind/beside the headline "Six minds. One vision."
- **Prompt:**
  > A sleek, sitting fox built from exactly six interlocking hexagonal glass facets, each facet
  > catching violet and lavender light differently, floating in a calm dark space. The fox sits on
  > the right third of the frame, facing left, alert and intelligent. The left two-thirds is empty,
  > smooth dark negative space for a headline. Faint thin hexagon outlines dissolve into the
  > background. Premium, quiet, confident.
  > + Style block

## 2. Story: the hostel room
- **File:** `story-hostel-room.png`
- **Size / ratio:** 2000 × 1500 (4:3)
- **Used in:** Our Story, "It started in someone else's room"
- **Prompt:**
  > A small Indian college hostel room at night seen from the doorway, with no people. A narrow cot
  > with a crumpled bedsheet, a study table with two open laptops glowing violet, scattered
  > textbooks, a steel water bottle and tea glasses. One power extension board on the floor with
  > six phones charging from it, cables tangled. A warm desk lamp creates a cosy amber pool of light
  > against the cool violet glow. Feels like a place where friends gathered every night.
  > + Style block

## 3. Story: the rented house in Coimbatore
- **File:** `story-coimbatore-house.png`
- **Size / ratio:** 2000 × 1500 (4:3)
- **Used in:** Our Story, "Then we got a house"
- **Prompt:**
  > A modest independent house in Coimbatore, Tamil Nadu, at dusk: a single-storey home with a flat
  > terrace, a small metal gate, a coconut tree beside it and the Western Ghats faintly visible as
  > soft silhouettes in the distance. Warm amber light glows from the windows. On the front step,
  > exactly six pairs of slippers are lined up neatly in a row. The sky fades from deep indigo to
  > violet. Peaceful, nostalgic, homely. No people.
  > + Style block

## 4. Services: Tech Solutions
- **File:** `service-tech.png`
- **Size / ratio:** 1600 × 1200 (4:3)
- **Used in:** Services section, Tech Solutions block
- **Prompt:**
  > A clean still life of floating translucent hexagonal glass tiles arranged like a honeycomb, some
  > tiles showing abstract interface fragments (simple wireframe rectangles, a tiny chart, a database
  > cylinder icon, a small cloud shape) etched as soft lavender light lines. The tiles fit together
  > precisely, suggesting solid engineering. Centered composition on a dark background.
  > + Style block

## 5. Services: AI Solutions
- **File:** `service-ai.png`
- **Size / ratio:** 1600 × 1200 (4:3)
- **Used in:** Services section, AI Solutions block
- **Prompt:**
  > A single glowing violet core inside a hexagonal glass frame, with fine threads of light
  > connecting it to small surrounding nodes (documents, a chat bubble, a gear) placed in a calm,
  > orderly ring. The light is controlled and steady, not chaotic. Suggests intelligence that is
  > structured and reliable. Centered composition on a dark background.
  > + Style block

---

## Optional (nice to have)
- **`og-cover.png`**: already generated from the logo by `tools/make_brand_assets.py`.
  No prompt needed.
- **`not-found-fox.png`** (1200 × 1200): a fox peeking curiously out from behind a single large
  hexagon, for the 404 page. + Style block

---

## Not needed as images
Icons, the hexagon background patterns, the process diagram and section dividers will be built in
code (SVG/CSS). They stay razor-sharp and add almost nothing to page weight.

## One more ask: the logo
`design/brand/logo-sheet.png` is a presentation sheet. If whoever made the logo can export the
**mark alone and the full lockup on a transparent background (SVG or PNG)**, please add them to
`design/brand/`. Until then the site uses a mark cut from the sheet by `tools/make_brand_assets.py`.
