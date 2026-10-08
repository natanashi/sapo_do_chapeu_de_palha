const board = document.querySelector('#game-board');
const runner = document.querySelector('#runner');
const obstacle = document.querySelector('#obstacle');
const overlay = document.querySelector('#game-overlay');
const playButton = document.querySelector('#play-button');
const playLabel = document.querySelector('#play-label');
const jumpButton = document.querySelector('#jump-button');
const scoreDisplay = document.querySelector('#score');
const bestScoreDisplay = document.querySelector('#best-score');
const overlayKicker = document.querySelector('#overlay-kicker');
const overlayTitle = document.querySelector('#overlay-title');
const overlayMessage = document.querySelector('#overlay-message');
const gameStatus = document.querySelector('#game-status');

const jumpAudio = new Audio('assets/aud/pulo.mp3');
const loseAudio = new Audio('assets/aud/risada_duende.mp3');

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
    obstacleX: 0,
    obstacleSpeed: 0,
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

function resetObstacle() {
    const metrics = boardMetrics();
    state.obstacleX = metrics.width + Math.max(90, metrics.width * (0.16 + Math.random() * 0.17));
    state.obstacleSpeed = Math.min(520, Math.max(250, metrics.width * 0.38 + state.score * 1.35));
    obstacle.style.transform = `translate3d(${state.obstacleX - metrics.width * 1.1}px, 0, 0)`;
}

function startGame() {
    window.cancelAnimationFrame(state.animationFrame);
    state.mode = 'playing';
    state.score = 0;
    state.runnerY = 0;
    state.velocityY = 0;
    state.previousTime = performance.now();
    runner.classList.remove('is-hit');
    runner.style.setProperty('--jump-y', '0');
    overlay.classList.remove('is-visible');
    jumpButton.disabled = false;
    resetObstacle();
    updateScore();
    setStatus('Valendo!');
    board.focus({ preventScroll: true });
    state.animationFrame = window.requestAnimationFrame(gameLoop);
}

function jump() {
    if (state.mode !== 'playing' || state.runnerY > 3) return;
    state.velocityY = JUMP_FORCE;
    playSound(jumpAudio);
}

function collisionDetected() {
    const runnerBox = runner.getBoundingClientRect();
    const obstacleBox = obstacle.getBoundingClientRect();
    const runnerInsetX = runnerBox.width * 0.24;
    const runnerInsetTop = runnerBox.height * 0.15;
    const obstacleInsetX = obstacleBox.width * 0.2;
    const obstacleInsetTop = obstacleBox.height * 0.17;

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
    runner.classList.add('is-hit');
    playSound(loseAudio);

    const finalScore = Math.floor(state.score);
    if (finalScore > state.best) {
        state.best = finalScore;
        saveBestScore(state.best);
        overlayKicker.textContent = 'Novo recorde!';
    } else {
        overlayKicker.textContent = 'Fim da corrida';
    }

    updateScore();
    overlayTitle.textContent = `${formatScore(finalScore)} pontos`;
    overlayMessage.textContent = 'O tronco venceu desta vez. Respire fundo e tente outra corrida.';
    playLabel.textContent = 'Jogar novamente';
    overlay.classList.add('is-visible');
    playButton.focus({ preventScroll: true });
}

function gameLoop(currentTime) {
    if (state.mode !== 'playing') return;

    const delta = Math.min((currentTime - state.previousTime) / 1000, 0.032);
    state.previousTime = currentTime;
    const metrics = boardMetrics();

    state.velocityY -= GRAVITY * delta;
    state.runnerY = Math.max(0, state.runnerY + state.velocityY * delta);
    if (state.runnerY === 0 && state.velocityY < 0) state.velocityY = 0;
    runner.style.setProperty('--jump-y', state.runnerY.toFixed(2));

    state.obstacleX -= state.obstacleSpeed * delta;
    obstacle.style.transform = `translate3d(${state.obstacleX - metrics.width * 1.1}px, 0, 0)`;

    if (state.obstacleX < -obstacle.getBoundingClientRect().width) {
        state.score += 10;
        resetObstacle();
        setStatus('+10 pontos');
    }

    state.score += delta * 2;
    updateScore();

    if (collisionDetected()) {
        endGame();
        return;
    }

    state.animationFrame = window.requestAnimationFrame(gameLoop);
}

function handleJumpInput(event) {
    if (event.type === 'keydown') {
        if (!['Space', 'ArrowUp'].includes(event.code)) return;
        event.preventDefault();
    }
    jump();
}

jumpButton.addEventListener('pointerdown', handleJumpInput);
board.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    handleJumpInput(event);
});
document.addEventListener('keydown', handleJumpInput);
window.addEventListener('resize', () => {
    if (state.mode === 'playing') resetObstacle();
});
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.mode === 'playing') {
        state.previousTime = performance.now();
    }
});

updateScore();
