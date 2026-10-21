"""Build the lightweight raster layers used by the story overworld.

The stones come from the hand-directed generated sprite sheet, while placement,
spacing and all ground decoration are deterministic so the map stays easy to
revise and cheap for the browser to render.
"""

from __future__ import annotations

import math
import random
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "img"
SOURCE = ASSETS / "mapa-pedras-caminho-sprites-v1.png"
ROUTE_OUT = ASSETS / "mapa-caminho-pedras-v3.png"
DETAILS_OUT = ASSETS / "mapa-detalhes-solo-v2.png"

WIDTH, HEIGHT = 1536, 864
ROUTE_PERCENT = [
    (18, 90), (19, 88), (21, 86), (24, 83), (27, 81), (30, 80),
    (34, 79), (38, 79), (42, 80), (46, 81), (50, 81), (54, 80),
    (57, 79), (60, 80), (63, 82), (66, 83), (69, 82), (71, 79),
    (74, 75), (77, 71), (79, 65), (82, 59), (83, 54), (84, 49),
    (83, 45), (81, 41), (79, 36), (76, 33), (72, 30), (68, 27),
    (63, 25), (58, 23), (53, 22), (48, 21), (44, 20), (40, 19),
    (37, 20), (34, 22), (31, 25), (28, 29), (25, 31), (22, 35),
    (20, 38), (17, 42), (13, 46),
]
ROUTE = [(round(x * WIDTH / 100), round(y * HEIGHT / 100)) for x, y in ROUTE_PERCENT]


