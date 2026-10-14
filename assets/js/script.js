const board = document.querySelector('#game-board');
const indieIntro = document.querySelector('#indie-intro');
const indieIntroContinue = document.querySelector('#indie-intro-continue');
const gameShell = document.querySelector('.game-shell');
const runnerLayer = document.querySelector('.runner-layer');
const runner = document.querySelector('#runner');
const runnerAttack = document.querySelector('#runner-attack');
const obstacleLayer = document.querySelector('#obstacle-layer');
const platformLayer = document.querySelector('#platform-layer');
const collectibleLayer = document.querySelector('#collectible-layer');
const groundTrack = document.querySelector('#ground-track');
const overlay = document.querySelector('#game-overlay');
const mainMenuShell = document.querySelector('#main-menu-shell');
const resultCard = document.querySelector('#result-card');
const menuBackButton = document.querySelector('#menu-back');
const menuScreens = [...document.querySelectorAll('[data-menu-screen]')];
const storyMapButton = document.querySelector('#story-map-button');
const storyMapStatus = document.querySelector('#story-map-status');
const worldMap = document.querySelector('#world-map');
const worldMapWorld = document.querySelector('#world-map-world');
const worldMapFrog = document.querySelector('#world-map-frog');
const worldMapPrompt = document.querySelector('#world-map-prompt');
const worldMapPromptKicker = document.querySelector('#world-map-prompt-kicker');
const worldMapStageName = document.querySelector('#world-map-stage-name');
const worldMapHelp = document.querySelector('#world-map-help');
const worldMuseum = document.querySelector('#world-museum');
const difficultyPicker = document.querySelector('.difficulty-picker');
const worldLevelButtons = [...document.querySelectorAll('[data-world-level]')];
const worldMapDirectionButtons = [...document.querySelectorAll('[data-map-direction]')];
const difficultyInputs = [...document.querySelectorAll('input[name="stage-difficulty"]')];
const frogColorInput = document.querySelector('#frog-color');
const tongueColorInput = document.querySelector('#tongue-color');
const skinPreviewFrog = document.querySelector('#skin-preview-frog');
const skinPreviewTongue = document.querySelector('#skin-preview-tongue');
const skinResetButton = document.querySelector('#skin-reset');
const skinSavedStatus = document.querySelector('#skin-saved');
const profileNameForm = document.querySelector('#profile-name-form');
const playerNameInput = document.querySelector('#player-name');
const playerNameError = document.querySelector('#player-name-error');
const profileSavedStatus = document.querySelector('#profile-saved');
const menuFrog = document.querySelector('.menu-frog');
const musicEnabledInput = document.querySelector('#setting-music-enabled');
const musicVolumeInput = document.querySelector('#setting-music-volume');
const musicVolumeValue = document.querySelector('#music-volume-value');
const effectsEnabledInput = document.querySelector('#setting-effects-enabled');
const effectsVolumeInput = document.querySelector('#setting-effects-volume');
const effectsVolumeValue = document.querySelector('#effects-volume-value');
const reducedMotionInput = document.querySelector('#setting-reduced-motion');
const compactControlsInput = document.querySelector('#setting-compact-controls');
const controlLayoutInputs = [...document.querySelectorAll('input[name="control-layout"]')];
const controlStyleInputs = [...document.querySelectorAll('input[name="control-style"]')];
const controlPaletteInputs = [...document.querySelectorAll('input[name="control-palette"]')];
const fullscreenButton = document.querySelector('#settings-fullscreen');
const fullscreenLabel = document.querySelector('#fullscreen-label');
const settingsSavedStatus = document.querySelector('#settings-saved');
const playButton = document.querySelector('#play-button');
const playLabel = document.querySelector('#play-label');
const pauseButton = document.querySelector('#pause-button');
const moveLeftButton = document.querySelector('#move-left-button');
const moveRightButton = document.querySelector('#move-right-button');
const crouchButton = document.querySelector('#crouch-button');
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
const orientationGuard = document.querySelector('#orientation-guard');

const jumpAudio = new Audio('assets/aud/pulo.mp3');
const loseAudio = new Audio('assets/aud/risada_duende.mp3');
const backgroundMusic = document.querySelector('#background-music');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const CONTROL_LAYOUTS = ['classic', 'left-handed', 'arcade'];
const CONTROL_STYLES = ['round', 'pixel', 'leaf'];
const CONTROL_PALETTES = ['forest', 'ocean', 'sunset'];
const gameSettings = readGameSettings();
let settingsSavedTimer = 0;

const DIFFICULTIES = {
    easy: {
        label: 'Fácil',
        speedScale: 0.92,
        spawnGapScale: 1.16,
        minimumObstacleGap: 1.34,
        minimumInsectGap: 1.9,
    },
    medium: {
        label: 'Médio',
        speedScale: 1,
        spawnGapScale: 1,
        minimumObstacleGap: 1.18,
        minimumInsectGap: 1.72,
    },
    hard: {
        label: 'Difícil',
        speedScale: 1.1,
        spawnGapScale: 0.87,
        minimumObstacleGap: 1.05,
        minimumInsectGap: 1.48,
    },
};
let selectedDifficulty = 'medium';

const PHASES = [
    {
        name: 'Vila do Sol',
        startsAt: 0,
        background: 'assets/img/cenario-arvores-planaltos-transparente-v3.png',
        speedScale: 1,
        paceLabel: 'Ritmo padrão',
        obstacleGap: [1.65, 2.2],
        insectGap: [2.65, 3.75],
        obstacles: ['rock', 'wheel', 'rock', 'ground-beetle', 'ground-beetle', 'leaping-beetle'],
    },
    {
        name: 'Campos do Orvalho',
        startsAt: 38,
        background: 'assets/img/cenario-arvores-planaltos-transparente-v3.png',
        speedScale: 1.08,
        paceLabel: 'Ritmo acelerando',
        obstacleGap: [1.55, 2.1],
        insectGap: [2.45, 3.45],
        obstacles: ['rock', 'wheel', 'ground-beetle', 'rock', 'wheel', 'ground-beetle', 'leaping-beetle', 'leaping-beetle'],
    },
    {
        name: 'Floresta Antiga',
        startsAt: 75,
        background: 'assets/img/cenario-arvores-planaltos-transparente-v3.png',
        speedScale: 1.16,
        paceLabel: 'Corrida veloz',
        obstacleGap: [1.45, 1.98],
        insectGap: [2.22, 3.18],
        obstacles: ['rock', 'wheel', 'ground-beetle', 'wheel', 'ground-beetle', 'leaping-beetle', 'leaping-beetle'],
    },
    {
        name: 'Castelo da Manhã',
        startsAt: 113,
        background: 'assets/img/cenario-arvores-planaltos-transparente-v3.png',
        speedScale: 1.24,
        paceLabel: 'Reta final em alta velocidade',
        obstacleGap: [1.36, 1.88],
        insectGap: [2.02, 2.9],
        obstacles: ['wheel', 'ground-beetle', 'rock', 'wheel-heavy', 'ground-beetle', 'ground-beetle', 'leaping-beetle', 'leaping-beetle'],
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
    'leaping-beetle': {
        src: 'assets/img/besouro-saltador-sprites.png',
        className: 'obstacle--leaping-beetle',
        points: 32,
        speedScale: 1.46,
        leapSpeedScale: 1.24,
        insetX: 0.14,
        insetTop: 0.38,
        spriteSheet: true,
        leaps: true,
    },
};

const ASSET_URLS = [
    'assets/img/passaro-horizonte-sprites-v1.png',
    PHASES[0].background,
    ...Object.values(OBSTACLES).map((obstacle) => obstacle.src),
    'assets/img/textura-solo.jpg',
    'assets/img/sapo-corrida-bipede-v3.png',
    'assets/img/sapo-corrida-agachado-sprites-v1.png',
    'assets/img/sapo-agachado-boca-aberta-sprites-v1.png',
    'assets/img/sapo-ciclo-natural-v2.png',
    'assets/img/sapo-boca-aberta-sprites.png',
    'assets/img/sapo-lingua-limpa-v3.png',
    'assets/img/sapo-capa.png',
    'assets/img/mapa-mundo-grama-v2.png',
    'assets/img/mapa-arvore-simples-v2.png',
    'assets/img/mapa-rocha-simples-v2.png',
    'assets/img/mapa-museu-brejo-v1.png',
    'assets/img/inseto-voando-sprites.png',
    'assets/img/besouro-ondulante-voando-sprites.png',
    'assets/img/abelha-investida-sprites.png',
    'assets/img/plataforma-musgo.png',
];

const state = {
    mode: 'loading',
    score: 0,
    elapsedTime: 0,
    best: readBestScore(),
    runnerX: 0,
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
    moveLeft: false,
    moveRight: false,
    isCrouching: false,
    difficulty: 'medium',
};

const PACE_REFERENCE_SPEED = 270;
const BASE_RUN_SPEED = PACE_REFERENCE_SPEED * 1.1;
const RUN_SPEED_GAIN = 170;
const GRAVITY = 1850;
const JUMP_FORCE = 820;
const ATTACK_DURATION = 700;
const ATTACK_COOLDOWN = 3000;
const ATTACK_CAPTURE_CLOSE = 360;
const ATTACK_RETRACT_AT = 430;
const ATTACK_SWALLOW_AT = 620;
const JOURNEY_DURATION = 150;
const HORIZONTAL_SPEED_MIN = 210;
const HORIZONTAL_SPEED_MAX = 430;
const RUNNER_MOTION_CLASSES = ['motion-takeoff', 'motion-rise', 'motion-apex', 'motion-fall', 'motion-land'];
const REFERENCE_GAME_HEIGHT = 745;

const WORLD_SIZES = {
    '--runner-size': 158,
    '--rock-size': 124,
    '--wheel-size': 132,
    '--wheel-heavy-size': 148,
    '--ground-beetle-width': 146,
    '--ground-beetle-height': 82,
    '--ground-beetle-offset': 18,
    '--leaping-beetle-size': 104,
    '--leaping-beetle-offset': 14,
    '--platform-size': 248,
    '--insect-size': 88,
    '--wave-insect-size': 96,
    '--bee-size': 100,
};

function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}

