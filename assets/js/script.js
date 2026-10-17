const board = document.querySelector('#game-board');
const bootLoader = document.querySelector('#boot-loader');
const bootLoaderMessage = document.querySelector('#boot-loader-message');
const bootLoaderProgress = document.querySelector('#boot-loader-progress');
const bootLoaderFill = document.querySelector('#boot-loader-fill');
const bootLoaderPercent = document.querySelector('#boot-loader-percent');
const bootLoadingSteps = [...document.querySelectorAll('[data-loading-step]')];
const stageLoader = document.querySelector('#stage-loader');
const stageLoaderKicker = document.querySelector('#stage-loader-kicker');
const stageLoaderTitle = document.querySelector('#stage-loader-title');
const stageLoaderTip = document.querySelector('#stage-loader-tip');
const indieIntro = document.querySelector('#indie-intro');
const indieIntroContinue = document.querySelector('#indie-intro-continue');
const gameShell = document.querySelector('.game-shell');
const runnerLayer = document.querySelector('.runner-layer');
const runner = document.querySelector('#runner');
const runnerAttack = document.querySelector('#runner-attack');
const obstacleLayer = document.querySelector('#obstacle-layer');
const platformLayer = document.querySelector('#platform-layer');
const collectibleLayer = document.querySelector('#collectible-layer');
const bossLayer = document.querySelector('#boss-layer');
const bossHud = document.querySelector('#boss-hud');
const bossHudLabel = bossHud.querySelector('span');
const bossHealthFill = document.querySelector('#boss-health-fill');
const bossHealthText = document.querySelector('#boss-health-text');
const groundTrack = document.querySelector('#ground-track');
const overlay = document.querySelector('#game-overlay');
const mainMenuShell = document.querySelector('#main-menu-shell');
const resultCard = document.querySelector('#result-card');
const menuBackButton = document.querySelector('#menu-back');
const worldMapMenuButton = document.querySelector('#world-map-menu-button');
const worldInventoryButton = document.querySelector('#world-inventory-button');
const worldInventoryDialog = document.querySelector('#world-inventory-dialog');
const worldInventoryClose = document.querySelector('#world-inventory-close');
const worldInventoryPortrait = document.querySelector('#world-inventory-portrait');
const worldInventoryName = document.querySelector('#world-inventory-name');
const worldInventoryBest = document.querySelector('#world-inventory-best');
const worldInventoryRoute = document.querySelector('#world-inventory-route');
const worldInventoryDuel = document.querySelector('#world-inventory-duel');
const worldInventoryFrogColor = document.querySelector('#world-inventory-frog-color');
const worldInventoryTongueColor = document.querySelector('#world-inventory-tongue-color');
const menuScreens = [...document.querySelectorAll('[data-menu-screen]')];
const storyMapButton = document.querySelector('#story-map-button');
const storyMapStatus = document.querySelector('#story-map-status');
const worldMap = document.querySelector('#world-map');
const worldMapWorld = document.querySelector('#world-map-world');
const worldMapFrog = document.querySelector('#world-map-frog');
const worldMapDeferredImages = [...document.querySelectorAll('[data-map-src]')];
const worldMapPrompt = document.querySelector('#world-map-prompt');
const worldMapPromptKicker = document.querySelector('#world-map-prompt-kicker');
const worldMapStageName = document.querySelector('#world-map-stage-name');
const worldMapCategory = document.querySelector('#world-map-category');
const worldMapHelp = document.querySelector('#world-map-help');
const worldMuseum = document.querySelector('#world-museum');
const worldResistanceNpc = document.querySelector('#world-resistance-npc');
const resistanceDialog = document.querySelector('#resistance-dialog');
const resistanceDialogKicker = document.querySelector('#resistance-dialog-kicker');
const resistanceDialogTitle = document.querySelector('#resistance-dialog-title');
const resistanceDialogCopy = document.querySelector('#resistance-dialog-copy');
const resistanceDialogLeave = document.querySelector('#resistance-dialog-leave');
const resistanceDialogNext = document.querySelector('#resistance-dialog-next');
const difficultyPicker = document.querySelector('.difficulty-picker');
const worldLevelButtons = [...document.querySelectorAll('[data-world-level]')];
const worldMapDirectionButtons = [...document.querySelectorAll('[data-map-direction]')];
const difficultyInputs = [...document.querySelectorAll('input[name="stage-difficulty"]')];
const storyMapTab = document.querySelector('#story-map-tab');
const testAreaTab = document.querySelector('#test-area-tab');
const storyMapCategory = document.querySelector('#story-map-category');
const testAreaCategory = document.querySelector('#test-area-category');
const startBossTestButton = document.querySelector('#start-boss-test');
const frogColorInput = document.querySelector('#frog-color');
const tongueColorInput = document.querySelector('#tongue-color');
const skinPreviewFrog = document.querySelector('#skin-preview-frog');
const skinPreviewTongue = document.querySelector('#skin-preview-tongue');
const skinResetButton = document.querySelector('#skin-reset');
const skinSavedStatus = document.querySelector('#skin-saved');
const saveSlotsContainer = document.querySelector('#save-slots');
const characterCreatorForm = document.querySelector('#character-creator-form');
const characterNameInput = document.querySelector('#character-name');
const characterNameError = document.querySelector('#character-name-error');
const characterPreviewName = document.querySelector('#character-preview-name');
const saveSlotsStatus = document.querySelector('#save-slots-status');
const saveDeleteDialog = document.querySelector('#save-delete-dialog');
const saveDeleteName = document.querySelector('#save-delete-name');
const saveDeleteCancel = document.querySelector('#save-delete-cancel');
const saveDeleteConfirm = document.querySelector('#save-delete-confirm');
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
const resultMenuButton = document.querySelector('#result-menu-button');
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
jumpAudio.preload = 'none';
loseAudio.preload = 'none';

const lowPowerDevice = (navigator.deviceMemory && navigator.deviceMemory <= 4)
    || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    || window.matchMedia('(pointer: coarse)').matches;
document.body.classList.toggle('performance-lite', Boolean(lowPowerDevice));
const RUNTIME_SCENES = ['menu', 'map', 'stage', 'loading', 'result'];

function setRuntimeScene(scene) {
    document.body.classList.remove(...RUNTIME_SCENES.map((name) => `runtime-${name}`));
    document.body.classList.add(`runtime-${scene}`);
}

setRuntimeScene('menu');
const backgroundMusic = document.querySelector('#background-music');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const CONTROL_LAYOUTS = ['classic', 'left-handed', 'arcade'];
const CONTROL_STYLES = ['round', 'pixel', 'leaf'];
const CONTROL_PALETTES = ['forest', 'ocean', 'sunset'];
const gameSettings = readGameSettings();
const STORY_PROGRESS_STORAGE_KEY = 'sapo-story-progress';
const CHARACTER_SLOTS_STORAGE_KEY = 'sapo-character-slots-v1';
const ACTIVE_CHARACTER_SLOT_KEY = 'sapo-active-character-slot';
const CHARACTER_SLOTS_MIGRATED_KEY = 'sapo-character-slots-migrated-v1';
const EMPTY_STORY_PROGRESS = Object.freeze({
    phaseOneComplete: false,
    resistanceEncounterSeen: false,
    resistanceChallengeAccepted: false,
    resistanceDuelWon: false,
});
let characterSlots = readCharacterSlots();
let activeCharacterSlotIndex = readActiveCharacterSlotIndex();
let editingCharacterSlotIndex = -1;
let pendingDeleteSlotIndex = -1;
let storyProgress = readStoryProgress();
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
        startsAt: 30,
        background: 'assets/img/cenario-arvores-planaltos-transparente-v3.png',
        speedScale: 1.08,
        paceLabel: 'Ritmo acelerando',
        obstacleGap: [1.55, 2.1],
        insectGap: [2.45, 3.45],
        obstacles: ['rock', 'wheel', 'ground-beetle', 'rock', 'wheel', 'ground-beetle', 'leaping-beetle', 'leaping-beetle'],
    },
    {
        name: 'Floresta Antiga',
        startsAt: 60,
        background: 'assets/img/cenario-arvores-planaltos-transparente-v3.png',
        speedScale: 1.16,
        paceLabel: 'Corrida veloz',
        obstacleGap: [1.45, 1.98],
        insectGap: [2.22, 3.18],
        obstacles: ['rock', 'wheel', 'ground-beetle', 'wheel', 'ground-beetle', 'leaping-beetle', 'leaping-beetle'],
    },
    {
        name: 'Castelo da Manhã',
        startsAt: 85,
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

const BOOT_ASSET_URLS = [
    'assets/img/menu-floresta-amanhecer-v1.png',
    'assets/img/sapo-capa.png',
    'assets/img/botao-menu-pixel-v1.png',
    'assets/img/botao-inventario-pixel-v1.png',
];

const WORLD_MAP_ASSET_URLS = [
    'assets/img/mapa-mundo-grama-v2.png',
    'assets/img/mapa-arvore-simples-v2.png',
    'assets/img/mapa-rocha-simples-v2.png',
    'assets/img/mapa-museu-brejo-v1.png',
    'assets/img/sapo-resistencia-guarda-v1.png',
];

const AMBIENT_ASSET_URLS = [
    'assets/img/passaro-horizonte-sprites-v1.png',
    PHASES[0].background,
    'assets/img/textura-solo.jpg',
];

const state = {
    mode: 'loading',
    score: 0,
    elapsedTime: 0,
    best: readBestScore(),
    runnerX: 0,
    runnerY: 0,
    runnerFacing: 1,
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
    boss: null,
    bossStarted: false,
    bossDefeated: false,
    isTestArea: false,
    isDuel: false,
    duel: null,
};

const PACE_REFERENCE_SPEED = 270;
const BASE_RUN_SPEED = PACE_REFERENCE_SPEED * 1.1;
const RUN_SPEED_GAIN = 170;
const GRAVITY = 1850;
const JUMP_FORCE = 820;
const ATTACK_DURATION = 560;
const ATTACK_COOLDOWN = 3000;
const ATTACK_CAPTURE_CLOSE = 290;
const ATTACK_RETRACT_AT = 320;
const ATTACK_SWALLOW_AT = 485;
const JOURNEY_DURATION = 120;
const BOSS_START_TIME = 88;
const BOSS_MAX_HEALTH = 5;
const BOSS_ATTACK_STAGE_MS = 3600;
const BOSS_TIRED_STAGE_MS = 2800;
const BOSS_RECOVER_MS = 650;
const BOSS_RAGE_WINDUP_MS = 900;
const BOSS_RAGE_CHARGE_MS = 760;
const BOSS_RAGE_RETURN_MS = 900;
const DUEL_MAX_HEALTH = 5;
const DUEL_TONGUE_WINDUP_MS = 360;
const DUEL_TONGUE_DURATION_MS = 700;
const DUEL_TONGUE_HIT_START_MS = 170;
const DUEL_TONGUE_HIT_END_MS = 390;
const DUEL_RECOVER_MS = 620;
const DUEL_DODGE_COOLDOWN_MS = 1900;
const DUEL_MOVE_SPEED = 132;
const DUEL_GRAVITY = 2200;
const DUEL_JUMP_FORCE = 730;
const BEE_AIM_DURATION_MS = 520;
const BEE_PREDICTION_SECONDS = 0.18;
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
    '--boss-size': 238,
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

function normalizeStoryProgress(progress = {}) {
    return {
        phaseOneComplete: Boolean(progress.phaseOneComplete),
        resistanceEncounterSeen: Boolean(progress.resistanceEncounterSeen),
        resistanceChallengeAccepted: Boolean(progress.resistanceChallengeAccepted),
        resistanceDuelWon: Boolean(progress.resistanceDuelWon),
    };
}

function normalizeCharacterSlot(slot) {
    if (!slot || typeof slot !== 'object') return null;
    const name = String(slot.name || '').trim().replace(/\s+/g, ' ').slice(0, 16);
    if (name.length < 2) return null;
    const validColor = (value, fallback) => /^#[0-9a-f]{6}$/i.test(value || '') ? value : fallback;
    return {
        name,
        frog: validColor(slot.frog, '#69b83f'),
        tongue: validColor(slot.tongue, '#e75f86'),
        best: Math.max(0, Number.parseInt(slot.best || '0', 10) || 0),
        progress: normalizeStoryProgress(slot.progress),
        createdAt: Number(slot.createdAt) || Date.now(),
        lastPlayedAt: Number(slot.lastPlayedAt) || Number(slot.createdAt) || Date.now(),
    };
}

function readCharacterSlots() {
    try {
        const stored = JSON.parse(localStorage.getItem(CHARACTER_SLOTS_STORAGE_KEY) || '[]');
        return Array.from({ length: 3 }, (_, index) => normalizeCharacterSlot(stored[index]));
    } catch {
        return [null, null, null];
    }
}

function readActiveCharacterSlotIndex() {
    try {
        const index = Number.parseInt(localStorage.getItem(ACTIVE_CHARACTER_SLOT_KEY) || '-1', 10);
        return index >= 0 && index < 3 ? index : -1;
    } catch {
        return -1;
    }
}

function activeCharacterSlot() {
    return activeCharacterSlotIndex >= 0 ? characterSlots[activeCharacterSlotIndex] : null;
}

function persistCharacterSlots() {
    try {
        localStorage.setItem(CHARACTER_SLOTS_STORAGE_KEY, JSON.stringify(characterSlots));
        if (activeCharacterSlotIndex >= 0) localStorage.setItem(ACTIVE_CHARACTER_SLOT_KEY, String(activeCharacterSlotIndex));
        else localStorage.removeItem(ACTIVE_CHARACTER_SLOT_KEY);
    } catch {
        // A sessão continua mesmo quando o navegador bloqueia o armazenamento local.
    }
}

function readLegacyBestScore() {
    try {
        return Math.max(0, Number.parseInt(localStorage.getItem('sapo-best-score') || '0', 10) || 0);
    } catch {
        return 0;
    }
}

function readBestScore() {
    return activeCharacterSlot()?.best ?? readLegacyBestScore();
}

function saveBestScore(score) {
    const normalizedScore = Math.max(0, Math.floor(score));
    const slot = activeCharacterSlot();
    if (slot) {
        slot.best = normalizedScore;
        slot.lastPlayedAt = Date.now();
        persistCharacterSlots();
    }
    try {
        localStorage.setItem('sapo-best-score', String(normalizedScore));
    } catch {
        // O jogo continua normalmente quando o navegador bloqueia o armazenamento local.
    }
}

function readLegacyStoryProgress() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORY_PROGRESS_STORAGE_KEY) || '{}');
        const legacyCompletion = readLegacyBestScore() >= 350;
        return {
            ...normalizeStoryProgress(stored),
            phaseOneComplete: Boolean(stored.phaseOneComplete) || legacyCompletion,
        };
    } catch {
        return { ...EMPTY_STORY_PROGRESS, phaseOneComplete: readLegacyBestScore() >= 350 };
    }
}

