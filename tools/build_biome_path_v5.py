"""Bake the generated fine-gravel material onto the existing overworld route.

The route uses the same authored coordinates as v3/v4. Only the art changes;
markers, collision objects and navigation remain in world percentage space.
One transparent WebP is shipped so no extra work is needed while walking.
"""
from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw
from build_biome_art_v3 import ROUTE_PERCENT

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets' / 'img'
MATERIAL = ASSETS / 'material-trilha-cascalho-v5.png'
OUTPUT = ASSETS / 'mapa-caminho-cascalho-v5.webp'
WIDTH, HEIGHT = 3072, 1728


def route_samples():
    points = [(x * WIDTH / 100, y * HEIGHT / 100) for x, y in ROUTE_PERCENT]
    # Interpolate through the original anchors instead of approximating the route
    # with a new image: level markers still sit on the center of the trail.
    samples = []
    for i in range(len(points) - 1):
        p0, p1 = points[max(0, i - 1)], points[i]
        p2, p3 = points[i + 1], points[min(len(points) - 1, i + 2)]
        steps = max(2, math.ceil(math.dist(p1, p2) / 2))
        for j in range(steps):
            t = j / steps
            xy = []
            for k in (0, 1):
                a, b, c, d = p0[k], p1[k], p2[k], p3[k]
                xy.append(0.5 * ((2*b) + (-a+c)*t + (2*a-5*b+4*c-d)*t*t + (-a+3*b-3*c+d)*t*t*t))
            samples.append(tuple(xy))
    samples.append(points[-1])
    return samples


def main():
    rng = random.Random(149)
    points = route_samples()
    mask = Image.new('L', (WIDTH, HEIGHT))
    verge = Image.new('RGBA', (WIDTH, HEIGHT))
    road_draw, verge_draw = ImageDraw.Draw(mask), ImageDraw.Draw(verge)
    for i, (x, y) in enumerate(points):
        radius = 27 + math.sin(i * 0.012) * 2 + math.sin(i * 0.041) * 1.2
        verge_draw.ellipse((x-radius-5, y-radius-5, x+radius+5, y+radius+5), fill=(106, 134, 56, 210))
        road_draw.ellipse((x-radius, y-radius, x+radius, y+radius), fill=255)

    material = Image.open(MATERIAL).convert('RGBA').resize((512, 512), Image.Resampling.NEAREST)
    surface = Image.new('RGBA', (WIDTH, HEIGHT))
    for y in range(0, HEIGHT, 512):
        for x in range(0, WIDTH, 512):
            surface.paste(material, (x, y))
    surface.putalpha(mask)
    verge.alpha_composite(surface)

    # Sparse short pixel grass at the edges connects the trail to the meadow.
    # Keep the middle open, with no large rocks or raised wall-like borders.
    draw = ImageDraw.Draw(verge)
    greens = [(89, 121, 48, 225), (117, 147, 61, 235), (143, 161, 78, 220)]
    for i in range(2, len(points)-2, 5):
        x, y = points[i]
        dx, dy = points[i+1][0]-points[i-1][0], points[i+1][1]-points[i-1][1]
        length = math.hypot(dx, dy) or 1
        radius = 27 + math.sin(i * 0.012) * 2 + math.sin(i * 0.041) * 1.2
        for side in (-1, 1):
            if rng.random() > 0.62:
                continue
            offset = radius + rng.randint(2, 6)
            gx, gy = round(x-dy/length*offset*side), round(y+dx/length*offset*side)
            color = rng.choice(greens)
            draw.rectangle((gx, gy-2, gx+2, gy+2), fill=color)
            draw.rectangle((gx+2, gy-4, gx+3, gy), fill=color)

    verge.save(OUTPUT, format='WEBP', lossless=True, method=6)
    print(f'{OUTPUT.name}: {WIDTH}x{HEIGHT}, {OUTPUT.stat().st_size:,} bytes')


if __name__ == '__main__':
    main()
