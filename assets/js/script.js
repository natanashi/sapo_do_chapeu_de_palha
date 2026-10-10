const board = document.querySelector('#game-board');
const runnerLayer = document.querySelector('.runner-layer');
const runner = document.querySelector('#runner');
const runnerAttack = document.querySelector('#runner-attack');
const obstacleLayer = document.querySelector('#obstacle-layer');
const platformLayer = document.querySelector('#platform-layer');
const collectibleLayer = document.querySelector('#collectible-layer');
const groundTrack = document.querySelector('#ground-track');
const overlay = document.querySelector('#game-overlay');
const playButton = document.querySelector('#play-button');
const playLabel = document.querySelector('#play-label');
const pauseButton = document.querySelector('#pause-button');
const jumpButton = document.querySelector('#jump-button');
const tongueButton = document.querySelector('#tongue-button');
const scoreDisplay = document.querySelector('#score');
const bestScoreDisplay = document.querySelector('#best-score');
const phaseNumberDisplay = document.querySelector('#phase-number');
const paceMultiplierDisplay = document.querySelector('#pace-multiplier');
const regionNameDisplay = document.querySelector('#region-name');
const overlayKicker = document.querySelector('#overlay-kicker');
const overlayTitle = document.querySelector('#overlay-title');
const overlayMessage = document.querySelector('#overlay-message');
const gameStatus = document.querySelector('#game-status');
const phaseBanner = document.querySelector('#phase-banner');
const phaseKicker = document.querySelector('#phase-kicker');
const phaseName = document.querySelector('#phase-name');
const journeyProgress = document.querySelector('#journey-progress');
const routeTimeDisplay = document.querySelector('#route-time');
const routeMapStops = [...document.querySelectorAll('[data-route-stop]')];
const sceneLayers = [document.querySelector('#scenery-a'), document.querySelector('#scenery-b')];

const jumpAudio = new Audio('assets/aud/pulo.mp3');
const loseAudio = new Audio('assets/aud/risada_duende.mp3');
const backgroundMusic = document.querySelector('#background-music');
backgroundMusic.volume = 0.28;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const PHASES = [
    {
        name: 'Vila do Sol',
        startsAt: 0,
        background: 'assets/img/cenario-vila-panorama-v3.png',
        speedScale: 1,
        paceLabel: 'Ritmo padrão',
        obstacleGap: [1.85, 2.45],
        insectGap: [3.1, 4.3],
        obstacles: ['rock', 'wheel', 'rock', 'ground-beetle'],
    },
    {
        name: 'Campos do Orvalho',
        startsAt: 45,
        background: 'assets/img/cenario-campos-panorama-v3.png',
        speedScale: 1.06,
        paceLabel: 'Ritmo acelerando',
        obstacleGap: [1.82, 2.42],
        insectGap: [2.95, 4.05],
        obstacles: ['rock', 'wheel', 'ground-beetle', 'rock', 'wheel'],
    },
    {
        name: 'Floresta Antiga',
        startsAt: 90,
        background: 'assets/img/cenario-floresta-panorama-v3.png',
        speedScale: 1.12,
        paceLabel: 'Corrida veloz',
        obstacleGap: [1.75, 2.35],
        insectGap: [2.78, 3.85],
        obstacles: ['rock', 'wheel', 'ground-beetle', 'wheel'],
    },
    {
        name: 'Castelo da Manhã',
        startsAt: 135,
        background: 'assets/img/cenario-castelo-panorama-v3.png',
        speedScale: 1.18,
        paceLabel: 'Reta final em alta velocidade',
        obstacleGap: [1.68, 2.28],
        insectGap: [2.65, 3.7],
        obstacles: ['wheel', 'ground-beetle', 'rock', 'wheel-heavy', 'ground-beetle'],
    },
];

const OBSTACLES = {
    rock: {
        src: 'assets/img/pedras-musgo.png',
        className: 'obstacle--rock',
        points: 12,
        speedScale: 1,
        insetX: 0.17,
        insetTop: 0.2,
    },
    wheel: {
        src: 'assets/img/roda-madeira.png',
        className: 'obstacle--wheel',
        points: 18,
        speedScale: 1.07,
        insetX: 0.17,
        insetTop: 0.13,
        rotates: true,
    },
    'wheel-heavy': {
        src: 'assets/img/roda-madeira.png',
        className: 'obstacle--wheel-heavy',
        points: 24,
        speedScale: 1.12,
        insetX: 0.16,
        insetTop: 0.12,
        rotates: true,
    },
    'ground-beetle': {
        src: 'assets/img/besouro-terrestre-correndo-sprites.png',
        className: 'obstacle--ground-beetle',
        points: 24,
        speedScale: 1.22,
        insetX: 0.16,
        insetTop: 0.18,
        spriteSheet: true,
    },
};

const ASSET_URLS = [
    ...PHASES.map((phase) => phase.background),
    ...Object.values(OBSTACLES).map((obstacle) => obstacle.src),
    'assets/img/textura-solo.jpg',
    'assets/img/sapo-corrida-bipede-v3.png',
    'assets/img/sapo-ciclo-natural-v2.png',
    'assets/img/sapo-boca-aberta-sprites.png',
    'assets/img/sapo-lingua-limpa-v3.png',
    'assets/img/inseto-voando-sprites.png',
    'assets/img/besouro-ondulante-voando-sprites.png',
    'assets/img/plataforma-musgo.png',
];

