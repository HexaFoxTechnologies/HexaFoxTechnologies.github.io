# HexaFox Technologies: website

Company website for HexaFox Technologies, *Six minds. One vision.*
A static site built with [Astro](https://astro.build), hosted free on GitHub Pages, with the
contact form handled by [Web3Forms](https://web3forms.com) and the **Ask HexaFox** chat served by
FoxDesk, HexaFox's own embeddable assistant.

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
│   ├── ci.yml                     Every pull request: type-check and build the site
│   └── deploy.yml                 Build + publish to GitHub Pages on every push to main, then refresh the chat
├── design/                        Source/master files (not shipped to the site)
│   ├── brand/
│   │   ├── logo-sheet.png         Original logo presentation sheet
│   │   └── github-avatar.png      500×500 profile picture for the GitHub organization
│   ├── generated-originals/       Full-size PNG artwork masters (local only, git-ignored: ~9 MB)
│   └── team-originals/            Uncropped founder photos (local only, git-ignored: ~8 MB)
├── docs/                          Planning docs
│   ├── website-content.md         Copy reference and decisions
│   └── image-prompts.md           Prompts for the AI-generated artwork
├── public/                        Copied as-is: favicon, share image, robots.txt (points to the sitemap)
├── tools/                         One-off asset scripts (Python + Pillow)
│   ├── crop_team_photos.py        design/team-originals → src/assets/team
│   └── make_brand_assets.py       logo sheet → logo mark, favicon, og-cover, GitHub avatar
└── src/
    ├── assets/                    Images optimised at build time
    │   ├── brand/                 logo-mark.png
    │   ├── images/                AI-generated artwork (optional, see its README)
    │   ├── photos/                group-photo.jpg
    │   └── team/                  600×600 founder headshots
    ├── components/
    │   ├── layout/                SeoHead, SkipLink, SiteHeader, MobileMenu, SiteFooter, ChatWidget
    │   ├── sections/<section>/    One folder per page section and its parts
    │   └── ui/                    Reusable pieces: Button, Logo, ArtFrame, HexPhoto, …
    ├── data/                      All site text and lists (edit copy here)
    ├── layouts/BaseLayout.astro   <html> shell: fonts, global styles, header, footer
    ├── lib/                       Small helpers: base-path URLs, optional images, hex maths
    ├── pages/                     index, story, foxdesk, 404, thanks (sitemap-index.xml is generated at build)
    ├── scripts/                   Tiny client scripts: reveal, mobile menu, contact form
    └── styles/                    tokens · base · layout · utilities · motion
```

**Rules of thumb:** text lives in `src/data/`, colours and spacing in `src/styles/tokens.css`,
and each component does one job. A new page section gets its own folder under
`src/components/sections/`.

## Common tasks

| I want to… | Do this |
|---|---|
| Change wording | Edit the matching file in `src/data/`. The chat picks it up after the deploy ([how](#ask-hexafox-chat)). |
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
own pages, with citations that link to the section they came from. It's **FoxDesk**, HexaFox's
embeddable assistant (private repo
[HexaFoxTechnologies/foxdesk](https://github.com/HexaFoxTechnologies/foxdesk), client `hexafox`).
This site only loads its script ([src/components/layout/ChatWidget.astro](src/components/layout/ChatWidget.astro)):

```html
<script src="https://foxdesk-hexafox.hexafox.workers.dev/widget.js" data-bot="hexafox" defer></script>
```

Its greeting, starter questions, look, models, limits and API keys all live in FoxDesk's
`clients/hexafox/`, so changing them doesn't touch this repo. The models, Turnstile check and
caps are the same as before: 6 questions a minute and 40 a day per visitor, 1,500 a day site-wide.

**How it stays up to date:** FoxDesk answers from a crawl of the *published* site, not from
`src/data`. So after you change any text:

1. Merge as usual. The Pages deploy publishes the site.
2. The deploy's last job, *Refresh the chat's knowledge*, starts FoxDesk's *Refresh knowledge*
   workflow (`workflow_dispatch`).
   FoxDesk re-crawls the site. If the text changed, it re-embeds it and redeploys the chat within
   a few minutes. If nothing changed, it stops there.
3. As a backstop, FoxDesk also re-crawls every day at 08:00 IST.

Step 2 needs the repository secret **`FOXDESK_DISPATCH_TOKEN`**: a fine-grained GitHub token
(resource owner *HexaFoxTechnologies*, repository *foxdesk* only, the single permission
*Actions: Read and write*). It can start FoxDesk's workflows but can't read or change its code.
Without it, the deploy skips that step with a notice, and the daily re-crawl updates the chat
within a day.

**Local development:** the live chat only answers on the live site, so `npm run dev` leaves it
out. To try it locally, run `npm run fd -- dev hexafox` in the foxdesk repo and set
`PUBLIC_FOXDESK_WIDGET_URL=http://localhost:8787/widget.js` in `.env` (see `.env.example`).

### How many questions it can answer

Each question uses one call to each service below. One answer is about **1,000 tokens**
(~935 in, ~75 out) and **under 1 Workers AI neuron**. Limits checked on 2026-10-20:

| Service | Free limit | Checked how | Questions a day it allows |
|---|---|---|---|
| Our own cap (FoxDesk `clients/hexafox/config.json`) | 1,500 a day site-wide, 40 per visitor, 6 a minute per visitor | config | **1,500**: the ceiling by design |
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
*Rate limit*), and every answer's model and tokens in the `foxdesk-hexafox` Worker's logs
(`answered` events).

## Deploying to GitHub Pages

1. Create the repository under the company GitHub account and push `main`.
2. In the repo go to *Settings → Pages → Build and deployment → Source* and choose **GitHub Actions**.
3. Every push to `main` builds and publishes the site. The workflow works out the URL itself:
   - a repo named `<account>.github.io` → `https://<account>.github.io/`
   - any other name → `https://<account>.github.io/<repo>/`

On a free GitHub plan, Pages requires the repository to be **public**.

## Contributing

`main` is protected: it can't be force-pushed or deleted. Make changes on a branch and open a pull
request. **CI** type-checks and builds the site. Once it's merged, the site deploys and the chat
refreshes its knowledge (see [Ask HexaFox](#ask-hexafox-chat)).

## Related repositories

- [`HexaFoxTechnologies/.github`](https://github.com/HexaFoxTechnologies/.github): the organization's
  profile page (`profile/README.md`), shown at github.com/HexaFoxTechnologies.