function readStoryProgress() {
    return activeCharacterSlot()?.progress ? normalizeStoryProgress(activeCharacterSlot().progress) : readLegacyStoryProgress();
}

function saveStoryProgress() {
    const slot = activeCharacterSlot();
    if (slot) {
        slot.progress = normalizeStoryProgress(storyProgress);
        slot.lastPlayedAt = Date.now();
        persistCharacterSlots();
    }
    try {
        localStorage.setItem(STORY_PROGRESS_STORAGE_KEY, JSON.stringify(storyProgress));
    } catch {
        // A progressão continua na sessão mesmo quando o armazenamento local está bloqueado.
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
    routeTimeDisplay.textContent = state.isTestArea
        ? `TESTE · ${formatTime(Math.max(0, state.elapsedTime - BOSS_START_TIME))}`
        : `${formatTime(state.elapsedTime)} / ${formatTime(JOURNEY_DURATION)}`;
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
    if (!bootReady) return;
    indieIntro.classList.remove('is-visible');
    indieIntro.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('has-indie-intro');
    gameShell.removeAttribute('inert');
    orientationGuard.removeAttribute('inert');
    const mainMenuButton = document.querySelector('[data-menu-screen="main"] button:not(:disabled)');
    window.requestAnimationFrame(() => {
        fitMenuToViewport();
        mainMenuButton?.focus({ preventScroll: true });
    });
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
        if (state.isDuel && performance.now() >= state.attackUntil) state.runnerFacing = direction;
    }
    runnerLayer.classList.toggle('is-retreating', direction < 0);
    runnerLayer.classList.toggle('is-advancing', direction > 0);
    runnerLayer.classList.toggle('faces-left', state.isDuel && state.runnerFacing < 0);
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
    bossLayer.replaceChildren();
    bossHud.classList.remove('is-visible');
    bossHud.setAttribute('aria-hidden', 'true');
}

function updateBossHud() {
    const health = state.boss?.health ?? BOSS_MAX_HEALTH;
    bossHealthFill.style.width = `${clamp(health / BOSS_MAX_HEALTH, 0, 1) * 100}%`;
    bossHealthText.textContent = `${Math.max(0, health)}/${BOSS_MAX_HEALTH}`;
}

function startBoss(currentTime) {
    if (state.bossStarted) return;
    state.bossStarted = true;
    clearActors();

    const element = document.createElement('div');
    element.className = 'boss-bee is-entering';
    bossLayer.append(element);
    state.boss = {
        element,
        health: BOSS_MAX_HEALTH,
        stage: 'entering',
        stageStartedAt: currentTime,
        nextStageAt: currentTime + 1800,
        nextSpawnAt: currentTime + 2300,
        lastHitAttack: 0,
        defeatedAt: 0,
        rageHitResolved: false,
    };
    bossHud.classList.add('is-visible');
    bossHud.setAttribute('aria-hidden', 'false');
    updateBossHud();
    showPhaseBanner(state.phaseIndex);
    phaseKicker.textContent = 'CHEFÃ FINAL';
    phaseName.textContent = 'Super Abelha Monstro';
    setStatus('A Super Abelha chegou! Desvie das crias e espere ela se cansar.');
}

function spawnBossBee(currentTime) {
    const boss = state.boss;
    if (!boss || boss.stage !== 'attacking') return;
    const boardBox = boardMetrics();
    const element = document.createElement('div');
    element.className = 'insect insect--high insect--bee';
    collectibleLayer.append(element);
    const insectBox = element.getBoundingClientRect();
    const startY = boardBox.height * 0.34 + Math.sin(currentTime / 310) * boardBox.height * 0.08;
    const insect = {
        element,
        x: boardBox.width * 0.76,
        y: startY,
        speedScale: 0.9,
        bobPhase: Math.random() * 0.6,
        species: 'bee',
        flightPattern: 'bee-zigzag',
        flightStage: 'zigzag',
        flightStageStartedAt: currentTime,
        bobAmplitude: Math.max(38, boardBox.height * 0.065),
        bobSpeed: 125,
        minimumY: boardBox.height * 0.29,
        maximumY: boardBox.height * 0.58 - insectBox.height * 0.1,
        horizontalDrift: Math.min(20, boardBox.width * 0.016),
        renderedY: startY,
        aimY: null,
        diveFromY: null,
        diveTargetY: null,
        diveStartX: null,
        diveTargetX: null,
        caught: false,
    };
    state.insects.push(insect);
    renderInsect(insect, currentTime);
    createCaptureFlash(boardBox.width * 0.78, startY + insectBox.height * 0.5);
    setStatus('A chefã soltou uma abelha!');
}

function tongueHitsBoss(currentTime) {
    const boss = state.boss;
    if (
        !boss
        || boss.stage !== 'tired'
        || boss.lastHitAttack === state.attackStartedAt
        || currentTime > state.attackUntil
        || currentTime - state.attackStartedAt > ATTACK_CAPTURE_CLOSE
    ) return false;

    const tongueBox = runnerAttack.getBoundingClientRect();
    const bossBox = boss.element.getBoundingClientRect();
    return (
        bossBox.right > tongueBox.left + tongueBox.width * 0.2
        && bossBox.left < tongueBox.right - tongueBox.width * 0.02
        && bossBox.bottom > tongueBox.top + tongueBox.height * 0.3
        && bossBox.top < tongueBox.bottom - tongueBox.height * 0.2
    );
}

function damageBoss(currentTime) {
    const boss = state.boss;
    if (!boss) return;
    boss.lastHitAttack = state.attackStartedAt;
    boss.health -= 1;
    state.score += 75;
    boss.element.classList.remove('is-hurt');
    void boss.element.offsetWidth;
    boss.element.classList.add('is-hurt');
    window.setTimeout(() => {
        if (state.boss === boss && boss.stage !== 'defeated') boss.element.classList.remove('is-hurt');
    }, 360);
    updateBossHud();
    const bossBox = boss.element.getBoundingClientRect();
    const boardBox = boardMetrics();
    createCaptureFlash(bossBox.left - boardBox.left + bossBox.width * 0.35, bossBox.top - boardBox.top + bossBox.height * 0.5);

    if (boss.health <= 0) {
        boss.stage = 'defeated';
        boss.defeatedAt = currentTime;
        state.bossDefeated = true;
        boss.element.classList.remove('is-tired');
        boss.element.classList.add('is-defeated');
        state.score += 300;
        setStatus('Super Abelha derrotada!');
        return;
    }

    const landedHits = BOSS_MAX_HEALTH - boss.health;
    boss.element.classList.remove('is-tired', 'is-attacking');
    boss.stageStartedAt = currentTime;
    boss.nextSpawnAt = currentTime + 1050;

    if (landedHits === 3) {
        state.insects.forEach((insect) => insect.element.remove());
        state.insects = [];
        collectibleLayer.replaceChildren();
        boss.stage = 'rage-windup';
        boss.nextStageAt = currentTime + BOSS_RAGE_WINDUP_MS;
        boss.rageHitResolved = false;
        boss.element.classList.add('is-rage-windup');
        setStatus('Ela ficou furiosa! Prepare o pulo: o ferrão vem em sua direção!');
        return;
    }

    boss.stage = 'recovering';
    boss.nextStageAt = currentTime + BOSS_RECOVER_MS;
    boss.element.classList.add('is-recovering');
    setStatus(`Golpe certeiro! Ela despertou. Restam ${boss.health} pontos de vida.`);
}

function bossChargeHitsRunner() {
    const runnerBox = runner.getBoundingClientRect();
    const bossBox = state.boss?.element.getBoundingClientRect();
    if (!bossBox) return false;

    const runnerInsetX = runnerBox.width * 0.3;
    const runnerInsetTop = runnerBox.height * (isRunnerCrouched() ? 0.48 : 0.2);
    const runnerInsetBottom = runnerBox.height * 0.18;
    const bossInsetLeft = bossBox.width * 0.13;
    const bossInsetRight = bossBox.width * 0.03;
    const bossInsetTop = bossBox.height * 0.17;
    const bossInsetBottom = bossBox.height * 0.11;

    return (
        runnerBox.right - runnerInsetX > bossBox.left + bossInsetLeft
        && runnerBox.left + runnerInsetX < bossBox.right - bossInsetRight
        && runnerBox.bottom - runnerInsetBottom > bossBox.top + bossInsetTop
        && runnerBox.top + runnerInsetTop < bossBox.bottom - bossInsetBottom
    );
}

