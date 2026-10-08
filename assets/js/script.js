const board = document.querySelector('#game-board');
const runner = document.querySelector('#runner');
const obstacleLayer = document.querySelector('#obstacle-layer');
const overlay = document.querySelector('#game-overlay');
const playButton = document.querySelector('#play-button');
const playLabel = document.querySelector('#play-label');
const pauseButton = document.querySelector('#pause-button');
const jumpButton = document.querySelector('#jump-button');
const scoreDisplay = document.querySelector('#score');
const bestScoreDisplay = document.querySelector('#best-score');
const phaseNumberDisplay = document.querySelector('#phase-number');
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
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PHASES = [
    {
        name: 'Vila do Sol',
        threshold: 0,
        background: 'assets/img/cenario.gif',
        baseSpeed: 300,
        gap: [1.45, 2.05],
        obstacles: ['log'],
    },
    {
        name: 'Floresta Antiga',
        threshold: 85,
        background: 'assets/img/cenario-floresta.jpg',
        baseSpeed: 360,
        gap: [1.15, 1.75],
        obstacles: ['log', 'wheel'],
    },
    {
        name: 'Castelo ao Luar',
        threshold: 205,
        background: 'assets/img/cenario-castelo.jpg',
        baseSpeed: 425,
        gap: [0.95, 1.5],
        obstacles: ['wheel', 'boar', 'log'],
    },
];

const OBSTACLES = {
    log: {
        src: 'assets/img/obstaculo.png',
        className: 'obstacle--log',
        points: 14,
        speedScale: 1,
        insetX: 0.2,
        insetTop: 0.19,
    },
    wheel: {
        src: 'assets/img/obstacle-wheel.png',
        className: 'obstacle--wheel',
        points: 18,
        speedScale: 1.16,
        insetX: 0.16,
        insetTop: 0.12,
    },
    boar: {
        src: 'assets/img/enemy-boar.png',
        className: 'obstacle--boar',
        points: 22,
        speedScale: 1.08,
        insetX: 0.22,
        insetTop: 0.2,
    },
};

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
        // O jogo continua normalmente quando o navegador bloqueia armazenamento local.
    }
}

const state = {
    mode: 'idle',
    score: 0,
    best: readBestScore(),
    runnerY: 0,
    velocityY: 0,
    phaseIndex: 0,
    activeScene: 0,
    sceneOffset: 0,
    groundOffset: 0,
    spawnCooldown: 1.1,
    obstacles: [],
    combo: 0,
    previousTime: 0,
    animationFrame: 0,
};

const GRAVITY = 1950;
const JUMP_FORCE = 760;

function formatScore(value) {
    return Math.max(0, Math.floor(value)).toString().padStart(3, '0');
}

