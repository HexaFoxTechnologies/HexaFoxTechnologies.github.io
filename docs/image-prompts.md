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

## 6. Team section: the six hexagon pieces
Six square pictures, one per skill, each cropped into one piece of the big hexagon around the logo. The site
adds a violet tint and rim on top, so a moody, mostly monochrome photo works best. Keep the main subject in the
middle third, since the edges get cut off by the piece shape.

- **Files:** `team-piece-ai.png`, `team-piece-frontend.png`, `team-piece-cloud.png`, `team-piece-data.png`, `team-piece-design.png`, `team-piece-consulting.png`
- **Size / ratio:** 1200 × 1200 (1:1), all six in one session so the lighting matches
- **Used in:** Home → "Six skills. One complete team." Save each file into `src/assets/images/` with its exact name
  and the site picks it up automatically; until then that piece shows a violet placeholder.
- **Shared start for all six:**
  > Cinematic close-up photograph, deep midnight indigo shadows with violet and lavender light, shallow depth
  > of field, soft film grain, calm and premium. Mostly monochrome violet. No readable text, no logos, no
  > faces.
- **AI (`team-piece-ai.png`):** > …a translucent glass brain made of fine glowing circuit lines, floating in the dark, tiny points of light along its paths.
- **Frontend (`team-piece-frontend.png`):** > …a laptop seen at an angle on a desk at night, its screen showing blurred lines of code and a simple web layout, lit by the screen's glow.
- **Cloud & support (`team-piece-cloud.png`):** > …a row of server racks in a dark data centre, small status lights glowing violet, perspective leading into the distance.
- **Data (`team-piece-data.png`):** > …a large curved monitor wall with blurred dashboards and bar charts, glowing lines of data, seen from slightly below.
- **Design (`team-piece-design.png`):** > …hand-drawn wireframe sketches of app screens on paper, a pen resting on them, seen from above under a soft desk lamp.
- **Consulting (`team-piece-consulting.png`):** > …two people at a meeting table seen from behind and out of focus, hands over a notebook and a laptop, a whiteboard of sticky notes in the background. No faces visible.
- **End every prompt with:** the Style block's "Avoid" list (no text, no logos, no realistic faces).

## 7. Services: background pictures for all 13 tiles
Thirteen pictures, one per tile in the Services grid, all in one matching style. The site pins each picture to the
tile's bottom-right corner and covers the rest with a dark fade, because the tile's text sits top-left. Tiles come in
different shapes (small near-square, wide, tall, one big square), so every picture must work however it is cropped:
**one small subject in the lower-right quadrant, inset from the edges; everything else smooth, empty and very dark.**
Keep brightness and contrast low. These are textures behind text, not hero art. The recurring motif that ties all
13 together is frosted-glass hexagonal objects lit from within.

Five tiles also carry a small line drawing in the centre-right (`ai-poc`: a row of five little hexagons; `web-apps`:
a browser window; `mobile-apps`: a phone; `power-bi`: a bar chart; `rag`: a chat card). For those five, make the
subject even smaller and keep it strictly in the bottom-right corner, and don't repeat the drawing's object; the
subjects below already pick a related metaphor instead.

The pictures switch on only once **all 13 files exist**, so generate them in one session with the same settings. Until
then every tile keeps its plain violet look.

- **Files:** `service-bg-ai-poc.png`, `service-bg-consulting.png`, `service-bg-ux-ui.png`, `service-bg-web-apps.png`,
  `service-bg-mobile-apps.png`, `service-bg-integrations.png`, `service-bg-cloud-support.png`, `service-bg-databases.png`,
  `service-bg-power-bi.png`, `service-bg-document-ai.png`, `service-bg-rag.png`, `service-bg-multi-agent.png`,
  `service-bg-automation.png`