def alpha_components(image: Image.Image, threshold: int = 20) -> list[tuple[int, int, int, int]]:
    """Return bounding boxes for substantial disconnected alpha islands."""
    alpha = image.getchannel("A")
    # Work at quarter size so component discovery is fast and stable.
    small = alpha.resize((alpha.width // 4, alpha.height // 4), Image.Resampling.NEAREST)
    pix = small.load()
    seen: set[tuple[int, int]] = set()
    boxes: list[tuple[int, int, int, int]] = []
    for sy in range(small.height):
        for sx in range(small.width):
            if (sx, sy) in seen or pix[sx, sy] <= threshold:
                continue
            queue = deque([(sx, sy)])
            seen.add((sx, sy))
            min_x = max_x = sx
            min_y = max_y = sy
            count = 0
            while queue:
                x, y = queue.popleft()
                count += 1
                min_x, max_x = min(min_x, x), max(max_x, x)
                min_y, max_y = min(min_y, y), max(max_y, y)
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if not (0 <= nx < small.width and 0 <= ny < small.height):
                        continue
                    if (nx, ny) in seen or pix[nx, ny] <= threshold:
                        continue
                    seen.add((nx, ny))
                    queue.append((nx, ny))
            if count > 180:
                boxes.append((min_x * 4, min_y * 4, min((max_x + 1) * 4, image.width), min((max_y + 1) * 4, image.height)))
    return sorted(boxes, key=lambda box: (box[1], box[0]))


def prepare_stones(sheet: Image.Image) -> list[Image.Image]:
    stones: list[Image.Image] = []
    for box in alpha_components(sheet):
        crop = sheet.crop(box)
        alpha_box = crop.getchannel("A").getbbox()
        if not alpha_box:
            continue
        crop = crop.crop(alpha_box)
        # Shrink the generated art into deliberate 16-bit pixel clusters.
        # Flatten the generated boulders into walkable paving stones. At map
        # scale they should read as footsteps, never as a stone wall.
        scale = min(42 / crop.width, 25 / crop.height)
        size = (max(16, round(crop.width * scale)), max(11, round(crop.height * scale)))
        crop = crop.resize(size, Image.Resampling.NEAREST)
        crop = ImageEnhance.Color(crop).enhance(0.86)
        crop = ImageEnhance.Contrast(crop).enhance(1.08)
        stones.append(crop)
    if len(stones) < 6:
        raise RuntimeError(f"Expected at least 6 stone sprites, found {len(stones)}")
    return stones[:8]


def interpolate_polyline(points: list[tuple[int, int]], spacing: float) -> list[tuple[float, float, float, float]]:
    sampled: list[tuple[float, float, float, float]] = []
    carry = 0.0
    for index in range(len(points) - 1):
        x1, y1 = points[index]
        x2, y2 = points[index + 1]
        dx, dy = x2 - x1, y2 - y1
        length = math.hypot(dx, dy)
        if length == 0:
            continue
        ux, uy = dx / length, dy / length
        distance = spacing - carry if carry else 0.0
        while distance <= length:
            sampled.append((x1 + ux * distance, y1 + uy * distance, ux, uy))
            distance += spacing
        carry = max(0.0, length - (distance - spacing))
        if carry >= spacing:
            carry %= spacing
    return sampled


def build_route(stones: list[Image.Image]) -> Image.Image:
    rng = random.Random(82419)
    route = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    shadow = Image.new("RGBA", route.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    samples = interpolate_polyline(ROUTE, 46)
    for index, (x, y, ux, uy) in enumerate(samples):
        normal_x, normal_y = -uy, ux
        offset = rng.choice((-5, -3, 0, 2, 4))
        x += normal_x * offset
        y += normal_y * offset
        sprite = stones[(index * 5 + index // 3) % len(stones)].copy()
        scale = rng.choice((0.82, 0.9, 0.96, 1.0, 1.06))
        sprite = sprite.resize(
            (max(16, round(sprite.width * scale)), max(12, round(sprite.height * scale))),
            Image.Resampling.NEAREST,
        )
        if index % 5 in (1, 4):
            sprite = sprite.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        left = round(x - sprite.width / 2)
        top = round(y - sprite.height * 0.72)
        shadow_draw.ellipse(
            (left + 3, top + round(sprite.height * 0.67), left + sprite.width - 2, top + sprite.height + 3),
            fill=(23, 57, 29, 82),
        )
        route.alpha_composite(sprite, (left, top))
    # Shadows remain under every stone and never create a continuous strip.
    shadow.alpha_composite(route)
    return shadow


def distance_to_route(x: float, y: float) -> float:
    closest = 10_000.0
    for (x1, y1), (x2, y2) in zip(ROUTE, ROUTE[1:]):
        dx, dy = x2 - x1, y2 - y1
        length2 = dx * dx + dy * dy
        if not length2:
            continue
        t = max(0.0, min(1.0, ((x - x1) * dx + (y - y1) * dy) / length2))
        px, py = x1 + t * dx, y1 + t * dy
        closest = min(closest, math.hypot(x - px, y - py))
    return closest


def build_details() -> Image.Image:
    rng = random.Random(47902)
    details = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(details)

    # Calm meadow clusters frame the route without becoming collision objects.
    palette = [(48, 105, 48, 112), (87, 137, 55, 126), (156, 177, 74, 112)]
    flowers = [(244, 224, 164, 220), (236, 167, 142, 210), (245, 202, 83, 220)]
    clusters = []
    while len(clusters) < 48:
        x = rng.randint(25, WIDTH - 25)
        y = rng.randint(20, HEIGHT - 20)
        if distance_to_route(x, y) < 70:
            continue
        if any(math.hypot(x - cx, y - cy) < 75 for cx, cy in clusters):
            continue
        clusters.append((x, y))

    for index, (cx, cy) in enumerate(clusters):
        for _ in range(rng.randint(6, 12)):
            x = cx + rng.randint(-23, 23)
            y = cy + rng.randint(-10, 10)
            color = rng.choice(palette)
            draw.rectangle((x, y, x + rng.choice((2, 3, 4)), y + rng.choice((1, 2, 3))), fill=color)
        if index % 4 == 0:
            flower = flowers[(index // 4) % len(flowers)]
            for _ in range(2):
                x = cx + rng.randint(-17, 17)
                y = cy + rng.randint(-8, 8)
                draw.rectangle((x - 1, y, x + 1, y + 2), fill=flower)
                draw.point((x, y + 1), fill=(117, 91, 42, 235))

    # A few leaf pairs beside the path provide rhythm without hiding the stones.
    for index, (x, y, ux, uy) in enumerate(interpolate_polyline(ROUTE, 110)):
        side = -1 if index % 2 else 1
        nx, ny = -uy * side, ux * side
        x += nx * rng.randint(48, 62)
        y += ny * rng.randint(48, 62)
        color = (64, 112, 48, 155)
        draw.polygon([(x - 4, y), (x, y - 3), (x + 5, y), (x, y + 2)], fill=color)
        draw.rectangle((x + 4, y, x + 7, y + 1), fill=(46, 83, 39, 145))
    return details


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(SOURCE)
    sheet = Image.open(SOURCE).convert("RGBA")
    stones = prepare_stones(sheet)
    build_route(stones).save(ROUTE_OUT, optimize=True)
    build_details().save(DETAILS_OUT, optimize=True)
    print(f"saved {ROUTE_OUT.name}, {DETAILS_OUT.name}; {len(stones)} stone variants")


if __name__ == "__main__":
    main()