function updateBoss(currentTime) {
    const boss = state.boss;
    if (!boss) return false;
    const boardBox = boardMetrics();

    if (boss.stage === 'entering' && currentTime >= boss.nextStageAt) {
        boss.stage = 'attacking';
        boss.stageStartedAt = currentTime;
        boss.nextStageAt = currentTime + BOSS_ATTACK_STAGE_MS;
        boss.element.classList.remove('is-entering');
        boss.element.classList.add('is-attacking');
    } else if (boss.stage === 'recovering' && currentTime >= boss.nextStageAt) {
        boss.stage = 'attacking';
        boss.stageStartedAt = currentTime;
        boss.nextStageAt = currentTime + BOSS_ATTACK_STAGE_MS;
        boss.nextSpawnAt = currentTime + 700;
        boss.element.classList.remove('is-recovering', 'is-hurt');
        boss.element.classList.add('is-attacking');
        setStatus('Ela voltou ao alto e chamou mais abelhas!');
    } else if (boss.stage === 'attacking') {
        if (currentTime >= boss.nextSpawnAt) {
            spawnBossBee(currentTime);
            boss.nextSpawnAt = currentTime + 1900 + Math.random() * 750;
        }
        if (currentTime >= boss.nextStageAt) {
            boss.stage = 'tired';
            boss.stageStartedAt = currentTime;
            boss.nextStageAt = currentTime + BOSS_TIRED_STAGE_MS;
            boss.element.classList.remove('is-attacking');
            boss.element.classList.add('is-tired');
            setStatus('Ela se cansou e baixou a guarda! Use a língua!');
        }
    } else if (boss.stage === 'tired' && currentTime >= boss.nextStageAt) {
        boss.stage = 'attacking';
        boss.stageStartedAt = currentTime;
        boss.nextStageAt = currentTime + BOSS_ATTACK_STAGE_MS;
        boss.nextSpawnAt = currentTime + 900;
        boss.element.classList.remove('is-tired', 'is-hurt');
        boss.element.classList.add('is-attacking');
        setStatus('A Super Abelha recuperou o fôlego!');
    } else if (boss.stage === 'rage-windup' && currentTime >= boss.nextStageAt) {
        boss.stage = 'rage-charge';
        boss.stageStartedAt = currentTime;
        boss.nextStageAt = currentTime + BOSS_RAGE_CHARGE_MS;
        boss.rageHitResolved = false;
        boss.element.classList.remove('is-rage-windup', 'is-hurt');
        boss.element.classList.add('is-rage-charge');
        setStatus('Pule agora! A Super Abelha lançou o ferrão!');
    } else if (boss.stage === 'rage-charge' && currentTime >= boss.nextStageAt) {
        boss.stage = 'rage-return';
        boss.stageStartedAt = currentTime;
        boss.nextStageAt = currentTime + BOSS_RAGE_RETURN_MS;
        boss.element.classList.remove('is-rage-charge');
        boss.element.classList.add('is-rage-return');
        setStatus('Ela errou a investida e está voltando para o alto.');
    } else if (boss.stage === 'rage-return' && currentTime >= boss.nextStageAt) {
        boss.stage = 'attacking';
        boss.stageStartedAt = currentTime;
        boss.nextStageAt = currentTime + BOSS_ATTACK_STAGE_MS;
        boss.nextSpawnAt = currentTime + 700;
        boss.element.classList.remove('is-rage-return');
        boss.element.classList.add('is-attacking');
        setStatus('A Super Abelha voltou ao ataque e chamou mais abelhas!');
    }

    if (tongueHitsBoss(currentTime)) damageBoss(currentTime);

    const targetX = boardBox.width * 0.7;
    const entryProgress = boss.stage === 'entering'
        ? clamp((currentTime - boss.stageStartedAt) / 1800, 0, 1)
        : 1;
    let x = boardBox.width + boardBox.width * 0.1 + (targetX - boardBox.width * 1.1) * entryProgress;
    const highY = boardBox.height * 0.23 + Math.sin(currentTime / 420) * boardBox.height * 0.045;
    const tiredY = boardBox.height * 0.58 + Math.sin(currentTime / 540) * 5;
    const chargeY = boardBox.height * 0.55;
    let y = boss.stage === 'tired' || boss.stage === 'defeated' ? tiredY : highY;

    if (boss.stage === 'recovering') {
        const progress = clamp((currentTime - boss.stageStartedAt) / BOSS_RECOVER_MS, 0, 1);
        const eased = 1 - ((1 - progress) * (1 - progress));
        y = tiredY + (highY - tiredY) * eased;
    } else if (boss.stage === 'rage-windup') {
        const progress = clamp((currentTime - boss.stageStartedAt) / BOSS_RAGE_WINDUP_MS, 0, 1);
        y = tiredY + (highY - tiredY) * progress;
    } else if (boss.stage === 'rage-charge') {
        const progress = clamp((currentTime - boss.stageStartedAt) / BOSS_RAGE_CHARGE_MS, 0, 1);
        const eased = progress * progress;
        x = targetX + (boardBox.width * 0.1 - targetX) * eased;
        y = highY + (chargeY - highY) * Math.min(1, progress * 2.2);

        boss.element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

        if (!boss.rageHitResolved && progress >= 0.28 && bossChargeHitsRunner()) {
            boss.rageHitResolved = true;
            if (state.mode === 'playing') {
                endGame('boss-sting');
                return true;
            }
        } else if (!boss.rageHitResolved && progress >= 0.92) {
            boss.rageHitResolved = true;
            setStatus('Investida evitada! O ferrão passou longe do sapo.');
        }
    } else if (boss.stage === 'rage-return') {
        const progress = clamp((currentTime - boss.stageStartedAt) / BOSS_RAGE_RETURN_MS, 0, 1);
        x = boardBox.width * 0.1 + (targetX - boardBox.width * 0.1) * progress;
        y = chargeY + (highY - chargeY) * progress;
    }

    if (boss.stage !== 'rage-charge') {
        boss.element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    }
    return false;
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
    state.boss = null;
    state.bossStarted = false;
    state.bossDefeated = false;
    state.isTestArea = false;
    state.isDuel = false;
    state.duel = null;
    state.runnerFacing = 1;
    board.classList.remove('is-duel');
    runnerLayer.classList.remove('faces-left');
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
    { name: 'Rota da Manhã', category: 'Corrida', x: 29, y: 80, unlocked: true, playable: true },
    { name: 'Bosque dos Cogumelos', category: 'Luta livre', x: 68, y: 82, unlocked: false, playable: false },
    { name: 'Pedreira Musgosa', category: 'Corrida', x: 84, y: 57, unlocked: false, playable: false },
    { name: 'Clareira dos Ventos', category: 'Luta livre', x: 68, y: 27, unlocked: false, playable: false },
    { name: 'Vale das Folhas', category: 'Corrida', x: 37, y: 20, unlocked: false, playable: false },
    { name: 'Coração da Mata', category: 'Luta livre', x: 13, y: 46, unlocked: false, playable: false },
];

const WORLD_MAP_SCALE = 2;
const WORLD_LEVEL_REACH = 4.8;
const WORLD_MUSEUM = { name: 'Museu da Mata', x: 55, y: 84 };
const WORLD_MUSEUM_REACH = 10.5;
const WORLD_RESISTANCE_NPC = { name: 'Sapo encapuzado', x: 74, y: 85 };
const WORLD_RESISTANCE_NPC_REACH = 6.8;
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
    viewportWidth: 0,
    viewportHeight: 0,
    worldWidth: 0,
    worldHeight: 0,
    facing: 1,
    depth: 0,
    renderedFrogX: Number.NaN,
    renderedFrogY: Number.NaN,
    renderedFacing: Number.NaN,
    renderedCameraX: Number.NaN,
    renderedCameraY: Number.NaN,
    proximitySignature: '',
    pressed: new Set(),
    frame: 0,
    previousTime: 0,
    ready: false,
    nearestLevel: 0,
    avoidanceSign: 0,
    nearResistanceNpc: false,
    resistanceApproachStage: 0,
};

const RESISTANCE_DIALOGUE = [
    {
        kicker: 'Depois da vitória',
        speaker: 'Sapo encapuzado',
        copy: 'Oh, eu vi você derrotar aquela abelha monstro. Acho que você tem potencial.',
        action: 'Continuar',
    },
    {
        kicker: 'Frente do Brejo Livre',
        speaker: 'Rubro',
        copy: 'Pode me chamar de Rubro. Faço parte da Frente do Brejo Livre, uma organização de sapos cansada de sofrer sob as patas do Império dos Ratos.',
        action: 'Continuar',
    },
    {
        kicker: 'Um desafio',
        speaker: 'Rubro',
        copy: 'Quero descobrir como você luta quando não está correndo. Aceita um combate comigo?',
        action: 'Aceitar o desafio',
    },
    {
        kicker: 'Desafio aceito',
        speaker: 'Rubro',
        copy: 'Então vamos usar a floresta onde sua jornada começou. Sem corrida: só nós dois e espaço para lutar.',
        action: 'Começar luta',
    },
];
let resistanceDialogueStep = 0;
let worldMapResizeFrame = 0;

function syncResistanceNpc() {
    if (!worldResistanceNpc) return;
    WORLD_LEVELS[1].unlocked = storyProgress.phaseOneComplete;
    const phaseTwoButton = worldLevelButtons[1];
    phaseTwoButton?.classList.toggle('is-unlocked', storyProgress.phaseOneComplete);
    phaseTwoButton?.classList.toggle('is-locked', !storyProgress.phaseOneComplete);
    phaseTwoButton?.setAttribute(
        'aria-label',
        storyProgress.phaseOneComplete
            ? 'Fase 2, Bosque dos Cogumelos, categoria Luta livre, desbloqueada e em construção'
            : 'Fase 2, Bosque dos Cogumelos, categoria Luta livre, bloqueada',
    );
    worldResistanceNpc.hidden = !storyProgress.phaseOneComplete;
    worldResistanceNpc.setAttribute('aria-hidden', String(!storyProgress.phaseOneComplete));
    worldResistanceNpc.classList.toggle('is-challenge-ready', storyProgress.resistanceChallengeAccepted);
    worldMapState.proximitySignature = '';
}

function renderResistanceDialogue() {
    const line = RESISTANCE_DIALOGUE[resistanceDialogueStep];
    resistanceDialogKicker.textContent = line.kicker;
    resistanceDialogTitle.textContent = line.speaker;
    resistanceDialogCopy.textContent = line.copy;
    resistanceDialogNext.textContent = line.action;
    resistanceDialogLeave.hidden = resistanceDialogueStep === RESISTANCE_DIALOGUE.length - 1;
}

function positionResistanceDialogue() {
    if (!resistanceDialog?.open || !worldResistanceNpc) return;
    const npcRect = worldResistanceNpc.getBoundingClientRect();
    const bubbleWidth = Math.min(390, window.innerWidth - 24);
    const bubbleHeight = resistanceDialog.offsetHeight || 190;
    const desiredLeft = npcRect.left + npcRect.width * 0.5;
    const left = clamp(desiredLeft, bubbleWidth * 0.5 + 10, window.innerWidth - bubbleWidth * 0.5 - 10);
    const top = clamp(npcRect.top - 10, bubbleHeight + 12, window.innerHeight - 20);
    const tail = clamp(desiredLeft - (left - bubbleWidth * 0.5), 30, bubbleWidth - 30);
    resistanceDialog.style.setProperty('--dialog-left', `${left}px`);
    resistanceDialog.style.setProperty('--dialog-top', `${top}px`);
    resistanceDialog.style.setProperty('--dialog-tail', `${tail}px`);
}

function openResistanceDialogue() {
    if (!storyProgress.phaseOneComplete || !resistanceDialog || resistanceDialog.open) return;
    resistanceDialogueStep = storyProgress.resistanceChallengeAccepted ? RESISTANCE_DIALOGUE.length - 1 : 0;
    storyProgress.resistanceEncounterSeen = true;
    saveStoryProgress();
    renderResistanceDialogue();
    worldMapState.pressed.clear();
    resistanceDialog.showModal();
    window.requestAnimationFrame(() => {
        positionResistanceDialogue();
        resistanceDialogNext.focus({ preventScroll: true });
    });
}

function advanceResistanceDialogue() {
    if (resistanceDialogueStep === 2) {
        storyProgress.resistanceChallengeAccepted = true;
        saveStoryProgress();
        worldResistanceNpc?.classList.add('is-challenge-ready');
        resistanceDialogueStep = 3;
        renderResistanceDialogue();
        return;
    }
    if (resistanceDialogueStep < RESISTANCE_DIALOGUE.length - 1) {
        resistanceDialogueStep += 1;
        renderResistanceDialogue();
        return;
    }
    resistanceDialog.close();
    startResistanceDuel();
}

function handleResistanceNpcInteraction() {
    if (!storyProgress.phaseOneComplete) return;
    if (worldMapState.nearResistanceNpc) {
        openResistanceDialogue();
        return;
    }
    const needsMuseumDetour = worldMapState.x < 63;
    worldMapState.resistanceApproachStage = needsMuseumDetour ? 1 : 2;
    worldMapState.targetX = needsMuseumDetour ? 62 : WORLD_RESISTANCE_NPC.x;
    worldMapState.targetY = needsMuseumDetour ? 70 : WORLD_RESISTANCE_NPC.y;
    storyMapStatus.textContent = 'Caminhando até o sapo encapuzado...';
    wakeWorldMapNavigation();
}

function refreshWorldMapMetrics() {
    const viewportWidth = Math.max(1, worldMap.clientWidth);
    const viewportHeight = Math.max(1, worldMap.clientHeight);
    worldMapState.viewportWidth = viewportWidth;
    worldMapState.viewportHeight = viewportHeight;
    worldMapState.worldWidth = viewportWidth * WORLD_MAP_SCALE;
    worldMapState.worldHeight = viewportHeight * WORLD_MAP_SCALE;
    return worldMapMetrics();
}

function worldMapMetrics() {
    if (!worldMapState.viewportWidth || !worldMapState.viewportHeight) return refreshWorldMapMetrics();
    return {
        viewportWidth: worldMapState.viewportWidth,
        viewportHeight: worldMapState.viewportHeight,
        worldWidth: worldMapState.worldWidth,
        worldHeight: worldMapState.worldHeight,
    };
}

function renderWorldMapCamera(frogX, frogY) {
    const { viewportWidth, viewportHeight, worldWidth, worldHeight } = worldMapMetrics();
    worldMapState.cameraX = Math.round(clamp(viewportWidth * 0.5 - frogX, viewportWidth - worldWidth, 0));
    worldMapState.cameraY = Math.round(clamp(viewportHeight * 0.5 - frogY, viewportHeight - worldHeight, 0));
    if (
        worldMapState.cameraX !== worldMapState.renderedCameraX
        || worldMapState.cameraY !== worldMapState.renderedCameraY
    ) {
        worldMapState.renderedCameraX = worldMapState.cameraX;
        worldMapState.renderedCameraY = worldMapState.cameraY;
        worldMapWorld.style.transform = `translate3d(${worldMapState.cameraX}px, ${worldMapState.cameraY}px, 0)`;
    }
}

