from pathlib import Path
from PIL import Image, ImageOps

MAX_WIDTH = 1920
MAX_HEIGHT = 1920
JPEG_QUALITY = 82
WEBP_QUALITY = 82


def optimize_image(path: Path) -> bool:
    try:
        with Image.open(path) as img:
            img = ImageOps.exif_transpose(img)
            img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.Resampling.LANCZOS)

            suffix = path.suffix.lower()
            if suffix in {".jpg", ".jpeg"}:
                if img.mode not in ("RGB", "L"):
                    img = img.convert("RGB")
                img.save(path, format="JPEG", optimize=True, progressive=True, quality=JPEG_QUALITY)
            elif suffix == ".png":
                if img.mode not in ("RGB", "RGBA", "L"):
                    img = img.convert("RGBA")
                img.save(path, format="PNG", optimize=True)
            elif suffix == ".webp":
                if img.mode not in ("RGB", "RGBA"):
                    img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
                img.save(path, format="WEBP", optimize=True, quality=WEBP_QUALITY, method=6)
            else:
                return False

        return True
    except Exception:
        return False


def main() -> None:
    uploads_dir = Path(__file__).resolve().parents[1] / "uploads"
    if not uploads_dir.exists():
        print(f"Uploads directory not found: {uploads_dir}")
        return

    candidates = [p for p in uploads_dir.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}]
    if not candidates:
        print("No images found to optimize.")
        return

    optimized = 0
    skipped = 0

    for image_path in candidates:
        if optimize_image(image_path):
            optimized += 1
            print(f"Optimized: {image_path.name}")
        else:
            skipped += 1
            print(f"Skipped:   {image_path.name}")

    print(f"Done. Optimized={optimized}, Skipped={skipped}, Total={len(candidates)}")


if __name__ == "__main__":
    main()