let orientationGuardActive = false;

function syncOrientationGuard() {
    const isTouchDevice = navigator.maxTouchPoints > 0 || window.innerWidth <= 1024;
    const needsLandscape = isTouchDevice && window.innerHeight > window.innerWidth;
    if (needsLandscape === orientationGuardActive) return;

    orientationGuardActive = needsLandscape;
    document.documentElement.classList.toggle('needs-landscape', needsLandscape);
    orientationGuard.setAttribute('aria-hidden', String(!needsLandscape));
    gameShell.inert = needsLandscape;
    gameShell.setAttribute('aria-hidden', String(needsLandscape));

    if (needsLandscape) {
        if (state.mode === 'playing') pauseGame();
        orientationGuard.focus({ preventScroll: true });
        return;
    }

    if (state.mode === 'paused') playButton.focus({ preventScroll: true });
}

function applyWorldScale(width, height) {
    const scale = clamp(height / REFERENCE_GAME_HEIGHT, 0.48, 1);
    Object.entries(WORLD_SIZES).forEach(([property, desktopSize]) => {
        board.style.setProperty(property, `${(desktopSize * scale).toFixed(2)}px`);
    });
    board.style.setProperty('--tongue-size', `${clamp(width * 0.3075, 220, 420).toFixed(2)}px`);
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

function readGameSettings() {
    const defaults = {
        musicEnabled: true,
        musicVolume: 0.28,
        effectsEnabled: true,
        effectsVolume: 0.65,
        reducedMotion: false,
        compactControls: false,
        controlLayout: 'classic',
        controlStyle: 'round',
        controlPalette: 'forest',
    };
    try {
        const stored = JSON.parse(localStorage.getItem('sapo-game-settings') || '{}');
        return {
            musicEnabled: typeof stored.musicEnabled === 'boolean' ? stored.musicEnabled : defaults.musicEnabled,
            musicVolume: Number.isFinite(stored.musicVolume) ? clamp(stored.musicVolume, 0, 1) : defaults.musicVolume,
            effectsEnabled: typeof stored.effectsEnabled === 'boolean' ? stored.effectsEnabled : defaults.effectsEnabled,
            effectsVolume: Number.isFinite(stored.effectsVolume) ? clamp(stored.effectsVolume, 0, 1) : defaults.effectsVolume,
            reducedMotion: typeof stored.reducedMotion === 'boolean' ? stored.reducedMotion : defaults.reducedMotion,
            compactControls: typeof stored.compactControls === 'boolean' ? stored.compactControls : defaults.compactControls,
            controlLayout: CONTROL_LAYOUTS.includes(stored.controlLayout) ? stored.controlLayout : defaults.controlLayout,
            controlStyle: CONTROL_STYLES.includes(stored.controlStyle) ? stored.controlStyle : defaults.controlStyle,
            controlPalette: CONTROL_PALETTES.includes(stored.controlPalette) ? stored.controlPalette : defaults.controlPalette,
        };
    } catch {
        return defaults;
    }
}

function shouldReduceMotion() {
    return gameSettings.reducedMotion || reducedMotionQuery.matches;
}

function announceSettingsSaved() {
    settingsSavedStatus.textContent = 'Configurações salvas neste aparelho';
    settingsSavedStatus.classList.add('is-visible');
    window.clearTimeout(settingsSavedTimer);
    settingsSavedTimer = window.setTimeout(() => settingsSavedStatus.classList.remove('is-visible'), 1300);
}

function applyGameSettings({ save = false, announce = false } = {}) {
    backgroundMusic.volume = gameSettings.musicVolume;
    jumpAudio.volume = gameSettings.effectsVolume;
    loseAudio.volume = gameSettings.effectsVolume;
    document.body.classList.toggle('reduce-game-motion', gameSettings.reducedMotion);
    document.body.classList.toggle('compact-game-controls', gameSettings.compactControls);
    document.body.classList.remove(...CONTROL_LAYOUTS.map((value) => `controls-layout-${value}`));
    document.body.classList.remove(...CONTROL_STYLES.map((value) => `controls-style-${value}`));
    document.body.classList.remove(...CONTROL_PALETTES.map((value) => `controls-palette-${value}`));
    document.body.classList.add(`controls-layout-${gameSettings.controlLayout}`);
    document.body.classList.add(`controls-style-${gameSettings.controlStyle}`);
    document.body.classList.add(`controls-palette-${gameSettings.controlPalette}`);

    musicEnabledInput.checked = gameSettings.musicEnabled;
    musicVolumeInput.value = String(Math.round(gameSettings.musicVolume * 100));
    musicVolumeInput.disabled = !gameSettings.musicEnabled;
    musicVolumeValue.value = `${musicVolumeInput.value}%`;
    effectsEnabledInput.checked = gameSettings.effectsEnabled;
    effectsVolumeInput.value = String(Math.round(gameSettings.effectsVolume * 100));
    effectsVolumeInput.disabled = !gameSettings.effectsEnabled;
    effectsVolumeValue.value = `${effectsVolumeInput.value}%`;
    reducedMotionInput.checked = gameSettings.reducedMotion;
    compactControlsInput.checked = gameSettings.compactControls;
    controlLayoutInputs.forEach((input) => { input.checked = input.value === gameSettings.controlLayout; });
    controlStyleInputs.forEach((input) => { input.checked = input.value === gameSettings.controlStyle; });
    controlPaletteInputs.forEach((input) => { input.checked = input.value === gameSettings.controlPalette; });

    if (!gameSettings.musicEnabled) backgroundMusic.pause();
    else if (state?.mode === 'playing' && backgroundMusic.paused) backgroundMusic.play().catch(() => {});

    if (save) {
        try {
            localStorage.setItem('sapo-game-settings', JSON.stringify(gameSettings));
        } catch {}
    }
    if (announce) announceSettingsSaved();
}

function updateFullscreenLabel() {
    fullscreenLabel.textContent = document.fullscreenElement ? 'Sair da tela cheia' : 'Usar tela cheia';
    fullscreenButton.disabled = !document.fullscreenEnabled;
}

function closeIndieIntro() {
    indieIntro.classList.remove('is-visible');
    indieIntro.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('has-indie-intro');
    gameShell.removeAttribute('inert');
    orientationGuard.removeAttribute('inert');
    const mainMenuButton = document.querySelector('[data-menu-screen="main"] button:not(:disabled)');
    window.requestAnimationFrame(() => mainMenuButton?.focus({ preventScroll: true }));
}

function playSound(audio) {
    if (!gameSettings.effectsEnabled) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

function playBackgroundMusic(restart = false) {
    if (!gameSettings.musicEnabled) return;
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

function initialRunnerX(width = state.boardWidth || boardMetrics().width) {
    return clamp(width * 0.08, 24, 126);
}

function runnerHorizontalBounds() {
    const width = Math.max(1, state.boardWidth || boardMetrics().width);
    const runnerWidth = Math.max(1, runnerLayer.offsetWidth);
    return {
        minimum: clamp(width * 0.025, 10, 42),
        maximum: Math.max(width * 0.34, width * 0.62 - runnerWidth),
    };
}

function renderRunnerPosition() {
    runnerLayer.style.setProperty('--runner-x', `${state.runnerX.toFixed(2)}px`);
    runnerLayer.style.setProperty('--jump-y', state.runnerY.toFixed(2));
}

function clearHorizontalInput() {
    state.moveLeft = false;
    state.moveRight = false;
    moveLeftButton.classList.remove('is-held');
    moveRightButton.classList.remove('is-held');
    crouchButton.classList.remove('is-held');
    state.isCrouching = false;
    runnerLayer.classList.remove('is-retreating', 'is-advancing', 'is-crouching');
}

function setCrouching(pressed) {
    if (pressed && state.mode !== 'playing') return;
    state.isCrouching = pressed;
    const isGrounded = state.runnerY <= 3 || Boolean(state.standingPlatform);
    crouchButton.classList.toggle('is-held', pressed);
    runnerLayer.classList.toggle('is-crouching', pressed && isGrounded);
}

function isRunnerCrouched() {
    return state.isCrouching && (state.runnerY <= 3 || Boolean(state.standingPlatform));
}

function updateRunnerHorizontalMovement(delta) {
    const direction = Number(state.moveRight) - Number(state.moveLeft);
    if (direction !== 0) {
        const speed = clamp(state.boardWidth * 0.34, HORIZONTAL_SPEED_MIN, HORIZONTAL_SPEED_MAX);
        const bounds = runnerHorizontalBounds();
        state.runnerX = clamp(state.runnerX + direction * speed * delta, bounds.minimum, bounds.maximum);
    }
    runnerLayer.classList.toggle('is-retreating', direction < 0);
    runnerLayer.classList.toggle('is-advancing', direction > 0);
    renderRunnerPosition();
}

function worldSpeedScale() {
    return clamp((state.boardWidth || boardMetrics().width) / 1100, 0.82, 1.24);
}

function currentWorldSpeed() {
    const journeyProgress = clamp(state.elapsedTime / JOURNEY_DURATION, 0, 1);
    const timeBoost = RUN_SPEED_GAIN * journeyProgress;
    return (BASE_RUN_SPEED + timeBoost) * PHASES[state.phaseIndex].speedScale * DIFFICULTIES[state.difficulty].speedScale * worldSpeedScale();
}

function currentPaceMultiplier() {
    const journeyProgress = clamp(state.elapsedTime / JOURNEY_DURATION, 0, 1);
    return ((BASE_RUN_SPEED + RUN_SPEED_GAIN * journeyProgress) * PHASES[state.phaseIndex].speedScale * DIFFICULTIES[state.difficulty].speedScale) / PACE_REFERENCE_SPEED;
}

function showPhaseBanner(index) {
    phaseKicker.textContent = `Fase ${index + 1}`;
    phaseName.textContent = PHASES[index].name;
    phaseBanner.classList.remove('is-visible');
    window.requestAnimationFrame(() => phaseBanner.classList.add('is-visible'));
}

function buildScene(layer, sceneIndex) {
    layer.dataset.scene = String(sceneIndex + 1);
    const backgroundUrl = new URL(PHASES[sceneIndex].background, document.baseURI).href;
    layer.style.setProperty('--scene-image', `url("${backgroundUrl}")`);
    layer.replaceChildren();

    for (let panelIndex = 0; panelIndex < 3; panelIndex += 1) {
        const panel = document.createElement('span');
        panel.className = panelIndex === 1 ? 'scenery-panel scenery-panel--mirror' : 'scenery-panel';
        layer.append(panel);
    }
}

function setScene(sceneIndex, instant = false) {

    if (instant) {
        buildScene(sceneLayers[0], sceneIndex);
        sceneLayers[0].classList.add('is-active');
        sceneLayers[1].classList.remove('is-active');
        state.activeScene = 0;
        return;
    }

    const nextScene = state.activeScene === 0 ? 1 : 0;
    buildScene(sceneLayers[nextScene], sceneIndex);
    sceneLayers[nextScene].classList.add('is-active');
    sceneLayers[state.activeScene].classList.remove('is-active');
    state.activeScene = nextScene;
}

function applyPhase(index, announce = true) {
    state.phaseIndex = index;
    board.dataset.phase = String(index + 1);
    setScene(index, !announce);

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
        y: 0,
        velocityY: 0,
        movementStage: 'running',
        hasLeaped: false,
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
    const pressure = clamp(state.elapsedTime / JOURNEY_DURATION, 0, 1);
    const beeChance = 0.15 + state.phaseIndex * 0.045;
    const isBee = Math.random() < beeChance;
    const waveSpeciesChance = state.phaseIndex === 0 ? 0.26 : 0.42 + pressure * 0.08;
    const isWaveSpecies = !isBee && Math.random() < waveSpeciesChance;
    const usesZigZag = isWaveSpecies && Math.random() < 0.46;
    const speciesClass = isBee ? ' insect--bee' : isWaveSpecies ? ' insect--wave' : '';
    sample.className = `insect${speciesClass}`;
    collectibleLayer.append(sample);
    const insectBox = sample.getBoundingClientRect();
    sample.remove();

    const tripleWaveChance = 0.34 + pressure * 0.28;
    const count = isBee || isWaveSpecies ? 1 : (Math.random() < tripleWaveChance ? 3 : 2);
    const useGroundLane = !isBee && !isWaveSpecies && Math.random() < 0.12 && groundInsectLaneIsSafe();
    const mouthY = runnerBox.top - boardBox.top + runnerBox.height * 0.46;
    const flightCeiling = boardBox.height * 0.36;
    const flightFloor = boardBox.height * 0.86 - insectBox.height * 0.88;
    const waveCenterY = (flightCeiling + flightFloor) * 0.5;
    const waveAmplitude = Math.max(54, (flightFloor - flightCeiling) * 0.5);
    const beeCeiling = boardBox.height * 0.31;
    const beeFloor = boardBox.height * 0.55;
    const baseY = useGroundLane
        ? clamp(mouthY - insectBox.height * 0.48, boardBox.height * 0.62, boardBox.height * 0.72)
        : isBee
            ? (beeCeiling + beeFloor) * 0.5
            : isWaveSpecies
                ? waveCenterY
                : boardBox.height * (0.49 + Math.random() * 0.09);
    const spacing = Math.max(58, insectBox.width * 0.82);
    const waveSpeed = isBee ? 0.8 : isWaveSpecies ? 0.98 + Math.random() * 0.08 : 0.86 + Math.random() * 0.12;
    const yOffsets = count === 1 ? [0] : count === 2 ? [-7, 7] : [0, -14, 10];
    const spawnTime = performance.now();

    for (let index = 0; index < count; index += 1) {
        const element = document.createElement('div');
        element.className = `insect insect--${useGroundLane ? 'low' : 'high'}${speciesClass}${usesZigZag ? ' insect--zigzag' : ''}`;
        collectibleLayer.append(element);

        const insect = {
            element,
            x: boardBox.width + Math.max(48, boardBox.width * 0.05) + spacing * index,
            y: baseY + yOffsets[index],
            speedScale: waveSpeed,
            bobPhase: index * 0.72 + Math.random() * 0.35,
            species: isBee ? 'bee' : isWaveSpecies ? 'wave' : 'golden',
            flightPattern: isBee ? 'bee-zigzag' : usesZigZag ? 'zigzag' : isWaveSpecies ? 'deep-wave' : 'hover',
            flightStage: isBee ? 'zigzag' : null,
            flightStageStartedAt: spawnTime,
            bobAmplitude: isBee ? Math.max(42, boardBox.height * 0.07) : isWaveSpecies ? waveAmplitude : 8,
            bobSpeed: isBee ? 130 : isWaveSpecies ? (usesZigZag ? 150 : 215) : 150,
            minimumY: isBee ? beeCeiling : isWaveSpecies ? flightCeiling : null,
            maximumY: isBee ? beeFloor : isWaveSpecies ? flightFloor : null,
            horizontalDrift: isBee ? Math.min(20, boardBox.width * 0.016) : usesZigZag ? Math.min(18, boardBox.width * 0.012) : 0,
            renderedY: baseY + yOffsets[index],
            aimY: null,
            diveFromY: null,
            diveTargetY: null,
            diveStartX: null,
            diveTargetX: null,
            caught: false,
        };
        state.insects.push(insect);
        renderInsect(insect, performance.now());
    }

    state.obstacleCooldown = Math.max(state.obstacleCooldown, isBee ? 3.2 : useGroundLane ? 3 : isWaveSpecies ? 1.85 : 1.55);
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
    const leapScale = obstacle.movementStage === 'leaping'
        ? obstacle.config.leapSpeedScale || 1
        : 1;
    return currentWorldSpeed() * obstacle.config.speedScale * leapScale;
}

function renderObstacle(obstacle, currentTime) {
    let extraTransform = '';
    if (obstacle.config.rotates) {
        extraTransform = ` rotate(${obstacle.rotation.toFixed(1)}deg)`;
    }
    obstacle.element.style.transform = `translate3d(${obstacle.x.toFixed(2)}px, ${(-obstacle.y).toFixed(2)}px, 0)${extraTransform}`;
}

function renderInsect(insect, currentTime) {
    const flightPhase = currentTime / insect.bobSpeed + insect.bobPhase;
    const flightShape = insect.flightPattern === 'zigzag' || insect.flightPattern === 'bee-zigzag'
        ? (2 / Math.PI) * Math.asin(Math.sin(flightPhase))
        : Math.sin(flightPhase);
    const bob = flightShape * insect.bobAmplitude;
    let horizontalDrift = insect.flightPattern === 'zigzag' || insect.flightPattern === 'bee-zigzag'
        ? Math.sin(flightPhase * 2 + 0.65) * insect.horizontalDrift
        : 0;
    let rotation = 0;
    let renderedY = insect.minimumY === null
        ? insect.y + bob
        : clamp(insect.y + bob, insect.minimumY, insect.maximumY);

    if (insect.species === 'bee') {
        if (insect.flightStage === 'aiming') {
            renderedY = insect.aimY + Math.sin(flightPhase * 2.4) * 3;
            horizontalDrift = 0;
        } else if (insect.flightStage === 'diving') {
            const diveDistance = Math.max(1, insect.diveStartX - insect.diveTargetX);
            const diveProgress = clamp((insect.diveStartX - insect.x) / diveDistance, 0, 1);
            const diveEase = diveProgress * diveProgress;
            renderedY = insect.diveFromY + (insect.diveTargetY - insect.diveFromY) * diveEase;
            horizontalDrift = 0;
            rotation = -28 * diveEase;
        } else if (insect.flightStage === 'escape') {
            renderedY = insect.diveTargetY + Math.sin(flightPhase * 1.8) * 5;
            horizontalDrift = 0;
            rotation = -18;
        }
    }

    insect.renderedY = renderedY;
    const x = `${(insect.x + horizontalDrift).toFixed(2)}px`;
    const y = `${renderedY.toFixed(2)}px`;
    insect.element.style.setProperty('--insect-x', x);
    insect.element.style.setProperty('--insect-y', y);
    insect.element.style.transform = `translate3d(${x}, ${y}, 0) rotate(${rotation.toFixed(1)}deg)`;
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

function updateTongueCooldown(currentTime = performance.now()) {
    const remaining = Math.max(0, state.attackReadyAt - currentTime);
    const isCoolingDown = state.mode === 'playing' && remaining > 0;

    tongueButton.classList.toggle('is-cooling-down', isCoolingDown);
    tongueButton.disabled = state.mode !== 'playing' || isCoolingDown;

    if (isCoolingDown) {
        const remainingSeconds = Math.ceil(remaining / 1000);
        tongueButton.dataset.cooldown = `${remainingSeconds}s`;
        tongueButton.setAttribute('aria-label', `Língua recarregando: ${remainingSeconds} segundos`);
        tongueButton.style.setProperty('--cooldown-progress', `${(remaining / ATTACK_COOLDOWN) * 360}deg`);
        return;
    }

    delete tongueButton.dataset.cooldown;
    tongueButton.removeAttribute('style');
    tongueButton.setAttribute('aria-label', 'Usar a língua');
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
    state.runnerX = initialRunnerX();
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
    clearHorizontalInput();
    runnerLayer.classList.remove('is-hit', 'is-airborne', 'is-swallowing', ...RUNNER_MOTION_CLASSES);
    renderRunnerPosition();
    applyPhase(0, false);
    updateWorldMotion();
}

function setPlayingControls(enabled) {
    moveLeftButton.disabled = !enabled;
    moveRightButton.disabled = !enabled;
    crouchButton.disabled = !enabled;
    jumpButton.disabled = !enabled;
    tongueButton.disabled = !enabled;
    pauseButton.disabled = !enabled;
    if (!enabled) clearHorizontalInput();
    updateTongueCooldown();
}

const WORLD_LEVELS = [
    { name: 'Rota da Manhã', x: 29, y: 80, unlocked: true },
    { name: 'Bosque dos Cogumelos', x: 68, y: 82, unlocked: false },
    { name: 'Pedreira Musgosa', x: 84, y: 57, unlocked: false },
    { name: 'Clareira dos Ventos', x: 68, y: 27, unlocked: false },
    { name: 'Vale das Folhas', x: 37, y: 20, unlocked: false },
    { name: 'Coração da Mata', x: 13, y: 46, unlocked: false },
];

const WORLD_MAP_SCALE = 2;
const WORLD_LEVEL_REACH = 4.8;
const WORLD_MUSEUM = { name: 'Museu da Mata', x: 55, y: 84 };
const WORLD_MUSEUM_REACH = 10.5;
const WORLD_MAP_BLOCKERS = [
    { x: 10, y: 18, width: 4.8, height: 3.2 },
    { x: 52, y: 14, width: 4.6, height: 3.1 },
    { x: 90, y: 24, width: 5, height: 3.4 },
    { x: 51, y: 53, width: 5.4, height: 3.6 },
    { x: 91, y: 88, width: 5.8, height: 3.8 },
    { x: 18, y: 65, width: 5.2, height: 3.5 },
    { x: 31, y: 39, width: 5, height: 3.4 },
    { x: 73, y: 38, width: 4.9, height: 3.3 },
    { x: 24, y: 31, width: 3.2, height: 2.4 },
    { x: 77, y: 46, width: 3.5, height: 2.5 },
    { x: 62, y: 91, width: 3.6, height: 2.6 },
    { x: 40, y: 32, width: 3.1, height: 2.3 },
    { x: 66, y: 66, width: 3.4, height: 2.5 },
    { x: 83, y: 71, width: 3.1, height: 2.3 },
    { x: WORLD_MUSEUM.x, y: WORLD_MUSEUM.y, width: 10.5, height: 6.2 },
];

const worldMapState = {
    x: 18,
    y: 88,
    targetX: null,
    targetY: null,
    cameraX: 0,
    cameraY: 0,
    pressed: new Set(),
    frame: 0,
    previousTime: 0,
    ready: false,
    nearestLevel: 0,
    avoidanceSign: 0,
};

function worldMapMetrics() {
    const viewportWidth = Math.max(1, worldMap.clientWidth);
    const viewportHeight = Math.max(1, worldMap.clientHeight);
    return {
        viewportWidth,
        viewportHeight,
        worldWidth: viewportWidth * WORLD_MAP_SCALE,
        worldHeight: viewportHeight * WORLD_MAP_SCALE,
    };
}

function renderWorldMapCamera() {
    const { viewportWidth, viewportHeight, worldWidth, worldHeight } = worldMapMetrics();
    const frogX = worldWidth * worldMapState.x / 100;
    const frogY = worldHeight * worldMapState.y / 100;
    worldMapState.cameraX = clamp(viewportWidth * 0.5 - frogX, viewportWidth - worldWidth, 0);
    worldMapState.cameraY = clamp(viewportHeight * 0.5 - frogY, viewportHeight - worldHeight, 0);
    worldMapWorld.style.setProperty('--map-camera-x', `${worldMapState.cameraX.toFixed(2)}px`);
    worldMapWorld.style.setProperty('--map-camera-y', `${worldMapState.cameraY.toFixed(2)}px`);
}

function renderWorldMapFrog() {
    worldMapFrog.style.setProperty('--map-x', `${worldMapState.x}%`);
    worldMapFrog.style.setProperty('--map-y', `${worldMapState.y}%`);
    worldMapFrog.style.setProperty('--frog-depth', `${100 + Math.round(worldMapState.y)}`);
    renderWorldMapCamera();
}

function renderWorldMapPrompt(level) {
    const { viewportWidth, viewportHeight, worldWidth, worldHeight } = worldMapMetrics();
    const levelScreenX = worldWidth * level.x / 100 + worldMapState.cameraX;
    const levelScreenY = worldHeight * level.y / 100 + worldMapState.cameraY;
    const promptWidth = Math.min(300, Math.max(190, viewportWidth * 0.44));
    const gap = Math.min(72, Math.max(44, viewportWidth * 0.06));
    let promptX = levelScreenX + gap;
    let opensLeft = false;

    if (promptX + promptWidth > viewportWidth - 8) {
        promptX = levelScreenX - promptWidth - gap;
        opensLeft = true;
    }

    worldMapPrompt.style.setProperty('--prompt-x', `${clamp(promptX, 8, viewportWidth - promptWidth - 8).toFixed(2)}px`);
    worldMapPrompt.style.setProperty('--prompt-y', `${clamp(levelScreenY, 78, viewportHeight - 78).toFixed(2)}px`);
    worldMapPrompt.classList.toggle('opens-left', opensLeft);
}

function worldMapPositionBlocked(x, y) {
    const frogRadiusX = 1.8;
    const frogRadiusY = 2.4;
    return WORLD_MAP_BLOCKERS.some((blocker) => {
        const radiusX = blocker.width * 0.5 + frogRadiusX;
        const radiusY = blocker.height * 0.5 + frogRadiusY;
        const normalizedX = (x - blocker.x) / radiusX;
        const normalizedY = (y - blocker.y) / radiusY;
        return normalizedX * normalizedX + normalizedY * normalizedY < 1;
    });
}

function moveWorldMapFrog(deltaX, deltaY) {
    const nextX = clamp(worldMapState.x + deltaX, 2.5, 97.5);
    const nextY = clamp(worldMapState.y + deltaY, 3.5, 96.5);
    let moved = false;

    if (!worldMapPositionBlocked(nextX, worldMapState.y)) {
        worldMapState.x = nextX;
        moved = moved || Math.abs(deltaX) > 0.001;
    }
    if (!worldMapPositionBlocked(worldMapState.x, nextY)) {
        worldMapState.y = nextY;
        moved = moved || Math.abs(deltaY) > 0.001;
    }
    return moved;
}

function updateWorldMapProximity() {
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    WORLD_LEVELS.forEach((level, index) => {
        const dx = worldMapState.x - level.x;
        const dy = (worldMapState.y - level.y) * 1.35;
        const distance = Math.hypot(dx, dy);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
        }
        worldLevelButtons[index]?.classList.toggle('is-near', distance < WORLD_LEVEL_REACH);
    });

    worldMapState.nearestLevel = nearestIndex;
    const level = WORLD_LEVELS[nearestIndex];
    const isNear = nearestDistance < WORLD_LEVEL_REACH;
    const museumDistance = Math.hypot(
        worldMapState.x - WORLD_MUSEUM.x,
        (worldMapState.y - WORLD_MUSEUM.y) * 1.35,
    );
    const isNearMuseum = museumDistance < WORLD_MUSEUM_REACH;
    const target = isNearMuseum ? WORLD_MUSEUM : level;
    const hasNearbyTarget = isNearMuseum || isNear;

    renderWorldMapPrompt(target);
    worldMapPrompt.classList.toggle('is-visible', hasNearbyTarget);
    worldMapPrompt.setAttribute('aria-hidden', String(!hasNearbyTarget));
    worldMuseum?.classList.toggle('is-near', isNearMuseum);
    worldMapPromptKicker.textContent = isNearMuseum ? 'Local encontrado' : 'Fase encontrada';
    worldMapStageName.textContent = target.name;
    storyMapButton.dataset.action = isNearMuseum ? 'museum' : 'level';
    storyMapButton.disabled = !worldMapState.ready || !hasNearbyTarget || (!isNearMuseum && !level.unlocked);
    storyMapButton.hidden = !isNearMuseum && !level.unlocked;
    storyMapButton.innerHTML = isNearMuseum
        ? '<span aria-hidden="true">◆</span> Entrar no museu'
        : '<span aria-hidden="true">▶</span> Entrar na fase';
    difficultyPicker.hidden = isNearMuseum || !level.unlocked;

    if (!worldMapState.ready) storyMapStatus.textContent = 'Preparando o mapa...';
    else if (isNearMuseum) storyMapStatus.textContent = 'Documentário da Rota da Manhã';
    else if (!isNear) storyMapStatus.textContent = 'Caminhe até uma marca de fase ou até o museu';
    else if (!level.unlocked) storyMapStatus.textContent = 'Em construção · em breve';
    else storyMapStatus.textContent = `${DIFFICULTIES[selectedDifficulty].label} selecionado · pronto`;
}

function activateWorldMapTarget() {
    if (storyMapButton.disabled || state.mode === 'loading') return;
    if (storyMapButton.dataset.action === 'museum') showMenuScreen('museum');
    else startGame();
}

function worldMapLoop(currentTime) {
    if (activeMenuScreen !== 'maps' || !overlay.classList.contains('is-visible')) {
        worldMapFrog.classList.remove('is-walking');
        worldMapState.frame = 0;
        return;
    }

    const delta = Math.min((currentTime - (worldMapState.previousTime || currentTime)) / 1000, 0.05);
    worldMapState.previousTime = currentTime;
    let directionX = 0;
    let directionY = 0;
    if (worldMapState.pressed.has('left')) directionX -= 1;
    if (worldMapState.pressed.has('right')) directionX += 1;
    if (worldMapState.pressed.has('up')) directionY -= 1;
    if (worldMapState.pressed.has('down')) directionY += 1;

    let moved = false;
    if (directionX || directionY) {
        worldMapState.targetX = null;
        worldMapState.targetY = null;
        worldMapState.avoidanceSign = 0;
        const length = Math.hypot(directionX, directionY) || 1;
        moved = moveWorldMapFrog((directionX / length) * 12.5 * delta, (directionY / length) * 17 * delta);
    } else if (worldMapState.targetX !== null && worldMapState.targetY !== null) {
        const dx = worldMapState.targetX - worldMapState.x;
        const dy = worldMapState.targetY - worldMapState.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 0.7) {
            worldMapState.targetX = null;
            worldMapState.targetY = null;
        } else {
            directionX = dx / distance;
            directionY = dy / distance;
            const stepX = directionX * 12.5 * delta;
            const stepY = directionY * 17 * delta;
            const directX = clamp(worldMapState.x + stepX, 2.5, 97.5);
            const directY = clamp(worldMapState.y + stepY, 3.5, 96.5);

            if (!worldMapPositionBlocked(directX, directY)) {
                moved = moveWorldMapFrog(stepX, stepY);
                worldMapState.avoidanceSign = 0;
            } else {
                if (!worldMapState.avoidanceSign) worldMapState.avoidanceSign = 1;
                const tangentX = -directionY * 12.5 * delta * worldMapState.avoidanceSign;
                const tangentY = directionX * 17 * delta * worldMapState.avoidanceSign;
                moved = moveWorldMapFrog(tangentX, tangentY);
                if (!moved) {
                    worldMapState.avoidanceSign *= -1;
                    moved = moveWorldMapFrog(-tangentX, -tangentY);
                }
            }
            if (!moved) {
                worldMapState.targetX = null;
                worldMapState.targetY = null;
                worldMapState.avoidanceSign = 0;
            }
        }
    }

    const isMoving = Boolean(directionX || directionY) && moved;
    if (directionX) worldMapFrog.style.setProperty('--map-facing', directionX < 0 ? -1 : 1);
    worldMapFrog.classList.toggle('is-walking', isMoving);
    renderWorldMapFrog();
    updateWorldMapProximity();
    worldMapState.frame = window.requestAnimationFrame(worldMapLoop);
}

function startWorldMapNavigation() {
    if (worldMapState.frame) window.cancelAnimationFrame(worldMapState.frame);
    worldMapState.previousTime = performance.now();
    renderWorldMapFrog();
    updateWorldMapProximity();
    worldMapState.frame = window.requestAnimationFrame(worldMapLoop);
    worldMap.focus({ preventScroll: true });
}

function setWorldMapDirection(direction, pressed) {
    if (pressed) worldMapState.pressed.add(direction);
    else worldMapState.pressed.delete(direction);
}

function handleWorldMapKey(event, pressed) {
    if (activeMenuScreen !== 'maps' || !overlay.classList.contains('is-visible')) return false;
    const directions = {
        ArrowLeft: 'left', KeyA: 'left',
        ArrowRight: 'right', KeyD: 'right',
        ArrowUp: 'up', KeyW: 'up',
        ArrowDown: 'down', KeyS: 'down',
    };
    if (directions[event.code]) {
        event.preventDefault();
        setWorldMapDirection(directions[event.code], pressed);
        return true;
    }
    if (pressed && ['Enter', 'Space', 'KeyE'].includes(event.code) && !storyMapButton.disabled) {
        event.preventDefault();
        activateWorldMapTarget();
        return true;
    }
    return false;
}

function moveWorldMapToPointer(event) {
    if (event.target.closest('.world-map-prompt, button')) return;
    const bounds = worldMap.getBoundingClientRect();
    const { worldWidth, worldHeight } = worldMapMetrics();
    worldMapState.targetX = clamp(((event.clientX - bounds.left - worldMapState.cameraX) / worldWidth) * 100, 2.5, 97.5);
    worldMapState.targetY = clamp(((event.clientY - bounds.top - worldMapState.cameraY) / worldHeight) * 100, 3.5, 96.5);
}

const DEFAULT_SKIN = { frog: '#69b83f', tongue: '#e75f86' };
const FROG_SPRITES = [
    ['--frog-run-sprite', 'assets/img/sapo-corrida-bipede-v3.png'],
    ['--frog-crouch-sprite', 'assets/img/sapo-corrida-agachado-sprites-v1.png'],
    ['--frog-jump-sprite', 'assets/img/sapo-ciclo-natural-v2.png'],
    ['--frog-attack-sprite', 'assets/img/sapo-boca-aberta-sprites.png'],
    ['--frog-crouch-attack-sprite', 'assets/img/sapo-agachado-boca-aberta-sprites-v1.png'],
];
const skinObjectUrls = new Map();
let skinRenderVersion = 0;
let skinSaveTimer = 0;
let lastAppliedSkin = { frog: '', tongue: '' };
const skinWorker = typeof Worker !== 'undefined' && typeof OffscreenCanvas !== 'undefined'
    ? new Worker('assets/js/skin-worker.js?v=1')
    : null;
const skinWorkerJobs = new Map();
let skinWorkerJobId = 0;

if (skinWorker) {
    skinWorker.addEventListener('message', (event) => {
        const job = skinWorkerJobs.get(event.data.id);
        if (!job) return;
        skinWorkerJobs.delete(event.data.id);
        if (event.data.error) job.reject(new Error(event.data.error));
        else job.resolve(URL.createObjectURL(event.data.blob));
    });
    skinWorker.addEventListener('error', () => {
        skinWorkerJobs.forEach((job) => job.reject(new Error('Falha no processador de cores')));
        skinWorkerJobs.clear();
    });
}

function readSkin() {
    try {
        const saved = JSON.parse(localStorage.getItem('sapo-skin-colors') || '{}');
        return {
            frog: /^#[0-9a-f]{6}$/i.test(saved.frog) ? saved.frog : DEFAULT_SKIN.frog,
            tongue: /^#[0-9a-f]{6}$/i.test(saved.tongue) ? saved.tongue : DEFAULT_SKIN.tongue,
        };
    } catch {
        return { ...DEFAULT_SKIN };
    }
}

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
    hue = (hue * 60 + 360) % 360;
    return [hue, saturation, lightness];
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
    let rgb = segment < 1 ? [chroma, x, 0] : segment < 2 ? [x, chroma, 0] : segment < 3 ? [0, chroma, x] : segment < 4 ? [0, x, chroma] : segment < 5 ? [x, 0, chroma] : [chroma, 0, x];
    const match = lightness - chroma / 2;
    return rgb.map((channel) => Math.round((channel + match) * 255));
}

function loadImage(source) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = source;
    });
}

