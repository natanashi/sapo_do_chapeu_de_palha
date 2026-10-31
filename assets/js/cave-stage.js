/* CroakFall · Raízes Profundas. A self-contained, fixed-step exploration scene.
 * World units and collision geometry never depend on the display resolution.
 * Only this scene owns its canvas; leaving it releases the renderer and inputs.
 */
(() => {
    'use strict';
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    const WORLD = Object.freeze({ width: 2560, height: 3600, surface: 420, floor: 3360 });
    const PLAYER_ART_HEIGHT = 84;
    const TONGUE_LENGTH_IN_FROGS = 4;
    const PHYSICS = Object.freeze({ gravity: 1700, jump: 820, speed: 290, maxFall: 920, step: 1 / 120 });
    const RULES = Object.freeze({
        easy: { health: 6, boss: 5, enemySpeed: 0.8, recovery: 3.5, tell: 1.1 },
        medium: { health: 5, boss: 6, enemySpeed: 1, recovery: 3.1, tell: 0.95 },
        hard: { health: 4, boss: 7, enemySpeed: 1.15, recovery: 2.8, tell: 0.8 },
        impossible: { health: 3, boss: 9, enemySpeed: 1.4, recovery: 2.5, tell: 0.65 },
    });
    // Wide shelves force a walk across each chamber. Small ledges form a
    // reversible staircase: every rise is lower than the 197-unit jump apex.
    const PLATFORMS = [
        [0, 420, 720, 120], [1040, 420, 1270, 120], [2480, 420, 80, 120],
        [770, 600, 260, 36], [1090, 780, 300, 42],
        [0, 960, 2050, 100],
        [2160, 1130, 150, 46], [1900, 1300, 390, 46],
        [1540, 1470, 410, 46], [1160, 1610, 430, 46],
        [510, 1760, 1800, 100], [2480, 1760, 80, 100],
        [90, 1930, 330, 46], [360, 2100, 330, 46],
        [650, 2270, 390, 46], [1000, 2410, 430, 46],
        [0, 2560, 2050, 100],
        [2150, 2730, 160, 46], [1880, 2900, 400, 46],
        [1510, 3070, 420, 46], [1130, 3220, 430, 46],
        [0, 3360, 2560, 240],
    ].map(([x, y, w, h], id) => ({ x, y, w, h, id }));
    const RESTS = [
        { x: 1710, y: 960, name: 'Galeria das raízes' },
        { x: 770, y: 1760, name: 'Jardim sem sol' },
        { x: 1760, y: 2560, name: 'Ninho de pedra' },
    ];
    const ASSETS = Object.freeze({
        creatures: 'assets/img/caverna-bichos-sprites-v1.png',
        background: 'assets/img/caverna-raizes-fundo-v1.png',
        forest: 'assets/img/cenario-arvores-planaltos-transparente-v3.png',
        platform: 'assets/img/plataforma-musgo.png',
        soil: 'assets/img/textura-solo.jpg',
        run: 'assets/img/sapo-corrida-bipede-v3.png',
        jump: 'assets/img/sapo-ciclo-natural-v2.png',
        attack: 'assets/img/sapo-boca-aberta-sprites.png',
        crouch: 'assets/img/sapo-corrida-agachado-sprites-v1.png',
        crouchAttack: 'assets/img/sapo-agachado-boca-aberta-sprites-v1.png',
        tongue: 'assets/img/sapo-lingua-padrao-v4.png',
    });

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            const timeout = setTimeout(() => reject(new Error(`Tempo esgotado ao carregar ${src}`)), 12000);
            image.onload = async () => {
                clearTimeout(timeout);
                try { await image.decode(); } catch (_) { /* already decoded */ }
                resolve(image);
            };
            image.onerror = () => { clearTimeout(timeout); reject(new Error(`Não foi possível carregar ${src}`)); };
            image.src = src;
        });
    }

    // Alpha bounds are read once, while loading. Never scan image pixels inside
    // the game loop. Each frame gets its own crop, so adjacent frogs cannot leak.
    function frameRects(image, cols, rows) {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(image, 0, 0);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const frames = [];
        for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
            const x0 = Math.round(col * canvas.width / cols), x1 = Math.round((col + 1) * canvas.width / cols);
            const y0 = Math.round(row * canvas.height / rows), y1 = Math.round((row + 1) * canvas.height / rows);
            let left = x1, top = y1, right = x0, bottom = y0;
            for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
                if (pixels[(y * canvas.width + x) * 4 + 3] < 100) continue;
                left = Math.min(left, x); right = Math.max(right, x);
                top = Math.min(top, y); bottom = Math.max(bottom, y);
            }
            frames.push({ x: left, y: top, w: Math.max(1, right - left + 1), h: Math.max(1, bottom - top + 1) });
        }
        return frames;
    }

    class CaveStage {
        static assets = ASSETS;
        static world = WORLD;
        static physics = PHYSICS;
        static platforms = PLATFORMS;
        static rules = RULES;

        static async prepare(skin = {}) {
            const images = Object.fromEntries(await Promise.all(Object.entries({ ...ASSETS, ...skin }).map(async ([key, src]) => [key, await loadImage(src)])));
            const frames = {};
            for (const key of ['run', 'jump', 'crouch']) frames[key] = frameRects(images[key], 4, 2);
            frames.attack = frameRects(images.attack, 2, 1);
            frames.crouchAttack = frameRects(images.crouchAttack, 2, 1);
            frames.creatures = frameRects(images.creatures, 4, 3);
            return { images, frames };
        }

        constructor(canvas, art, { difficulty = 'medium', onEvent = () => {}, reducedMotion = false } = {}) {
            this.canvas = canvas; this.ctx = canvas?.getContext('2d', { alpha: false });
            this.art = art; this.rules = RULES[difficulty] || RULES.medium; this.difficulty = difficulty;
            this.onEvent = onEvent; this.time = 0; this.accumulator = 0; this.score = 0;
            this.reducedMotion = reducedMotion;
            this.input = { left: false, right: false, crouch: false }; this.jumpBuffer = 0;
            this.camera = { x: 0, y: 0 }; this.view = { w: 1280, h: 720 };
            this.player = { x: 450, y: WORLD.surface, vx: 0, vy: 0, w: 34, h: 60, facing: 1, grounded: true, coyote: 0.1, health: this.rules.health, immune: 0 };
            this.checkpoint = { x: 450, y: WORLD.surface, index: -1 };
            this.rests = RESTS.map(rest => ({ ...rest, lit: false }));
            this.attackState = null; this.attackReady = 0; this.attackId = 0;
            this.particles = []; this.projectiles = []; this.damageCount = 0;
            this.dead = false; this.finished = false; this.returning = false;
            this.message = { text: 'A passagem fica entre as raízes. Vá para a direita e desça.', until: 8 };
            this.boss = { x: 1880, y: WORLD.floor, w: 180, h: 132, health: this.rules.boss, maxHealth: this.rules.boss, active: false, defeated: false, phase: 'sleep', timer: 0, direction: -1, cycle: 0, hitId: -1 };
            this.lift = { x: 2310, y: WORLD.floor, w: 170, h: 24, active: false, moving: false, arrived: false, lastDelta: 0 };
            this.enemies = this.makeEnemies();
            this.spores = Array.from({ length: 42 }, (_, i) => ({ x: (i * 673 + 193) % WORLD.width, y: 680 + (i * 197) % 2500, phase: i * 1.7 }));
            this.tiles = this.ctx ? this.makeTiles() : null;
            this.snapCamera(); this.notify();
        }

        makeEnemies() {
            const bugs = [[1320, 960, 1100, 1550], [1920, 960, 1780, 2020], [1390, 1760, 1180, 1600], [620, 1760, 560, 980], [1320, 2560, 1100, 1520], [1930, 2560, 1840, 2020]];
            const moths = [[1200, 650], [2130, 1430], [920, 1510], [470, 2140], [1640, 2310], [2200, 2980]];
            const list = bugs.map(([x, y, min, max], i) => ({ type: 'bug', x, y, homeX: x, homeY: y, min, max, w: 58, h: 33, direction: i % 2 ? 1 : -1, health: 1, timer: i, hitId: -1, captured: false }));
            moths.forEach(([x, y], i) => list.push({ type: 'moth', x, y, homeX: x, homeY: y, w: 54, h: 48, health: 1, timer: i * 1.1, mode: 'flutter', direction: -1, hitId: -1, captured: false }));
            if (this.difficulty === 'impossible') {
                list.push({ ...list[0], x: 1740, homeX: 1740, min: 1580, max: 1970 });
                list.push({ ...list[7], x: 1530, homeX: 1530, y: 1280, homeY: 1280 });
            }
            return list;
        }

        say(text, duration = 4) { this.message = { text, until: this.time + duration }; }
        bounds() { const p = this.player; return { x: p.x - p.w / 2, y: p.y - (this.input.crouch && p.grounded ? 35 : p.h), w: p.w, h: this.input.crouch && p.grounded ? 35 : p.h }; }
        jump() { if (!this.dead && !this.finished) this.jumpBuffer = 0.14; }
        attack() {
            if (this.dead || this.finished || this.time < this.attackReady) return false;
            this.attackState = { started: this.time, id: ++this.attackId, facing: this.player.facing, caught: [] };
            this.attackReady = this.time + 3;
            return true;
        }
        tongue() {
            const attack = this.attackState;
            if (!attack) return null;
            const age = this.time - attack.started;
            if (age >= 0.9) return null;
            const extension = age < 0.14 ? age / 0.14 : age < 0.6 ? 1 : (0.9 - age) / 0.3;
            const p = this.player, crouch = this.input.crouch && p.grounded;
            const x = p.x + attack.facing * 30, y = p.y - (crouch ? 25 : 48);
            const length = PLAYER_ART_HEIGHT * TONGUE_LENGTH_IN_FROGS * clamp(extension, 0, 1);
            return { x, y, length, direction: attack.facing, extension, age, box: { x: attack.facing > 0 ? x : x - length, y: y - 9, w: length, h: 18 } };
        }
        releaseInputs() { this.input.left = false; this.input.right = false; this.input.crouch = false; this.jumpBuffer = 0; }
        resize(width, height) {
            if (!this.canvas || width < 1 || height < 1) return;
            this.view.w = 720 * width / height;
            // 720 logical vertical units on every device. Cap the backing store
            // rather than drawing millions of extra pixels on high-DPI phones.
            const ratio = Math.min(1.5, window.devicePixelRatio || 1);
            this.canvas.width = Math.round(width * ratio); this.canvas.height = Math.round(height * ratio);
            this.snapCamera(); this.render();
        }
        snapCamera() {
            this.camera.x = clamp(this.player.x - this.view.w * 0.43, 0, Math.max(0, WORLD.width - this.view.w));
            this.camera.y = clamp(this.player.y - this.view.h * 0.57, 0, WORLD.height - this.view.h);
        }
        update(delta, input = this.input) {
            if (this.dead || this.finished) { this.render(); return; }
            Object.assign(this.input, input);
            this.accumulator += Math.min(0.05, Math.max(0, delta));
            while (this.accumulator >= PHYSICS.step && !this.dead && !this.finished) {
                this.step(PHYSICS.step); this.accumulator -= PHYSICS.step;
            }
            this.render(); this.notify();
        }
        step(dt) {
            this.time += dt;
            const p = this.player;
            p.immune = Math.max(0, p.immune - dt); this.jumpBuffer = Math.max(0, this.jumpBuffer - dt);
            const direction = Number(this.input.right) - Number(this.input.left);
            const speed = PHYSICS.speed * (this.input.crouch && p.grounded ? 0.58 : 1);
            const target = direction * speed;
            p.vx += clamp(target - p.vx, -2200 * dt, 2200 * dt);
            if (direction && !this.attackState) p.facing = direction;
            if (this.jumpBuffer > 0 && p.coyote > 0) {
                p.vy = -PHYSICS.jump; p.grounded = false; p.coyote = 0; this.jumpBuffer = 0;
                this.emit(p.x, p.y, '#b4c58b', 6);
            }
            this.updateLift(dt);
            const oldY = p.y;
            if (p.grounded && p.onLift && this.lift.moving) p.y += this.lift.lastDelta;
            const oldX = p.x;
            p.x = clamp(p.x + p.vx * dt, 24, WORLD.width - 24);
            const bodyHeight = this.input.crouch && p.grounded ? 35 : p.h;
            // Broad earth shelves are solid at the sides and underside. The
            // narrow moss ledges are one-way platforms, as in the other stages.
            for (const platform of PLATFORMS) {
                if (platform.h < 80 || p.y <= platform.y + 0.1 || p.y - bodyHeight >= platform.y + platform.h - 0.1) continue;
                if (oldX + p.w / 2 <= platform.x && p.x + p.w / 2 > platform.x) { p.x = platform.x - p.w / 2; p.vx = 0; }
                else if (oldX - p.w / 2 >= platform.x + platform.w && p.x - p.w / 2 < platform.x + platform.w) { p.x = platform.x + platform.w + p.w / 2; p.vx = 0; }
            }
            p.vy = Math.min(PHYSICS.maxFall, p.vy + PHYSICS.gravity * dt);
            p.y += p.vy * dt; p.grounded = false; p.onLift = false;
            if (p.vy < 0) for (const platform of PLATFORMS) {
                if (platform.h < 80 || p.x + p.w / 2 <= platform.x || p.x - p.w / 2 >= platform.x + platform.w) continue;
                const bottom = platform.y + platform.h;
                if (oldY - bodyHeight >= bottom && p.y - bodyHeight <= bottom) { p.y = bottom + bodyHeight; p.vy = 0; break; }
            }
            if (p.vy >= 0) {
                let landing = null;
                const candidates = this.lift.active ? [...PLATFORMS, this.lift] : PLATFORMS;
                for (const platform of candidates) {
                    if (p.x + p.w / 2 <= platform.x || p.x - p.w / 2 >= platform.x + platform.w) continue;
                    if (oldY <= platform.y + 3 && p.y >= platform.y && (!landing || platform.y < landing.y)) landing = platform;
                }
                if (landing) { p.y = landing.y; p.vy = 0; p.grounded = true; p.onLift = landing === this.lift; }
            }
            p.coyote = p.grounded ? 0.11 : Math.max(0, p.coyote - dt);
            if (p.y > WORLD.height + 100) this.respawn();
            this.rests.forEach((rest, index) => {
                if (Math.abs(p.x - rest.x) > 58 || Math.abs(p.y - rest.y) > 12 || !p.grounded || rest.lit) return;
                rest.lit = true; this.checkpoint = { x: rest.x, y: rest.y, index };
                p.health = this.rules.health; this.score += 75;
                this.say('Descanso encontrado. Energia recuperada; você volta aqui se perder.');
                this.emit(rest.x, rest.y - 32, '#c5e9ad', 18);
            });
            this.updateEnemies(dt);
            if (this.dead) return;
            this.updateBoss(dt);
            if (this.dead) return;
            this.updateTongue(); this.updateProjectiles(dt);
            if (this.dead) return;
            if (this.returning && this.lift.arrived && p.x > 2320 && p.y <= WORLD.surface + 5 && p.grounded) {
                this.finished = true; this.score += 500; this.onEvent({ type: 'complete', score: this.score, time: this.time });
            }
            for (const particle of this.particles) { particle.life -= dt; particle.x += particle.vx * dt; particle.y += particle.vy * dt; particle.vy += dt * 100; }
            this.particles = this.particles.filter(particle => particle.life > 0);
            const targetX = clamp(p.x - this.view.w * 0.43, 0, Math.max(0, WORLD.width - this.view.w));
            const targetY = clamp(p.y - this.view.h * 0.57, 0, WORLD.height - this.view.h);
            this.camera.x += (targetX - this.camera.x) * (1 - Math.exp(-9 * dt));
            this.camera.y += (targetY - this.camera.y) * (1 - Math.exp(-7 * dt));
        }
        updateEnemies(dt) {
            const p = this.player;
            for (const enemy of this.enemies) {
                if (enemy.health <= 0 || enemy.captured) continue;
                enemy.timer += dt;
                if (enemy.type === 'bug') {
                    enemy.x += enemy.direction * 66 * this.rules.enemySpeed * dt;
                    if (enemy.x < enemy.min || enemy.x > enemy.max) { enemy.x = clamp(enemy.x, enemy.min, enemy.max); enemy.direction *= -1; }
                } else {
                    // A moth circles its own roost, warns, then swoops at a
                    // snapshot of the player's position. It never homes forever.
                    if (enemy.mode === 'flutter') {
                        enemy.x = enemy.homeX + Math.sin(enemy.timer * 1.25) * 88;
                        enemy.y = enemy.homeY + Math.sin(enemy.timer * 2.8) * 47;
                        enemy.direction = p.x < enemy.x ? -1 : 1;
                        if (Math.abs(p.x - enemy.x) < 330 && Math.abs(p.y - 30 - enemy.y) < 190 && enemy.timer > 2.6) {
                            enemy.mode = 'warning'; enemy.timer = 0; enemy.target = { x: p.x, y: p.y - 28 };
                        }
                    } else if (enemy.mode === 'warning') {
                        if (enemy.timer > 0.8 / this.rules.enemySpeed) {
                            const dx = enemy.target.x - enemy.x, dy = enemy.target.y - enemy.y, distance = Math.hypot(dx, dy) || 1;
                            enemy.vx = dx / distance * 210 * this.rules.enemySpeed; enemy.vy = dy / distance * 210 * this.rules.enemySpeed;
                            enemy.mode = 'swoop'; enemy.timer = 0;
                        }
                    } else if (enemy.mode === 'swoop') {
                        enemy.x += enemy.vx * dt; enemy.y += enemy.vy * dt;
                        if (enemy.timer > 1.15) { enemy.mode = 'return'; enemy.timer = 0; }
                    } else {
                        enemy.x += (enemy.homeX - enemy.x) * dt * 2; enemy.y += (enemy.homeY - enemy.y) * dt * 2;
                        if (enemy.timer > 1.8) { enemy.mode = 'flutter'; enemy.timer = 0; }
                    }
                }
                const box = { x: enemy.x - enemy.w * 0.37, y: enemy.y - enemy.h * 0.78, w: enemy.w * 0.74, h: enemy.h * 0.73 };
                if (overlap(this.bounds(), box)) this.hurt(enemy.x);
            }
        }
        bossPhase(phase, duration) { this.boss.phase = phase; this.boss.timer = duration; }
        updateBoss(dt) {
            const b = this.boss, p = this.player;
            if (b.defeated) return;
            if (!b.active) {
                if (p.y < 3280) return;
                b.active = true; this.bossPhase('wake', 1.8);
                this.say('Tatuzão de Raiz. Pule a investida e ataque quando ele baixar a carapaça.', 6);
                this.onEvent({ type: 'boss-start' });
            }
            b.timer -= dt;
            if (b.phase === 'wake' && b.timer <= 0) this.bossPhase('watch', 1.2);
            else if (b.phase === 'watch') {
                b.direction = p.x < b.x ? -1 : 1;
                if (b.timer <= 0) this.bossPhase(b.cycle % 3 === 2 ? 'tell-stomp' : 'tell-charge', this.rules.tell);
            } else if (b.phase === 'tell-charge' && b.timer <= 0) {
                b.chargeEnd = clamp(p.x + b.direction * 160, 200, 2360);
                this.bossPhase('charge', 2.1);
            } else if (b.phase === 'charge') {
                b.x += b.direction * 510 * this.rules.enemySpeed * dt;
                if (b.x <= 170 || b.x >= 2390 || b.direction * (b.x - b.chargeEnd) >= 0 || b.timer <= 0) {
                    b.x = clamp(b.x, 170, 2390); this.bossPhase('tired', this.rules.recovery);
                    this.emit(b.x, b.y, '#b59b72', 18);
                }
            } else if (b.phase === 'tell-stomp' && b.timer <= 0) {
                this.projectiles.push(...[-1, 1].map(direction => ({ x: b.x, y: WORLD.floor, vx: direction * 215 * this.rules.enemySpeed, w: 36, h: 26, life: 6 })));
                this.bossPhase('tired', this.rules.recovery); this.emit(b.x, b.y, '#d2ba8b', 20);
            } else if (b.phase === 'tired' && b.timer <= 0) {
                b.cycle++; this.bossPhase('watch', 0.85);
            } else if (b.phase === 'hurt' && b.timer <= 0) { b.cycle++; this.bossPhase('watch', 0.8); }
            if (b.phase !== 'wake' && overlap(this.bounds(), { x: b.x - b.w * 0.36, y: b.y - b.h * 0.7, w: b.w * 0.72, h: b.h * 0.64 })) this.hurt(b.x);
        }
        updateTongue() {
            const attack = this.attackState;
            if (!attack) return;
            const tongue = this.tongue();
            if (!tongue) {
                for (const enemy of attack.caught) { enemy.health = 0; enemy.captured = false; this.score += enemy.type === 'moth' ? 50 : 35; }
                if (attack.caught.length) { this.emit(this.player.x + attack.facing * 26, this.player.y - 44, '#f1d98b', 16); this.onEvent({ type: 'swallow' }); }
                this.attackState = null; return;
            }
            if (tongue.age < 0.62) for (const enemy of this.enemies) {
                if (enemy.health <= 0 || enemy.captured || enemy.hitId === attack.id) continue;
                if (overlap(tongue.box, { x: enemy.x - enemy.w / 2, y: enemy.y - enemy.h, w: enemy.w, h: enemy.h })) {
                    enemy.hitId = attack.id; enemy.captured = true;
                    enemy.stuckDistance = clamp(Math.abs(enemy.x - tongue.x), 35, 320);
                    attack.caught.push(enemy); this.emit(enemy.x, enemy.y - 18, '#d6eeac', 5);
                }
            }
            const b = this.boss;
            if (b.active && !b.defeated && b.hitId !== attack.id && tongue.age < 0.62 && overlap(tongue.box, { x: b.x - 75, y: b.y - 96, w: 150, h: 92 })) {
                b.hitId = attack.id;
                if (b.phase === 'tired') {
                    b.health--; this.score += 125; this.emit(b.x, b.y - 60, '#f5ce87', 24);
                    if (b.health <= 0) this.defeatBoss(); else this.bossPhase('hurt', 0.8);
                } else { this.emit(b.x, b.y - 65, '#b1c7bc', 5); this.say('Carapaça fechada. Espere a investida terminar.', 2); }
            }
        }
        updateProjectiles(dt) {
            for (const wave of this.projectiles) {
                wave.x += wave.vx * dt; wave.life -= dt;
                if (overlap(this.bounds(), { x: wave.x - 18, y: wave.y - 26, w: 36, h: 26 })) this.hurt(wave.x);
            }
            this.projectiles = this.projectiles.filter(wave => wave.life > 0 && wave.x > 0 && wave.x < WORLD.width);
        }
        hurt(sourceX) {
            const p = this.player;
            if (p.immune > 0 || this.dead || this.returning) return;
            p.health--; p.immune = 1.65; this.damageCount++;
            p.vx = p.x < sourceX ? -220 : 220; p.vy = -220; p.grounded = false;
            this.emit(p.x, p.y - 30, '#e1a69a', 10);
            if (p.health <= 0) { this.dead = true; this.releaseInputs(); this.onEvent({ type: 'defeat', score: this.score }); }
        }
        defeatBoss() {
            const b = this.boss;
            b.defeated = true; b.active = false; b.phase = 'defeated';
            this.returning = true; this.projectiles = [];
            this.lift.active = true; this.score += 350;
            this.enemies.forEach(enemy => { enemy.health = 0; });
            this.player.health = this.rules.health;
            this.say('A raiz despertou. Suba na plataforma à direita para voltar à luz.', 8);
            this.emit(b.x, b.y - 45, '#d3d99a', 40); this.onEvent({ type: 'boss-defeated' });
        }
        updateLift(dt) {
            const lift = this.lift, p = this.player;
            lift.lastDelta = 0;
            if (!lift.active || lift.arrived) return;
            if (!lift.moving && p.x > lift.x && p.x < lift.x + lift.w && Math.abs(p.y - lift.y) < 4 && p.grounded) {
                lift.moving = true; this.say('Voltando à superfície. A saída fica à direita.', 5);
            }
            if (lift.moving) {
                const next = Math.max(WORLD.surface, lift.y - dt * 230);
                lift.lastDelta = next - lift.y; lift.y = next;
                if (next <= WORLD.surface) { lift.arrived = true; lift.moving = false; }
            }
        }
        respawn() {
            const p = this.player;
            Object.assign(p, { x: this.checkpoint.x, y: this.checkpoint.y, vx: 0, vy: 0, grounded: true, onLift: false, immune: 2, health: this.rules.health, coyote: 0.1 });
            this.dead = false; this.finished = false; this.attackState = null; this.attackReady = this.time;
            this.projectiles = []; this.releaseInputs(); this.jumpBuffer = 0; this.accumulator = 0;
            if (!this.boss.defeated) Object.assign(this.boss, { x: 1880, health: this.boss.maxHealth, active: false, phase: 'sleep', timer: 0, cycle: 0 });
            this.enemies = this.makeEnemies();
            this.snapCamera(); this.say('De volta ao descanso. Observe o movimento dos bichinhos antes de avançar.'); this.notify();
        }
        emit(x, y, color, count) {
            const available = Math.min(count, 100 - this.particles.length);
            for (let i = 0; i < available; i++) {
                const angle = i * 2.4 + this.time;
                this.particles.push({ x, y, vx: Math.cos(angle) * (28 + i * 2), vy: Math.sin(angle) * 55 - 22, color, life: 0.35 + (i % 5) * 0.09 });
            }
        }
        status() {
            const depth = Math.max(0, Math.round((this.player.y - WORLD.surface) / 10));
            const region = this.player.y < 600 ? 'Entrada da mata' : this.player.y < 1500 ? 'Galeria das raízes' : this.player.y < 2300 ? 'Jardim sem sol' : this.player.y < 3100 ? 'Ninho de pedra' : 'Câmara do Tatuzão';
            return { health: this.player.health, maxHealth: this.rules.health, depth, region, score: this.score, time: this.time,
                returning: this.returning, checkpoint: this.checkpoint.index,
                objective: this.returning ? 'Volte à superfície pela raiz à direita' : this.boss.active ? 'Pule a investida · ataque a carapaça aberta' : 'Desça pelas galerias e encontre o guardião',
                message: this.message.until > this.time ? this.message.text : '',
                boss: this.boss.active ? { health: this.boss.health, max: this.boss.maxHealth, vulnerable: this.boss.phase === 'tired' } : null,
                cooldown: Math.max(0, this.attackReady - this.time) };
        }
        notify() { this.onEvent({ type: 'status', ...this.status() }); }

        makeTiles() {
            const tile = document.createElement('canvas'); tile.width = 256; tile.height = 128;
            const c = tile.getContext('2d'); c.fillStyle = '#4b493d'; c.fillRect(0, 0, 256, 128);
            if (this.art.images.soil) {
                const soil = this.art.images.soil;
                c.imageSmoothingEnabled = false;
                c.drawImage(soil, 0, Math.round(soil.naturalHeight * 0.4), soil.naturalWidth, Math.round(soil.naturalHeight * 0.23), 0, 0, 256, 128);
                c.fillStyle = '#26362970'; c.fillRect(0, 0, 256, 128);
                return this.ctx.createPattern(tile, 'repeat');
            }
            for (let i = 0; i < 65; i++) {
                const x = (i * 53 + 7) % 128, y = (i * 29 + 4) % 96;
                c.fillStyle = ['#565343', '#3c4038', '#61604a', '#464638'][i % 4];
                c.fillRect(x - x % 4, y - y % 4, 4 + i % 3 * 4, 4);
            }
            return this.ctx.createPattern(tile, 'repeat');
        }
        sprite(key, index, x, feet, height, direction = -1, alpha = 1) {
            const { images, frames } = this.art, c = this.ctx;
            const rect = frames[key]?.[index]; if (!rect || !images[key]) return;
            // Wings and crouched armor change the bounding box, not the size of
            // the animal. Keep a shared pixel scale for the four frames in a row.
            if (key === 'creatures') {
                const rowStart = Math.floor(index / 4) * 4;
                const referenceHeight = Math.max(...frames.creatures.slice(rowStart, rowStart + 4).map(frame => frame.h));
                height *= rect.h / referenceHeight;
            }
            const width = height * rect.w / rect.h;
            c.save(); c.globalAlpha = alpha;
            c.translate(Math.round(x), Math.round(feet));
            // Generated insects face left; the unchanged frog sheets face right.
            const nativeDirection = key === 'creatures' ? -1 : 1;
            c.scale(direction === nativeDirection ? 1 : -1, 1);
            c.drawImage(images[key], rect.x, rect.y, rect.w, rect.h, Math.round(-width / 2), -Math.round(height), Math.round(width), Math.round(height));
            c.restore();
        }
        render() {
            if (!this.ctx || !this.art) return;
            const c = this.ctx, { w, h } = this.view;
            c.setTransform(this.canvas.width / w, 0, 0, this.canvas.height / h, 0, 0);
            c.imageSmoothingEnabled = false;
            const bg = this.art.images.background;
            c.fillStyle = '#223b31'; c.fillRect(0, 0, w, h);
            if (bg) {
                const scale = Math.max(w / bg.naturalWidth, h / bg.naturalHeight) * 1.12;
                const bw = bg.naturalWidth * scale, bh = bg.naturalHeight * scale;
                const parallaxX = this.reducedMotion ? 0 : this.camera.x * 0.018;
                const parallaxY = this.reducedMotion ? 0 : this.camera.y * 0.01;
                c.drawImage(bg, Math.round((w - bw) / 2 - parallaxX), Math.round((h - bh) / 2 - parallaxY), Math.ceil(bw), Math.ceil(bh));
            }
            c.save(); c.translate(-Math.round(this.camera.x), -Math.round(this.camera.y));
            this.renderSurface(); this.renderDecor();
            for (const platform of PLATFORMS) {
                if (platform.y > this.camera.y + h || platform.y + platform.h < this.camera.y) continue;
                this.renderPlatform(platform);
            }
            this.rests.forEach((rest, i) => this.renderRest(rest, i));
            this.renderLift();
            for (const enemy of this.enemies) {
                if (enemy.health <= 0 || enemy.captured || Math.abs(enemy.y - this.player.y) > 800) continue;
                const frame = enemy.type === 'bug' ? Math.floor(this.time * 9) % 4 : 4 + Math.floor(this.time * 11) % 4;
                this.sprite('creatures', frame, enemy.x, enemy.y, enemy.h, enemy.direction);
                if (enemy.mode === 'warning') this.pixelText('!', enemy.x, enemy.y - enemy.h - 14, '#f3ce7c', 22);
            }
            const b = this.boss;
            if (b.y - this.camera.y < h + 200 && b.y > this.camera.y) {
                const frame = b.phase === 'charge' ? 8 + (Math.floor(this.time * 10) % 2) * 2 : b.phase === 'tell-charge' || b.phase === 'tell-stomp' ? 9 : ['tired', 'defeated'].includes(b.phase) ? 11 : 8;
                this.sprite('creatures', frame, b.x, b.y, b.h, b.direction, b.defeated ? 0.6 : 1);
                if (b.phase.startsWith('tell')) {
                    this.pixelText(b.phase === 'tell-stomp' ? 'Pule a onda!' : 'Investida!', b.x, b.y - b.h - 22, '#f4d49b', 19);
                    c.fillStyle = '#e6b075'; c.fillRect(b.x + b.direction * 110 - 12, b.y - 10, 24, 5);
                }
                if (b.phase === 'tired') this.pixelText('Carapaça aberta', b.x, b.y - b.h - 16, '#c4eba0', 16);
            }
            for (const wave of this.projectiles) {
                c.fillStyle = '#bda67f'; c.fillRect(Math.round(wave.x - 18), wave.y - 22, 36, 20);
                c.fillStyle = '#e2d3a5'; c.fillRect(Math.round(wave.x - 10), wave.y - 28, 18, 8);
            }
            this.renderPlayer();
            for (const particle of this.particles) { c.globalAlpha = Math.min(1, particle.life * 3); c.fillStyle = particle.color; c.fillRect(Math.round(particle.x / 3) * 3, Math.round(particle.y / 3) * 3, 4, 4); }
            c.globalAlpha = 1; c.restore();
            this.renderMinimap();
        }
        renderPlayer() {
            const p = this.player, c = this.ctx, tongue = this.tongue();
            const crouch = this.input.crouch && p.grounded;
            // The tongue is drawn first and starts beneath the mouth. Attack and
            // run use an identical 84-unit silhouette height and foot anchor.
            if (tongue) {
                c.save(); c.translate(Math.round(tongue.x), Math.round(tongue.y)); c.scale(tongue.direction, 1);
                c.drawImage(this.art.images.tongue, -5, -8, Math.max(1, Math.round(tongue.length + 5)), 16); c.restore();
                for (const enemy of this.attackState.caught) {
                    const distance = enemy.stuckDistance * tongue.extension;
                    this.sprite('creatures', enemy.type === 'bug' ? 0 : 5, tongue.x + tongue.direction * distance, tongue.y + 14, enemy.h * 0.85, -tongue.direction);
                }
            }
            let key = 'run', frame = Math.abs(p.vx) > 10 ? Math.floor(this.time * 11) % 8 : 0, height = PLAYER_ART_HEIGHT;
            if (!p.grounded) { key = 'jump'; frame = p.vy < -240 ? 3 : p.vy < 130 ? 4 : 5; }
            if (crouch) { key = 'crouch'; height = 53; }
            if (tongue) { key = crouch ? 'crouchAttack' : 'attack'; frame = 0; }
            const alpha = p.immune > 0 && Math.floor(this.time * 12) % 2 ? 0.45 : 1;
            this.sprite(key, frame, p.x, p.y, height, this.attackState?.facing || p.facing, alpha);
        }
        renderPlatform(platform) {
            const c = this.ctx, { x, y, w, h } = platform;
            if (w < 600 && this.art.images.platform) {
                const image = this.art.images.platform;
                const trim = Math.round(image.naturalHeight * 0.18);
                const drawnHeight = w * (image.naturalHeight - trim) / image.naturalWidth;
                c.drawImage(image, 0, trim, image.naturalWidth, image.naturalHeight - trim, x, y - 2, w, drawnHeight);
                return;
            }
            c.fillStyle = '#252e28'; c.fillRect(x, y, w, h);
            c.fillStyle = this.tiles || '#565343'; c.fillRect(x + 4, y + 8, w - 8, h - 12);
            c.fillStyle = '#2e3c2b'; c.fillRect(x, y, w, 11);
            c.fillStyle = '#708750'; c.fillRect(x, y, w, 4);
            for (let i = 0; i < w; i += 16) {
                const n = (i * 31 + y) % 19;
                c.fillStyle = n < 9 ? '#91a46a' : '#566f43'; c.fillRect(x + i, y - (n % 3) * 2, 8, 4);
                if (n < 5) { c.fillStyle = '#425b38'; c.fillRect(x + i, y + 9, 4, 8 + n * 3); }
            }
            c.fillStyle = '#30362e'; c.fillRect(x + 4, y + h - 4, w - 8, 4);
        }
        renderRest(rest, index) {
            if (Math.abs(rest.y - this.player.y) > 800) return;
            const c = this.ctx, x = rest.x, y = rest.y;
            c.fillStyle = '#30362d'; c.fillRect(x - 27, y - 13, 54, 13);
            c.fillStyle = '#9a9f72'; c.fillRect(x - 23, y - 16, 46, 7);
            c.fillStyle = '#665143'; c.fillRect(x - 6, y - 43, 12, 28);
            c.fillStyle = rest.lit ? '#b8e2a5' : '#718e69'; c.fillRect(x - 17, y - 53, 34, 14); c.fillRect(x - 23, y - 47, 46, 8);
            c.fillStyle = rest.lit ? '#f0ecc1' : '#a3b883'; c.fillRect(x - 12, y - 53, 8, 6);
            this.pixelText(`Descanso ${index + 1}`, x, y - 76, rest.lit ? '#d4e9b2' : '#babd97', 16);
        }
        renderSurface() {
            if (this.camera.y > 600) return;
            const c = this.ctx;
            c.fillStyle = '#a5caba'; c.fillRect(0, 0, WORLD.width, 420);
            c.fillStyle = '#e8dba1'; c.fillRect(1380, 112, 70, 50); c.fillRect(1390, 102, 50, 70);
            // This is the same forest panorama used by the running stage.
            // The new underground area begins below it; the game's identity stays.
            const forest = this.art.images.forest;
            if (forest) {
                // Stop at the forest's grass line, excluding its dark underside.
                const sourceHeight = Math.round(forest.naturalHeight * 0.94);
                const height = 2560 * sourceHeight / forest.naturalWidth;
                c.drawImage(forest, 0, 0, forest.naturalWidth, sourceHeight, 0, 420 - height, 2560, height);
            }
            c.fillStyle = '#183229'; c.fillRect(720, 408, 320, 24);
            c.fillStyle = '#526d3e'; c.fillRect(712, 402, 12, 27); c.fillRect(1038, 402, 12, 27);
            c.fillStyle = '#5d5038'; c.fillRect(538, 337, 9, 83);
            c.fillStyle = '#273d2c'; c.fillRect(423, 282, 238, 72);
            c.fillStyle = '#a1ac74'; c.fillRect(423, 282, 238, 4); c.fillRect(423, 350, 238, 4);
            this.pixelText('ENTRADA', 542, 310, '#e6e0b4', 22);
            this.pixelText('Desça pelas raízes →', 542, 335, '#c6d3a0', 17);
            this.pixelText(this.returning ? 'SAÍDA →' : 'Caminho de volta', 2325, 320, this.returning ? '#315d34' : '#526a4c', 18);
            c.fillStyle = '#604b32'; c.fillRect(2510, 315, 8, 105);
            c.fillStyle = this.returning ? '#eee0a0' : '#7e8f59'; c.fillRect(2518, 320, 36, 25);
        }
        renderDecor() {
            const c = this.ctx;
            // Static roots and mushrooms are deterministic; only a few spores
            // drift. No filters, per-frame gradients, tiled panoramas or layout.
            for (let i = 0; i < 34; i++) {
                const x = 55 + (i * 593) % 2400, y = 700 + (i * 197) % 2500;
                if (y < this.camera.y - 120 || y > this.camera.y + this.view.h + 120) continue;
                c.fillStyle = '#39473a'; c.fillRect(x, y, 6, 85); c.fillRect(x + 6, y + 60, 14, 6); c.fillRect(x + 15, y + 66, 5, 35);
            }
            for (const spore of this.spores) {
                if (spore.y < this.camera.y || spore.y > this.camera.y + this.view.h) continue;
                const t = this.reducedMotion ? 0 : this.time;
                c.globalAlpha = 0.4 + Math.sin(t + spore.phase) * 0.2;
                c.fillStyle = '#b7cf99'; c.fillRect(Math.round(spore.x + Math.sin(t * 0.35 + spore.phase) * 18), Math.round(spore.y + Math.cos(t * 0.3 + spore.phase) * 12), 3, 3);
            }
            c.globalAlpha = 1;
            for (const [x, y, text] of [[1930, 900, '↓ Pela direita'], [680, 1700, '↓ Pela esquerda'], [1930, 2500, '↓ O ninho fica abaixo']]) this.pixelText(text, x, y, '#c8c8a2', 17);
        }
        renderLift() {
            if (!this.lift.active) return;
            const c = this.ctx, lift = this.lift;
            c.fillStyle = '#44523a'; c.fillRect(lift.x + 72, WORLD.surface, 12, WORLD.floor - WORLD.surface);
            c.fillStyle = '#79845a'; c.fillRect(lift.x + 75, WORLD.surface, 4, WORLD.floor - WORLD.surface);
            c.fillStyle = '#38482f'; c.fillRect(lift.x - 6, lift.y, lift.w + 12, 24);
            c.fillStyle = '#b2ba7b'; c.fillRect(lift.x, lift.y, lift.w, 5);
            c.fillStyle = '#708957'; c.fillRect(lift.x + 7, lift.y + 6, lift.w - 14, 12);
            if (!lift.moving && !lift.arrived) this.pixelText('Suba aqui ↑', lift.x + lift.w / 2, lift.y - 36, '#e1e8af', 20);
        }
        renderMinimap() {
            const c = this.ctx, x = this.view.w - 65, y = 128;
            c.fillStyle = '#172d27'; c.fillRect(x - 8, y - 8, 42, 132);
            c.fillStyle = '#5c7760'; c.fillRect(x, y, 25, 112);
            c.fillStyle = '#283e31'; c.fillRect(x + 4, y + 4, 17, 104);
            this.rests.forEach(rest => { c.fillStyle = rest.lit ? '#d9dc9c' : '#68826a'; c.fillRect(x + 5, y + (rest.y - 420) / 2940 * 104, 15, 3); });
            c.fillStyle = '#e4bc7d'; c.fillRect(x + 7, y + clamp((this.player.y - 420) / 2940, 0, 1) * 104, 11, 5);
            c.fillStyle = '#e7d9ac'; c.font = '22px "Pixelify Sans", monospace'; c.textAlign = 'center';
            c.fillText(this.returning ? '↑' : '↓', x + 12, y + 136);
        }
        pixelText(text, x, y, color, size = 16) {
            const c = this.ctx;
            if (y < this.camera.y - 100 || y > this.camera.y + this.view.h + 100) return;
            c.font = `${size}px "Pixelify Sans", monospace`; c.textAlign = 'center';
            c.fillStyle = '#1a2d24'; c.fillText(text, Math.round(x) + 2, Math.round(y) + 2);
            c.fillStyle = color; c.fillText(text, Math.round(x), Math.round(y));
        }
        destroy() {
            this.releaseInputs(); this.art = null; this.particles = []; this.enemies = []; this.projectiles = [];
            if (this.canvas) { this.canvas.width = 1; this.canvas.height = 1; }
        }
    }
    globalThis.CroakFallCave = CaveStage;
})();