function renderWorldMapFrog() {
    const { worldWidth, worldHeight } = worldMapMetrics();
    const frogX = Math.round(worldWidth * worldMapState.x / 100);
    const frogY = Math.round(worldHeight * worldMapState.y / 100);
    const depth = 100 + Math.round(worldMapState.y);
    if (
        frogX !== worldMapState.renderedFrogX
        || frogY !== worldMapState.renderedFrogY
        || worldMapState.facing !== worldMapState.renderedFacing
    ) {
        worldMapState.renderedFrogX = frogX;
        worldMapState.renderedFrogY = frogY;
        worldMapState.renderedFacing = worldMapState.facing;
        worldMapFrog.style.transform = `translate3d(${frogX}px, ${frogY}px, 0) translate(-50%, -86%) scaleX(${worldMapState.facing})`;
    }
    if (depth !== worldMapState.depth) {
        worldMapState.depth = depth;
        worldMapFrog.style.zIndex = String(depth);
    }
    renderWorldMapCamera(frogX, frogY);
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
    const resistanceDistance = Math.hypot(
        worldMapState.x - WORLD_RESISTANCE_NPC.x,
        (worldMapState.y - WORLD_RESISTANCE_NPC.y) * 1.35,
    );
    worldMapState.nearResistanceNpc = storyProgress.phaseOneComplete
        && resistanceDistance < WORLD_RESISTANCE_NPC_REACH;
    worldResistanceNpc?.classList.toggle('is-near', worldMapState.nearResistanceNpc);
    const target = isNearMuseum ? WORLD_MUSEUM : level;
    const hasNearbyTarget = isNearMuseum || isNear;

    if (hasNearbyTarget) renderWorldMapPrompt(target);
    const proximitySignature = [
        nearestIndex,
        isNear,
        isNearMuseum,
        worldMapState.nearResistanceNpc,
        worldMapState.ready,
        level.unlocked,
        level.playable,
        selectedDifficulty,
    ].join(':');
    if (proximitySignature === worldMapState.proximitySignature) return;
    worldMapState.proximitySignature = proximitySignature;

    worldMapPrompt.classList.toggle('is-visible', hasNearbyTarget);
    worldMapPrompt.setAttribute('aria-hidden', String(!hasNearbyTarget));
    worldMuseum?.classList.toggle('is-near', isNearMuseum);
    worldMapPromptKicker.textContent = isNearMuseum ? 'Local encontrado' : 'Fase encontrada';
    worldMapStageName.textContent = target.name;
    worldMapCategory.hidden = isNearMuseum;
    if (!isNearMuseum) worldMapCategory.textContent = `Categoria · ${level.category}`;
    storyMapButton.dataset.action = isNearMuseum ? 'museum' : 'level';
    storyMapButton.disabled = !worldMapState.ready || !hasNearbyTarget || (!isNearMuseum && !level.playable);
    storyMapButton.hidden = !isNearMuseum && !level.playable;
    storyMapButton.innerHTML = isNearMuseum
        ? '<span aria-hidden="true">◆</span> Entrar no museu'
        : '<span aria-hidden="true">▶</span> Entrar na fase';
    difficultyPicker.hidden = isNearMuseum || !level.playable;

    if (!worldMapState.ready) storyMapStatus.textContent = 'Preparando o mapa...';
    else if (isNearMuseum) storyMapStatus.textContent = 'Documentário da Rota da Manhã';
    else if (worldMapState.nearResistanceNpc) storyMapStatus.textContent = 'Pressione E para conversar com o sapo encapuzado';
    else if (!isNear) storyMapStatus.textContent = 'Caminhe até uma marca de fase ou até o museu';
    else if (!level.unlocked) storyMapStatus.textContent = 'Em construção · em breve';
    else if (!level.playable) storyMapStatus.textContent = 'Fase desbloqueada · conteúdo em construção';
    else storyMapStatus.textContent = `${DIFFICULTIES[selectedDifficulty].label} selecionado · pronto`;
}

function activateWorldMapTarget() {
    if (storyMapButton.disabled || state.mode === 'loading') return;
    if (storyMapButton.dataset.action === 'museum') showMenuScreen('museum');
    else startGame();
}

function worldMapLoop(currentTime) {
    worldMapState.frame = 0;
    if (activeMenuScreen !== 'maps' || storyMapCategory.hidden || !overlay.classList.contains('is-visible')) {
        worldMapFrog.classList.remove('is-walking');
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
        worldMapState.resistanceApproachStage = 0;
        const length = Math.hypot(directionX, directionY) || 1;
        moved = moveWorldMapFrog((directionX / length) * 12.5 * delta, (directionY / length) * 17 * delta);
    } else if (worldMapState.targetX !== null && worldMapState.targetY !== null) {
        const dx = worldMapState.targetX - worldMapState.x;
        const dy = worldMapState.targetY - worldMapState.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 0.7) {
            if (worldMapState.resistanceApproachStage === 1) {
                worldMapState.resistanceApproachStage = 2;
                worldMapState.targetX = WORLD_RESISTANCE_NPC.x;
                worldMapState.targetY = WORLD_RESISTANCE_NPC.y;
            } else {
                worldMapState.targetX = null;
                worldMapState.targetY = null;
                worldMapState.resistanceApproachStage = 0;
            }
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
                worldMapState.resistanceApproachStage = 0;
            }
        }
    }

    const isMoving = Boolean(directionX || directionY) && moved;
    if (directionX) {
        const nextFacing = directionX < 0 ? -1 : 1;
        if (nextFacing !== worldMapState.facing) {
            worldMapState.facing = nextFacing;
            worldMapFrog.style.setProperty('--map-facing', String(nextFacing));
        }
    }
    worldMapFrog.classList.toggle('is-walking', isMoving);
    const shouldContinue = worldMapState.pressed.size > 0
        || (worldMapState.targetX !== null && worldMapState.targetY !== null);
    if (moved) {
        renderWorldMapFrog();
        updateWorldMapProximity();
    } else if (!shouldContinue) {
        updateWorldMapProximity();
    }
    if (shouldContinue) worldMapState.frame = window.requestAnimationFrame(worldMapLoop);
}

function wakeWorldMapNavigation() {
    if (worldMapState.frame || activeMenuScreen !== 'maps' || storyMapCategory.hidden) return;
    worldMapState.previousTime = performance.now();
    worldMapState.frame = window.requestAnimationFrame(worldMapLoop);
}

function resizeWorldMapNavigation() {
    worldMapState.viewportWidth = 0;
    worldMapState.viewportHeight = 0;
    worldMapState.renderedFrogX = Number.NaN;
    worldMapState.renderedFrogY = Number.NaN;
    worldMapState.renderedCameraX = Number.NaN;
    worldMapState.renderedCameraY = Number.NaN;
    if (activeMenuScreen !== 'maps') return;
    window.cancelAnimationFrame(worldMapResizeFrame);
    worldMapResizeFrame = window.requestAnimationFrame(() => {
        refreshWorldMapMetrics();
        renderWorldMapFrog();
        updateWorldMapProximity();
    });
}

function startWorldMapNavigation() {
    if (worldMapState.frame) window.cancelAnimationFrame(worldMapState.frame);
    worldMapState.frame = 0;
    refreshWorldMapMetrics();
    renderWorldMapFrog();
    worldMapState.proximitySignature = '';
    updateWorldMapProximity();
    wakeWorldMapNavigation();
    worldMap.focus({ preventScroll: true });
}

function setWorldMapDirection(direction, pressed) {
    if (pressed) {
        worldMapState.pressed.add(direction);
        wakeWorldMapNavigation();
    }
    else worldMapState.pressed.delete(direction);
}

