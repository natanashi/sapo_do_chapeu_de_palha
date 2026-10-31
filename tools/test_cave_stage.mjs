import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(new URL('../assets/js/cave-stage.js', import.meta.url), 'utf8'), sandbox);
const Cave = sandbox.CroakFallCave;
const tick = (game, seconds, input = {}) => {
    for (let t = 0; t < seconds; t += 1 / 120) game.update(1 / 120, { left: false, right: false, crouch: false, ...input });
};
const game = new Cave(null, null);
tick(game, 2);
assert.equal(game.player.x, 450, 'Exploration must not autorun');
assert.equal(game.player.y, 420, 'Feet must rest exactly on surface geometry');
game.jump(); tick(game, 0.45);
assert(game.player.y < 250, 'Jump must clear all staircase rises');
tick(game, 0.9);
assert.equal(game.player.y, 420);
tick(game, 1.65, { right: true });
assert(game.player.y > 420, 'Walking into the opening must descend into the cave');
assert(game.camera.y > 0, 'Camera must follow vertical exploration');
assert(game.player.facing === 1);
tick(game, 0.1, { left: true });
assert.equal(game.player.facing, -1, 'Movement must turn the character');
const apex = Cave.physics.jump ** 2 / (2 * Cave.physics.gravity);
assert(apex > 180, 'Every ledge in the return staircase must be reachable');

// Thin ledge landing and fast falling use swept foot crossing, not render size.
Object.assign(game.player, { x: 900, y: 570, vy: 900, vx: 0, grounded: false });
tick(game, 0.06);
assert.equal(game.player.y, 600);
assert.equal(game.player.grounded, true);

Object.assign(game.player, { x: 1710, y: 960, vy: 0, grounded: true, health: 1 });
tick(game, 0.02);
assert.equal(game.checkpoint.index, 0);
assert.equal(game.player.health, game.rules.health);
game.hurt(1800); assert.equal(game.player.health, game.rules.health - 1);
game.hurt(1800); assert.equal(game.player.health, game.rules.health - 1, 'Damage grace period must prevent repeated hits');
game.respawn(); assert.equal(game.player.x, 1710); assert.equal(game.player.y, 960);

// Tongue retains a captured bug on the tongue through the extended window.
Object.assign(game.player, { x: 1200, y: 960, vx: 0, vy: 0, grounded: true, facing: 1 });
game.input.crouch = true;
game.enemies = [{ type: 'bug', x: 1360, y: 960, w: 58, h: 33, health: 1, direction: -1, min: 1300, max: 1400, timer: 0 }];
assert(game.attack()); tick(game, 0.4, { crouch: true });
assert.equal(game.enemies[0].captured, true);
assert.equal(game.enemies[0].health, 1, 'Bug must stay on tongue before retraction');
assert(!game.attack(), 'Tongue has a three-second cooldown');
tick(game, 0.6, { crouch: true });
assert.equal(game.enemies[0].health, 0);

// Traverse the actual galleries using only walking and jumping, without
// teleporting, disabling enemies or adding invulnerability.
const route = new Cave(null, null, { difficulty: 'easy' });
for (let frame = 0; frame < 90 * 120 && !route.boss.active && !route.dead; frame++) {
    const y = route.player.y;
    const right = y < 1120 || (y >= 1880 && y < 2680);
    if (route.player.grounded && route.enemies.some(enemy => enemy.health > 0 && enemy.type === 'bug'
        && Math.abs(enemy.y - y) < 10 && (enemy.x - route.player.x) * (right ? 1 : -1) > 0 && Math.abs(enemy.x - route.player.x) < 130)) route.jump();
    route.update(1 / 120, { left: !right, right, crouch: false });
}
assert(route.boss.active && !route.dead, 'The full descent must be traversable with ordinary controls');
assert.equal(route.checkpoint.index, 2, 'All three rests must be reachable on the main path');

// Defeat the real boss through successive exhausted windows. Armored hits
// cannot damage it; one tongue cannot register twice; every hit wakes it again.
const events = [];
const bossGame = new Cave(null, null, { onEvent: event => events.push(event.type) });
bossGame.enemies = [];
Object.assign(bossGame.player, { x: 1550, y: 3360, grounded: true, immune: 999 });
tick(bossGame, 0.05);
assert.equal(bossGame.boss.active, true);
bossGame.attack(); tick(bossGame, 0.3);
assert.equal(bossGame.boss.health, bossGame.boss.maxHealth);
let hits = 0, previousHealth = bossGame.boss.health, hadCharge = false, hadStomp = false;
for (let t = 0; t < 180 && !bossGame.boss.defeated; t += 1 / 120) {
    const b = bossGame.boss;
    hadCharge ||= b.phase === 'charge'; hadStomp ||= b.phase === 'tell-stomp';
    if (b.phase === 'tired' && !bossGame.attackState && bossGame.time >= bossGame.attackReady) {
        Object.assign(bossGame.player, { x: b.x > 450 ? b.x - 210 : b.x + 210, y: 3360, vx: 0, vy: 0, grounded: true, facing: b.x > 450 ? 1 : -1 });
        bossGame.attack();
    }
    bossGame.update(1 / 120, { left: false, right: false, crouch: false });
    if (b.health < previousHealth) {
        hits++; previousHealth = b.health;
        assert(['hurt', 'defeated'].includes(b.phase), 'Each hit must close the vulnerable window');
    }
}
assert(hadCharge && hadStomp, 'Boss must use both jumpable attacks');
assert.equal(hits, bossGame.boss.maxHealth);
assert.equal(bossGame.returning, true);
assert.equal(bossGame.finished, false, 'Defeating the boss alone must not complete exploration');
assert(events.includes('boss-defeated'));

Object.assign(bossGame.player, { x: 2390, y: 3360, vy: 0, vx: 0, grounded: true, onLift: true });
tick(bossGame, 15);
assert.equal(bossGame.lift.arrived, true);
assert.equal(bossGame.player.y, 420, 'Moving lift must carry feet all the way to surface');
assert.equal(bossGame.finished, true);
assert.equal(events.filter(type => type === 'complete').length, 1);

for (const difficulty of ['easy', 'medium', 'hard', 'impossible']) {
    const trial = new Cave(null, null, { difficulty });
    assert.equal(trial.player.health, Cave.rules[difficulty].health);
    assert.equal(trial.boss.maxHealth, Cave.rules[difficulty].boss);
}
console.log('Cave: fixed-step movement, ledges, rests, capture, cooldown, boss cycle, ascent and all difficulties passed.');
