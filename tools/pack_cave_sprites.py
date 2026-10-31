"""Pack the generated cave atlas into equal slots, preserving original alpha.

Source: imagegen exec-826a8643-3262-47f9-bdc1-0035e374de6c.png.
This only crops, scales and packs the supplied frames; it does not redraw art.
"""
from pathlib import Path
import sys
from PIL import Image

source = Image.open(sys.argv[1]).convert('RGBA')
out = Path(__file__).resolve().parents[1] / 'assets/img/caverna-bichos-sprites-v1.png'
sheet = Image.new('RGBA', (512, 384))
for row in range(3):
    frames = []
    for col in range(4):
        frame = source.crop((round(col * source.width / 4), round(row * source.height / 3),
                             round((col + 1) * source.width / 4), round((row + 1) * source.height / 3)))
        bbox = frame.getchannel('A').point(lambda alpha: 255 if alpha >= 100 else 0).getbbox()
        if not bbox:
            raise ValueError(f'Empty frame {row},{col}')
        frames.append(frame.crop(bbox))
    scale = min(112 / max(frame.width for frame in frames), 112 / max(frame.height for frame in frames))
    for col, frame in enumerate(frames):
        frame = frame.resize((round(frame.width * scale), round(frame.height * scale)), Image.Resampling.NEAREST)
        sheet.alpha_composite(frame, (col * 128 + (128 - frame.width) // 2, row * 128 + 120 - frame.height))
sheet.save(out, optimize=True)
print(out)