function handleWorldMapKey(event, pressed) {
    if (activeMenuScreen !== 'maps' || !overlay.classList.contains('is-visible')) return false;
    if (resistanceDialog?.open || worldInventoryDialog?.open) return false;
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
    if (pressed && ['Enter', 'Space', 'KeyE'].includes(event.code) && worldMapState.nearResistanceNpc) {
        event.preventDefault();
        openResistanceDialogue();
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
    worldMapState.resistanceApproachStage = 0;
    wakeWorldMapNavigation();
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
    const slot = activeCharacterSlot();
    if (slot) return { frog: slot.frog, tongue: slot.tongue };
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

function clearSkinObjectUrl(key) {
    const previousUrl = skinObjectUrls.get(key);
    if (previousUrl) URL.revokeObjectURL(previousUrl);
    skinObjectUrls.delete(key);
}

function restoreDefaultFrogSkin() {
    FROG_SPRITES.forEach(([property]) => {
        clearSkinObjectUrl(property);
        document.documentElement.style.removeProperty(property);
    });
    clearSkinObjectUrl('cover');
    if (menuFrog) menuFrog.src = 'assets/img/sapo-capa.png';
    skinPreviewFrog.src = 'assets/img/sapo-capa.png';
}

function restoreDefaultTongueSkin() {
    clearSkinObjectUrl('tongue');
    runnerAttack.src = 'assets/img/sapo-lingua-limpa-v3.png';
    skinPreviewTongue.src = 'assets/img/sapo-lingua-limpa-v3.png';
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

    const frogUsesDefaultArt = frogColor.toLowerCase() === DEFAULT_SKIN.frog.toLowerCase();
    const tongueUsesDefaultArt = tongueColor.toLowerCase() === DEFAULT_SKIN.tongue.toLowerCase();
    if (frogChanged && frogUsesDefaultArt) restoreDefaultFrogSkin();
    if (tongueChanged && tongueUsesDefaultArt) restoreDefaultTongueSkin();

    try {
        const [frogSprites, coverUrl, tongueUrl] = await Promise.all([
            frogChanged && !frogUsesDefaultArt ? Promise.all(FROG_SPRITES.map(async ([property, source]) => [property, await recolorImage(source, frogColor, 'frog')])) : Promise.resolve([]),
            frogChanged && !frogUsesDefaultArt ? recolorImage('assets/img/sapo-capa.png', frogColor, 'frog') : Promise.resolve(null),
            tongueChanged && !tongueUsesDefaultArt ? recolorImage('assets/img/sapo-lingua-limpa-v3.png', tongueColor, 'tongue') : Promise.resolve(null),
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
            if (menuFrog) menuFrog.src = coverUrl;
            skinPreviewFrog.src = coverUrl;
        }
        if (tongueUrl) {
            replaceSkinObjectUrl('tongue', tongueUrl);
            runnerAttack.src = tongueUrl;
            skinPreviewTongue.src = tongueUrl;
        }
        lastAppliedSkin = { frog: frogColor, tongue: tongueColor };
        markSelectedPresets(frogColor, tongueColor);
        skinSavedStatus.textContent = showSaved ? 'Prévia atualizada' : 'Aparência carregada';
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

function hasLegacyJourney() {
    try {
        return Boolean(
            localStorage.getItem('sapo-player-name')
            || localStorage.getItem('sapo-skin-colors')
            || localStorage.getItem('sapo-best-score')
            || localStorage.getItem(STORY_PROGRESS_STORAGE_KEY)
        );
    } catch {
        return false;
    }
}

function initializeCharacterSlots() {
    let legacyAlreadyHandled = false;
    try {
        legacyAlreadyHandled = localStorage.getItem(CHARACTER_SLOTS_MIGRATED_KEY) === '1';
    } catch {}

    if (!legacyAlreadyHandled && characterSlots.every((slot) => !slot) && hasLegacyJourney()) {
        const legacySkin = readSkin();
        const legacyName = (readPlayerName() || 'Viajante').slice(0, 16);
        characterSlots[0] = {
            name: legacyName,
            frog: legacySkin.frog,
            tongue: legacySkin.tongue,
            best: readLegacyBestScore(),
            progress: readLegacyStoryProgress(),
            createdAt: Date.now(),
            lastPlayedAt: Date.now(),
        };
        activeCharacterSlotIndex = 0;
        persistCharacterSlots();
    }

    try {
        localStorage.setItem(CHARACTER_SLOTS_MIGRATED_KEY, '1');
    } catch {}

    if (!activeCharacterSlot()) activeCharacterSlotIndex = -1;
    storyProgress = readStoryProgress();
    state.best = readBestScore();
}

function journeyStatus(slot) {
    if (slot.progress.resistanceDuelWon) return 'Duelo vencido';
    if (slot.progress.phaseOneComplete) return 'Rota da Manhã concluída';
    return slot.best > 0 ? 'Jornada em andamento' : 'Ainda no começo';
}

function renderCharacterSlots() {
    if (!saveSlotsContainer) return;
    saveSlotsContainer.replaceChildren();
    characterSlots.forEach((slot, index) => {
        const card = document.createElement('article');
        card.className = `save-slot ${slot ? 'is-occupied' : 'is-empty'}${index === activeCharacterSlotIndex ? ' is-active' : ''}`;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'save-slot__open';
        button.dataset.slotIndex = String(index);

        const number = document.createElement('span');
        number.className = 'save-slot__number';
        number.textContent = `Diário ${index + 1}`;
        button.append(number);

        if (slot) {
            button.setAttribute('aria-label', `Continuar com ${slot.name}. ${journeyStatus(slot)}. Recorde ${slot.best} pontos.`);
            const portrait = document.createElement('span');
            portrait.className = 'save-slot__portrait';
            portrait.innerHTML = '<img src="assets/img/sapo-capa.png" alt="" draggable="false">';
            portrait.style.setProperty('--slot-frog', slot.frog);
            const portraitImage = portrait.querySelector('img');
            recolorImage('assets/img/sapo-capa.png', slot.frog, 'frog').then((portraitUrl) => {
                if (!portraitImage.isConnected) {
                    URL.revokeObjectURL(portraitUrl);
                    return;
                }
                replaceSkinObjectUrl(`slot-portrait-${index}`, portraitUrl);
                portraitImage.src = portraitUrl;
            }).catch(() => {});
            const details = document.createElement('span');
            details.className = 'save-slot__details';
            const name = document.createElement('strong');
            name.textContent = slot.name;
            const status = document.createElement('small');
            status.textContent = journeyStatus(slot);
            const meta = document.createElement('span');
            meta.className = 'save-slot__meta';
            meta.innerHTML = `<i style="--swatch:${slot.frog}" aria-hidden="true"></i><i style="--swatch:${slot.tongue}" aria-hidden="true"></i><b>${formatScore(slot.best)} pts</b>`;
            details.append(name, status, meta);
            button.append(portrait, details);

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'save-slot__delete';
            deleteButton.dataset.deleteSlot = String(index);
            deleteButton.setAttribute('aria-label', `Apagar o personagem ${slot.name}`);
            deleteButton.innerHTML = '<span aria-hidden="true">×</span> Apagar';
            card.append(button, deleteButton);
        } else {
            button.setAttribute('aria-label', `Criar personagem no diário ${index + 1}`);
            const plus = document.createElement('span');
            plus.className = 'save-slot__plus';
            plus.setAttribute('aria-hidden', 'true');
            plus.textContent = '+';
            const details = document.createElement('span');
            details.className = 'save-slot__details';
            details.innerHTML = '<strong>Novo personagem</strong><small>Abrir este diário</small>';
            button.append(plus, details);
            card.append(button);
        }
        saveSlotsContainer.append(card);
    });
}

function openDeleteCharacterDialog(slotIndex) {
    const slot = characterSlots[slotIndex];
    if (!slot || !saveDeleteDialog) return;
    pendingDeleteSlotIndex = slotIndex;
    saveDeleteName.textContent = slot.name;
    saveDeleteDialog.showModal();
    window.requestAnimationFrame(() => saveDeleteCancel.focus({ preventScroll: true }));
}

function clearLegacyJourneyStorage() {
    try {
        localStorage.removeItem('sapo-best-score');
        localStorage.removeItem(STORY_PROGRESS_STORAGE_KEY);
        localStorage.removeItem('sapo-skin-colors');
    } catch {}
}

function mirrorActiveCharacterToLegacyStorage() {
    const slot = activeCharacterSlot();
    if (!slot) {
        clearLegacyJourneyStorage();
        return;
    }
    try {
        localStorage.setItem('sapo-best-score', String(slot.best));
        localStorage.setItem(STORY_PROGRESS_STORAGE_KEY, JSON.stringify(slot.progress));
        localStorage.setItem('sapo-skin-colors', JSON.stringify({ frog: slot.frog, tongue: slot.tongue }));
    } catch {}
}

async function deletePendingCharacter() {
    const deletedIndex = pendingDeleteSlotIndex;
    const deletedSlot = characterSlots[deletedIndex];
    if (!deletedSlot) return;

    characterSlots[deletedIndex] = null;
    if (activeCharacterSlotIndex === deletedIndex) {
        activeCharacterSlotIndex = characterSlots.findIndex(Boolean);
        const fallbackSlot = activeCharacterSlot();
        storyProgress = fallbackSlot ? normalizeStoryProgress(fallbackSlot.progress) : { ...EMPTY_STORY_PROGRESS };
        state.best = fallbackSlot?.best ?? 0;
        const fallbackSkin = fallbackSlot ? { frog: fallbackSlot.frog, tongue: fallbackSlot.tongue } : DEFAULT_SKIN;
        frogColorInput.value = fallbackSkin.frog;
        tongueColorInput.value = fallbackSkin.tongue;
        mirrorActiveCharacterToLegacyStorage();
        applySkinColors(false);
        updateScore();
    }
    persistCharacterSlots();
    pendingDeleteSlotIndex = -1;
    saveDeleteDialog.close('deleted');
    renderCharacterSlots();
    saveSlotsStatus.textContent = `${deletedSlot.name} foi apagado deste aparelho.`;
    const nextFocus = saveSlotsContainer.querySelector(`[data-slot-index="${deletedIndex}"]`) || saveSlotsContainer.querySelector('button');
    nextFocus?.focus({ preventScroll: true });
    fitMenuToViewport();
}

function beginCharacterCreation(slotIndex) {
    editingCharacterSlotIndex = slotIndex;
    characterNameInput.value = '';
    characterNameInput.removeAttribute('aria-invalid');
    characterNameError.textContent = '';
    characterPreviewName.textContent = 'Novo viajante';
    frogColorInput.value = DEFAULT_SKIN.frog;
    tongueColorInput.value = DEFAULT_SKIN.tongue;
    applySkinColors(false);
    showMenuScreen('character');
    window.requestAnimationFrame(() => characterNameInput.focus({ preventScroll: true }));
}

async function activateCharacterSlot(slotIndex) {
    const slot = characterSlots[slotIndex];
    if (!slot) return;
    activeCharacterSlotIndex = slotIndex;
    slot.lastPlayedAt = Date.now();
    persistCharacterSlots();
    storyProgress = normalizeStoryProgress(slot.progress);
    state.best = slot.best;
    frogColorInput.value = slot.frog;
    tongueColorInput.value = slot.tongue;
    await runWorldMapLoading(async () => {
        await applySkinColors(false);
        syncResistanceNpc();
        updateScore();
    });
}

function createCharacter(event) {
    event.preventDefault();
    const name = characterNameInput.value.trim().replace(/\s+/g, ' ').slice(0, 16);
    if (name.length < 2) {
        characterNameInput.setAttribute('aria-invalid', 'true');
        characterNameError.textContent = 'Digite pelo menos 2 caracteres.';
        characterNameInput.focus();
        return;
    }
    if (editingCharacterSlotIndex < 0 || editingCharacterSlotIndex >= characterSlots.length || characterSlots[editingCharacterSlotIndex]) {
        characterNameError.textContent = 'Este diário não está disponível. Volte e escolha outro.';
        return;
    }

    const now = Date.now();
    characterSlots[editingCharacterSlotIndex] = {
        name,
        frog: frogColorInput.value,
        tongue: tongueColorInput.value,
        best: 0,
        progress: { ...EMPTY_STORY_PROGRESS },
        createdAt: now,
        lastPlayedAt: now,
    };
    try {
        localStorage.setItem('sapo-skin-colors', JSON.stringify({ frog: frogColorInput.value, tongue: tongueColorInput.value }));
    } catch {}
    characterNameInput.removeAttribute('aria-invalid');
    characterNameError.textContent = '';
    activateCharacterSlot(editingCharacterSlotIndex);
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
    saves: 'play',
    character: 'saves',
    maps: 'saves',
    profile: 'main',
    credits: 'main',
    museum: 'maps',
    settings: 'main',
};

let activeMenuScreen = 'main';
let bootReady = false;
let stageTransitionPromise = null;
let worldMapAssetsPromise = null;
const assetPreloadCache = new Map();

function ensureWorldMapAssets() {
    if (worldMapState.ready) return Promise.resolve();
    if (worldMapAssetsPromise) return worldMapAssetsPromise;
    storyMapStatus.textContent = 'Preparando o mapa...';
    worldMapAssetsPromise = Promise.allSettled(WORLD_MAP_ASSET_URLS.map(preloadImage)).then(async (results) => {
        worldMapDeferredImages.forEach((image) => {
            if (!image.getAttribute('src')) image.src = image.dataset.mapSrc;
        });
        await Promise.allSettled(worldMapDeferredImages.map((image) => image.decode?.() || Promise.resolve()));
        worldMapState.ready = true;
        updateWorldMapProximity();
        const failed = results.some((result) => result.status === 'rejected');
        if (failed) worldMapHelp.textContent = 'O mapa está pronto. Um detalhe visual pode terminar de carregar durante a caminhada.';
    });
    return worldMapAssetsPromise;
}

function releaseWorldMapRender() {
    if (worldMapState.frame) window.cancelAnimationFrame(worldMapState.frame);
    worldMapState.frame = 0;
    worldMapState.pressed.clear();
    worldMapFrog.classList.remove('is-walking');
    worldMapState.ready = false;
    worldMapAssetsPromise = null;
    worldMapDeferredImages.forEach((image) => image.removeAttribute('src'));
}

function releaseStageRender() {
    clearActors();
    sceneLayers.forEach((layer) => {
        layer.replaceChildren();
        layer.style.removeProperty('--scene-image');
    });
}
let menuFitFrame = 0;

async function syncWorldInventory() {
    if (!worldInventoryDialog) return;
    const slot = activeCharacterSlot();
    const frogColor = slot?.frog || frogColorInput.value || DEFAULT_SKIN.frog;
    const tongueColor = slot?.tongue || tongueColorInput.value || DEFAULT_SKIN.tongue;

    worldInventoryName.textContent = slot?.name || 'Sapinho';
    worldInventoryBest.textContent = formatScore(slot?.best ?? state.best);
    worldInventoryRoute.textContent = storyProgress.phaseOneComplete ? 'Concluída' : 'Em andamento';
    worldInventoryDuel.textContent = storyProgress.resistanceDuelWon
        ? 'Vitória registrada'
        : storyProgress.resistanceChallengeAccepted
            ? 'Desafio aceito'
            : 'Ainda não iniciado';
    worldInventoryFrogColor.style.setProperty('--inventory-swatch', frogColor);
    worldInventoryTongueColor.style.setProperty('--inventory-swatch', tongueColor);

    try {
        const portraitUrl = await recolorImage('assets/img/sapo-capa.png', frogColor, 'frog');
        if (!worldInventoryPortrait.isConnected) {
            URL.revokeObjectURL(portraitUrl);
            return;
        }
        replaceSkinObjectUrl('world-inventory-portrait', portraitUrl);
        worldInventoryPortrait.src = portraitUrl;
    } catch {
        worldInventoryPortrait.src = 'assets/img/sapo-capa.png';
    }
}

async function openWorldInventory() {
    if (!worldInventoryDialog || worldInventoryDialog.open) return;
    await syncWorldInventory();
    worldMapState.pressed.clear();
    worldMapFrog.classList.remove('is-walking');
    worldInventoryDialog.showModal();
    window.requestAnimationFrame(() => worldInventoryClose.focus({ preventScroll: true }));
}

function fitMenuToViewport() {
    window.cancelAnimationFrame(menuFitFrame);
    menuFitFrame = window.requestAnimationFrame(() => {
        if (!overlay.classList.contains('is-visible') || mainMenuShell.classList.contains('is-hidden')) return;
        mainMenuShell.style.setProperty('--menu-fit-scale', '1');
        mainMenuShell.style.setProperty('--menu-fit-top', '0px');
        if (mainMenuShell.classList.contains('is-world-map')) return;
        const overlayStyle = window.getComputedStyle(overlay);
        const availableWidth = overlay.clientWidth - Number.parseFloat(overlayStyle.paddingLeft) - Number.parseFloat(overlayStyle.paddingRight);
        const availableHeight = overlay.clientHeight - Number.parseFloat(overlayStyle.paddingTop) - Number.parseFloat(overlayStyle.paddingBottom);
        const naturalWidth = Math.max(mainMenuShell.offsetWidth, mainMenuShell.scrollWidth);
        const naturalHeight = Math.max(mainMenuShell.offsetHeight, mainMenuShell.scrollHeight);
        const scale = clamp(Math.min(availableWidth / naturalWidth, availableHeight / naturalHeight), 0.34, 1);
        mainMenuShell.style.setProperty('--menu-fit-scale', scale.toFixed(4));
    });
}

function showStoryCategory(category) {
    const showTestArea = category === 'test';
    storyMapCategory.hidden = showTestArea;
    testAreaCategory.hidden = !showTestArea;
    storyMapTab.classList.toggle('is-active', !showTestArea);
    testAreaTab.classList.toggle('is-active', showTestArea);
    storyMapTab.setAttribute('aria-selected', String(!showTestArea));
    testAreaTab.setAttribute('aria-selected', String(showTestArea));
    storyMapTab.tabIndex = showTestArea ? -1 : 0;
    testAreaTab.tabIndex = showTestArea ? 0 : -1;
    worldMapState.pressed.clear();
    worldMapFrog.classList.remove('is-walking');

    if (!showTestArea && activeMenuScreen === 'maps') {
        window.requestAnimationFrame(startWorldMapNavigation);
    }
}

function showMenuScreen(screenName, focusFirst = true) {
    const nextScreen = menuScreens.find((screen) => screen.dataset.menuScreen === screenName);
    if (!nextScreen) return;

    if (screenName !== 'maps' && resistanceDialog?.open) resistanceDialog.close();
    if (screenName !== 'maps' && worldInventoryDialog?.open) worldInventoryDialog.close();

    activeMenuScreen = screenName;
    setRuntimeScene(['maps', 'museum'].includes(screenName) ? 'map' : 'menu');
    menuScreens.forEach((screen) => {
        const isActive = screen === nextScreen;
        screen.hidden = !isActive;
        screen.classList.toggle('is-active', isActive);
    });
    menuBackButton.classList.toggle('is-hidden', screenName === 'main' || screenName === 'maps');
    mainMenuShell.classList.toggle('is-world-map', screenName === 'maps');
    overlay.classList.toggle('is-world-map', screenName === 'maps');
    overlay.scrollTop = 0;
    mainMenuShell.scrollTop = 0;

    if (screenName === 'saves') {
        renderCharacterSlots();
    }

    if (screenName === 'maps') {
        ensureWorldMapAssets();
        syncWorldInventory();
        syncResistanceNpc();
        showStoryCategory('map');
        if (storyProgress.phaseOneComplete && !storyProgress.resistanceEncounterSeen) {
            window.setTimeout(() => {
                if (activeMenuScreen === 'maps' && !resistanceDialog.open) openResistanceDialogue();
            }, 520);
        }
    } else {
        worldMapState.pressed.clear();
        worldMapFrog.classList.remove('is-walking');
    }

    if (focusFirst) {
        const firstControl = nextScreen.querySelector('button:not(:disabled)');
        if (screenName !== 'maps') (firstControl || menuBackButton).focus({ preventScroll: true });
    }
    fitMenuToViewport();
}

function goBackMenu() {
    if (activeMenuScreen === 'character') {
        editingCharacterSlotIndex = -1;
        initializeSkins();
    }
    showMenuScreen(activeMenuScreen === 'maps' ? 'main' : MENU_PARENTS[activeMenuScreen] || 'main');
}

function showMainMenu() {
    window.cancelAnimationFrame(state.animationFrame);
    pauseBackgroundMusic(true);
    clearAttack();
    releaseWorldMapRender();
    releaseStageRender();
    setPlayingControls(false);
    state.mode = 'idle';
    setRuntimeScene('menu');
    mainMenuShell.classList.remove('is-hidden');
    resultCard.classList.add('is-hidden');
    overlay.classList.add('is-visible');
    showMenuScreen('main');
    fitMenuToViewport();
}

function showResultOverlay() {
    setRuntimeScene('result');
    mainMenuShell.classList.add('is-hidden');
    resultCard.classList.remove('is-hidden');
    overlay.classList.remove('is-world-map');
    overlay.classList.add('is-visible');
}

function startGameNow({ testArea = false } = {}) {
    state.difficulty = selectedDifficulty;
    resetRun();
    state.isTestArea = testArea;
    if (testArea) {
        state.elapsedTime = BOSS_START_TIME;
        applyPhase(PHASES.length - 1, false);
    }
    state.mode = 'playing';
    setRuntimeScene('stage');
    playBackgroundMusic(true);
    const startTime = performance.now();
    state.previousTime = startTime;
    overlay.classList.remove('is-visible');
    setPlayingControls(true);
    pauseButton.textContent = 'Pausar';
    pauseButton.setAttribute('aria-label', 'Pausar jogo');
    updateScore();
    if (testArea) startBoss(startTime);
    else setStatus(`Valendo! · ${DIFFICULTIES[state.difficulty].label}`);
    board.focus({ preventScroll: true });
    state.animationFrame = window.requestAnimationFrame(gameLoop);
}

function startResistanceDuelNow() {
    resetRun();
    state.isDuel = true;
    board.classList.add('is-duel');
    applyPhase(0, false);
    state.runnerX = clamp(state.boardWidth * 0.16, 54, 190);
    state.runnerFacing = 1;
    runnerLayer.classList.remove('faces-left');
    renderRunnerPosition();

    const currentTime = performance.now();
    const element = document.createElement('div');
    element.className = 'resistance-duelist is-idle';
    element.setAttribute('aria-hidden', 'true');
    const tongue = document.createElement('img');
    tongue.className = 'resistance-duelist__tongue';
    tongue.src = runnerAttack.currentSrc || runnerAttack.src;
    tongue.alt = '';
    const sprite = document.createElement('span');
    sprite.className = 'resistance-duelist__sprite';
    const callout = document.createElement('span');
    callout.className = 'resistance-duelist__callout';
    callout.setAttribute('aria-hidden', 'true');
    element.append(tongue, sprite, callout);
    bossLayer.append(element);
    state.duel = {
        element,
        sprite,
        tongue,
        callout,
        health: DUEL_MAX_HEALTH,
        homeX: state.boardWidth * 0.72,
        x: state.boardWidth * 0.72,
        y: 0,
        velocityY: 0,
        facing: -1,
        stage: 'moving',
        stageStartedAt: currentTime,
        nextDecisionAt: currentTime + 1850,
        nextDodgeAt: currentTime,
        dodgeInvulnerableUntil: 0,
        dodgePattern: 0,
        lastObservedPlayerAttack: -1,
        lastPlayerX: state.runnerX,
        playerVelocityX: 0,
        tactic: 'guard',
        tacticUntil: currentTime,
        attackResolved: false,
        lastTongueAttack: -1,
        completedAt: 0,
        calloutUntil: currentTime + 1800,
        decisionCount: 0,
        nextBaitAt: currentTime + 2700,
    };
    callout.textContent = 'Mostre como você luta.';
    callout.classList.add('is-visible');

    bossHudLabel.textContent = 'Duelo · Rubro';
    bossHealthFill.style.width = '100%';
    bossHealthText.textContent = `${DUEL_MAX_HEALTH}/${DUEL_MAX_HEALTH}`;
    bossHud.classList.add('is-visible');
    bossHud.setAttribute('aria-hidden', 'false');
    regionNameDisplay.textContent = 'Clareira da primeira floresta';
    routeTimeDisplay.textContent = 'DUELO';
    phaseNumberDisplay.textContent = '1 × 1';
    paceMultiplierDisplay.textContent = 'PARADO';
    setStatus('Rubro está pronto. Use movimento, pulo e língua para lutar.');

    state.mode = 'playing';
    setRuntimeScene('stage');
    state.previousTime = currentTime;
    overlay.classList.remove('is-visible');
    setPlayingControls(true);
    playBackgroundMusic(true);
    pauseButton.textContent = 'Pausar';
    pauseButton.setAttribute('aria-label', 'Pausar duelo');
    board.focus({ preventScroll: true });
    state.animationFrame = window.requestAnimationFrame(gameLoop);
}

const STAGE_LOADING_TIPS = [
    'Conferindo o terreno antes de liberar os controles...',
    'Alinhando personagens e colisões...',
    'Separando os obstáculos para uma partida justa...',
    'Ajustando o ritmo da aventura...',
];

const MAP_LOADING_TIPS = [
    'Abrindo somente o bioma escolhido...',
    'Posicionando as fases e os caminhos...',
    'Preparando o mapa sem carregar a corrida...',
];

function waitForDelay(duration) {
    return new Promise((resolve) => window.setTimeout(resolve, duration));
}

function showSceneLoader({ kicker, title, tip }) {
    setRuntimeScene('loading');
    stageLoaderKicker.textContent = kicker;
    stageLoaderTitle.textContent = title;
    stageLoaderTip.textContent = tip;
    stageLoader.hidden = false;
    stageLoader.setAttribute('aria-hidden', 'false');
}

function hideSceneLoader() {
    stageLoader.hidden = true;
    stageLoader.setAttribute('aria-hidden', 'true');
}

function waitForPaint() {
    return new Promise((resolve) => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));
}

async function runWorldMapLoading(prepareCharacter = null) {
    if (!bootReady || stageTransitionPromise) return stageTransitionPromise;
    state.mode = 'loading';
    setPlayingControls(false);
    worldMapState.pressed.clear();
    worldMapFrog.classList.remove('is-walking');
    releaseStageRender();
    showSceneLoader({
        kicker: 'Primeiro bioma · Mata da manhã',
        title: 'Abrindo o mapa',
        tip: MAP_LOADING_TIPS[Math.floor(Math.random() * MAP_LOADING_TIPS.length)],
    });

    stageTransitionPromise = (async () => {
        await Promise.all([
            ensureWorldMapAssets(),
            prepareCharacter?.() || Promise.resolve(),
            waitForDelay(520),
        ]);
        mainMenuShell.classList.remove('is-hidden');
        resultCard.classList.add('is-hidden');
        overlay.classList.add('is-visible');
        showMenuScreen('maps');
        await waitForPaint();
        stageLoaderTip.textContent = 'Mapa pronto. Boa exploração!';
        await waitForDelay(100);
        hideSceneLoader();
        state.mode = 'idle';
    })().catch(() => {
        overlay.classList.add('is-visible');
        showMenuScreen('maps');
        hideSceneLoader();
        state.mode = 'idle';
    }).finally(() => {
        stageTransitionPromise = null;
    });
    return stageTransitionPromise;
}

function stageAssets(kind, testArea = false) {
    const common = [
        ...AMBIENT_ASSET_URLS,
        'assets/img/sapo-corrida-bipede-v3.png',
        'assets/img/sapo-ciclo-natural-v2.png',
        'assets/img/sapo-boca-aberta-sprites.png',
        'assets/img/sapo-lingua-limpa-v3.png',
    ];
    if (kind === 'duel') return [...common, 'assets/img/sapo-resistencia-capuz-sprites-v1.png'];
    if (testArea) return [...common, 'assets/img/super-abelha-monstro-sprites-v2.png', 'assets/img/abelha-investida-sprites.png'];
    return [...common, ...Object.values(OBSTACLES).map((obstacle) => obstacle.src), 'assets/img/inseto-voando-sprites.png', 'assets/img/besouro-ondulante-voando-sprites.png', 'assets/img/abelha-investida-sprites.png'];
}

function runStageLoading({ kind = 'route', testArea = false } = {}, startAction) {
    if (!bootReady || stageTransitionPromise) return stageTransitionPromise;
    state.mode = 'loading';
    setPlayingControls(false);
    worldMapState.pressed.clear();
    worldMapFrog.classList.remove('is-walking');
    if (resistanceDialog?.open) resistanceDialog.close();

    const isDuel = kind === 'duel';
    showSceneLoader({
        kicker: isDuel ? 'Luta livre · Clareira inicial' : testArea ? 'Área de testes · Chefã' : 'Corrida · Rota da Manhã',
        title: isDuel ? 'Preparando o duelo' : 'Preparando a trilha',
        tip: STAGE_LOADING_TIPS[Math.floor(Math.random() * STAGE_LOADING_TIPS.length)],
    });

    const assets = [...new Set(stageAssets(kind, testArea))];
    let stageStarted = false;
    const beginStage = () => {
        if (stageStarted) return;
        stageStarted = true;
        startAction();
    };
    stageTransitionPromise = (async () => {
        await Promise.all([
            Promise.allSettled(assets.map(preloadImage)),
            document.fonts?.ready || Promise.resolve(),
            waitForDelay(720),
        ]);
        stageLoaderTip.textContent = 'Tudo pronto. Boa sorte!';
        releaseWorldMapRender();
        beginStage();
        await waitForPaint();
        await waitForDelay(80);
        hideSceneLoader();
    })().catch(() => {
        releaseWorldMapRender();
        beginStage();
        hideSceneLoader();
    }).finally(() => {
        stageTransitionPromise = null;
    });
    return stageTransitionPromise;
}

function startGame(options = {}) {
    return runStageLoading({ kind: 'route', testArea: Boolean(options.testArea) }, () => startGameNow(options));
}

function startResistanceDuel() {
    return runStageLoading({ kind: 'duel' }, startResistanceDuelNow);
}

function renderResistanceDuel(duel) {
    duel.element.classList.toggle('faces-right', duel.facing > 0);
    duel.element.style.transform = `translate3d(${duel.x.toFixed(2)}px, ${(-duel.y).toFixed(2)}px, 0)`;
}

function showResistanceCallout(duel, copy, currentTime, duration = 1050) {
    if (!duel.callout) return;
    duel.callout.textContent = copy;
    duel.callout.classList.add('is-visible');
    duel.calloutUntil = currentTime + duration;
}

function tongueHitsResistanceDuel(duel, currentTime) {
    if (
        currentTime > state.attackUntil
        || currentTime - state.attackStartedAt > ATTACK_CAPTURE_CLOSE
        || duel.lastTongueAttack === state.attackStartedAt
        || ['hurt', 'defeated'].includes(duel.stage)
        || currentTime < duel.dodgeInvulnerableUntil
    ) return false;

    const tongueBox = runnerAttack.getBoundingClientRect();
    const duelBox = duel.sprite.getBoundingClientRect();
    return (
        duelBox.right > tongueBox.left + tongueBox.width * 0.2
        && duelBox.left < tongueBox.right - tongueBox.width * 0.02
        && duelBox.bottom > tongueBox.top + tongueBox.height * 0.28
        && duelBox.top < tongueBox.bottom - tongueBox.height * 0.2
    );
}

function resistanceDuelTongueHitsRunner(duel, currentTime) {
    const attackElapsed = currentTime - duel.stageStartedAt;
    if (
        duel.stage !== 'attacking'
        || duel.attackResolved
        || attackElapsed < DUEL_TONGUE_HIT_START_MS
        || attackElapsed > DUEL_TONGUE_HIT_END_MS
    ) return false;

    const runnerBox = runner.getBoundingClientRect();
    const tongueBox = duel.tongue.getBoundingClientRect();
    return (
        runnerBox.right - runnerBox.width * 0.28 > tongueBox.left + tongueBox.width * 0.03
        && runnerBox.left + runnerBox.width * 0.28 < tongueBox.right - tongueBox.width * 0.16
        && runnerBox.bottom - runnerBox.height * 0.12 > tongueBox.top + tongueBox.height * 0.34
        && runnerBox.top + runnerBox.height * 0.24 < tongueBox.bottom - tongueBox.height * 0.28
    );
}

function clearResistanceDuelAttack(duel) {
    duel.element.classList.remove('is-winding-up', 'is-attacking');
    duel.tongue.classList.remove('is-visible');
}

function startResistanceDuelJump(duel, currentTime, reason = 'jumping') {
    if (duel.y > 3) return;
    duel.velocityY = DUEL_JUMP_FORCE;
    duel.stage = reason;
    duel.stageStartedAt = currentTime;
    duel.element.className = `resistance-duelist is-${reason}`;
}

function startResistanceDuelTongue(duel, currentTime) {
    duel.facing = state.runnerX + runnerLayer.offsetWidth * 0.5 < duel.x + duel.element.offsetWidth * 0.5 ? -1 : 1;
    duel.stage = 'windup';
    duel.stageStartedAt = currentTime;
    duel.attackResolved = false;
    duel.element.className = 'resistance-duelist is-winding-up';
    showResistanceCallout(duel, 'Agora.', currentTime, 720);
    setStatus('Rubro preparou a língua. Pule ou recue!');
}

function observePlayerAttack(duel, currentTime) {
    if (
        state.attackStartedAt <= 0
        || state.attackStartedAt === duel.lastObservedPlayerAttack
        || currentTime > state.attackUntil
    ) return;

    duel.lastObservedPlayerAttack = state.attackStartedAt;
    const runnerCenter = state.runnerX + runnerLayer.offsetWidth * 0.5;
    const duelCenter = duel.x + duel.element.offsetWidth * 0.5;
    const distance = Math.abs(duelCenter - runnerCenter);
    const attackPointsAtRubro = duelCenter >= runnerCenter
        ? state.runnerFacing > 0
        : state.runnerFacing < 0;
    if (!attackPointsAtRubro) return;

    duel.dodgePattern = (duel.dodgePattern + 1) % 3;
    const playerCanReach = distance < Math.min(490, state.boardWidth * 0.43);
    const canDodge = duel.dodgePattern !== 0
        && playerCanReach
        && duel.y < 3
        && currentTime >= duel.nextDodgeAt
        && !['hurt', 'defeated', 'attacking'].includes(duel.stage);

    if (!canDodge) return;
    clearResistanceDuelAttack(duel);
    duel.nextDodgeAt = currentTime + DUEL_DODGE_COOLDOWN_MS;
    duel.dodgeInvulnerableUntil = currentTime + 420;
    duel.tactic = 'counter';
    duel.tacticUntil = currentTime + 1350;
    startResistanceDuelJump(duel, currentTime, 'dodging');
    showResistanceCallout(duel, 'Vi esse golpe.', currentTime, 900);
    setStatus('Rubro leu o golpe e saltou. Espere a aterrissagem.');
}

function damageResistanceDuel(duel, currentTime) {
    duel.lastTongueAttack = state.attackStartedAt;
    duel.health -= 1;
    bossHealthFill.style.width = `${Math.max(0, duel.health) / DUEL_MAX_HEALTH * 100}%`;
    bossHealthText.textContent = `${Math.max(0, duel.health)}/${DUEL_MAX_HEALTH}`;
    createCaptureFlash(
        duel.sprite.getBoundingClientRect().left - boardMetrics().left + duel.sprite.offsetWidth * 0.5,
        duel.sprite.getBoundingClientRect().top - boardMetrics().top + duel.sprite.offsetHeight * 0.5,
    );
    clearResistanceDuelAttack(duel);
    duel.element.className = 'resistance-duelist is-hurt';
    playSound(jumpAudio);

    if (duel.health <= 0) {
        duel.stage = 'defeated';
        duel.completedAt = currentTime;
        duel.element.className = 'resistance-duelist is-defeated';
        showResistanceCallout(duel, 'Certo. Você venceu.', currentTime, 1200);
        setStatus('Rubro encerrou o duelo. Você venceu.');
        return;
    }

    duel.stage = 'hurt';
    duel.stageStartedAt = currentTime;
    duel.tactic = 'retreat';
    duel.tacticUntil = currentTime + 1450;
    duel.nextDecisionAt = currentTime + 900;
    showResistanceCallout(duel, duel.health <= 2 ? 'Ainda não acabou.' : 'Bom golpe.', currentTime, 950);
    setStatus(`Golpe em Rubro · faltam ${duel.health}`);
}

function updateResistanceDuel(currentTime, delta) {
    const duel = state.duel;
    if (!duel) return false;

    duel.homeX = state.boardWidth * 0.72;
    duel.playerVelocityX = (state.runnerX - duel.lastPlayerX) / Math.max(delta, 0.001);
    duel.lastPlayerX = state.runnerX;
    if (duel.calloutUntil && currentTime >= duel.calloutUntil) duel.callout.classList.remove('is-visible');
    observePlayerAttack(duel, currentTime);

    if (duel.y > 0 || duel.velocityY > 0) {
        duel.y += duel.velocityY * delta;
        duel.velocityY -= DUEL_GRAVITY * delta;
        if (duel.y <= 0) {
            duel.y = 0;
            duel.velocityY = 0;
            if (['jumping', 'dodging'].includes(duel.stage)) {
                duel.stage = 'moving';
                duel.stageStartedAt = currentTime;
                duel.nextDecisionAt = currentTime + (duel.tactic === 'counter' ? 180 : 360);
                duel.element.className = 'resistance-duelist is-moving';
            }
        }
    }

    if (tongueHitsResistanceDuel(duel, currentTime)) damageResistanceDuel(duel, currentTime);

    if (duel.stage === 'defeated') {
        renderResistanceDuel(duel);
        if (currentTime - duel.completedAt >= 900) completeResistanceDuel();
        return true;
    }

    if (duel.stage === 'hurt') {
        if (currentTime >= duel.nextDecisionAt) {
            duel.stage = 'moving';
            duel.stageStartedAt = currentTime;
            duel.nextDecisionAt = currentTime + 500;
            duel.element.className = 'resistance-duelist is-moving';
        }
    } else if (duel.stage === 'windup' && currentTime - duel.stageStartedAt >= DUEL_TONGUE_WINDUP_MS) {
        duel.stage = 'attacking';
        duel.stageStartedAt = currentTime;
        duel.element.className = 'resistance-duelist is-attacking';
        duel.tongue.classList.remove('is-visible');
        void duel.tongue.offsetWidth;
        duel.tongue.classList.add('is-visible');
    } else if (duel.stage === 'attacking') {
        if (resistanceDuelTongueHitsRunner(duel, currentTime)) {
            duel.attackResolved = true;
            endGame('duel-tongue');
            return true;
        }
        if (currentTime - duel.stageStartedAt >= DUEL_TONGUE_DURATION_MS) {
            clearResistanceDuelAttack(duel);
            duel.stage = 'recovering';
            duel.stageStartedAt = currentTime;
            duel.element.className = 'resistance-duelist is-recovering';
        }
    } else if (duel.stage === 'recovering') {
        if (currentTime - duel.stageStartedAt >= DUEL_RECOVER_MS) {
            duel.stage = 'moving';
            duel.stageStartedAt = currentTime;
            duel.nextDecisionAt = currentTime + 760;
            duel.element.className = 'resistance-duelist is-moving';
            setStatus('Rubro terminou o golpe. Esta é a abertura.');
        }
    } else if (['moving', 'idle'].includes(duel.stage)) {
        const signedDistance = duel.x - state.runnerX;
        const distance = Math.abs(signedDistance);
        const pressure = 1 - duel.health / DUEL_MAX_HEALTH;
        const playerAttacking = currentTime <= state.attackUntil;
        const playerAttackAimedAtRubro = playerAttacking && (signedDistance >= 0
            ? state.runnerFacing > 0
            : state.runnerFacing < 0);
        const playerCoolingDown = currentTime < state.attackReadyAt;
        const playerDescending = state.runnerY > state.boardHeight * 0.08 && state.velocityY < -80;
        const playerApproaching = signedDistance >= 0
            ? duel.playerVelocityX > 85
            : duel.playerVelocityX < -85;
        const playerCrowdingRubro = playerApproaching
            && distance < clamp(state.boardWidth * 0.26, 255, 335);
        const forcedRetreat = duel.tactic === 'retreat' && currentTime < duel.tacticUntil;
        const counterWindow = duel.tactic === 'counter' && currentTime < duel.tacticUntil;

        let preferredMinimum;
        let preferredMaximum;
        if (forcedRetreat || playerAttackAimedAtRubro || playerCrowdingRubro) {
            preferredMinimum = clamp(state.boardWidth * 0.245, 235, 315);
            preferredMaximum = clamp(state.boardWidth * 0.29, 285, 365);
        } else if (counterWindow || playerCoolingDown) {
            preferredMinimum = clamp(state.boardWidth * 0.155, 150, 205);
            preferredMaximum = clamp(state.boardWidth * 0.205, 205, 270);
        } else {
            preferredMinimum = clamp(state.boardWidth * 0.19, 185, 250);
            preferredMaximum = clamp(state.boardWidth * 0.245, 240, 320);
        }

        let direction = 0;
        if (distance > preferredMaximum + 12) direction = Math.sign(state.runnerX - duel.x);
        else if (distance < preferredMinimum - 12) direction = Math.sign(duel.x - state.runnerX);

        if (direction < 0) duel.tactic = counterWindow ? 'counter' : 'pressure';
        else if (direction > 0) duel.tactic = 'retreat';
        else duel.tactic = counterWindow ? 'counter' : 'guard';

        const adaptiveSpeed = DUEL_MOVE_SPEED * (1 + pressure * 0.2) * (duel.tactic === 'pressure' ? 1.08 : 1);
        duel.x += direction * adaptiveSpeed * delta;
        duel.x = clamp(duel.x, state.runnerX + runnerLayer.offsetWidth * 1.15, state.boardWidth * 0.84);
        if (direction !== 0) duel.facing = direction;
        else duel.facing = signedDistance >= 0 ? -1 : 1;
        duel.element.className = direction === 0
            ? 'resistance-duelist is-idle'
            : 'resistance-duelist is-moving';

        if (currentTime >= duel.nextDecisionAt) {
            duel.decisionCount += 1;
            const playerNearGround = state.runnerY < state.boardHeight * 0.12;
            const inTongueRange = distance < Math.min(330, state.boardWidth * 0.3);
            const safelyAligned = distance > runnerLayer.offsetWidth * 1.05;
            const attackOpening = playerCoolingDown || playerApproaching || playerDescending || duel.decisionCount % 3 === 0;
            const canBaitAttack = currentTime >= duel.nextBaitAt
                && !playerCoolingDown
                && !playerAttackAimedAtRubro
                && distance < preferredMaximum + 35
                && distance > preferredMinimum;
            if (canBaitAttack) {
                duel.tactic = 'retreat';
                duel.tacticUntil = currentTime + 720;
                duel.nextBaitAt = currentTime + 3600;
                duel.nextDecisionAt = currentTime + 640;
                showResistanceCallout(duel, 'Tenta me alcançar.', currentTime, 850);
            } else if (inTongueRange && safelyAligned && (playerNearGround || playerDescending) && !playerAttackAimedAtRubro && attackOpening) {
                startResistanceDuelTongue(duel, currentTime);
            } else {
                const alignmentDelay = playerAttackAimedAtRubro || !playerNearGround ? 260 : 420;
                duel.nextDecisionAt = currentTime + alignmentDelay;
            }
        }
    }

    renderResistanceDuel(duel);
    return false;
}

function completeResistanceDuel() {
    if (state.mode !== 'playing') return;
    state.mode = 'completed';
    storyProgress.resistanceDuelWon = true;
    saveStoryProgress();
    pauseBackgroundMusic(true);
    setPlayingControls(false);
    clearAttack();
    overlayKicker.textContent = 'Desafio concluído';
    overlayTitle.textContent = 'Vitória no duelo';
    overlayMessage.textContent = 'Rubro reconheceu sua habilidade. A Frente do Brejo Livre ainda terá outros desafios quando a história continuar.';
    playLabel.textContent = 'Lutar novamente';
    resultMenuButton.textContent = 'Voltar ao mapa';
    showResultOverlay();
    playButton.focus({ preventScroll: true });
}

function resumeGame() {
    if (state.mode !== 'paused') return;
    state.mode = 'playing';
    setRuntimeScene('stage');
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
    overlayKicker.textContent = state.isDuel ? 'Clareira da primeira floresta' : PHASES[state.phaseIndex].name;
    overlayTitle.textContent = state.isDuel ? 'Duelo pausado' : 'Corrida pausada';
    overlayMessage.textContent = state.isDuel
        ? 'Rubro vai esperar. Continue quando estiver pronto para voltar à luta.'
        : 'Continue quando estiver pronto. Sua corrida está guardada exatamente neste ponto.';
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

    if (state.isDuel) {
        overlayKicker.textContent = 'Duelo na floresta';
        overlayTitle.textContent = 'Rubro venceu esta rodada';
        overlayMessage.textContent = hazard === 'duel-tongue'
            ? 'A língua de Rubro alcançou o sapo. Observe quando ele firma os pés, pule ou recue e responda durante a recuperação.'
            : 'Rubro alcançou o sapo. Mude a distância, pule e procure uma abertura para responder.';
        playLabel.textContent = 'Tentar novamente';
        resultMenuButton.textContent = 'Voltar ao mapa';
        showResultOverlay();
        playButton.focus({ preventScroll: true });
        return;
    }

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
        : hazard === 'boss-timeout'
            ? 'O tempo acabou antes do último golpe. Espere a Super Abelha voar baixo e ataque somente quando ela estiver cansada.'
        : hazard === 'boss-sting'
            ? 'A Super Abelha acertou o sapo com a investida especial. Depois do terceiro golpe, espere o aviso e pule por cima do ferrão.'
        : state.phaseIndex === PHASES.length - 1
            ? 'Você chegou ao castelo. Agora tente correr ainda mais longe e capture mais besouros.'
            : 'O caminho ficou difícil desta vez. Tente outra corrida e descubra a próxima região.';
    playLabel.textContent = state.isTestArea ? 'Repetir teste' : 'Jogar novamente';
    resultMenuButton.textContent = 'Voltar ao menu';
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
    if (!state.isTestArea) {
        storyProgress.phaseOneComplete = true;
        saveStoryProgress();
        syncResistanceNpc();
    }
    overlayKicker.textContent = state.isTestArea ? 'Teste concluído' : 'Jornada concluída';
    overlayTitle.textContent = 'Chefã derrotada!';
    overlayMessage.textContent = state.isTestArea
        ? `Você testou os cinco golpes e venceu a Super Abelha Monstro. Repita o laboratório para praticar a investida especial.`
        : `Você atravessou a rota da manhã em ${formatTime(JOURNEY_DURATION)} e venceu a Super Abelha Monstro. Tente novamente para superar seus ${formatScore(finalScore)} pontos.`;
    playLabel.textContent = state.isTestArea ? 'Repetir teste' : 'Correr novamente';
    resultMenuButton.textContent = state.isTestArea ? 'Voltar ao menu' : 'Voltar ao mapa';
    showResultOverlay();
    playButton.focus({ preventScroll: true });
}

function returnFromResult() {
    if (state.isDuel) {
        state.mode = 'idle';
        state.isDuel = false;
        board.classList.remove('is-duel');
        mainMenuShell.classList.remove('is-hidden');
        resultCard.classList.add('is-hidden');
        overlay.classList.add('is-visible');
        runWorldMapLoading();
        return;
    }
    if (state.mode !== 'completed' || state.isTestArea) {
        showMainMenu();
        return;
    }

    state.mode = 'idle';
    mainMenuShell.classList.remove('is-hidden');
    resultCard.classList.add('is-hidden');
    overlay.classList.add('is-visible');
    runWorldMapLoading();
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
            } else if (insect.flightStage === 'aiming' && currentTime - insect.flightStageStartedAt >= BEE_AIM_DURATION_MS) {
                const runnerBox = runner.getBoundingClientRect();
                const insectBox = insect.element.getBoundingClientRect();
                const horizontalDirection = Number(state.moveRight) - Number(state.moveLeft);
                const horizontalSpeed = clamp(state.boardWidth * 0.34, HORIZONTAL_SPEED_MIN, HORIZONTAL_SPEED_MAX);
                const predictedRunnerX = horizontalDirection * horizontalSpeed * BEE_PREDICTION_SECONDS;
                const predictedRunnerLift = state.velocityY * BEE_PREDICTION_SECONDS
                    - 0.5 * GRAVITY * BEE_PREDICTION_SECONDS * BEE_PREDICTION_SECONDS;
                const runnerCenterX = runnerBox.left - boardBox.left + runnerBox.width * 0.5 + predictedRunnerX;
                const runnerCenterY = runnerBox.top - boardBox.top + runnerBox.height * (isRunnerCrouched() ? 0.7 : 0.52);
                insect.flightStage = 'diving';
                insect.flightStageStartedAt = currentTime;
                insect.diveFromY = insect.renderedY;
                insect.diveStartX = insect.x;
                insect.diveTargetX = clamp(
                    runnerCenterX - insectBox.width * 0.5 - runnerBox.width * 0.72,
                    -insectBox.width,
                    boardBox.width * 0.52,
                );
                insect.diveTargetY = clamp(
                    runnerCenterY - predictedRunnerLift - insectBox.height * 0.5,
                    boardBox.height * 0.3,
                    boardBox.height * 0.8,
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
    if (state.bossStarted) return;
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

    if (state.isDuel) {
        const runCycle = Number(state.moveLeft || state.moveRight) ? 580 : 760;
        runnerLayer.style.setProperty('--run-cycle', `${runCycle}ms`);
        if (currentTime >= state.swallowUntil) runnerLayer.classList.remove('is-swallowing');
        updateTongueCooldown(currentTime);
        if (state.attackUntil > 0 && currentTime >= state.attackUntil) clearAttack();
        updateRunnerHorizontalMovement(delta);
        updateRunnerPhysics(delta, currentTime);
        if (updateResistanceDuel(currentTime, delta) || state.mode !== 'playing') return;
        state.animationFrame = window.requestAnimationFrame(gameLoop);
        return;
    }

    const worldSpeed = currentWorldSpeed();
    const runCycle = clamp(680 / currentPaceMultiplier(), 410, 680);
    runnerLayer.style.setProperty('--run-cycle', `${runCycle.toFixed(0)}ms`);
    if (currentTime >= state.swallowUntil) runnerLayer.classList.remove('is-swallowing');
    if (state.attackUntil > 0 && currentTime >= state.attackUntil) clearAttack();
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
    if (!state.bossStarted && state.elapsedTime >= BOSS_START_TIME) startBoss(currentTime);
    if (updateBoss(currentTime)) return;
    state.score += delta * 3.1;
    state.elapsedTime += delta;
    resolvePhase();
    updateScore();

    if (state.bossDefeated && state.boss && currentTime - state.boss.defeatedAt >= 1250) {
        completeJourney();
        return;
    }

    if (!state.isTestArea && state.elapsedTime >= JOURNEY_DURATION) {
        if (state.bossDefeated) completeJourney();
        else endGame('boss-timeout');
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
        } else if (event.code === 'Escape' && state.mode === 'idle' && activeMenuScreen !== 'main' && !worldInventoryDialog?.open) {
            event.preventDefault();
            showMenuScreen(activeMenuScreen === 'maps' ? 'main' : MENU_PARENTS[activeMenuScreen] || 'main');
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
    if (assetPreloadCache.has(source)) return assetPreloadCache.get(source);
    const request = new Promise((resolve, reject) => {
        const image = new Image();
        let settled = false;
        const finish = (callback, value) => {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeout);
            callback(value);
        };
        const timeout = window.setTimeout(() => finish(reject, new Error(`Tempo esgotado: ${source}`)), 12000);
        const finishDecoded = () => {
            const decoding = typeof image.decode === 'function' ? image.decode() : Promise.resolve();
            Promise.resolve(decoding).catch(() => {}).then(() => finish(resolve, source));
        };
        image.addEventListener('load', finishDecoded, { once: true });
        image.addEventListener('error', () => finish(reject, new Error(`Falha ao carregar: ${source}`)), { once: true });
        image.src = source;
        if (image.complete && image.naturalWidth > 0) finishDecoded();
    });
    assetPreloadCache.set(source, request);
    request.catch(() => assetPreloadCache.delete(source));
    return request;
}

function preloadAudio(audio) {
    return new Promise((resolve, reject) => {
        if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            resolve(audio.currentSrc || audio.src);
            return;
        }
        let settled = false;
        const finish = (callback, value) => {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeout);
            audio.removeEventListener('loadeddata', handleReady);
            audio.removeEventListener('error', handleError);
            callback(value);
        };
        const handleReady = () => finish(resolve, audio.currentSrc || audio.src);
        const handleError = () => finish(reject, new Error(`Falha ao carregar áudio: ${audio.src}`));
        const timeout = window.setTimeout(() => finish(resolve, audio.currentSrc || audio.src), 6500);
        audio.addEventListener('loadeddata', handleReady, { once: true });
        audio.addEventListener('error', handleError, { once: true });
        audio.load();
    });
}

function updateBootLoading(completed, total, groupProgress, activeGroup = 'sprites') {
    const percent = Math.round((completed / Math.max(total, 1)) * 100);
    bootLoaderFill.style.width = `${percent}%`;
    bootLoaderPercent.textContent = `${percent}%`;
    bootLoaderProgress.setAttribute('aria-valuenow', String(percent));
    const messages = {
        sprites: 'Acordando os personagens...',
        world: 'Montando o caminho e o mapa...',
        sound: 'Afinando os sons da aventura...',
    };
    bootLoaderMessage.textContent = percent >= 100 ? 'A aventura está pronta!' : messages[activeGroup];
    bootLoadingSteps.forEach((step) => {
        const progress = groupProgress.get(step.dataset.loadingStep);
        step.classList.toggle('is-ready', Boolean(progress && progress.done >= progress.total));
    });
}

async function initializeGame() {
    const loadingStartedAt = performance.now();
    applyPhase(0, false);
    updateScore();
    const uniqueAssets = [...new Set(BOOT_ASSET_URLS)];
    const classifyImage = (source) => /cenario|mapa|textura|plataforma|pedras|roda/.test(source) ? 'world' : 'sprites';
    const jobs = uniqueAssets.map((source) => ({ group: classifyImage(source), promise: preloadImage(source) }));
    jobs.push({ group: 'world', promise: document.fonts?.load('700 32px "Pixelify Sans"') || Promise.resolve() });
    const groupProgress = new Map(['sprites', 'world', 'sound'].map((group) => [group, { done: 0, total: jobs.filter((job) => job.group === group).length }]));
    let completed = 0;
    updateBootLoading(completed, jobs.length, groupProgress);
    const trackedJobs = jobs.map(({ group, promise }) => Promise.resolve(promise).finally(() => {
        completed += 1;
        groupProgress.get(group).done += 1;
        updateBootLoading(completed, jobs.length, groupProgress, group);
    }));
    const results = await Promise.allSettled(trackedJobs);
    const failedAssets = results.filter((result) => result.status === 'rejected').length;

    const minimumLoadingTime = Math.max(0, 900 - (performance.now() - loadingStartedAt));
    if (minimumLoadingTime > 0) await waitForDelay(minimumLoadingTime);
    updateBootLoading(jobs.length, jobs.length, groupProgress, 'sound');

    state.mode = 'idle';
    playButton.disabled = false;
    worldMapState.ready = false;
    playLabel.textContent = 'Jogar novamente';
    if (failedAssets > 0) worldMapHelp.textContent = 'O menu está pronto. Um detalhe visual pode terminar de carregar em segundo plano.';

    bootReady = true;
    indieIntroContinue.disabled = false;
    indieIntroContinue.textContent = 'Entrar no jogo';
    await waitForDelay(260);
    bootLoader.classList.remove('is-visible');
    document.body.classList.remove('is-app-loading');
    window.setTimeout(() => bootLoader.setAttribute('hidden', ''), 260);
    window.requestAnimationFrame(() => indieIntroContinue.focus({ preventScroll: true }));

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
    else if (state.isDuel) startResistanceDuel();
    else if (state.mode !== 'loading') startGame({ testArea: state.isTestArea });
});

storyMapTab?.addEventListener('click', () => showStoryCategory('map'));
testAreaTab?.addEventListener('click', () => showStoryCategory('test'));
worldMapMenuButton?.addEventListener('click', () => showMenuScreen('main'));
worldInventoryButton?.addEventListener('click', openWorldInventory);
worldInventoryClose?.addEventListener('click', () => worldInventoryDialog.close());
worldInventoryDialog?.addEventListener('close', () => {
    if (activeMenuScreen === 'maps') worldInventoryButton?.focus({ preventScroll: true });
});
[storyMapTab, testAreaTab].forEach((tab, index, tabs) => {
    tab?.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = event.key === 'Home'
            ? 0
            : event.key === 'End'
                ? tabs.length - 1
                : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        const nextTab = tabs[nextIndex];
        showStoryCategory(nextTab === testAreaTab ? 'test' : 'map');
        nextTab?.focus({ preventScroll: true });
    });
});
startBossTestButton?.addEventListener('click', () => startGame({ testArea: true }));

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
    wakeWorldMapNavigation();
});