async function recolorImage(source, targetColor, kind) {
    if (skinWorker) {
        return new Promise((resolve, reject) => {
            const id = ++skinWorkerJobId;
            skinWorkerJobs.set(id, { resolve, reject });
            skinWorker.postMessage({ id, source: new URL(source, window.location.href).href, targetColor, kind });
        });
    }

    const image = await loadImage(source);
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0);
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
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)), 'image/png'));
}

function replaceSkinObjectUrl(key, nextUrl) {
    const previousUrl = skinObjectUrls.get(key);
    if (previousUrl) URL.revokeObjectURL(previousUrl);
    skinObjectUrls.set(key, nextUrl);
}

function markSelectedPresets(frogColor, tongueColor) {
    document.querySelectorAll('[data-color-presets="frog"] button').forEach((button) => button.classList.toggle('is-selected', button.dataset.color.toLowerCase() === frogColor.toLowerCase()));
    document.querySelectorAll('[data-color-presets="tongue"] button').forEach((button) => button.classList.toggle('is-selected', button.dataset.color.toLowerCase() === tongueColor.toLowerCase()));
}

async function applySkinColors(showSaved = false) {
    const version = ++skinRenderVersion;
    const frogColor = frogColorInput.value;
    const tongueColor = tongueColorInput.value;
    const frogChanged = frogColor !== lastAppliedSkin.frog;
    const tongueChanged = tongueColor !== lastAppliedSkin.tongue;
    if (!frogChanged && !tongueChanged) {
        markSelectedPresets(frogColor, tongueColor);
        return;
    }
    skinSavedStatus.textContent = 'Costurando as novas cores...';
    skinSavedStatus.classList.add('is-visible');
    document.documentElement.style.setProperty('--skin-tongue', tongueColor);

    try {
        const [frogSprites, coverUrl, tongueUrl] = await Promise.all([
            frogChanged ? Promise.all(FROG_SPRITES.map(async ([property, source]) => [property, await recolorImage(source, frogColor, 'frog')])) : Promise.resolve([]),
            frogChanged ? recolorImage('assets/img/sapo-capa.png', frogColor, 'frog') : Promise.resolve(null),
            tongueChanged ? recolorImage('assets/img/sapo-lingua-limpa-v3.png', tongueColor, 'tongue') : Promise.resolve(null),
        ]);
        if (version !== skinRenderVersion) {
            [...frogSprites.map(([, url]) => url), coverUrl, tongueUrl].filter(Boolean).forEach((url) => URL.revokeObjectURL(url));
            return;
        }

        frogSprites.forEach(([property, url]) => {
            replaceSkinObjectUrl(property, url);
            document.documentElement.style.setProperty(property, `url("${url}")`);
        });
        if (coverUrl) {
            replaceSkinObjectUrl('cover', coverUrl);
            menuFrog.src = coverUrl;
            skinPreviewFrog.src = coverUrl;
        }
        if (tongueUrl) {
            replaceSkinObjectUrl('tongue', tongueUrl);
            runnerAttack.src = tongueUrl;
            skinPreviewTongue.src = tongueUrl;
        }
        lastAppliedSkin = { frog: frogColor, tongue: tongueColor };
        markSelectedPresets(frogColor, tongueColor);
        try {
            localStorage.setItem('sapo-skin-colors', JSON.stringify({ frog: frogColor, tongue: tongueColor }));
        } catch {}
        skinSavedStatus.textContent = showSaved ? 'Cores salvas neste aparelho' : 'Aparência carregada';
        window.clearTimeout(skinSaveTimer);
        skinSaveTimer = window.setTimeout(() => skinSavedStatus.classList.remove('is-visible'), 1300);
    } catch {
        skinSavedStatus.textContent = 'Não foi possível aplicar esta cor';
    }
}