const state = {
    mode: 'loading',
    score: 0,
    elapsedTime: 0,
    best: readBestScore(),
    runnerY: 0,
    velocityY: 0,
    phaseIndex: 0,
    activeScene: 0,
    sceneTravel: 0,
    groundTravel: 0,
    obstacleCooldown: 1.75,
    insectCooldown: 2.35,
    platformCooldown: 1.15,
    obstacles: [],
    insects: [],
    platforms: [],
    standingPlatform: null,
    dodgeCombo: 0,
    catchCombo: 0,
    attackStartedAt: 0,
    attackUntil: 0,
    attackReadyAt: 0,
    runnerMotion: 'run',
    wasAirborne: false,
    landingUntil: 0,
    swallowUntil: 0,
    previousTime: 0,
    animationFrame: 0,
    boardWidth: 0,
    boardHeight: 0,
};

const BASE_RUN_SPEED = 255;
const RUN_SPEED_GAIN = 135;
const GRAVITY = 1850;
const JUMP_FORCE = 820;
const ATTACK_DURATION = 700;
const ATTACK_COOLDOWN = 860;
const ATTACK_CAPTURE_CLOSE = 360;
const ATTACK_RETRACT_AT = 430;
const ATTACK_SWALLOW_AT = 620;
const JOURNEY_DURATION = 185;
const RUNNER_MOTION_CLASSES = ['motion-takeoff', 'motion-rise', 'motion-apex', 'motion-fall', 'motion-land'];

function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}

function readBestScore() {
    try {
        return Number.parseInt(localStorage.getItem('sapo-best-score') || '0', 10);
    } catch {
        return 0;
    }
}

function saveBestScore(score) {
    try {
        localStorage.setItem('sapo-best-score', String(score));
    } catch {
        // O jogo continua normalmente quando o navegador bloqueia o armazenamento local.
    }
}

function formatScore(value) {
    return Math.max(0, Math.floor(value)).toString().padStart(3, '0');
}

