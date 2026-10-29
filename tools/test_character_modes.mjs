import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../assets/js/script.js', import.meta.url), 'utf8');
const modes = source.slice(source.indexOf('const CHARACTER_MODES ='), source.indexOf('const ADMIN_SESSION_KEY'));
const policy = source.slice(source.indexOf('function characterMode('), source.indexOf('function syncCharacterDifficulty('));
const normalize = source.slice(source.indexOf('function normalizeStoryProgress('), source.indexOf('function readCharacterSlots('));
const sandbox = vm.createContext({ WORLD_LEVEL_COUNT: 6, activeCharacterSlot: () => null });
vm.runInContext(`${modes}\n${policy}\n${normalize}`, sandbox);

const allowed = { fun: ['easy', 'medium', 'hard'], apprentice: ['medium', 'hard'], skilled: ['hard'], master: ['impossible'] };
const legacy = { name: 'Antigo', frog: '#39a7a2', tongue: '#ef8f45', best: 1234, createdAt: 100,
    lastPlayedAt: 200, progress: { completedPhases: [true, true, false, false, false, false], resistanceDuelWon: true } };
const migrated = sandbox.normalizeCharacterSlot(legacy);
assert.equal(migrated.mode, 'fun');
assert.equal(migrated.difficulty, 'medium');
assert.equal(migrated.best, legacy.best);
assert.equal(migrated.frog, legacy.frog);
assert.equal(migrated.tongue, legacy.tongue);
assert.equal(migrated.createdAt, 100);
assert.equal(migrated.lastPlayedAt, 200);
assert.deepEqual(Array.from(migrated.progress.completedPhases), legacy.progress.completedPhases);
assert.equal(migrated.progress.resistanceDuelWon, true);

for (const [mode, options] of Object.entries(allowed)) {
    for (const request of ['easy', 'medium', 'hard', 'impossible', 'invalid']) {
        const slot = sandbox.normalizeCharacterSlot({ ...legacy, mode, difficulty: request });
        assert.equal(slot.mode, mode);
        assert.ok(options.includes(slot.difficulty));
        const resolved = sandbox.resolveCharacterDifficulty(request, slot);
        assert.ok(options.includes(resolved), `${mode} cannot launch ${request}`);
        if (options.includes(request)) assert.equal(resolved, request);
        const reloaded = sandbox.normalizeCharacterSlot(JSON.parse(JSON.stringify(slot)));
        assert.equal(reloaded.mode, slot.mode);
        assert.equal(reloaded.difficulty, slot.difficulty);
    }
}
assert.equal(sandbox.normalizeCharacterSlot({ ...legacy, mode: 'toString' }).mode, 'fun');
assert.equal(sandbox.resolveCharacterDifficulty('impossible'), 'medium');
console.log('Character modes passed: four policies, exclusive Impossible, save reload, invalid values, and legacy progress preservation.');
