function hexToHsl(hex) {
    const value = Number.parseInt(hex.slice(1), 16);
    const r = ((value >> 16) & 255) / 255;
    const g = ((value >> 8) & 255) / 255;
    const b = (value & 255) / 255;
    const maximum = Math.max(r, g, b);
    const minimum = Math.min(r, g, b);
    const lightness = (maximum + minimum) / 2;
    const delta = maximum - minimum;
    if (!delta) return [0, 0, lightness];
    const saturation = delta / (1 - Math.abs(2 * lightness - 1));
    let hue = maximum === r ? ((g - b) / delta) % 6 : maximum === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
    return [((hue * 60) + 360) % 360, saturation, lightness];
}

function rgbToHsl(r, g, b) {
    const maximum = Math.max(r, g, b);
    const minimum = Math.min(r, g, b);
    const lightness = (maximum + minimum) / 2;
    const delta = maximum - minimum;
    if (!delta) return [0, 0, lightness];
    const saturation = delta / (1 - Math.abs(2 * lightness - 1));
    let hue = maximum === r ? ((g - b) / delta) % 6 : maximum === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
    return [((hue * 60) + 360) % 360, saturation, lightness];
}

function hslToRgb(hue, saturation, lightness) {
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const segment = hue / 60;
    const x = chroma * (1 - Math.abs((segment % 2) - 1));
    const rgb = segment < 1 ? [chroma, x, 0] : segment < 2 ? [x, chroma, 0] : segment < 3 ? [0, chroma, x] : segment < 4 ? [0, x, chroma] : segment < 5 ? [x, 0, chroma] : [chroma, 0, x];
    const match = lightness - chroma / 2;
    return rgb.map((channel) => Math.round((channel + match) * 255));
}

self.addEventListener('message', async (event) => {
    const { id, source, targetColor, kind } = event.data;
    try {
        const response = await fetch(source);
        const bitmap = await createImageBitmap(await response.blob());
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(bitmap, 0, 0);
        bitmap.close();
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        const [targetHue, targetSaturation] = hexToHsl(targetColor);

        for (let index = 0; index < pixels.data.length; index += 4) {
            if (pixels.data[index + 3] < 18) continue;
            const red = pixels.data[index] / 255;
            const green = pixels.data[index + 1] / 255;
            const blue = pixels.data[index + 2] / 255;
            const [hue, saturation, lightness] = rgbToHsl(red, green, blue);
            const isFrogGreen = kind === 'frog' && green > red * 1.04 && green > blue * 1.03 && hue > 55 && hue < 175 && saturation > 0.18;
            const isTonguePink = kind === 'tongue' && saturation > 0.18 && (hue > 315 || hue < 48) && red > green * 1.06;
            if (!isFrogGreen && !isTonguePink) continue;
            const recolored = hslToRgb(targetHue, Math.max(saturation * 0.78, targetSaturation * 0.72), lightness);
            pixels.data[index] = recolored[0];
            pixels.data[index + 1] = recolored[1];
            pixels.data[index + 2] = recolored[2];
        }

        context.putImageData(pixels, 0, 0);
        const blob = await canvas.convertToBlob({ type: 'image/png' });
        self.postMessage({ id, blob });
    } catch (error) {
        self.postMessage({ id, error: error instanceof Error ? error.message : 'Falha ao colorir sprite' });
    }
});
