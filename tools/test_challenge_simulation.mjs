import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../assets/js/script.js', import.meta.url), 'utf8');
const configSource = source.slice(source.indexOf('const DIFFICULTIES ='), source.indexOf("let selectedDifficulty ="));
const difficulties = vm.runInNewContext(`${configSource}; DIFFICULTIES`);
const flightSource = source.slice(source.indexOf('function currentFlightSpeed()'), source.indexOf('function gameLoop('));
const constant = (name) => Number(source.match(new RegExp(`const ${name} = ([0-9.]+);`))[1]);
const classes = { add() {}, remove() {}, toggle() {} };
const element = () => ({ style: { setProperty() {} }, classList: classes, setAttribute() {}, remove() {} });

function runtime(difficulty, width, height, seed = 7) {
    let randomState = seed;
    const random = Object.create(Math);
    random.random = () => ((randomState = (randomState * 1664525 + 1013904223) >>> 0) / 2 ** 32);
    const state = {
        boardWidth: width, boardHeight: height,
        runnerWidth: 158 * Math.min(1, Math.max(0.48, height / 745)) * 1.08,
        runnerX: width * 0.12, runnerY: height * 0.42, velocityY: 0,
        difficulty, elapsedTime: 0, score: 0, sceneTravel: 0, groundTravel: 0,
        flightClimbing: false, isCrouching: false, moveLeft: false, moveRight: false,
        flightHazards: [], flightDecorations: [], flightInsectSequence: 0,
        flightInsectCooldown: 1.4, flightCloudCooldown: 0.5, flightStormCooldown: 5.2,
        flightVultureCooldown: 7.4, flightHawkCooldown: 5.8, flightGroundSpireCooldown: 2.7,
        flightTornadoCooldown: 7, flightWindStrength: 0, flightNextSpawnAt: 0,
    };
    const spawns = new Map();
    const context = {
        state, DIFFICULTIES: difficulties, Math: random,
        FLIGHT_DURATION: constant('FLIGHT_DURATION'), FLIGHT_BASE_SPEED: constant('FLIGHT_BASE_SPEED'),
        FLIGHT_SPEED_GAIN: constant('FLIGHT_SPEED_GAIN'), FLIGHT_VERTICAL_SPEED: constant('FLIGHT_VERTICAL_SPEED'),
        HORIZONTAL_SPEED_MIN: constant('HORIZONTAL_SPEED_MIN'), HORIZONTAL_SPEED_MAX: constant('HORIZONTAL_SPEED_MAX'),
        clamp: (n, low, high) => Math.min(high, Math.max(low, n)),
        worldSpeedScale: () => Math.min(1.24, Math.max(0.82, width / 1100)),
        runnerHorizontalBounds: () => ({ minimum: 0, maximum: width - state.runnerWidth }),
        runnerBounds: () => ({ left: state.runnerX, right: state.runnerX + state.runnerWidth,
            top: height - state.runnerY - state.runnerWidth, bottom: height - state.runnerY,
            width: state.runnerWidth, height: state.runnerWidth }),
        threatSpawnX: (margin) => Math.max(width + margin, width + Math.min(560, Math.max(330, width * 0.42))),
        document: { createElement: element }, board: element(), runnerLayer: element(),
        obstacleLayer: { append(node) { spawns.set(node.className, (spawns.get(node.className) || 0) + 1); } },
        renderRunnerPosition() {}, updateWorldMotion() {}, setStatus() {}, shouldReduceMotion: () => false,
    };
    vm.createContext(context);
    vm.runInContext(flightSource, context);
    return { context, state, spawns };
}

const summaries = [];
for (const difficulty of ['easy', 'medium', 'hard', 'impossible']) {
    for (const [width, height] of [[640, 360], [1024, 576], [1365, 745]]) {
        const { context: r, state, spawns } = runtime(difficulty, width, height);
        // Run the shipped scheduler and actor movement for a complete stage. Collision is
        // observed separately so the simulation can measure pressure past the first hit.
        let peak = 0;
        let windWithEnemies = false;
        for (let frame = 0; frame < constant('FLIGHT_DURATION') * 60; frame += 1) {
            state.elapsedTime = frame / 60;
            r.updateFlightStage(1 / 60);
            const lethal = state.flightHazards.filter((h) => h.kind !== 'tornado' && h.x + h.width > state.runnerX - 24);
            peak = Math.max(peak, lethal.length);
            assert.ok(lethal.length <= r.flightMaximumConcurrentHazards(state.elapsedTime / 70));
            const tornado = state.flightHazards.find((h) => h.kind === 'tornado');
            if (tornado && lethal.some((h) => h.kind === 'insect')) windWithEnemies = true;
            for (const h of state.flightHazards.filter((h) => h.kind === 'ground-spire')) {
                assert.ok(Math.abs(h.y + h.height - height) < 0.001, 'Torres devem permanecer ligadas à borda inferior');
                assert.ok(height - h.height > state.runnerWidth * 1.3, 'Uma torre não pode fechar toda a passagem');
            }
            assert.ok(Number.isFinite(state.runnerX) && Number.isFinite(state.runnerY));
            assert.ok(state.runnerY >= 0 && state.runnerY <= height - state.runnerWidth);
        }
        assert.ok(peak >= ({ easy: 2, medium: 3, hard: 4, impossible: 8 })[difficulty], 'A pressão precisa aumentar conforme a dificuldade');
        assert.ok(windWithEnemies, 'Redemoinhos precisam chegar acompanhados de insetos');
        assert.ok([...spawns.keys()].some((key) => key.includes('flight-tornado')));
        summaries.push({ difficulty, viewport: `${width}x${height}`, peak, spawned: [...spawns.values()].reduce((a, b) => a + b, 0) });
    }
}

const { context: r, state } = runtime('medium', 1024, 576);
const box = r.runnerBounds();
state.flightHazards.push({ kind: 'tornado', x: box.left + box.width / 2 - 100, y: box.top + box.height / 2 - 140, width: 200, height: 280 });
assert.equal(r.flightHazardHitsRunner(state.flightHazards[0]), false, 'O vento deve desestabilizar, nunca matar por contato');
const wind = r.sampleFlightWind();
assert.ok(wind.strength > 0.9 && Math.abs(wind.x) > 0, 'Entrar no centro precisa produzir força real');
assert.ok(Math.abs(wind.y) < constant('FLIGHT_VERTICAL_SPEED') * (1 - wind.strength * 0.34), 'O jogador deve conseguir compensar o vento');
state.flightHazards = [];
assert.equal(r.sampleFlightWind().strength, 0, 'Sair do redemoinho precisa restaurar os controles');
console.table(summaries);
console.log('70-second flight simulations passed: concurrent encounters, wind escorts, grounded towers, countersteering, and no lingering wind.');
