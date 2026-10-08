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
const regionNameDisplay = document.querySelector('#region-name');
const overlayKicker = document.querySelector('#overlay-kicker');
const overlayTitle = document.querySelector('#overlay-title');
const overlayMessage = document.querySelector('#overlay-message');
const gameStatus = document.querySelector('#game-status');
const phaseBanner = document.querySelector('#phase-banner');
const phaseKicker = document.querySelector('#phase-kicker');
const phaseName = document.querySelector('#phase-name');
const journeyProgress = document.querySelector('#journey-progress');
const sceneLayers = [document.querySelector('#scenery-a'), document.querySelector('#scenery-b')];

const jumpAudio = new Audio('assets/aud/pulo.mp3');
const loseAudio = new Audio('assets/aud/risada_duende.mp3');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const PHASES = [
    {
        name: 'Vila do Sol',
        threshold: 0,
        background: 'assets/img/cenario-vila.gif',
        speedScale: 1,
        paceLabel: 'Ritmo padrão',
        obstacleGap: [1.65, 2.25],
        insectGap: [2.7, 4],
        obstacles: ['rock', 'wheel', 'rock'],
    },
    {
        name: 'Floresta Antiga',
        threshold: 160,
        background: 'assets/img/cenario-floresta.jpg',
        speedScale: 1.12,
        paceLabel: 'Ritmo acelerado',
        obstacleGap: [1.4, 2],
        insectGap: [2.4, 3.6],
        obstacles: ['rock', 'wheel', 'boar', 'wheel'],
    },
    {
        name: 'Castelo ao Luar',
        threshold: 380,
        background: 'assets/img/cenario-castelo.jpg',
        speedScale: 0.88,
        paceLabel: 'Ritmo noturno reduzido',
        obstacleGap: [1.2, 1.78],
        insectGap: [2.2, 3.3],
        obstacles: ['wheel', 'wheel-heavy', 'boar', 'rock', 'wheel-heavy'],
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
        speedScale: 1.1,
        insetX: 0.17,
        insetTop: 0.13,
        rotates: true,
    },
    'wheel-heavy': {
        src: 'assets/img/roda-madeira.png',
        className: 'obstacle--wheel-heavy',
        points: 24,
        speedScale: 1.2,
        insetX: 0.16,
        insetTop: 0.12,
        rotates: true,
    },
    boar: {
        src: 'assets/img/javali-correndo-sprites.png',
        className: 'obstacle--boar',
        points: 22,
        speedScale: 1.06,
        insetX: 0.2,
        insetTop: 0.2,
        spriteSheet: true,
    },
};

const ASSET_URLS = [
    ...PHASES.map((phase) => phase.background),
    ...Object.values(OBSTACLES).map((obstacle) => obstacle.src),
    'assets/img/textura-solo.jpg',
    'assets/img/sapo-correndo-natural-sprites.png',
    'assets/img/sapo-ataque-lingua.png',
    'assets/img/inseto-voando-sprites.png',
    'assets/img/plataforma-musgo.png',
];

const state = {
    mode: 'loading',
    score: 0,
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
    attackUntil: 0,
    attackReadyAt: 0,
    previousTime: 0,
    animationFrame: 0,
    boardWidth: 0,
    boardHeight: 0,
};

const BASE_RUN_SPEED = 285;
const GRAVITY = 1850;
const JUMP_FORCE = 820;
const ATTACK_DURATION = 330;
const ATTACK_COOLDOWN = 470;

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

