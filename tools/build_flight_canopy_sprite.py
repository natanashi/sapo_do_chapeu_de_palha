from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter


FRAME_COUNT = 6
FRAME_SIZE = 256
CONTENT_MAX_WIDTH = 232
CONTENT_MAX_HEIGHT = 202


def prepare_frame(cell: Image.Image) -> Image.Image:
    cell = cell.convert("RGBA")
    alpha = cell.getchannel("A")
    cell.putalpha(ImageChops.darker(alpha, alpha.filter(ImageFilter.MinFilter(3))))
    bbox = cell.getchannel("A").getbbox()
    if not bbox:
        return Image.new("RGBA", (FRAME_SIZE, FRAME_SIZE))

    content = cell.crop(bbox)
    scale = min(CONTENT_MAX_WIDTH / content.width, CONTENT_MAX_HEIGHT / content.height)
    pixel_width = max(1, round(content.width * scale / 2))
    pixel_height = max(1, round(content.height * scale / 2))
    content = content.resize((pixel_width, pixel_height), Image.Resampling.LANCZOS)
    content = content.resize((pixel_width * 2, pixel_height * 2), Image.Resampling.NEAREST)

    frame = Image.new("RGBA", (FRAME_SIZE, FRAME_SIZE))
    x = (FRAME_SIZE - content.width) // 2
    y = FRAME_SIZE - content.height - 12
    frame.alpha_composite(content, (x, y))
    return frame


def build_sprite(source_path: Path, output_path: Path) -> None:
    source = Image.open(source_path).convert("RGBA")
    cell_width = source.width // FRAME_COUNT
    frames = []
    for index in range(FRAME_COUNT):
        left = index * cell_width
        right = source.width if index == FRAME_COUNT - 1 else (index + 1) * cell_width
        frames.append(prepare_frame(source.crop((left, 0, right, source.height))))

    sheet = Image.new("RGBA", (FRAME_SIZE * FRAME_COUNT, FRAME_SIZE))
    for index, frame in enumerate(frames):
        sheet.alpha_composite(frame, (index * FRAME_SIZE, 0))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.quantize(
        colors=112,
        method=Image.Quantize.FASTOCTREE,
        dither=Image.Dither.NONE,
    ).save(output_path, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Normalize a six-frame canopy breeze sprite sheet.")
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    build_sprite(args.source, args.output)


if __name__ == "__main__":
    main()