- **Size / ratio:** 1600 × 1200 (4:3), all 13 in one session so the lighting matches
- **Used in:** Home → Services. Save into `src/assets/images/` with the exact names and the site picks them up.
- **Shared start for all 13:**
  > Minimal, cinematic editorial illustration with soft 3D depth, used as a dark background texture. Deep midnight
  > indigo #0E0B1A fills the whole frame: smooth, empty, very dark, with at most a faint violet haze. The only subject
  > is small, sits in the lower-right quadrant inset from the edges, and the upper half and the whole left half stay
  > empty. Subject:
- **Proof of concept in a week (`service-bg-ai-poc.png`):** > …a single frosted-glass hexagonal block held in a slim clamp on a small workbench, lit lavender from within as if just switched on, one thin violet probe wire touching it, a tiny amber indicator lamp on the bench edge. Extra small, tucked into the bottom-right corner.
- **Problem to solution consulting (`service-bg-consulting.png`):** > …a frosted-glass hexagonal tile lying flat like a map, one thin violet route line crossing it from an edge to a small lit node, two fainter unlit hexagon outlines beside it like options set aside, a tiny amber pin at the route's end.
- **UX/UI design (`service-bg-ux-ui.png`):** > …three thin frosted-glass hexagonal tiles fanned out like screens of a prototype, the front one holding a faint lavender wireframe of two rectangles and a line, a slim stylus resting across them with an amber tip.
- **Web applications (`service-bg-web-apps.png`):** > …a short stack of three frosted-glass hexagonal tiles, each slightly offset like layers of a page, lavender light rising up through them from the bottom layer, one small amber dot on the top layer. Extra small, tucked into the bottom-right corner.
- **Mobile apps (`service-bg-mobile-apps.png`):** > …a single small frosted-glass hexagonal tile lying on a dark surface, a soft lavender ripple spreading out from it like a quiet notification, one tiny amber point at the ripple's centre. Extra small, tucked into the bottom-right corner.
- **APIs and integrations (`service-bg-integrations.png`):** > …two frosted-glass hexagonal tiles a short distance apart, joined by one thin violet thread of light carrying a few small lavender pulses along it, a tiny amber knot where the thread meets the right tile.
- **Cloud, deployment and support (`service-bg-cloud-support.png`):** > …a low row of three frosted-glass hexagonal tiles standing on edge like small server blades, each with one tiny status light, two lavender and one amber, a soft violet haze lifting above them like a cloud.
- **Database architecture (`service-bg-databases.png`):** > …a short, precisely stacked column of frosted-glass hexagonal tiles like a hexagonal database cylinder, thin lavender bands of light between the layers, one tiny amber indicator at the base.
- **Power BI dashboards (`service-bg-power-bi.png`):** > …a frosted-glass hexagonal lens tilted on a small stand, focusing a thin violet beam into one bright amber point on the dark surface below, like an answer brought into focus. Extra small, tucked into the bottom-right corner; no charts or bars.
- **Document AI (`service-bg-document-ai.png`):** > …a thin stack of translucent sheets, their corners lifting off into a few small frosted-glass hexagonal tiles that float just above, lit lavender from within, one tiny amber flag on one sheet's corner like a field waiting for a check.
- **RAG assistants (`service-bg-rag.png`):** > …a short stack of translucent pages, one thin violet thread rising from a page to a small lit frosted-glass hexagonal tile hovering above it, a tiny amber citation dot where the thread leaves the page. Extra small, tucked into the bottom-right corner; no speech bubbles or cards.
- **Multi-agent systems (`service-bg-multi-agent.png`):** > …four small frosted-glass hexagonal tiles in a loose ring, three lit violet and one lavender, thin threads of light passing between them, one tiny amber dot at the centre where a hand-off meets.
- **Workflow automation (`service-bg-automation.png`):** > …three small frosted-glass cogs with hexagonal hubs meshed in a line on a dark surface, lit from within, one thin violet trace entering the first cog and leaving the last, a tiny amber dot at its end like an alert.
- **End every prompt with:**
  > Frosted-glass hexagonal objects lit from within, violet #8B5CF6 and lavender #C4B5FD light, one small warm amber
  > accent only. Low brightness, low contrast, generous negative space, subtle film grain. No text, no letters, no
  > numbers, no logos, no faces, no people.

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