function initializeSkins() {
    const skin = readSkin();
    frogColorInput.value = skin.frog;
    tongueColorInput.value = skin.tongue;
    applySkinColors(false);
}

const PLAYER_NAME_STORAGE_KEY = 'sapo-player-name';

function readPlayerName() {
    try {
        return (localStorage.getItem(PLAYER_NAME_STORAGE_KEY) || '').trim().slice(0, 20);
    } catch {
        return '';
    }
}

function initializeProfile() {
    if (!playerNameInput) return;
    playerNameInput.value = readPlayerName();
}

function savePlayerName(event) {
    event.preventDefault();
    const playerName = playerNameInput.value.trim().replace(/\s+/g, ' ').slice(0, 20);
    if (playerName.length < 2) {
        playerNameInput.setAttribute('aria-invalid', 'true');
        playerNameError.textContent = 'Digite pelo menos 2 caracteres.';
        profileSavedStatus.textContent = '';
        playerNameInput.focus();
        return;
    }

    try {
        localStorage.setItem(PLAYER_NAME_STORAGE_KEY, playerName);
        playerNameInput.value = playerName;
        playerNameInput.removeAttribute('aria-invalid');
        playerNameError.textContent = '';
        profileSavedStatus.textContent = `Nome salvo neste aparelho: ${playerName}`;
    } catch {
        profileSavedStatus.textContent = 'O navegador não permitiu salvar o nome neste aparelho.';
    }
}

