# HexaFox Technologies: website

Company website for HexaFox Technologies, *Six minds. One vision.*
A static site built with [Astro](https://astro.build), hosted free on GitHub Pages, with the
contact form handled by [Web3Forms](https://web3forms.com).

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
├── .github/workflows/deploy.yml   Build + publish to GitHub Pages on every push to main
├── design/                        Source/master files (not shipped to the site)
│   ├── brand/logo-sheet.png       Original logo presentation sheet
│   └── team-originals/            Uncropped founder photos (local only, git-ignored: ~8 MB)
├── docs/                          Planning docs
│   ├── website-content.md         Copy reference and decisions
│   └── image-prompts.md           Prompts for the AI-generated artwork
├── public/                        Copied as-is: favicon, share image, robots.txt
├── tools/                         One-off asset scripts (Python + Pillow)
│   ├── crop_team_photos.py        design/team-originals → src/assets/team
│   └── make_brand_assets.py       logo sheet → logo mark, favicon, og-cover
└── src/
    ├── assets/                    Images optimised at build time
    │   ├── brand/                 logo-mark.png
    │   ├── images/                AI-generated artwork (optional, see its README)
    │   ├── photos/                group-photo.jpg
    │   └── team/                  600×600 founder headshots
    ├── components/
    │   ├── layout/                SeoHead, SkipLink, SiteHeader, MobileMenu, SiteFooter
    │   ├── sections/<section>/    One folder per page section and its parts
    │   └── ui/                    Reusable pieces: Button, Logo, ArtFrame, HexPhoto, …
    ├── data/                      All site text and lists (edit copy here)
    ├── layouts/BaseLayout.astro   <html> shell: fonts, global styles, header, footer
    ├── lib/                       Small helpers: base-path URLs, optional images, hex maths
    ├── pages/                     index, 404, thanks
    ├── scripts/                   Tiny client scripts: reveal, mobile menu, contact form
    └── styles/                    tokens · base · layout · utilities · motion
```

**Rules of thumb:** text lives in `src/data/`, colours and spacing in `src/styles/tokens.css`,
and each component does one job. A new page section gets its own folder under
`src/components/sections/`.

## Common tasks

| I want to… | Do this |
|---|---|
| Change wording | Edit the matching file in `src/data/` |
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

## Deploying to GitHub Pages

1. Create the repository under the company GitHub account and push `main`.
2. In the repo go to *Settings → Pages → Build and deployment → Source* and choose **GitHub Actions**.
3. Every push to `main` builds and publishes the site. The workflow works out the URL itself:
   - a repo named `<account>.github.io` → `https://<account>.github.io/`
   - any other name → `https://<account>.github.io/<repo>/`

On a free GitHub plan, Pages requires the repository to be **public**.
