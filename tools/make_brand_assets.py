"""Generate web brand assets from the logo presentation sheet.

Usage (needs Pillow):  python tools/make_brand_assets.py

Reads   design/brand/logo-sheet.png
Writes  src/assets/brand/logo-mark.png   transparent mark for the site
        public/favicon.png               64x64
        public/apple-touch-icon.png      180x180 on the brand background
        public/og-cover.png              1200x630 link-preview card
        design/brand/github-avatar.png   500x500 profile picture for the GitHub organization
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SHEET = ROOT / "design/brand/logo-sheet.png"
MARK_BOX = (260, 20, 820, 540)       # main mark on the sheet (left, top, right, bottom)
SHEET_BG = (16, 17, 34)               # brightest backdrop tone behind the mark on the sheet
BRAND_BG = (14, 11, 26)              # --color-bg  #0E0B1A
TEXT = (238, 234, 248)               # --color-text
MUTED = (163, 157, 186)              # --color-text-muted
VIOLET = (167, 139, 250)             # --color-violet-soft
FONT = ROOT / "node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2"


def unmultiply(img: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    """Turn a light-on-dark mark into a transparent PNG, keeping its glow."""
    out = Image.new("RGBA", img.size)
    src, dst = img.load(), out.load()
    for y in range(img.height):
        for x in range(img.width):
            c = src[x, y]
            a = max(max(c[i] - bg[i], 0) / (255 - bg[i]) for i in range(3))
            if a <= 0.02:
                dst[x, y] = (0, 0, 0, 0)
                continue
            rgb = tuple(min(255, round(bg[i] + (c[i] - bg[i]) / a)) for i in range(3))
            dst[x, y] = (*rgb, round(a * 255))
    return out


def on_background(mark: Image.Image, size: int, pad: float) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (*BRAND_BG, 255))
    inner = round(size * (1 - 2 * pad))
    m = mark.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas.convert("RGB")


def font(size: int, weight: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONT), size)
    try:
        f.set_variation_by_axes([weight])
    except OSError:
        pass
    return f


def og_cover(mark: Image.Image) -> Image.Image:
    card = Image.new("RGBA", (1200, 630), (*BRAND_BG, 255))
    m = mark.copy()
    m.thumbnail((380, 380), Image.LANCZOS)
    card.alpha_composite(m, (110, (630 - m.height) // 2))
    d = ImageDraw.Draw(card)
    x = 540
    hexa = font(96, 600)
    d.text((x, 190), "Hexa", font=hexa, fill=TEXT)
    d.text((x + d.textlength("Hexa", font=hexa), 190), "Fox", font=hexa, fill=VIOLET)
    d.text((x + 4, 312), "T E C H N O L O G I E S", font=font(26, 400), fill=MUTED)
    d.text((x + 2, 380), "Six minds. One vision.", font=font(40, 500), fill=TEXT)
    return card.convert("RGB")


def main() -> None:
    sheet = Image.open(SHEET).convert("RGB")
    mark = unmultiply(sheet.crop(MARK_BOX), SHEET_BG)
    mark = mark.crop(mark.getbbox())

    (ROOT / "src/assets/brand").mkdir(parents=True, exist_ok=True)
    (ROOT / "public").mkdir(exist_ok=True)
    mark.save(ROOT / "src/assets/brand/logo-mark.png", optimize=True)
    on_background(mark, 64, 0.08).save(ROOT / "public/favicon.png", optimize=True)
    on_background(mark, 180, 0.12).save(ROOT / "public/apple-touch-icon.png", optimize=True)
    og_cover(mark).save(ROOT / "public/og-cover.png", optimize=True)
    on_background(mark, 500, 0.12).save(ROOT / "design/brand/github-avatar.png", optimize=True)
    print("brand assets written")


if __name__ == "__main__":
    main()