function updateScore() {
    scoreDisplay.textContent = formatScore(state.score);
    bestScoreDisplay.textContent = formatScore(state.best);
    phaseNumberDisplay.textContent = `${state.phaseIndex + 1}/${PHASES.length}`;
    regionNameDisplay.textContent = PHASES[state.phaseIndex].name;

    const currentThreshold = PHASES[state.phaseIndex].threshold;
    const nextThreshold = PHASES[state.phaseIndex + 1]?.threshold;
    const progress = nextThreshold
        ? ((state.score - currentThreshold) / (nextThreshold - currentThreshold)) * 100
        : 100;
    journeyProgress.style.width = `${clamp(progress, 0, 100)}%`;
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

function boardMetrics() {
    return board.getBoundingClientRect();
}

function worldSpeedScale() {
    return clamp((state.boardWidth || boardMetrics().width) / 1100, 0.82, 1.24);
}

function currentWorldSpeed() {
    const scoreBoost = Math.min(75, state.score * 0.3);
    return (BASE_RUN_SPEED + scoreBoost) * PHASES[state.phaseIndex].speedScale * worldSpeedScale();
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
        if (state.score >= phase.threshold) nextPhase = index;
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
    sample.className = 'insect';
    collectibleLayer.append(sample);
    const insectBox = sample.getBoundingClientRect();
    sample.remove();

    const count = Math.random() < 0.62 ? 2 : 3;
    const useGroundLane = Math.random() < 0.12 && groundInsectLaneIsSafe();
    const mouthY = runnerBox.top - boardBox.top + runnerBox.height * 0.46;
    const baseY = useGroundLane
        ? clamp(mouthY - insectBox.height * 0.48, boardBox.height * 0.62, boardBox.height * 0.72)
        : boardBox.height * (0.49 + Math.random() * 0.09);
    const spacing = Math.max(58, insectBox.width * 0.82);
    const waveSpeed = 0.86 + Math.random() * 0.12;
    const yOffsets = count === 2 ? [-7, 7] : [0, -14, 10];

    for (let index = 0; index < count; index += 1) {
        const element = document.createElement('div');
        element.className = `insect insect--${useGroundLane ? 'low' : 'high'}`;
        collectibleLayer.append(element);

        const insect = {
            element,
            x: boardBox.width + Math.max(48, boardBox.width * 0.05) + spacing * index,
            y: baseY + yOffsets[index],
            speedScale: waveSpeed,
            bobPhase: index * 0.72 + Math.random() * 0.35,
            caught: false,
        };
        state.insects.push(insect);
        renderInsect(insect, performance.now());
    }

    state.obstacleCooldown = Math.max(state.obstacleCooldown, useGroundLane ? 3 : 1.55);
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
    const bob = Math.sin(currentTime / 150 + insect.bobPhase) * 8;
    const x = `${insect.x.toFixed(2)}px`;
    const y = `${(insect.y + bob).toFixed(2)}px`;
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
    runnerAttack.classList.remove('is-visible');
}

function resetRun() {
    window.cancelAnimationFrame(state.animationFrame);
    clearActors();
    clearAttack();
    state.score = 0;
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
    runnerLayer.classList.remove('is-hit');
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
    playSound(jumpAudio);
}

function attack() {
    if (state.mode !== 'playing') return;
    const now = performance.now();
    if (now < state.attackReadyAt) return;

    state.attackUntil = now + ATTACK_DURATION;
    state.attackReadyAt = now + ATTACK_COOLDOWN;
    runner.classList.add('is-attacking');
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
    if (currentTime > state.attackUntil) return false;

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

function catchInsect(insect) {
    insect.caught = true;
    state.catchCombo += 1;
    const bonus = Math.min(12, Math.max(0, state.catchCombo - 1) * 3);
    const points = 16 + bonus;
    state.score += points;
    insect.element.classList.add('is-caught');
    window.setTimeout(() => insect.element.remove(), 260);
    setStatus(state.catchCombo > 1 ? `Caçada x${state.catchCombo} · +${points}` : `Besouro capturado · +${points}`);
}

function endGame(hazard = 'obstacle') {
    state.mode = 'ended';
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

function updateRunnerPhysics(delta) {
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

    runnerLayer.style.setProperty('--jump-y', state.runnerY.toFixed(2));
}

function updateInsects(delta, currentTime) {
    state.insects.forEach((insect) => {
        if (insect.caught) return;
        insect.x -= currentWorldSpeed() * insect.speedScale * delta;
        renderInsect(insect, currentTime);
        if (tongueHitsInsect(insect, currentTime)) catchInsect(insect);
    });

    state.insects = state.insects.filter((insect) => {
        if (insect.caught) return false;
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
        const difficultyReduction = Math.min(0.16, state.score / 1800);
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
    if (!reducedMotionQuery.matches) state.sceneTravel += worldSpeed * 0.075 * delta;
    state.groundTravel += worldSpeed * 0.82 * delta;
    updateWorldMotion();

    scheduleActors(delta);
    updatePlatforms(delta);
    updateRunnerPhysics(delta);
    updateObstacles(delta, currentTime);
    updateInsects(delta, currentTime);
    state.score += delta * 3.1;
    resolvePhase();
    updateScore();

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