const MENU_PARENTS = {
    play: 'main',
    maps: 'play',
    profile: 'main',
    museum: 'maps',
    skins: 'main',
    settings: 'main',
};

let activeMenuScreen = 'main';

function showMenuScreen(screenName, focusFirst = true) {
    const nextScreen = menuScreens.find((screen) => screen.dataset.menuScreen === screenName);
    if (!nextScreen) return;

    activeMenuScreen = screenName;
    menuScreens.forEach((screen) => {
        const isActive = screen === nextScreen;
        screen.hidden = !isActive;
        screen.classList.toggle('is-active', isActive);
    });
    menuBackButton.classList.toggle('is-hidden', screenName === 'main');
    mainMenuShell.classList.toggle('is-world-map', screenName === 'maps');
    overlay.scrollTop = 0;
    mainMenuShell.scrollTop = 0;

    if (screenName === 'maps') {
        window.requestAnimationFrame(startWorldMapNavigation);
    } else {
        worldMapState.pressed.clear();
        worldMapFrog.classList.remove('is-walking');
    }

    if (focusFirst) {
        const firstControl = nextScreen.querySelector('button:not(:disabled)');
        if (screenName !== 'maps') (firstControl || menuBackButton).focus({ preventScroll: true });
    }
}

function goBackMenu() {
    showMenuScreen(MENU_PARENTS[activeMenuScreen] || 'main');
}

