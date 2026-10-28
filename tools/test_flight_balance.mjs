import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const source = readFileSync(new URL('../assets/js/script.js', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../assets/css/style.css', import.meta.url), 'utf8');
const readConstant = (name) => {
    const match = source.match(new RegExp(`const ${name} = ([0-9.]+);`));
    assert.ok(match, `Constante ${name} não encontrada`);
    return Number(match[1]);
};

const duration = readConstant('FLIGHT_DURATION');
const baseSpeed = readConstant('FLIGHT_BASE_SPEED');
const speedGain = readConstant('FLIGHT_SPEED_GAIN');
assert.equal(duration, 60, 'A fase aérea deve durar 60 segundos');
assert.ok(source.includes("category: 'Voo speed run'"), 'A fase 3 precisa expor a categoria de voo');
assert.ok(source.includes('storyProgress.completedPhases[2] = true'), 'A vitória precisa persistir a fase 3');
assert.ok(source.includes("else if (worldMapState.nearestLevel === 2) startFlightStage()"), 'O selo 3 precisa abrir a fase aérea');
assert.ok(styles.includes('sapo-passaro-voo-sprites-v2.png'), 'O voo deve usar a folha estabilizada');
assert.ok(styles.includes('animation: mounted-bird-flight 720ms'), 'O ciclo base não pode sacudir a ave rápido demais');
assert.match(source, /runnerLayer\.classList\.remove\('is-flapping'\);\s+state\.flightFlapVisualTimer = 0;/, 'O impulso deve voltar ao ciclo de voo normal');

for (const { width, height } of [
    { width: 640, height: 360 },
    { width: 1024, height: 576 },
    { width: 1365, height: 745 },
    { width: 1600, height: 900 },
]) {
    const scale = Math.min(1, Math.max(0.48, height / 745));
    const riderSize = 158 * scale * 1.35;
    for (const gapRatio of [0.47, 0.41, 0.36]) {
        const gap = Math.min(height * 0.5, Math.max(riderSize * 1.5, height * gapRatio));
        assert.ok(gap >= riderSize * 1.49, `Abertura injusta em ${width}x${height}`);
        assert.ok(gap <= height * 0.501, `Abertura domina a tela em ${width}x${height}`);
    }
    const finalHardSpeed = (baseSpeed + speedGain) * 1.1 * Math.min(1.24, Math.max(0.82, width / 1100));
    const minimumSpacing = finalHardSpeed * 1.18;
    assert.ok(minimumSpacing >= riderSize * 2.2, `Pouco tempo de reação em ${width}x${height}`);
}

for (const asset of [
    new URL('../assets/img/sapo-passaro-voo-sprites-v2.png', import.meta.url),
    new URL('../assets/img/mapa-montanha-pedreira-v1.png', import.meta.url),
    new URL('../assets/img/pedras-musgo.png', import.meta.url),
]) {
    assert.ok(existsSync(asset), `Asset ausente: ${asset.pathname}`);
}

console.log('Flight balance checks passed for 4 landscape sizes and 3 difficulties.');