function updateScore() {
    scoreDisplay.textContent = formatScore(state.score);
    bestScoreDisplay.textContent = formatScore(state.best);
    phaseNumberDisplay.textContent = `${state.phaseIndex + 1}/${PHASES.length}`;

    const currentThreshold = PHASES[state.phaseIndex].threshold;
    const nextThreshold = PHASES[state.phaseIndex + 1]?.threshold;
    const progress = nextThreshold
        ? ((state.score - currentThreshold) / (nextThreshold - currentThreshold)) * 100
        : 100;
    journeyProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
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
    sceneLayers[nextScene].style.setProperty('--scene-x', `${state.sceneOffset}px`);
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
        setStatus(`Chegando à ${PHASES[index].name}`);
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

function clearObstacles() {
    state.obstacles.forEach((obstacle) => obstacle.element.remove());
    state.obstacles = [];
    obstacleLayer.replaceChildren();
}

function chooseObstacleType() {
    const pool = PHASES[state.phaseIndex].obstacles;
    return pool[Math.floor(Math.random() * pool.length)];
}

function spawnObstacle() {
    const type = chooseObstacleType();
    const config = OBSTACLES[type];
    const element = document.createElement('img');
    element.src = config.src;
    element.alt = '';
    element.className = `obstacle ${config.className}`;
    element.draggable = false;
    obstacleLayer.append(element);

    const metrics = boardMetrics();
    const obstacle = {
        type,
        config,
        element,
        x: metrics.width + Math.max(28, metrics.width * 0.04),
        rotation: 0,
        scored: false,
    };
    state.obstacles.push(obstacle);
    renderObstacle(obstacle, performance.now());
}

function obstacleSpeed(obstacle) {
    const phase = PHASES[state.phaseIndex];
    const scoreBoost = Math.min(165, state.score * 0.58);
    return (phase.baseSpeed + scoreBoost) * obstacle.config.speedScale;
}

function renderObstacle(obstacle, currentTime) {
    let extraTransform = '';
    if (obstacle.type === 'wheel') {
        extraTransform = ` rotate(${obstacle.rotation.toFixed(1)}deg)`;
    } else if (obstacle.type === 'boar') {
        extraTransform = ` translateY(${Math.sin(currentTime / 85) * 2.5}px)`;
    }
    obstacle.element.style.transform = `translate3d(${obstacle.x.toFixed(2)}px, 0, 0)${extraTransform}`;
}

function resetRun() {
    window.cancelAnimationFrame(state.animationFrame);
    clearObstacles();
    state.score = 0;
    state.runnerY = 0;
    state.velocityY = 0;
    state.combo = 0;
    state.sceneOffset = 0;
    state.groundOffset = 0;
    state.spawnCooldown = 1.15;
    runner.classList.remove('is-hit');
    runner.style.setProperty('--jump-y', '0');
    applyPhase(0, false);
    updateWorldMotion();
}

function startGame() {
    resetRun();
    state.mode = 'playing';
    state.previousTime = performance.now();
    overlay.classList.remove('is-visible');
    jumpButton.disabled = false;
    pauseButton.disabled = false;
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
    jumpButton.disabled = false;
    pauseButton.textContent = 'Pausar';
    pauseButton.setAttribute('aria-label', 'Pausar jogo');
    board.focus({ preventScroll: true });
    state.animationFrame = window.requestAnimationFrame(gameLoop);
}

function pauseGame() {
    if (state.mode !== 'playing') return;
    state.mode = 'paused';
    window.cancelAnimationFrame(state.animationFrame);
    jumpButton.disabled = true;
    pauseButton.textContent = 'Continuar';
    pauseButton.setAttribute('aria-label', 'Continuar jogo');
    overlayKicker.textContent = PHASES[state.phaseIndex].name;
    overlayTitle.textContent = 'Corrida pausada';
    overlayMessage.textContent = 'Quando estiver pronto, continue exatamente de onde parou.';
    playLabel.textContent = 'Continuar';
    overlay.classList.add('is-visible');
    playButton.focus({ preventScroll: true });
}

function jump() {
    if (state.mode !== 'playing' || state.runnerY > 3) return;
    state.velocityY = JUMP_FORCE;
    playSound(jumpAudio);
}

function collisionDetected(obstacle) {
    const runnerBox = runner.getBoundingClientRect();
    const obstacleBox = obstacle.element.getBoundingClientRect();
    const runnerInsetX = runnerBox.width * 0.25;
    const runnerInsetTop = runnerBox.height * 0.16;
    const obstacleInsetX = obstacleBox.width * obstacle.config.insetX;
    const obstacleInsetTop = obstacleBox.height * obstacle.config.insetTop;

    return (
        runnerBox.right - runnerInsetX > obstacleBox.left + obstacleInsetX &&
        runnerBox.left + runnerInsetX < obstacleBox.right - obstacleInsetX &&
        runnerBox.bottom - runnerBox.height * 0.08 > obstacleBox.top + obstacleInsetTop &&
        runnerBox.top + runnerInsetTop < obstacleBox.bottom
    );
}

function endGame() {
    state.mode = 'ended';
    jumpButton.disabled = true;
    pauseButton.disabled = true;
    runner.classList.add('is-hit');
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
    overlayMessage.textContent = state.phaseIndex === PHASES.length - 1
        ? 'Você chegou ao castelo. Agora tente correr ainda mais longe.'
        : 'O caminho ficou difícil desta vez. Tente outra corrida e descubra a próxima fase.';
    playLabel.textContent = 'Jogar novamente';
    overlay.classList.add('is-visible');
    playButton.focus({ preventScroll: true });
}

function updateWorldMotion() {
    const scenePosition = `${state.sceneOffset.toFixed(2)}px`;
    sceneLayers.forEach((layer) => layer.style.setProperty('--scene-x', scenePosition));
    board.style.setProperty('--ground-x', `${state.groundOffset.toFixed(2)}px`);
}

function updateObstacles(delta, currentTime) {
    const runnerBox = runner.getBoundingClientRect();

    state.obstacles.forEach((obstacle) => {
        const speed = obstacleSpeed(obstacle);
        obstacle.x -= speed * delta;
        if (obstacle.type === 'wheel') obstacle.rotation -= speed * delta * 0.58;
        renderObstacle(obstacle, currentTime);

        const obstacleBox = obstacle.element.getBoundingClientRect();
        if (!obstacle.scored && obstacleBox.right < runnerBox.left) {
            obstacle.scored = true;
            state.combo += 1;
            const comboBonus = Math.min(8, Math.floor(state.combo / 3) * 2);
            state.score += obstacle.config.points + comboBonus;
            if (state.combo > 0 && state.combo % 3 === 0) {
                setStatus(`Sequência x${state.combo} · +${obstacle.config.points + comboBonus}`);
            }
        }
    });

    state.obstacles = state.obstacles.filter((obstacle) => {
        if (obstacle.x < -260) {
            obstacle.element.remove();
            return false;
        }
        return true;
    });
}

function scheduleObstacles(delta) {
    state.spawnCooldown -= delta;
    if (state.spawnCooldown > 0) return;

    spawnObstacle();
    const [minimumGap, maximumGap] = PHASES[state.phaseIndex].gap;
    const difficultyReduction = Math.min(0.2, state.score / 1500);
    state.spawnCooldown = minimumGap + Math.random() * (maximumGap - minimumGap) - difficultyReduction;
}

function gameLoop(currentTime) {
    if (state.mode !== 'playing') return;

    const delta = Math.min((currentTime - state.previousTime) / 1000, 0.032);
    state.previousTime = currentTime;

    state.velocityY -= GRAVITY * delta;
    state.runnerY = Math.max(0, state.runnerY + state.velocityY * delta);
    if (state.runnerY === 0 && state.velocityY < 0) state.velocityY = 0;
    runner.style.setProperty('--jump-y', state.runnerY.toFixed(2));

    const worldSpeed = PHASES[state.phaseIndex].baseSpeed + Math.min(165, state.score * 0.58);
    if (!reducedMotion) state.sceneOffset -= worldSpeed * 0.085 * delta;
    state.groundOffset -= worldSpeed * 0.78 * delta;
    updateWorldMotion();

    scheduleObstacles(delta);
    updateObstacles(delta, currentTime);
    state.score += delta * 3.25;
    resolvePhase();
    updateScore();

    if (state.obstacles.some(collisionDetected)) {
        state.combo = 0;
        endGame();
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
    handleJumpInput(event);
}

playButton.addEventListener('click', () => {
    if (state.mode === 'paused') resumeGame();
    else startGame();
});
pauseButton.addEventListener('click', () => {
    if (state.mode === 'paused') resumeGame();
    else pauseGame();
});
jumpButton.addEventListener('pointerdown', handleJumpInput);
board.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    handleJumpInput(event);
});
document.addEventListener('keydown', handleKeyboard);
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.mode === 'playing') pauseGame();
});

PHASES.slice(1).forEach((phase) => {
    const image = new Image();
    image.src = phase.background;
});
Object.values(OBSTACLES).forEach((obstacle) => {
    const image = new Image();
    image.src = obstacle.src;
});

applyPhase(0, false);
updateScore();
playButton.disabled = false;