function showMainMenu() {
    window.cancelAnimationFrame(state.animationFrame);
    pauseBackgroundMusic(true);
    clearAttack();
    setPlayingControls(false);
    state.mode = 'idle';
    mainMenuShell.classList.remove('is-hidden');
    resultCard.classList.add('is-hidden');
    overlay.classList.add('is-visible');
    showMenuScreen('main');
}

function showResultOverlay() {
    mainMenuShell.classList.add('is-hidden');
    resultCard.classList.remove('is-hidden');
    overlay.classList.add('is-visible');
}

function startGame() {
    state.difficulty = selectedDifficulty;
    resetRun();
    state.mode = 'playing';
    playBackgroundMusic(true);
    state.previousTime = performance.now();
    overlay.classList.remove('is-visible');
    setPlayingControls(true);
    pauseButton.textContent = 'Pausar';
    pauseButton.setAttribute('aria-label', 'Pausar jogo');
    updateScore();
    setStatus(`Valendo! · ${DIFFICULTIES[state.difficulty].label}`);
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
    clearHorizontalInput();
    moveLeftButton.disabled = true;
    moveRightButton.disabled = true;
    crouchButton.disabled = true;
    jumpButton.disabled = true;
    tongueButton.disabled = true;
    pauseButton.disabled = false;
    pauseButton.textContent = 'Continuar';
    pauseButton.setAttribute('aria-label', 'Continuar jogo');
    overlayKicker.textContent = PHASES[state.phaseIndex].name;
    overlayTitle.textContent = 'Corrida pausada';
    overlayMessage.textContent = 'Continue quando estiver pronto. Sua corrida está guardada exatamente neste ponto.';
    playLabel.textContent = 'Continuar';
    showResultOverlay();
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
    updateTongueCooldown(now);
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
    const runnerInsetTop = runnerBox.height * (isRunnerCrouched() ? 0.46 : 0.18);
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
    const runnerInsetTop = runnerBox.height * (isRunnerCrouched() ? 0.48 : 0.2);
    const runnerInsetBottom = runnerBox.height * 0.2;
    const insectInsetX = insectBox.width * 0.22;
    const insectInsetY = insectBox.height * 0.2;

    return (
        runnerBox.right - runnerInsetX > insectBox.left + insectInsetX
        && runnerBox.left + runnerInsetX < insectBox.right - insectInsetX
        && runnerBox.bottom - runnerInsetBottom > insectBox.top + insectInsetY
        && runnerBox.top + runnerInsetTop < insectBox.bottom - insectInsetY
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
    const basePoints = insect.species === 'bee' ? 24 : 16;
    const points = basePoints + bonus;
    state.score += points;
    insect.element.classList.remove('is-aiming', 'is-diving');
    insect.element.classList.add('is-caught');
    const preyName = insect.species === 'bee' ? 'Abelha' : 'Besouro';
    setStatus(state.catchCombo > 1 ? `Caçada x${state.catchCombo} · +${points}` : `${preyName} capturada · +${points}`);
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
    overlayMessage.textContent = hazard === 'bee'
        ? 'A abelha acertou o sapo com o ferrão. Observe a mira, pule da investida ou capture-a com a língua.'
        : hazard === 'beetle'
            ? 'Um besouro acertou o sapo. Pule para ajustar a altura e use a língua antes que o bando chegue perto.'
        : hazard === 'leaping-beetle'
            ? 'O besouro-saltador atacou de repente. Espere os olhos verdes se aproximarem e pule acima da investida.'
        : state.phaseIndex === PHASES.length - 1
            ? 'Você chegou ao castelo. Agora tente correr ainda mais longe e capture mais besouros.'
            : 'O caminho ficou difícil desta vez. Tente outra corrida e descubra a próxima região.';
    playLabel.textContent = 'Jogar novamente';
    showResultOverlay();
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
    showResultOverlay();
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
        if (
            obstacle.config.leaps
            && !obstacle.hasLeaped
            && obstacle.movementStage === 'running'
            && obstacle.x - state.runnerX <= clamp(state.boardWidth * 0.22, 205, 300)
        ) {
            obstacle.hasLeaped = true;
            obstacle.movementStage = 'leaping';
            obstacle.velocityY = 560;
            obstacle.element.classList.add('is-leaping');
        }

        if (obstacle.movementStage === 'leaping') {
            obstacle.velocityY -= 1550 * delta;
            obstacle.y = Math.max(0, obstacle.y + obstacle.velocityY * delta);
            if (obstacle.y === 0 && obstacle.velocityY < 0) {
                obstacle.velocityY = 0;
                obstacle.movementStage = 'landed';
                obstacle.element.classList.remove('is-leaping');
                obstacle.element.classList.add('has-landed');
            }
        }

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
    runnerLayer.classList.toggle('is-crouching', state.isCrouching && !isAirborne);

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
        if (insect.species === 'bee') {
            const boardBox = boardMetrics();
            if (insect.flightStage === 'zigzag' && insect.x <= boardBox.width * 0.72) {
                insect.flightStage = 'aiming';
                insect.flightStageStartedAt = currentTime;
                insect.aimY = insect.renderedY;
                insect.element.classList.add('is-aiming');
            } else if (insect.flightStage === 'aiming' && currentTime - insect.flightStageStartedAt >= 440) {
                const runnerBox = runner.getBoundingClientRect();
                const insectBox = insect.element.getBoundingClientRect();
                insect.flightStage = 'diving';
                insect.flightStageStartedAt = currentTime;
                insect.diveFromY = insect.renderedY;
                insect.diveStartX = insect.x;
                insect.diveTargetX = runnerBox.left - boardBox.left - runnerBox.width * 1.15;
                insect.diveTargetY = clamp(
                    runnerBox.top - boardBox.top + runnerBox.height * 0.52 - insectBox.height * 0.5,
                    boardBox.height * 0.62,
                    boardBox.height * 0.76,
                );
                insect.element.classList.remove('is-aiming');
                insect.element.classList.add('is-diving');
                setStatus('A abelha vai investir!');
            } else if (insect.flightStage === 'diving' && insect.x <= insect.diveTargetX) {
                insect.flightStage = 'escape';
                insect.flightStageStartedAt = currentTime;
                insect.element.classList.remove('is-diving');
            }
        }

        const movementScale = insect.species !== 'bee'
            ? insect.speedScale
            : insect.flightStage === 'aiming'
                ? 0.3
                : insect.flightStage === 'diving'
                    ? 1.82
                    : insect.flightStage === 'escape'
                        ? 1.28
                        : insect.speedScale;
        insect.x -= currentWorldSpeed() * movementScale * delta;
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
    const difficulty = DIFFICULTIES[state.difficulty];
    state.obstacleCooldown -= delta;
    state.insectCooldown -= delta;
    state.platformCooldown -= delta;

    if (state.obstacleCooldown <= 0) {
        spawnObstacle();
        const [minimumGap, maximumGap] = PHASES[state.phaseIndex].obstacleGap;
        const pressure = clamp(state.elapsedTime / JOURNEY_DURATION, 0, 1);
        const densityScale = 1 - pressure * 0.1;
        state.obstacleCooldown = Math.max(
            difficulty.minimumObstacleGap,
            (minimumGap + Math.random() * (maximumGap - minimumGap)) * densityScale * difficulty.spawnGapScale,
        );
    }

    if (state.insectCooldown <= 0) {
        if (incomingObstacleBlocksInsects()) {
            state.insectCooldown = 0.42;
        } else {
            spawnInsectWave();
            const [minimumGap, maximumGap] = PHASES[state.phaseIndex].insectGap;
            const pressure = clamp(state.elapsedTime / JOURNEY_DURATION, 0, 1);
            const densityScale = 1 - pressure * 0.08;
            state.insectCooldown = Math.max(
                difficulty.minimumInsectGap,
                (minimumGap + Math.random() * (maximumGap - minimumGap)) * densityScale * difficulty.spawnGapScale,
            );
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
    updateTongueCooldown(currentTime);
    if (!shouldReduceMotion()) state.sceneTravel += worldSpeed * 0.075 * delta;
    state.groundTravel += worldSpeed * delta;
    updateWorldMotion();

    scheduleActors(delta);
    updatePlatforms(delta);
    updateRunnerHorizontalMovement(delta);
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

    const collidingObstacle = state.obstacles.find(collisionDetected);
    if (collidingObstacle) {
        state.dodgeCombo = 0;
        endGame(collidingObstacle.type);
        return;
    }

    const collidingInsect = state.insects.find(insectHitsRunner);
    if (collidingInsect) {
        state.catchCombo = 0;
        endGame(collidingInsect.species === 'bee' ? 'bee' : 'beetle');
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
        } else if (event.code === 'Escape' && state.mode === 'idle' && activeMenuScreen !== 'main') {
            event.preventDefault();
            showMenuScreen(MENU_PARENTS[activeMenuScreen] || 'main');
        }
        return;
    }

    if (event.code === 'KeyX') {
        handleAttackInput(event);
        return;
    }

    handleJumpInput(event);
}

function handleHorizontalKey(event, isPressed) {
    const isLeft = ['ArrowLeft', 'KeyA'].includes(event.code);
    const isRight = ['ArrowRight', 'KeyD'].includes(event.code);
    if (!isLeft && !isRight) return false;
    event.preventDefault();
    if (state.mode !== 'playing' && isPressed) return true;
    if (isLeft) state.moveLeft = isPressed;
    if (isRight) state.moveRight = isPressed;
    moveLeftButton.classList.toggle('is-held', state.moveLeft);
    moveRightButton.classList.toggle('is-held', state.moveRight);
    return true;
}

function handleCrouchKey(event, isPressed) {
    if (event.code !== 'ArrowDown') return false;
    event.preventDefault();
    if (state.mode !== 'playing' && isPressed) return true;
    setCrouching(isPressed);
    return true;
}

function bindMovementButton(button, direction) {
    const setPressed = (pressed) => {
        if (direction === 'left') state.moveLeft = pressed;
        else state.moveRight = pressed;
        button.classList.toggle('is-held', pressed);
    };

    button.addEventListener('pointerdown', (event) => {
        if (button.disabled || state.mode !== 'playing') return;
        event.preventDefault();
        button.setPointerCapture?.(event.pointerId);
        setPressed(true);
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((eventName) => {
        button.addEventListener(eventName, () => setPressed(false));
    });
}

function bindCrouchButton() {
    const release = () => setCrouching(false);
    crouchButton.addEventListener('pointerdown', (event) => {
        if (crouchButton.disabled || state.mode !== 'playing') return;
        event.preventDefault();
        crouchButton.setPointerCapture?.(event.pointerId);
        setCrouching(true);
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((eventName) => {
        crouchButton.addEventListener(eventName, release);
    });
    crouchButton.addEventListener('keydown', (event) => {
        if (!['Space', 'Enter'].includes(event.code) || event.repeat || crouchButton.disabled) return;
        event.preventDefault();
        setCrouching(true);
    });
    crouchButton.addEventListener('keyup', (event) => {
        if (!['Space', 'Enter'].includes(event.code)) return;
        event.preventDefault();
        release();
    });
    crouchButton.addEventListener('blur', release);
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
    worldMapState.ready = true;
    updateWorldMapProximity();
    playLabel.textContent = 'Jogar novamente';
    if (failedAssets > 0) {
        worldMapHelp.textContent = 'O mapa está pronto. Alguns detalhes visuais ainda podem carregar durante a caminhada.';
    }

    const preloadLaterScenes = () => {
        [...new Set(PHASES.slice(1).map((phase) => phase.background))]
            .forEach((source) => preloadImage(source).catch(() => {}));
    };
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(preloadLaterScenes, { timeout: 2500 });
    } else {
        window.setTimeout(preloadLaterScenes, 500);
    }
}

function syncBoardSize(width, height) {
    const previousWidth = state.boardWidth;
    if (state.boardWidth > 0 && state.mode === 'playing') {
        const widthRatio = width / state.boardWidth;
        const heightRatio = height / state.boardHeight;
        state.obstacles.forEach((obstacle) => {
            obstacle.x *= widthRatio;
            obstacle.y *= heightRatio;
            obstacle.velocityY *= heightRatio;
        });
        state.platforms.forEach((platform) => { platform.x *= widthRatio; });
        state.runnerX *= widthRatio;
        state.runnerY *= heightRatio;
        runnerLayer.style.setProperty('--jump-y', state.runnerY.toFixed(2));
        state.insects.forEach((insect) => {
            insect.x *= widthRatio;
            insect.y *= heightRatio;
            insect.bobAmplitude *= heightRatio;
            insect.horizontalDrift *= widthRatio;
            if (insect.minimumY !== null) insect.minimumY *= heightRatio;
            if (insect.maximumY !== null) insect.maximumY *= heightRatio;
            if (insect.renderedY !== null) insect.renderedY *= heightRatio;
            if (insect.aimY !== null) insect.aimY *= heightRatio;
            if (insect.diveFromY !== null) insect.diveFromY *= heightRatio;
            if (insect.diveTargetY !== null) insect.diveTargetY *= heightRatio;
            if (insect.diveStartX !== null) insect.diveStartX *= widthRatio;
            if (insect.diveTargetX !== null) insect.diveTargetX *= widthRatio;
        });
    }
    state.boardWidth = width;
    state.boardHeight = height;
    applyWorldScale(width, height);
    if (previousWidth === 0 || state.runnerX === 0) state.runnerX = initialRunnerX(width);
    const bounds = runnerHorizontalBounds();
    state.runnerX = clamp(state.runnerX, bounds.minimum, bounds.maximum);
    renderRunnerPosition();
    updateWorldMotion();
}

playButton.addEventListener('click', () => {
    if (state.mode === 'paused') resumeGame();
    else if (state.mode !== 'loading') startGame();
});

storyMapButton.addEventListener('click', () => {
    activateWorldMapTarget();
});

worldMuseum?.addEventListener('click', () => {
    const distance = Math.hypot(
        worldMapState.x - WORLD_MUSEUM.x,
        (worldMapState.y - WORLD_MUSEUM.y) * 1.35,
    );
    if (distance < WORLD_MUSEUM_REACH && worldMapState.ready) {
        showMenuScreen('museum');
        return;
    }
    worldMapState.targetX = WORLD_MUSEUM.x;
    worldMapState.targetY = WORLD_MUSEUM.y + 6.8;
    storyMapStatus.textContent = 'Caminhando até o museu...';
});

profileNameForm?.addEventListener('submit', savePlayerName);
playerNameInput?.addEventListener('input', () => {
    playerNameInput.removeAttribute('aria-invalid');
    playerNameError.textContent = '';
    profileSavedStatus.textContent = '';
});

difficultyInputs.forEach((input) => {
    input.addEventListener('change', () => {
        if (!input.checked || !DIFFICULTIES[input.value]) return;
        selectedDifficulty = input.value;
        updateWorldMapProximity();
    });
});

worldMap.addEventListener('pointerdown', moveWorldMapToPointer);
worldLevelButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const level = WORLD_LEVELS[index];
        const distance = Math.hypot(worldMapState.x - level.x, (worldMapState.y - level.y) * 1.35);
        if (distance < WORLD_LEVEL_REACH && level.unlocked && worldMapState.ready) {
            startGame();
            return;
        }
        worldMapState.targetX = level.x;
        worldMapState.targetY = level.y;
        storyMapStatus.textContent = level.unlocked ? 'Caminhando até a fase...' : 'Indo até a fase em construção...';
    });
});

worldMapDirectionButtons.forEach((button) => {
    const direction = button.dataset.mapDirection;
    const press = (event) => {
        event.preventDefault();
        button.setPointerCapture?.(event.pointerId);
        setWorldMapDirection(direction, true);
    };
    const release = (event) => {
        event.preventDefault();
        setWorldMapDirection(direction, false);
    };
    button.addEventListener('pointerdown', press);
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', () => setWorldMapDirection(direction, false));
});

[frogColorInput, tongueColorInput].forEach((input) => {
    input.addEventListener('input', () => {
        window.clearTimeout(skinSaveTimer);
        skinSaveTimer = window.setTimeout(() => applySkinColors(true), 120);
    });
});

document.querySelectorAll('[data-color-presets] button').forEach((button) => {
    button.addEventListener('click', () => {
        const group = button.closest('[data-color-presets]').dataset.colorPresets;
        (group === 'frog' ? frogColorInput : tongueColorInput).value = button.dataset.color;
        applySkinColors(true);
    });
});

skinResetButton.addEventListener('click', () => {
    frogColorInput.value = DEFAULT_SKIN.frog;
    tongueColorInput.value = DEFAULT_SKIN.tongue;
    applySkinColors(true);
});

musicEnabledInput.addEventListener('change', () => {
    gameSettings.musicEnabled = musicEnabledInput.checked;
    applyGameSettings({ save: true, announce: true });
});

musicVolumeInput.addEventListener('input', () => {
    gameSettings.musicVolume = Number(musicVolumeInput.value) / 100;
    applyGameSettings({ save: true, announce: true });
});

effectsEnabledInput.addEventListener('change', () => {
    gameSettings.effectsEnabled = effectsEnabledInput.checked;
    applyGameSettings({ save: true, announce: true });
});

effectsVolumeInput.addEventListener('input', () => {
    gameSettings.effectsVolume = Number(effectsVolumeInput.value) / 100;
    applyGameSettings({ save: true, announce: true });
});

reducedMotionInput.addEventListener('change', () => {
    gameSettings.reducedMotion = reducedMotionInput.checked;
    applyGameSettings({ save: true, announce: true });
});

compactControlsInput.addEventListener('change', () => {
    gameSettings.compactControls = compactControlsInput.checked;
    applyGameSettings({ save: true, announce: true });
});

controlLayoutInputs.forEach((input) => input.addEventListener('change', () => {
    if (!input.checked || !CONTROL_LAYOUTS.includes(input.value)) return;
    gameSettings.controlLayout = input.value;
    applyGameSettings({ save: true, announce: true });
}));

controlStyleInputs.forEach((input) => input.addEventListener('change', () => {
    if (!input.checked || !CONTROL_STYLES.includes(input.value)) return;
    gameSettings.controlStyle = input.value;
    applyGameSettings({ save: true, announce: true });
}));

controlPaletteInputs.forEach((input) => input.addEventListener('change', () => {
    if (!input.checked || !CONTROL_PALETTES.includes(input.value)) return;
    gameSettings.controlPalette = input.value;
    applyGameSettings({ save: true, announce: true });
}));

fullscreenButton.addEventListener('click', async () => {
    try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
        announceSettingsSaved();
    } catch {
        settingsSavedStatus.textContent = 'Tela cheia não está disponível neste navegador';
        settingsSavedStatus.classList.add('is-visible');
    }
});

