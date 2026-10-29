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
const verticalSpeed = readConstant('FLIGHT_VERTICAL_SPEED');
assert.equal(duration, 60, 'A fase aérea deve durar 60 segundos');
assert.equal(verticalSpeed, 540, 'O controle vertical deve responder como corrida aérea');
assert.ok(source.includes("category: 'Voo speed run'"), 'A fase 3 precisa expor a categoria de voo');
assert.ok(source.includes('storyProgress.completedPhases[2] = true'), 'A vitória precisa persistir a fase 3');
assert.ok(source.includes("else if (worldMapState.nearestLevel === 2) startFlightStage()"), 'O selo 3 precisa abrir a fase aérea');
assert.ok(styles.includes('passaro-voo-sprites-v1.png'), 'O voo deve usar o pássaro solo, ampliado e estabilizado');
assert.ok(styles.includes('width: calc(var(--runner-size) * 1.55)'), 'O pássaro deve ter presença maior na fase aérea');
assert.ok(styles.includes('cenario-voo-vale-altitude-track-v3.png'), 'A fase aérea deve usar um panorama contínuo de alta altitude');
assert.ok(styles.includes('cenario-voo-mar-nuvens-track-v1.png'), 'O chão da fase aérea deve ser substituído por um mar de nuvens');
assert.match(styles, /\.game-board\.is-flight \.ground\s*{[\s\S]*?display: block;/, 'A faixa de nuvens deve permanecer visível durante o voo');
assert.match(styles, /\.game-board\.is-flight \.scenery-panel::before\s*{\s*content: none;/, 'Os painéis espelhados não podem criar costuras na fase aérea');
assert.match(styles, /\.game-board\.is-flight \.obstacle-layer::before\s*{\s*content: none;/, 'As faixas brancas de velocidade devem permanecer desligadas');
assert.ok(styles.includes('animation: mounted-bird-flight 720ms'), 'O ciclo base não pode sacudir a ave rápido demais');
assert.match(source, /runnerLayer\.classList\.remove\('is-flapping'\);\s+state\.flightFlapVisualTimer = 0;/, 'O impulso deve voltar ao ciclo de voo normal');
assert.ok(source.includes('function spawnFlightInsect()'), 'A fase deve reutilizar os insetos voadores');
assert.ok(source.includes("ability: 'burst'"), 'O inseto dourado precisa usar arrancadas');
assert.ok(source.includes("ability: 'wide-wave'"), 'O besouro ondulante precisa usar uma curva vertical ampla');
assert.ok(source.includes("ability: 'aimed-dive'"), 'A abelha precisa mirar antes do mergulho');
assert.ok(source.includes('function spawnFlightVulture()'), 'A fase deve incluir o urubu como obstáculo aéreo');
assert.ok(source.includes('state.flightVultureCooldown'), 'O urubu precisa ter intervalo próprio de surgimento');
assert.ok(!source.includes('function spawnFlightRock()'), 'A fase aérea não deve mais gerar pedras');
assert.ok(!source.includes('state.flightRockCooldown'), 'O agendador de pedras deve ser removido por completo');
assert.ok(!source.includes('is-ceiling'), 'A fase aérea não pode colocar pedras no céu');
assert.ok(source.includes('function spawnFriendlyFlightCloud()'), 'A fase deve ter nuvens claras decorativas');
assert.ok(source.includes('function spawnStormFlightCloud()'), 'A fase deve ter nuvens de tempestade');
assert.ok(source.includes("return collision?.kind || ''"), 'A colisão precisa identificar inseto, urubu ou tempestade');
assert.ok(!source.includes('spawnFlightGate'), 'As colunas no estilo Flappy Bird não podem permanecer');
assert.ok(!source.includes('flight-boundary'), 'Encostar na borda não pode matar o jogador');
assert.ok(styles.includes('.flight-hazard'), 'Os perigos aéreos precisam de apresentação própria');
assert.ok(!styles.includes('.flight-rock'), 'O estilo das pedras aéreas deve ser removido');
assert.ok(styles.includes('.flight-insect--golden'), 'O besouro dourado precisa aparecer na corrida aérea');
assert.ok(styles.includes('.flight-insect--wave'), 'O besouro ondulante precisa aparecer na corrida aérea');
assert.ok(styles.includes('.flight-insect--bee'), 'A abelha precisa aparecer na corrida aérea');
assert.ok(styles.includes('.flight-vulture'), 'O urubu precisa ter apresentação e animação próprias');
assert.ok(styles.includes('.flight-storm-cloud.is-striking'), 'O raio precisa ter um estado de ataque explícito');
assert.ok(!styles.includes('.flight-gate'), 'O visual das colunas antigas deve ser removido');
assert.ok(styles.includes('width: clamp(320px, 25%, 620px)'), 'A montanha do mapa deve ter presença maior');

for (const { width, height } of [
    { width: 640, height: 360 },
    { width: 1024, height: 576 },
    { width: 1365, height: 745 },
    { width: 1600, height: 900 },
]) {
    const scale = Math.min(1, Math.max(0.48, height / 745));
    const riderSize = 158 * scale * 1.55;
    const maximumRunnerX = width - riderSize;
    assert.ok(maximumRunnerX > width * 0.72, `O voo horizontal ainda está limitado em ${width}x${height}`);
    const largestHazard = Math.min(138, Math.max(92, riderSize * 0.62));
    assert.ok(height - largestHazard > riderSize * 1.45, `O urubu bloqueia altura demais em ${width}x${height}`);
    const finalHardSpeed = (baseSpeed + speedGain) * 1.1 * Math.min(1.24, Math.max(0.82, width / 1100));
    const minimumSpacing = finalHardSpeed * 0.92;
    assert.ok(minimumSpacing >= 58 * 2.2, `Pouco tempo de reação em ${width}x${height}`);
}

for (const asset of [
    new URL('../assets/img/passaro-voo-sprites-v1.png', import.meta.url),
    new URL('../assets/img/cenario-voo-vale-altitude-track-v3.png', import.meta.url),
    new URL('../assets/img/cenario-voo-mar-nuvens-track-v1.png', import.meta.url),
    new URL('../assets/img/urubu-voo-sprites-v1.png', import.meta.url),
    new URL('../assets/img/mapa-montanha-pedreira-v1.png', import.meta.url),
    new URL('../assets/img/nuvem-pixel-flutuante-v1.png', import.meta.url),
    new URL('../assets/img/nuvem-tempestade-raio-v1.png', import.meta.url),
    new URL('../assets/img/inseto-voando-sprites.png', import.meta.url),
    new URL('../assets/img/besouro-ondulante-voando-sprites.png', import.meta.url),
    new URL('../assets/img/abelha-investida-sprites.png', import.meta.url),
]) {
    assert.ok(existsSync(asset), `Asset ausente: ${asset.pathname}`);
}

console.log('Flight ecosystem checks passed for continuous altitude scenery, larger bird, species abilities, vultures, and storms in 4 landscape sizes.');