resistanceDialog?.addEventListener('cancel', () => worldMapState.pressed.clear());
worldResistanceNpc?.addEventListener('click', handleResistanceNpcInteraction);
resistanceDialogNext?.addEventListener('click', advanceResistanceDialogue);
resistanceDialogLeave?.addEventListener('click', () => resistanceDialog.close());
resistanceDialog?.addEventListener('close', () => {
    worldMapState.pressed.clear();
    if (activeMenuScreen === 'maps') worldMap.focus({ preventScroll: true });
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
        if (distance < WORLD_LEVEL_REACH && level.playable && worldMapState.ready) {
            startGame();
            return;
        }
        worldMapState.targetX = level.x;
        worldMapState.targetY = level.y;
        storyMapStatus.textContent = level.playable
            ? 'Caminhando até a fase...'
            : level.unlocked
                ? 'Indo até a fase desbloqueada...'
                : 'Indo até a fase em construção...';
        wakeWorldMapNavigation();
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

saveSlotsContainer?.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('[data-delete-slot]');
    if (deleteButton) {
        openDeleteCharacterDialog(Number.parseInt(deleteButton.dataset.deleteSlot, 10));
        return;
    }
    const slotButton = event.target.closest('[data-slot-index]');
    if (!slotButton) return;
    const slotIndex = Number.parseInt(slotButton.dataset.slotIndex, 10);
    if (characterSlots[slotIndex]) activateCharacterSlot(slotIndex);
    else beginCharacterCreation(slotIndex);
});

saveDeleteCancel?.addEventListener('click', () => {
    pendingDeleteSlotIndex = -1;
    saveDeleteDialog.close('cancelled');
});

saveDeleteConfirm?.addEventListener('click', deletePendingCharacter);
saveDeleteDialog?.addEventListener('cancel', () => {
    pendingDeleteSlotIndex = -1;
});

characterNameInput?.addEventListener('input', () => {
    const name = characterNameInput.value.trim().replace(/\s+/g, ' ').slice(0, 16);
    characterPreviewName.textContent = name || 'Novo viajante';
    if (name.length >= 2) {
        characterNameInput.removeAttribute('aria-invalid');
        characterNameError.textContent = '';
    }
});

characterCreatorForm?.addEventListener('submit', createCharacter);

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
window.addEventListener('orientationchange', fitMenuToViewport);
window.addEventListener('resize', () => {
    syncOrientationGuard();
    fitMenuToViewport();
    positionResistanceDialogue();
    resizeWorldMapNavigation();
});
syncOrientationGuard();
applyGameSettings();
updateFullscreenLabel();
initializeCharacterSlots();
initializeSkins();
initializeProfile();
initializeGame();