document.addEventListener('fullscreenchange', updateFullscreenLabel);

pauseButton.addEventListener('click', () => {
    if (state.mode === 'paused') resumeGame();
    else pauseGame();
});

jumpButton.addEventListener('pointerdown', handleJumpInput);
tongueButton.addEventListener('pointerdown', handleAttackInput);
bindMovementButton(moveLeftButton, 'left');
bindMovementButton(moveRightButton, 'right');
bindCrouchButton();
runnerAttack.addEventListener('animationend', clearAttack);

board.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    handleJumpInput(event);
});

document.addEventListener('keydown', (event) => {
    if (handleWorldMapKey(event, true)) return;
    if (!handleHorizontalKey(event, true) && !handleCrouchKey(event, true)) handleKeyboard(event);
});
document.addEventListener('keyup', (event) => {
    if (handleWorldMapKey(event, false)) return;
    if (!handleHorizontalKey(event, false)) handleCrouchKey(event, false);
});
window.addEventListener('blur', clearHorizontalInput);
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

window.addEventListener('orientationchange', syncOrientationGuard);
window.addEventListener('resize', syncOrientationGuard);
syncOrientationGuard();
applyGameSettings();
updateFullscreenLabel();
initializeSkins();
initializeProfile();
initializeGame();
window.requestAnimationFrame(() => indieIntroContinue.focus({ preventScroll: true }));