function formatTime(value) {
    const totalSeconds = Math.max(0, Math.floor(value));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function updateScore() {
    scoreDisplay.textContent = formatScore(state.score);
    bestScoreDisplay.textContent = formatScore(state.best);
    phaseNumberDisplay.textContent = `${state.phaseIndex + 1}/${PHASES.length}`;
    paceMultiplierDisplay.textContent = `${currentPaceMultiplier().toFixed(2)}x`;
    regionNameDisplay.textContent = PHASES[state.phaseIndex].name;

    const progress = (state.elapsedTime / JOURNEY_DURATION) * 100;
    journeyProgress.style.width = `${clamp(progress, 0, 100)}%`;
    routeTimeDisplay.textContent = `${formatTime(state.elapsedTime)} / ${formatTime(JOURNEY_DURATION)}`;
    routeMapStops.forEach((stop, index) => {
        stop.classList.toggle('is-passed', index < state.phaseIndex);
        stop.classList.toggle('is-active', index === state.phaseIndex);
        if (index === state.phaseIndex) stop.setAttribute('aria-current', 'step');
        else stop.removeAttribute('aria-current');
    });
}

function setStatus(message) {
    gameStatus.textContent = '';
    window.requestAnimationFrame(() => {
        gameStatus.textContent = message;
    });
}

function playSound(audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

function playBackgroundMusic(restart = false) {
    if (restart) backgroundMusic.currentTime = 0;
    backgroundMusic.play().catch(() => {});
}

function pauseBackgroundMusic(reset = false) {
    backgroundMusic.pause();
    if (reset) backgroundMusic.currentTime = 0;
}

function boardMetrics() {
    return board.getBoundingClientRect();
}

function worldSpeedScale() {
    return clamp((state.boardWidth || boardMetrics().width) / 1100, 0.82, 1.24);
}

function currentWorldSpeed() {
    const journeyProgress = clamp(state.elapsedTime / JOURNEY_DURATION, 0, 1);
    const timeBoost = RUN_SPEED_GAIN * journeyProgress;
    return (BASE_RUN_SPEED + timeBoost) * PHASES[state.phaseIndex].speedScale * worldSpeedScale();
}

function currentPaceMultiplier() {
    const journeyProgress = clamp(state.elapsedTime / JOURNEY_DURATION, 0, 1);
    return ((BASE_RUN_SPEED + RUN_SPEED_GAIN * journeyProgress) * PHASES[state.phaseIndex].speedScale) / BASE_RUN_SPEED;
}

function showPhaseBanner(index) {
    phaseKicker.textContent = `Fase ${index + 1}`;
    phaseName.textContent = PHASES[index].name;
    phaseBanner.classList.remove('is-visible');
    window.requestAnimationFrame(() => phaseBanner.classList.add('is-visible'));
}

function setScene(background, instant = false) {
    const backgroundUrl = new URL(background, document.baseURI).href;

    if (instant) {
        sceneLayers[0].style.setProperty('--scene-image', `url("${backgroundUrl}")`);
        sceneLayers[0].classList.add('is-active');
        sceneLayers[1].classList.remove('is-active');
        state.activeScene = 0;
        return;
    }

    const nextScene = state.activeScene === 0 ? 1 : 0;
    sceneLayers[nextScene].style.setProperty('--scene-image', `url("${backgroundUrl}")`);
    sceneLayers[nextScene].classList.add('is-active');
    sceneLayers[state.activeScene].classList.remove('is-active');
    state.activeScene = nextScene;
}

function applyPhase(index, announce = true) {
    state.phaseIndex = index;
    board.dataset.phase = String(index + 1);
    setScene(PHASES[index].background, !announce);

    if (announce) {
        showPhaseBanner(index);
        setStatus(`${PHASES[index].name} · ${PHASES[index].paceLabel}`);
    }

    updateScore();
}

function resolvePhase() {
    let nextPhase = 0;
    PHASES.forEach((phase, index) => {
        if (state.elapsedTime >= phase.startsAt) nextPhase = index;
    });
    if (nextPhase !== state.phaseIndex) applyPhase(nextPhase);
}

function clearActors() {
    state.obstacles.forEach((obstacle) => obstacle.element.remove());
    state.insects.forEach((insect) => insect.element.remove());
    state.platforms.forEach((platform) => platform.element.remove());
    state.obstacles = [];
    state.insects = [];
    state.platforms = [];
    state.standingPlatform = null;
    obstacleLayer.replaceChildren();
    collectibleLayer.replaceChildren();
    platformLayer.replaceChildren();
}

function chooseObstacleType() {
    const pool = PHASES[state.phaseIndex].obstacles;
    return pool[Math.floor(Math.random() * pool.length)];
}

function spawnObstacle() {
    const type = chooseObstacleType();
    const config = OBSTACLES[type];
    const element = document.createElement(config.spriteSheet ? 'div' : 'img');
    if (element instanceof HTMLImageElement) {
        element.src = config.src;
        element.alt = '';
        element.draggable = false;
    }
    element.className = `obstacle ${config.className}`;
    obstacleLayer.append(element);

    const obstacle = {
        type,
        config,
        element,
        x: state.boardWidth + Math.max(42, state.boardWidth * 0.045),
        rotation: 0,
        scored: false,
    };
    state.obstacles.push(obstacle);
    renderObstacle(obstacle, performance.now());
}

function groundInsectLaneIsSafe() {
    const minimumClearX = state.boardWidth * 0.08;
    return !state.obstacles.some((obstacle) => obstacle.x > minimumClearX);
}

function incomingObstacleBlocksInsects() {
    const reactionLine = state.boardWidth * 0.42;
    return state.obstacles.some((obstacle) => obstacle.x > reactionLine);
}

function spawnInsectWave() {
    const boardBox = boardMetrics();
    const runnerBox = runner.getBoundingClientRect();
    const sample = document.createElement('div');
    const waveSpeciesChance = state.phaseIndex === 0 ? 0.2 : 0.38;
    const isWaveSpecies = Math.random() < waveSpeciesChance;
    const usesZigZag = isWaveSpecies && Math.random() < 0.46;
    sample.className = `insect${isWaveSpecies ? ' insect--wave' : ''}`;
    collectibleLayer.append(sample);
    const insectBox = sample.getBoundingClientRect();
    sample.remove();

    const count = isWaveSpecies ? 1 : (Math.random() < 0.62 ? 2 : 3);
    const useGroundLane = !isWaveSpecies && Math.random() < 0.12 && groundInsectLaneIsSafe();
    const mouthY = runnerBox.top - boardBox.top + runnerBox.height * 0.46;
    const flightCeiling = boardBox.height * 0.36;
    const flightFloor = boardBox.height * 0.86 - insectBox.height * 0.88;
    const waveCenterY = (flightCeiling + flightFloor) * 0.5;
    const waveAmplitude = Math.max(54, (flightFloor - flightCeiling) * 0.5);
    const baseY = useGroundLane
        ? clamp(mouthY - insectBox.height * 0.48, boardBox.height * 0.62, boardBox.height * 0.72)
        : isWaveSpecies
            ? waveCenterY
            : boardBox.height * (0.49 + Math.random() * 0.09);
    const spacing = Math.max(58, insectBox.width * 0.82);
    const waveSpeed = isWaveSpecies ? 0.98 + Math.random() * 0.08 : 0.86 + Math.random() * 0.12;
    const yOffsets = count === 1 ? [0] : count === 2 ? [-7, 7] : [0, -14, 10];

    for (let index = 0; index < count; index += 1) {
        const element = document.createElement('div');
        element.className = `insect insect--${useGroundLane ? 'low' : 'high'}${isWaveSpecies ? ' insect--wave' : ''}${usesZigZag ? ' insect--zigzag' : ''}`;
        collectibleLayer.append(element);

        const insect = {
            element,
            x: boardBox.width + Math.max(48, boardBox.width * 0.05) + spacing * index,
            y: baseY + yOffsets[index],
            speedScale: waveSpeed,
            bobPhase: index * 0.72 + Math.random() * 0.35,
            species: isWaveSpecies ? 'wave' : 'golden',
            flightPattern: usesZigZag ? 'zigzag' : isWaveSpecies ? 'deep-wave' : 'hover',
            bobAmplitude: isWaveSpecies ? waveAmplitude : 8,
            bobSpeed: isWaveSpecies ? (usesZigZag ? 150 : 215) : 150,
            minimumY: isWaveSpecies ? flightCeiling : null,
            maximumY: isWaveSpecies ? flightFloor : null,
            horizontalDrift: usesZigZag ? Math.min(18, boardBox.width * 0.012) : 0,
            caught: false,
        };
        state.insects.push(insect);
        renderInsect(insect, performance.now());
    }

    state.obstacleCooldown = Math.max(state.obstacleCooldown, useGroundLane ? 3 : isWaveSpecies ? 1.85 : 1.55);
}

function spawnPlatform() {
    const element = document.createElement('img');
    element.src = 'assets/img/plataforma-musgo.png';
    element.alt = '';
    element.className = 'platform';
    element.draggable = false;
    platformLayer.append(element);

    const platform = {
        element,
        x: state.boardWidth + Math.max(58, state.boardWidth * 0.06),
        scored: false,
    };
    state.platforms.push(platform);
    renderPlatform(platform);
    state.obstacleCooldown = Math.max(state.obstacleCooldown, 2.2);
}

function obstacleSpeed(obstacle) {
    return currentWorldSpeed() * obstacle.config.speedScale;
}

function renderObstacle(obstacle, currentTime) {
    let extraTransform = '';
    if (obstacle.config.rotates) {
        extraTransform = ` rotate(${obstacle.rotation.toFixed(1)}deg)`;
    }
    obstacle.element.style.transform = `translate3d(${obstacle.x.toFixed(2)}px, 0, 0)${extraTransform}`;
}

function renderInsect(insect, currentTime) {
    const flightPhase = currentTime / insect.bobSpeed + insect.bobPhase;
    const flightShape = insect.flightPattern === 'zigzag'
        ? (2 / Math.PI) * Math.asin(Math.sin(flightPhase))
        : Math.sin(flightPhase);
    const bob = flightShape * insect.bobAmplitude;
    const horizontalDrift = insect.flightPattern === 'zigzag'
        ? Math.sin(flightPhase * 2 + 0.65) * insect.horizontalDrift
        : 0;
    const renderedY = insect.minimumY === null
        ? insect.y + bob
        : clamp(insect.y + bob, insect.minimumY, insect.maximumY);
    const x = `${(insect.x + horizontalDrift).toFixed(2)}px`;
    const y = `${renderedY.toFixed(2)}px`;
    insect.element.style.setProperty('--insect-x', x);
    insect.element.style.setProperty('--insect-y', y);
    insect.element.style.transform = `translate3d(${x}, ${y}, 0)`;
}

function renderPlatform(platform) {
    platform.element.style.transform = `translate3d(${platform.x.toFixed(2)}px, 0, 0)`;
}

function clearAttack() {
    state.attackUntil = 0;
    runner.classList.remove('is-attacking');
    runnerLayer.classList.remove('is-attacking');
    runnerAttack.classList.remove('is-visible');
}

function mouthPosition() {
    const boardBox = boardMetrics();
    const tongueBox = runnerAttack.getBoundingClientRect();
    return {
        x: tongueBox.left - boardBox.left,
        y: tongueBox.top - boardBox.top + tongueBox.height * 0.5,
    };
}

function tonguePosition() {
    const boardBox = boardMetrics();
    const tongueBox = runnerAttack.getBoundingClientRect();
    return {
        left: tongueBox.left - boardBox.left,
        top: tongueBox.top - boardBox.top,
        width: tongueBox.width,
        height: tongueBox.height,
    };
}

function createCaptureFlash(x, y) {
    const flash = document.createElement('span');
    flash.className = 'capture-flash';
    flash.style.setProperty('--capture-x', `${x.toFixed(2)}px`);
    flash.style.setProperty('--capture-y', `${y.toFixed(2)}px`);
    flash.append(document.createElement('i'), document.createElement('i'), document.createElement('i'));
    collectibleLayer.append(flash);
    window.setTimeout(() => flash.remove(), 520);
}

function setRunnerMotion(motion) {
    if (state.runnerMotion === motion) return;
    state.runnerMotion = motion;
    runnerLayer.classList.remove(...RUNNER_MOTION_CLASSES);
    if (motion !== 'run') runnerLayer.classList.add(`motion-${motion}`);
}

function resetRun() {
    window.cancelAnimationFrame(state.animationFrame);
    clearActors();
    clearAttack();
    state.score = 0;
    state.elapsedTime = 0;
    state.runnerY = 0;
    state.velocityY = 0;
    state.dodgeCombo = 0;
    state.catchCombo = 0;
    state.sceneTravel = 0;
    state.groundTravel = 0;
    state.obstacleCooldown = 1.75;
    state.insectCooldown = 2.35;
    state.platformCooldown = 1.15;
    state.standingPlatform = null;
    state.attackReadyAt = 0;
    state.attackStartedAt = 0;
    state.wasAirborne = false;
    state.landingUntil = 0;
    state.swallowUntil = 0;
    state.runnerMotion = 'run';
    runnerLayer.classList.remove('is-hit', 'is-airborne', 'is-swallowing', ...RUNNER_MOTION_CLASSES);
    runnerLayer.style.setProperty('--jump-y', '0');
    applyPhase(0, false);
    updateWorldMotion();
}

function setPlayingControls(enabled) {
    jumpButton.disabled = !enabled;
    tongueButton.disabled = !enabled;
    pauseButton.disabled = !enabled;
}

function startGame() {
    resetRun();
    state.mode = 'playing';
    playBackgroundMusic(true);
    state.previousTime = performance.now();
    overlay.classList.remove('is-visible');
    setPlayingControls(true);
    pauseButton.textContent = 'Pausar';
    pauseButton.setAttribute('aria-label', 'Pausar jogo');
    updateScore();
    setStatus('Valendo!');
    board.focus({ preventScroll: true });
    state.animationFrame = window.requestAnimationFrame(gameLoop);
}

function resumeGame() {
    if (state.mode !== 'paused') return;
    state.mode = 'playing';
    playBackgroundMusic();
    state.previousTime = performance.now();
    overlay.classList.remove('is-visible');
    setPlayingControls(true);
    pauseButton.textContent = 'Pausar';
    pauseButton.setAttribute('aria-label', 'Pausar jogo');
    board.focus({ preventScroll: true });
    state.animationFrame = window.requestAnimationFrame(gameLoop);
}

function pauseGame() {
    if (state.mode !== 'playing') return;
    state.mode = 'paused';
    pauseBackgroundMusic();
    window.cancelAnimationFrame(state.animationFrame);
    clearAttack();
    jumpButton.disabled = true;
    tongueButton.disabled = true;
    pauseButton.disabled = false;
    pauseButton.textContent = 'Continuar';
    pauseButton.setAttribute('aria-label', 'Continuar jogo');
    overlayKicker.textContent = PHASES[state.phaseIndex].name;
    overlayTitle.textContent = 'Corrida pausada';
    overlayMessage.textContent = 'Continue quando estiver pronto. Sua corrida está guardada exatamente neste ponto.';
    playLabel.textContent = 'Continuar';
    overlay.classList.add('is-visible');
    playButton.focus({ preventScroll: true });
}

function jump() {
    if (state.mode !== 'playing') return;
    if (state.runnerY > 3 && !state.standingPlatform) return;
    state.standingPlatform = null;
    state.velocityY = JUMP_FORCE;
    setRunnerMotion('takeoff');
    playSound(jumpAudio);
}

function attack() {
    if (state.mode !== 'playing') return;
    const now = performance.now();
    if (now < state.attackReadyAt) return;

    state.attackStartedAt = now;
    state.attackUntil = now + ATTACK_DURATION;
    state.attackReadyAt = now + ATTACK_COOLDOWN;
    runner.classList.add('is-attacking');
    runnerLayer.classList.add('is-attacking');
    runnerAttack.classList.remove('is-visible');
    void runnerAttack.offsetWidth;
    runnerAttack.classList.add('is-visible');
}

function collisionDetected(obstacle) {
    const runnerBox = runner.getBoundingClientRect();
    const obstacleBox = obstacle.element.getBoundingClientRect();
    const runnerInsetX = runnerBox.width * 0.28;
    const runnerInsetTop = runnerBox.height * 0.18;
    const obstacleInsetX = obstacleBox.width * obstacle.config.insetX;
    const obstacleInsetTop = obstacleBox.height * obstacle.config.insetTop;

    return (
        runnerBox.right - runnerInsetX > obstacleBox.left + obstacleInsetX
        && runnerBox.left + runnerInsetX < obstacleBox.right - obstacleInsetX
        && runnerBox.bottom - runnerBox.height * 0.08 > obstacleBox.top + obstacleInsetTop
        && runnerBox.top + runnerInsetTop < obstacleBox.bottom
    );
}

function tongueHitsInsect(insect, currentTime) {
    if (
        currentTime > state.attackUntil
        || currentTime - state.attackStartedAt > ATTACK_CAPTURE_CLOSE
    ) return false;

    const tongueBox = runnerAttack.getBoundingClientRect();
    const insectBox = insect.element.getBoundingClientRect();
    const tongueLeft = tongueBox.left + tongueBox.width * 0.22;
    const tongueRight = tongueBox.right - tongueBox.width * 0.025;
    const tongueTop = tongueBox.top + tongueBox.height * 0.38;
    const tongueBottom = tongueBox.top + tongueBox.height * 0.69;

    return (
        insectBox.right > tongueLeft
        && insectBox.left < tongueRight
        && insectBox.bottom > tongueTop
        && insectBox.top < tongueBottom
    );
}

function insectHitsRunner(insect) {
    if (insect.caught) return false;

    const runnerBox = runner.getBoundingClientRect();
    const insectBox = insect.element.getBoundingClientRect();
    const runnerInsetX = runnerBox.width * 0.3;
    const runnerInsetY = runnerBox.height * 0.2;
    const insectInsetX = insectBox.width * 0.22;
    const insectInsetY = insectBox.height * 0.2;

    return (
        runnerBox.right - runnerInsetX > insectBox.left + insectInsetX
        && runnerBox.left + runnerInsetX < insectBox.right - insectInsetX
        && runnerBox.bottom - runnerInsetY > insectBox.top + insectInsetY
        && runnerBox.top + runnerInsetY < insectBox.bottom - insectInsetY
    );
}

function catchInsect(insect, currentTime) {
    insect.caught = true;
    insect.attackStartedAt = state.attackStartedAt;
    insect.swallowTriggered = false;
    const tongueBox = runnerAttack.getBoundingClientRect();
    const insectBox = insect.element.getBoundingClientRect();
    insect.catchWidth = insectBox.width;
    insect.catchHeight = insectBox.height;
    insect.attachRatio = clamp(
        (insectBox.left + insectBox.width * 0.5 - tongueBox.left) / Math.max(1, tongueBox.width),
        0.34,
        0.94,
    );
    insect.attachYOffset = clamp(
        insectBox.top + insectBox.height * 0.5 - (tongueBox.top + tongueBox.height * 0.53),
        -7,
        7,
    );
    const boardBox = boardMetrics();
    createCaptureFlash(
        insectBox.left - boardBox.left + insectBox.width * 0.5,
        insectBox.top - boardBox.top + insectBox.height * 0.5,
    );
    state.catchCombo += 1;
    const bonus = Math.min(12, Math.max(0, state.catchCombo - 1) * 3);
    const points = 16 + bonus;
    state.score += points;
    insect.element.classList.add('is-caught');
    setStatus(state.catchCombo > 1 ? `Caçada x${state.catchCombo} · +${points}` : `Besouro capturado · +${points}`);
}

function updateCaughtInsect(insect, currentTime) {
    const attackElapsed = currentTime - insect.attackStartedAt;
    const retractProgress = clamp(
        (attackElapsed - ATTACK_RETRACT_AT) / (ATTACK_DURATION - ATTACK_RETRACT_AT),
        0,
        1,
    );
    const tongue = tonguePosition();
    const x = tongue.left + tongue.width * insect.attachRatio - insect.catchWidth * 0.5;
    const y = tongue.top + tongue.height * 0.53 + insect.attachYOffset - insect.catchHeight * 0.5;
    const scale = 0.78 - retractProgress * 0.18;
    const rotation = Math.sin(currentTime / 45 + insect.attachRatio * 8) * (5 + retractProgress * 8);

    insect.element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)}) rotate(${rotation.toFixed(1)}deg)`;
    insect.element.style.opacity = String(attackElapsed >= ATTACK_SWALLOW_AT ? clamp((ATTACK_DURATION - attackElapsed) / 60, 0, 1) : 1);

    if (attackElapsed >= ATTACK_SWALLOW_AT && !insect.swallowTriggered) {
        insect.swallowTriggered = true;
        state.swallowUntil = Math.max(state.swallowUntil, currentTime + 360);
        const mouth = mouthPosition();
        createCaptureFlash(mouth.x, mouth.y);
        if (!runnerLayer.classList.contains('is-swallowing')) {
            runnerLayer.classList.add('is-swallowing');
        }
    }

    return attackElapsed >= ATTACK_DURATION + 40;
}

function endGame(hazard = 'obstacle') {
    state.mode = 'ended';
    pauseBackgroundMusic(true);
    setPlayingControls(false);
    clearAttack();
    runnerLayer.classList.add('is-hit');
    playSound(loseAudio);

    const finalScore = Math.floor(state.score);
    if (finalScore > state.best) {
        state.best = finalScore;
        saveBestScore(state.best);
        overlayKicker.textContent = 'Novo recorde!';
    } else {
        overlayKicker.textContent = `Fim na ${PHASES[state.phaseIndex].name}`;
    }

    updateScore();
    overlayTitle.textContent = `${formatScore(finalScore)} pontos`;
    overlayMessage.textContent = hazard === 'beetle'
        ? 'Um besouro acertou o sapo. Pule para ajustar a altura e use a língua antes que o bando chegue perto.'
        : state.phaseIndex === PHASES.length - 1
            ? 'Você chegou ao castelo. Agora tente correr ainda mais longe e capture mais besouros.'
            : 'O caminho ficou difícil desta vez. Tente outra corrida e descubra a próxima região.';
    playLabel.textContent = 'Jogar novamente';
    overlay.classList.add('is-visible');
    playButton.focus({ preventScroll: true });
}

function completeJourney() {
    state.mode = 'completed';
    pauseBackgroundMusic(true);
    state.elapsedTime = JOURNEY_DURATION;
    setPlayingControls(false);
    clearAttack();

    const finalScore = Math.floor(state.score);
    if (finalScore > state.best) {
        state.best = finalScore;
        saveBestScore(state.best);
    }

    updateScore();
    overlayKicker.textContent = 'Jornada concluída';
    overlayTitle.textContent = '4 mapas completos';
    overlayMessage.textContent = `Você atravessou toda a rota da manhã em ${formatTime(JOURNEY_DURATION)}. Tente novamente para capturar mais besouros e superar seus ${formatScore(finalScore)} pontos.`;
    playLabel.textContent = 'Correr novamente';
    overlay.classList.add('is-visible');
    playButton.focus({ preventScroll: true });
}

function updateWorldMotion() {
    const width = Math.max(1, state.boardWidth || boardMetrics().width);
    const cycle = width * 2;
    const sceneX = -(state.sceneTravel % cycle);
    const groundX = -(state.groundTravel % cycle);
    sceneLayers.forEach((layer) => layer.style.setProperty('--scene-x', `${sceneX.toFixed(2)}px`));
    groundTrack.style.setProperty('--ground-x', `${groundX.toFixed(2)}px`);
}

function updateObstacles(delta, currentTime) {
    const runnerBox = runner.getBoundingClientRect();

    state.obstacles.forEach((obstacle) => {
        const speed = obstacleSpeed(obstacle);
        obstacle.x -= speed * delta;
        if (obstacle.config.rotates) obstacle.rotation -= speed * delta * 0.52;
        renderObstacle(obstacle, currentTime);

        const obstacleBox = obstacle.element.getBoundingClientRect();
        if (!obstacle.scored && obstacleBox.right < runnerBox.left) {
            obstacle.scored = true;
            state.dodgeCombo += 1;
            const comboBonus = Math.min(10, Math.floor(state.dodgeCombo / 3) * 2);
            state.score += obstacle.config.points + comboBonus;
            if (state.dodgeCombo > 0 && state.dodgeCombo % 3 === 0) {
                setStatus(`Sequência x${state.dodgeCombo} · +${obstacle.config.points + comboBonus}`);
            }
        }
    });

    state.obstacles = state.obstacles.filter((obstacle) => {
        if (obstacle.x < -360) {
            obstacle.element.remove();
            return false;
        }
        return true;
    });
}

function runnerOverPlatform(platform, runnerBox = runner.getBoundingClientRect()) {
    const platformBox = platform.element.getBoundingClientRect();
    return (
        runnerBox.right - runnerBox.width * 0.22 > platformBox.left + platformBox.width * 0.06
        && runnerBox.left + runnerBox.width * 0.22 < platformBox.right - platformBox.width * 0.06
    );
}

function updatePlatforms(delta) {
    const runnerBox = runner.getBoundingClientRect();
    const speed = currentWorldSpeed() * 0.96;

    state.platforms.forEach((platform) => {
        platform.x -= speed * delta;
        renderPlatform(platform);

        const platformBox = platform.element.getBoundingClientRect();
        if (!platform.scored && platformBox.right < runnerBox.left) {
            platform.scored = true;
            state.score += 10;
            setStatus('Plataforma superada · +10');
        }
    });

    state.platforms = state.platforms.filter((platform) => {
        if (platform.x < -340) {
            if (state.standingPlatform === platform) state.standingPlatform = null;
            platform.element.remove();
            return false;
        }
        return true;
    });
}

function updateRunnerPhysics(delta, currentTime) {
    const previousY = state.runnerY;
    const runnerBox = runner.getBoundingClientRect();
    const groundedBottom = runnerBox.bottom + previousY;

    if (state.standingPlatform && state.platforms.includes(state.standingPlatform)) {
        if (runnerOverPlatform(state.standingPlatform, runnerBox)) {
            const platformTop = state.standingPlatform.element.getBoundingClientRect().top;
            state.runnerY = Math.max(0, groundedBottom - platformTop);
            state.velocityY = 0;
        } else {
            state.standingPlatform = null;
        }
    }

    if (!state.standingPlatform) {
        state.velocityY -= GRAVITY * delta;
        state.runnerY = Math.max(0, state.runnerY + state.velocityY * delta);

        if (state.velocityY <= 0) {
            const landingPlatform = state.platforms
                .filter((platform) => runnerOverPlatform(platform, runnerBox))
                .map((platform) => ({
                    platform,
                    elevation: groundedBottom - platform.element.getBoundingClientRect().top,
                }))
                .filter(({ elevation }) => elevation > 12 && previousY >= elevation - 5 && state.runnerY <= elevation + 5)
                .sort((a, b) => b.elevation - a.elevation)[0];

            if (landingPlatform) {
                state.runnerY = landingPlatform.elevation;
                state.velocityY = 0;
                state.standingPlatform = landingPlatform.platform;
                setStatus('Aterrissagem perfeita');
            }
        }

        if (state.runnerY === 0 && state.velocityY < 0) state.velocityY = 0;
    }

    const isAirborne = !state.standingPlatform && state.runnerY > 3;
    runnerLayer.classList.toggle('is-airborne', isAirborne);

    if (isAirborne) {
        state.wasAirborne = true;
        if (state.velocityY > JUMP_FORCE * 0.72) setRunnerMotion('takeoff');
        else if (state.velocityY > 170) setRunnerMotion('rise');
        else if (state.velocityY > -150) setRunnerMotion('apex');
        else setRunnerMotion('fall');
    } else if (state.wasAirborne) {
        state.wasAirborne = false;
        state.landingUntil = currentTime + 145;
        setRunnerMotion('land');
    } else if (currentTime < state.landingUntil) {
        setRunnerMotion('land');
    } else {
        setRunnerMotion('run');
    }

    runnerLayer.style.setProperty('--jump-y', state.runnerY.toFixed(2));
}

function updateInsects(delta, currentTime) {
    state.insects.forEach((insect) => {
        if (insect.caught) {
            if (updateCaughtInsect(insect, currentTime)) insect.element.remove();
            return;
        }
        insect.x -= currentWorldSpeed() * insect.speedScale * delta;
        renderInsect(insect, currentTime);
        if (tongueHitsInsect(insect, currentTime)) catchInsect(insect, currentTime);
    });

    state.insects = state.insects.filter((insect) => {
        if (insect.caught) return currentTime - insect.attackStartedAt < ATTACK_DURATION + 40;
        if (insect.x < -150) {
            insect.element.remove();
            state.catchCombo = 0;
            return false;
        }
        return true;
    });
}

function scheduleActors(delta) {
    state.obstacleCooldown -= delta;
    state.insectCooldown -= delta;
    state.platformCooldown -= delta;

    if (state.obstacleCooldown <= 0) {
        spawnObstacle();
        const [minimumGap, maximumGap] = PHASES[state.phaseIndex].obstacleGap;
        const difficultyReduction = Math.min(0.1, state.elapsedTime / 1500);
        state.obstacleCooldown = minimumGap + Math.random() * (maximumGap - minimumGap) - difficultyReduction;
    }

    if (state.insectCooldown <= 0) {
        if (incomingObstacleBlocksInsects()) {
            state.insectCooldown = 0.42;
        } else {
            spawnInsectWave();
            const [minimumGap, maximumGap] = PHASES[state.phaseIndex].insectGap;
            state.insectCooldown = minimumGap + Math.random() * (maximumGap - minimumGap);
        }
    }

    if (state.platformCooldown <= 0 && state.platforms.length === 0) {
        spawnPlatform();
        state.platformCooldown = 5.6 + Math.random() * 2.8;
    }
}

function gameLoop(currentTime) {
    if (state.mode !== 'playing') return;

    const delta = Math.min((currentTime - state.previousTime) / 1000, 0.032);
    state.previousTime = currentTime;

    const worldSpeed = currentWorldSpeed();
    const runCycle = clamp(680 / currentPaceMultiplier(), 410, 680);
    runnerLayer.style.setProperty('--run-cycle', `${runCycle.toFixed(0)}ms`);
    if (currentTime >= state.swallowUntil) runnerLayer.classList.remove('is-swallowing');
    if (!reducedMotionQuery.matches) state.sceneTravel += worldSpeed * 0.075 * delta;
    state.groundTravel += worldSpeed * delta;
    updateWorldMotion();

    scheduleActors(delta);
    updatePlatforms(delta);
    updateRunnerPhysics(delta, currentTime);
    updateObstacles(delta, currentTime);
    updateInsects(delta, currentTime);
    state.score += delta * 3.1;
    state.elapsedTime += delta;
    resolvePhase();
    updateScore();

    if (state.elapsedTime >= JOURNEY_DURATION) {
        completeJourney();
        return;
    }

    if (state.obstacles.some(collisionDetected)) {
        state.dodgeCombo = 0;
        endGame();
        return;
    }

    if (state.insects.some(insectHitsRunner)) {
        state.catchCombo = 0;
        endGame('beetle');
        return;
    }

    state.animationFrame = window.requestAnimationFrame(gameLoop);
}

function handleJumpInput(event) {
    if (event.type === 'keydown') {
        if (!['Space', 'ArrowUp'].includes(event.code) || event.repeat) return;
        if (event.target.closest('button')) return;
        event.preventDefault();
    }
    jump();
}

function handleAttackInput(event) {
    if (event.type === 'keydown') {
        if (event.code !== 'KeyX' || event.repeat) return;
        event.preventDefault();
    }
    attack();
}

function handleKeyboard(event) {
    if (['KeyP', 'Escape'].includes(event.code) && !event.repeat) {
        if (state.mode === 'playing') {
            event.preventDefault();
            pauseGame();
        } else if (state.mode === 'paused') {
            event.preventDefault();
            resumeGame();
        }
        return;
    }

    if (event.code === 'KeyX') {
        handleAttackInput(event);
        return;
    }

    handleJumpInput(event);
}

function preloadImage(source) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', reject, { once: true });
        image.src = source;
    });
}

async function initializeGame() {
    applyPhase(0, false);
    updateScore();
    const uniqueAssets = [...new Set(ASSET_URLS)];
    const results = await Promise.allSettled(uniqueAssets.map(preloadImage));
    const failedAssets = results.filter((result) => result.status === 'rejected').length;

    state.mode = 'idle';
    playButton.disabled = false;
    playLabel.textContent = 'Jogar agora';
    if (failedAssets > 0) {
        overlayMessage.textContent = 'O jogo está pronto. Alguns elementos podem levar mais um instante para aparecer dependendo da conexão.';
    }
}

function syncBoardSize(width, height) {
    if (state.boardWidth > 0 && state.mode === 'playing') {
        const widthRatio = width / state.boardWidth;
        const heightRatio = height / state.boardHeight;
        state.obstacles.forEach((obstacle) => { obstacle.x *= widthRatio; });
        state.platforms.forEach((platform) => { platform.x *= widthRatio; });
        state.runnerY *= heightRatio;
        runnerLayer.style.setProperty('--jump-y', state.runnerY.toFixed(2));
        state.insects.forEach((insect) => {
            insect.x *= widthRatio;
            insect.y *= heightRatio;
            insect.bobAmplitude *= heightRatio;
            insect.horizontalDrift *= widthRatio;
            if (insect.minimumY !== null) insect.minimumY *= heightRatio;
            if (insect.maximumY !== null) insect.maximumY *= heightRatio;
        });
    }
    state.boardWidth = width;
    state.boardHeight = height;
    updateWorldMotion();
}

playButton.addEventListener('click', () => {
    if (state.mode === 'paused') resumeGame();
    else if (state.mode !== 'loading') startGame();
});

pauseButton.addEventListener('click', () => {
    if (state.mode === 'paused') resumeGame();
    else pauseGame();
});

jumpButton.addEventListener('pointerdown', handleJumpInput);
tongueButton.addEventListener('pointerdown', handleAttackInput);
runnerAttack.addEventListener('animationend', clearAttack);

board.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    handleJumpInput(event);
});

document.addEventListener('keydown', handleKeyboard);
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.mode === 'playing') pauseGame();
});

if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(([entry]) => {
        syncBoardSize(entry.contentRect.width, entry.contentRect.height);
    });
    resizeObserver.observe(board);
} else {
    const metrics = boardMetrics();
    syncBoardSize(metrics.width, metrics.height);
    window.addEventListener('resize', () => {
        const nextMetrics = boardMetrics();
        syncBoardSize(nextMetrics.width, nextMetrics.height);
    });
}

initializeGame();
