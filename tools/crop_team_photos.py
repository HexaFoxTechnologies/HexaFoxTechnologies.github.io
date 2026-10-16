"""Crop the founders' original photos into matching 600x600 square headshots.

Usage (needs Pillow):  python tools/crop_team_photos.py

Reads   design/team-originals/<name>.(jpg|jpeg)
Writes  src/assets/team/<name>.jpg

To add or replace a photo: drop the original into design/team-originals/, add or adjust its crop
box below (left, top, side, measured in upright pixels), and re-run.
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "design/team-originals"
OUT = ROOT / "src/assets/team"
SIZE = 600

# None = use the whole (already square) image
CROPS = {
    "madhesh-vivekanandan.jpg": (633, 1350, 1800),
    "pranav-krishnaa.jpeg": None,
    "nithish-kumar.jpeg": None,
    "prasanna-ayyappan.jpeg": (167, 300, 500),
    "raghul-b.jpeg": (30, 0, 900),
    "mahamanimaran-v.jpeg": (107, 40, 560),
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, box in CROPS.items():
        im = ImageOps.exif_transpose(Image.open(SRC / name)).convert("RGB")
        if box:
            left, top, side = box
            im = im.crop((left, top, left + side, top + side))
        im = im.resize((SIZE, SIZE), Image.LANCZOS)
        dest = OUT / f"{Path(name).stem}.jpg"
        im.save(dest, "JPEG", quality=85, optimize=True, progressive=True)
        print(f"{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
