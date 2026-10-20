# HexaFox Technologies: website

Company website for HexaFox Technologies, *Six minds. One vision.*
A static site built with [Astro](https://astro.build), hosted free on GitHub Pages, with the
contact form handled by [Web3Forms](https://web3forms.com) and the **Ask HexaFox** chat answered
by a Cloudflare Worker.

**Live site:** https://hexafoxtechnologies.github.io

## Quick start

Needs Node 22.22 or newer (see `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + build to dist/
npm run preview   # serve the built site
```

## Project structure

```
.
├── .github/workflows/
│   ├── ci.yml                     Every pull request: site build, Worker bundle, knowledge freshness
│   ├── deploy.yml                 Build + publish to GitHub Pages on every push to main
│   └── deploy-ask.yml             Deploy the Ask HexaFox Worker when it or src/data changes on main
├── design/                        Source/master files (not shipped to the site)
│   ├── brand/
│   │   ├── logo-sheet.png         Original logo presentation sheet
│   │   └── github-avatar.png      500×500 profile picture for the GitHub organization
│   ├── generated-originals/       Full-size PNG artwork masters (local only, git-ignored: ~9 MB)
│   └── team-originals/            Uncropped founder photos (local only, git-ignored: ~8 MB)
├── docs/                          Planning docs
│   ├── website-content.md         Copy reference and decisions
│   └── image-prompts.md           Prompts for the AI-generated artwork
├── public/                        Copied as-is: favicon, share image, robots.txt
├── tools/                         One-off asset scripts (Python + Pillow)
│   ├── crop_team_photos.py        design/team-originals → src/assets/team
│   └── make_brand_assets.py       logo sheet → logo mark, favicon, og-cover, GitHub avatar
├── workers/ask-hexafox/           Ask HexaFox chat API (Cloudflare Worker, own package.json)
│   ├── wrangler.jsonc             Bindings, model chain, allowed origins, daily caps
│   ├── scripts/knowledge/         npm run knowledge (site copy → chunks → embeddings) and knowledge:check
│   └── src/
│       ├── index.ts               Routes: POST /chat, GET /health
│       ├── chat/                  Request checks, the /chat flow, streamed events
│       ├── rag/                   Corpus, query embedding, retrieval, system prompt
│       ├── providers/             Groq, Gemini and the fallback chain
│       ├── guard/                 Rate limits, daily quota (Durable Object), Turnstile
│       ├── http/                  CORS and JSON errors
│       └── knowledge/corpus.json  Generated knowledge base (committed)
└── src/
    ├── assets/                    Images optimised at build time
    │   ├── brand/                 logo-mark.png
    │   ├── images/                AI-generated artwork (optional, see its README)
    │   ├── photos/                group-photo.jpg
    │   └── team/                  600×600 founder headshots
    ├── components/
    │   ├── ask/                   Ask HexaFox chat: launcher, panel, log, composer
    │   ├── layout/                SeoHead, SkipLink, SiteHeader, MobileMenu, SiteFooter
    │   ├── sections/<section>/    One folder per page section and its parts
    │   └── ui/                    Reusable pieces: Button, Logo, ArtFrame, HexPhoto, …
    ├── data/                      All site text and lists (edit copy here)
    ├── layouts/BaseLayout.astro   <html> shell: fonts, global styles, header, footer
    ├── lib/                       Small helpers: base-path URLs, optional images, hex maths
    ├── pages/                     index, 404, thanks
    ├── scripts/                   Tiny client scripts: reveal, mobile menu, contact form
    │   └── ask/                   Chat client (loaded only when the panel opens)
    └── styles/                    tokens · base · layout · utilities · motion
```

**Rules of thumb:** text lives in `src/data/`, colours and spacing in `src/styles/tokens.css`,
and each component does one job. A new page section gets its own folder under
`src/components/sections/`.

## Common tasks

| I want to… | Do this |
|---|---|
| Change wording | Edit the matching file in `src/data/`, then [refresh Ask HexaFox](#ask-hexafox-chat) |
| Change brand colours | Edit `src/styles/tokens.css` |
| Add generated artwork | Save it in `src/assets/images/` with the name from `docs/image-prompts.md`. It appears automatically. |
| Replace a founder photo | Put the original in `design/team-originals/` (kept out of git), adjust its crop in `tools/crop_team_photos.py`, run the script |
| Regenerate logo/favicon/share card | `python tools/make_brand_assets.py` |

The two scripts in `tools/` need Pillow: `pip install pillow`.

## Contact form (Web3Forms)

1. Create a free access key at web3forms.com using **hexafoxtech@gmail.com**.
2. **Local:** copy `.env.example` to `.env` and paste the key into `PUBLIC_WEB3FORMS_KEY`.
3. **Live site:** in the GitHub repo, go to *Settings → Secrets and variables → Actions →
   Variables* and add `WEB3FORMS_KEY`.

Without a key, the contact section shows an "Email us" button instead of the form.
The key is public by design: it can only deliver messages to that inbox.

## Ask HexaFox (chat)

A chat in the bottom-right corner that answers visitors' questions about HexaFox from the site's
own copy, with citations that link to the section they came from. It costs nothing to run: free
tiers only, no card on any account.

**How it works:** `npm run knowledge` turns `src/data/*.ts` into ~20 chunks and embeds them with
Workers AI. The Worker bundles that file, embeds each question, picks the closest chunks
(cosine similarity) and streams an answer from the first model in `MODEL_CHAIN` that responds
(Groq `gpt-oss-120b`, then Gemini Flash-Lite, then two more Groq models). If none answers, the
visitor gets a friendly "busy, email us" message.

**Abuse protection:** only the site (and `localhost`) may call it, an invisible Turnstile check
runs before each question, each visitor gets 6 questions a minute and 40 a day, and the whole
site 1,500 a day. Only request metadata is logged, never questions or answers.

**What's automatic:**

- Every pull request checks that `corpus.json` matches `src/data` (`npm run knowledge:check`).
  If you changed site text without refreshing the chat's knowledge, CI fails and tells you how
  to fix it.
- Every merge to `main` that touches the Worker or `src/data` deploys the Worker
  (`.github/workflows/deploy-ask.yml`). It ships the committed `corpus.json`; it doesn't rebuild it.

**What still needs a person:** running `npm run knowledge` after editing `src/data` (it calls
Workers AI, so it uses your `wrangler login`), and setting or rotating the API keys.

All commands below run in `workers/ask-hexafox/` (`npm install` there first).

| I want to… | Do this |
|---|---|
| Refresh its knowledge after editing site text | `npm run knowledge`, commit `src/knowledge/corpus.json`; it deploys when merged |
| Check the knowledge is current | `npm run knowledge:check` (no Cloudflare login needed) |
| Deploy the Worker by hand | `npx wrangler login` once, then `npm run deploy` (or run *Deploy Ask HexaFox* in the Actions tab) |
| Set or rotate API keys | Copy `.dev.vars.example` to `.dev.vars` (git-ignored), fill it in, run `npm run secrets` |
| Run it locally | `npm run dev` (uses `.dev.vars`), and set `PUBLIC_ASK_API_URL=http://localhost:8787` in the site's `.env` |
| Change models, origins or daily caps | Edit `vars` in `wrangler.jsonc`, then deploy |
| Watch it | Cloudflare dashboard → Workers → ask-hexafox → Logs |

Keys: Groq from console.groq.com/keys, Gemini from aistudio.google.com/apikey, and the Turnstile
secret from the "Ask HexaFox" widget under Turnstile in the Cloudflare dashboard. Use the
hexafoxtech@gmail.com accounts, and never commit a key.

**Auto-deploy setup (once):** the deploy workflow needs a Cloudflare API token as a GitHub secret.

1. Signed in to Cloudflare as hexafoxtech@gmail.com, open
   https://dash.cloudflare.com/profile/api-tokens and click **Create Token**.
2. Next to **Edit Cloudflare Workers**, click **Use template**.
3. Under **Account Resources** choose *Include* → the HexaFox account. Under **Zone Resources**
   choose *Include* → *All zones from an account* → the HexaFox account.
4. **Continue to summary** → **Create Token**, and copy the token. It's shown only once.
5. In the GitHub repo: *Settings → Secrets and variables → Actions → Secrets* →
   **New repository secret**. Name it `CLOUDFLARE_API_TOKEN`, paste the token, and click **Add secret**.

The account ID is already in `wrangler.jsonc`, so no other secret is needed. To rotate the token,
create a new one, replace the secret, and delete the old token in Cloudflare.

**Live site:** the build reads two repo variables (*Settings → Secrets and variables → Actions →
Variables*): `ASK_API_URL` (the Worker URL, e.g. `https://ask-hexafox.hexafox.workers.dev`) and
`ASK_TURNSTILE_SITE_KEY` (public). Without `ASK_API_URL` the chat isn't shown.

### How many questions it can answer

Each question uses one call to each service below. One answer is about **1,000 tokens**
(~935 in, ~75 out) and **under 1 Workers AI neuron**. Limits checked on 2026-10-20:

| Service | Free limit | Checked how | Questions a day it allows |
|---|---|---|---|
| Our own cap (`wrangler.jsonc`) | 1,500 a day site-wide, 40 per visitor, 6 a minute per visitor | config | **1,500**: the ceiling by design |
| Cloudflare Workers | 100,000 requests a day | Cloudflare docs | ~100,000 |
| Workers AI (question embeddings) | 10,000 neurons a day | measured: 117 calls used 105.5 neurons | ~10,000 |
| Groq, per model (3 models in the chain) | 1,000 requests a day, 8,000 tokens a minute | live API headers | ~200 each (token limit, see below) |
| Gemini Flash-Lite | not published (blogs say 500–1,500 a day) | Google AI Studio only | ~500–1,500 |

The real constraint is Groq's **daily token** limit, which its API doesn't report. Its published
table says 200,000 tokens a day for these models (the request and per-minute numbers in the same
table matched the live headers), so each Groq model gives ~200 answers a day and the three give
~600. Adding Gemini, the models can serve roughly **1,100–2,100 answers a day**, so the 1,500 cap
is what visitors hit first. In bursts, each Groq model handles ~8 questions a minute before the
chain falls through to the next one.

**Checking usage:** Workers AI neurons are in the Cloudflare dashboard → *AI* → *Workers AI*, Groq
tokens and limits at console.groq.com/settings/limits, Gemini at aistudio.google.com (*Usage* and
*Rate limit*), and every answer's model and tokens in the Worker's logs (`answered` events).

## Deploying to GitHub Pages

1. Create the repository under the company GitHub account and push `main`.
2. In the repo go to *Settings → Pages → Build and deployment → Source* and choose **GitHub Actions**.
3. Every push to `main` builds and publishes the site. The workflow works out the URL itself:
   - a repo named `<account>.github.io` → `https://<account>.github.io/`
   - any other name → `https://<account>.github.io/<repo>/`

On a free GitHub plan, Pages requires the repository to be **public**.

## Contributing

`main` is protected: it can't be force-pushed or deleted. Make changes on a branch and open a pull
request. **CI** runs three checks on it: the site builds, the Ask HexaFox Worker type-checks and
bundles, and the chat's knowledge matches `src/data`. Once it's merged, the site deploys, and so
does the Worker if it or `src/data` changed.

## Related repositories

- [`HexaFoxTechnologies/.github`](https://github.com/HexaFoxTechnologies/.github): the organization's
  profile page (`profile/README.md`), shown at github.com/HexaFoxTechnologies.
