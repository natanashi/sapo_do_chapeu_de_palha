from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps


PANEL_WIDTH = 2172
PANEL_HEIGHT = 724
TRACK_WIDTH = PANEL_WIDTH * 3
SEAM_BLEND = 220


def load_panel(path: Path) -> Image.Image:
    source = Image.open(path).convert("RGBA")
    scale = PANEL_WIDTH / source.width
    resized = source.resize(
        (PANEL_WIDTH, round(source.height * scale)),
        Image.Resampling.LANCZOS,
    )
    if resized.height >= PANEL_HEIGHT:
        panel = resized.crop((0, resized.height - PANEL_HEIGHT, PANEL_WIDTH, resized.height))
    else:
        panel = Image.new("RGBA", (PANEL_WIDTH, PANEL_HEIGHT))
        panel.alpha_composite(resized, (0, PANEL_HEIGHT - resized.height))

    # Generated transparent plates can carry a one-pixel cyan fringe. Tightening
    # alpha once removes that halo without changing the interior pixel artwork.
    alpha = panel.getchannel("A")
    tightened = alpha.filter(ImageFilter.MinFilter(3))
    panel.putalpha(ImageChops.darker(alpha, tightened))

    # The world must dissolve into atmosphere instead of ending on a hard edge.
    fade_height = 72
    faded_alpha = panel.getchannel("A")
    fade = Image.new("L", panel.size, 255)
    fade_pixels = fade.load()
    for y in range(PANEL_HEIGHT - fade_height, PANEL_HEIGHT):
        value = round(255 * (PANEL_HEIGHT - 1 - y) / max(1, fade_height - 1))
        for x in range(PANEL_WIDTH):
            fade_pixels[x, y] = value
    panel.putalpha(ImageChops.multiply(faded_alpha, fade))
    return panel


def soften_internal_seam(image: Image.Image, seam: int, half_width: int) -> None:
    left = seam - half_width
    right = seam + half_width
    left_half = image.crop((left, 0, seam, image.height))
    right_half = image.crop((seam, 0, right, image.height))
    left_extension = Image.new("RGBA", (half_width * 2, image.height))
    left_extension.alpha_composite(left_half, (0, 0))
    left_extension.alpha_composite(ImageOps.mirror(left_half), (half_width, 0))
    right_extension = Image.new("RGBA", (half_width * 2, image.height))
    right_extension.alpha_composite(ImageOps.mirror(right_half), (0, 0))
    right_extension.alpha_composite(right_half, (half_width, 0))
    image.paste(feather_pair(left_extension, right_extension), (left, 0))


def soften_wrapped_seam(image: Image.Image, half_width: int) -> None:
    width = image.width
    left_half = image.crop((width - half_width, 0, width, image.height))
    right_half = image.crop((0, 0, half_width, image.height))
    left_extension = Image.new("RGBA", (half_width * 2, image.height))
    left_extension.alpha_composite(left_half, (0, 0))
    left_extension.alpha_composite(ImageOps.mirror(left_half), (half_width, 0))
    right_extension = Image.new("RGBA", (half_width * 2, image.height))
    right_extension.alpha_composite(ImageOps.mirror(right_half), (0, 0))
    right_extension.alpha_composite(right_half, (half_width, 0))
    blended = feather_pair(left_extension, right_extension)
    image.paste(blended.crop((0, 0, half_width, image.height)), (width - half_width, 0))
    image.paste(blended.crop((half_width, 0, half_width * 2, image.height)), (0, 0))


def feather_pair(first: Image.Image, second: Image.Image) -> Image.Image:
    width, height = first.size
    mask = Image.new("L", (width, height))
    for x in range(width):
        mask.paste(round(255 * x / max(1, width - 1)), (x, 0, x + 1, height))
    return Image.composite(second, first, mask)


def build_landscape(first_path: Path, second_path: Path, output: Path) -> None:
    first = load_panel(first_path)
    second = load_panel(second_path)
    cycle = Image.new("RGBA", (PANEL_WIDTH * 2, PANEL_HEIGHT))
    cycle.alpha_composite(first, (0, 0))
    cycle.alpha_composite(second, (PANEL_WIDTH, 0))
    soften_internal_seam(cycle, PANEL_WIDTH, SEAM_BLEND // 2)
    soften_wrapped_seam(cycle, SEAM_BLEND // 2)

    track = Image.new("RGBA", (TRACK_WIDTH, PANEL_HEIGHT))
    track.alpha_composite(cycle, (0, 0))
    track.alpha_composite(cycle.crop((0, 0, PANEL_WIDTH, PANEL_HEIGHT)), (PANEL_WIDTH * 2, 0))
    output.parent.mkdir(parents=True, exist_ok=True)
    track.quantize(
        colors=192,
        method=Image.Quantize.FASTOCTREE,
        dither=Image.Dither.NONE,
    ).save(output, optimize=True)


def cloud_panel(source: Image.Image) -> Image.Image:
    source = source.convert("RGBA")
    alpha_box = source.getchannel("A").getbbox()
    if alpha_box:
        top = max(0, alpha_box[1] - 12)
        bottom = min(source.height, alpha_box[3] + 4)
        source = source.crop((0, top, source.width, bottom))
    panel = source.resize((PANEL_WIDTH, 360), Image.Resampling.LANCZOS)
    alpha = panel.getchannel("A")
    panel.putalpha(ImageChops.darker(alpha, alpha.filter(ImageFilter.MinFilter(3))))
    return panel


def build_cloud_floor(source_path: Path, output: Path) -> None:
    first = cloud_panel(Image.open(source_path))
    enlarged = first.resize((round(PANEL_WIDTH * 1.12), 360), Image.Resampling.BICUBIC)
    left = (enlarged.width - PANEL_WIDTH) // 2
    second = enlarged.crop((left, 0, left + PANEL_WIDTH, 360))
    second = ImageEnhance.Color(second).enhance(0.92)

    cycle = Image.new("RGBA", (PANEL_WIDTH * 2, 360))
    cycle.alpha_composite(first, (0, 0))
    cycle.alpha_composite(second, (PANEL_WIDTH, 0))
    soften_internal_seam(cycle, PANEL_WIDTH, SEAM_BLEND // 2)
    soften_wrapped_seam(cycle, SEAM_BLEND // 2)
    track = Image.new("RGBA", (TRACK_WIDTH, 360))
    track.alpha_composite(cycle, (0, 0))
    track.alpha_composite(cycle.crop((0, 0, PANEL_WIDTH, 360)), (PANEL_WIDTH * 2, 0))
    output.parent.mkdir(parents=True, exist_ok=True)
    track.quantize(
        colors=128,
        method=Image.Quantize.FASTOCTREE,
        dither=Image.Dither.NONE,
    ).save(output, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Build continuous flight scenery tracks.")
    parser.add_argument("--landscape-a", type=Path, required=True)
    parser.add_argument("--landscape-b", type=Path, required=True)
    parser.add_argument("--clouds", type=Path, required=True)
    parser.add_argument("--landscape-output", type=Path, required=True)
    parser.add_argument("--cloud-output", type=Path, required=True)
    args = parser.parse_args()
    build_landscape(args.landscape_a, args.landscape_b, args.landscape_output)
    build_cloud_floor(args.clouds, args.cloud_output)


if __name__ == "__main__":
    main()
