---
version: alpha
colors:
  primary: "#173f2a"
  forest-950: "#102d20"
  forest-800: "#173f2a"
  forest-600: "#2f6b3c"
  leaf-400: "#7fcf47"
  straw-500: "#f4b942"
  straw-300: "#ffd77a"
  parchment: "#fff4cf"
  ink: "#1c251d"
  danger: "#b94232"
  sky-morning: "#35aef2"
  sunlight: "#ffd77a"
typography:
  display:
    fontFamily: "'Pixelify Sans', 'Courier New', monospace"
  ui:
    fontFamily: "'Pixelify Sans', 'Trebuchet MS', sans-serif"
  body:
    fontFamily: "'Trebuchet MS', Arial, sans-serif"
  data:
    fontFamily: "'Pixelify Sans', 'Courier New', monospace"
rounded:
  board: "18px"
  control: "14px"
  compact: "12px"
spacing:
  compact: "8px"
  standard: "16px"
  roomy: "28px"
components:
  gameBoard: {}
  primaryButton: {}
  jumpButton: {}
  tongueButton: {}
  runningFrog: {}
  jumpStates: {}
  flyingInsect: {}
  animatedBoar: {}
  beetleWave: {}
  phaseBanner: {}
---

## Overview

The game feels like a lively illustrated adventure map for players on phones and computers. Its signature is the frog opening its mouth before the long tongue crosses the playfield to catch animated insects, supported by a straw-hat-yellow control language framed by deep forest green. The surface is a hybrid: expressive on the opening card and restrained while the player is running. A four-phase morning journey moves from sunny village through dew-covered fields and ancient forest to a daylight castle, with crossfades, continuous mirrored scenery, parallax and a compact route map communicating progress without visible image seams.

Avoid glossy casino styling, neon cyberpunk palettes, generic glass dashboards, excessive decorative motion, and sticker-like decorative characters floating above the scenery.

## Colors

Forest tones own the application shell and primary actions. Straw yellow signals playable actions and score accents. Parchment is reserved for the game frame, phase banner, and start card. Danger red is semantic and should only appear for failure or risk. Morning sky blue and sunlight yellow keep every region bright while the scenery, pacing and obstacle mix create contrast.

Runtime ownership: the custom properties at the top of `assets/css/style.css` implement these values directly. `DESIGN.md` is the normative source; changes to a durable token must update both files together.

## Typography

Pixelify Sans is bundled locally under the SIL Open Font License and owns titles, game-state headlines, controls, HUD labels and tabular score digits. Its blocky construction recalls classic building games without copying their lettering, while softer terminals and the green-and-straw shadow treatment keep the voice specific to the frog world. Trebuchet MS remains the reading face for instructions and longer messages. Runtime mapping is centralized in `assets/css/style.css` through `--font-display`, `--font-ui`, `--font-body` and `--font-data`; the local font file prevents layout from depending on a third-party request.

## Layout

The playfield occupies the available browser viewport up to a 1600 × 900 maximum instead of sitting inside a decorative page frame. The title, phase, score, record, pause and play controls live inside the stage as a game HUD. A compact map below the HUD shows four named stops, total route progress and elapsed time. Narrow screens become a full-height portrait stage with two large touch targets anchored to opposite bottom corners. Safe-area insets and unusually narrow embedded browser views are supported without horizontal overflow.

## Elevation & Depth

Depth comes from continuous three-to-one panoramic scenery, world-synchronized ground, overlapping character layers and pressable button shadows. Each panorama keeps more than half its composition as sky, uses readable midground architecture instead of miniature dots and sits slightly above the track so landmarks remain clear behind the runner. A short generated grass verge bridges the lifted panorama to the shared track baseline, so no scenery content is hidden and no sky gap can open. Static text and score surfaces remain quiet. Backdrop blur is limited to the opening layer and HUD, where it protects legibility over scenery.

## Shapes

Desktop uses a restrained soft rectangle around the stage; the mobile stage reaches the viewport edges. Controls use sturdy medium-radius geometry. The asymmetric lower-right radius on the start card gives it a map-page character and is the sole expressive shape flourish.

## Components

All actions use native buttons with hover, active, focus-visible, disabled, and touch states. The overlay preserves one primary action and is reused for pause without resetting the current run. Mobile keeps both Jump and Tongue targets at least 60px tall. The tongue is a separate transparent overlay containing only the tongue, anchored by shared mouth coordinates and rendered behind the frog. Activating it temporarily swaps the runner to a same-scale, mouth-open pose selected for either grounded running or airborne jumping, then returns to the current motion sheet. Grounded and airborne poses each define their own mouth anchor so the tongue follows the character through vertical movement without a second mouth, jaw or lip appearing. Attack selectors must outrank every movement-sheet selector so a two-frame sheet can never expose neighboring frames from an eight-frame sheet. On the ground, the frog deliberately runs upright like a cartoon person; its professional eight-frame cycle follows contact, down, passing and up poses twice, with opposite arms and legs, planted-foot continuity and a visible bend-and-swing in each rear leg. A player-triggered jump changes to natural frog biomechanics and selects dedicated takeoff, rise, apex, fall and landing poses according to vertical velocity. All sheets preserve the same identity, scale, white muzzle, eye, nose and straw hat. Forest boars use a separate four-frame gallop instead of artificial bobbing. Beetles are hostile: they arrive mostly in high two- or three-creature waves that invite a jump-and-tongue move; rare low waves are allowed only while the obstacle lane is clear. Score blocks reserve stable width to prevent movement. Compact mossy rocks, wooden wheels and forest boars share one runtime system but keep distinct silhouettes, forgiving collision insets, speeds and point values. Static rocks move at exactly the same rate as the ground texture; wheels and boars may add their own visible locomotion. Moving moss platforms are non-damaging surfaces: the frog can land on their top, ride briefly and jump again. The complete route lasts 185 seconds, changes regions at fixed elapsed-time milestones and raises speed and spawn pressure gradually under capped limits so every obstacle remains avoidable.

## Do's and Don'ts

- Do keep pixel artwork crisp with `image-rendering: pixelated`.
- Do preserve transparent breathing room around animated sprites.
- Do keep gameplay controls usable with keyboard, pointer, and touch.
- Do use the tongue only for capturable insects and keep its hit area visually aligned with the sprite.
- Do keep the frog's cream-white nose readable in every running frame.
- Do keep the frog's body scale fixed when the tongue overlay appears.
- Do open the frog's mouth before the tongue extends and align the tongue origin with the cream muzzle in both ground and air poses.
- Do keep the charming upright run on the ground and reserve natural frog poses for jumping.
- Do use the jump sprite states to match takeoff, ascent, apex, descent and landing velocity.
- Do reserve a reaction gap around low beetle waves; high waves may form compact groups of two or three.
- Do mirror the second scenery panel so long-running backgrounds never expose a hard seam.
- Do compose scenery as a 3:1 side-scroller panorama with readable midground landmarks, matching edge heights and a flat verge aligned to the runtime ground.
- Do derive both the scenery baseline and track height from the same `--ground-height` token on every responsive breakpoint.
- Do lift the panorama with `--scene-lift` and fill that exact interval with the scenery verge; never move the bitmap upward without bridging the exposed area.
- Do show the full panorama width on landscape screens and use the reduced-scale center crop on portrait screens; never use `cover` for gameplay scenery.
- Do use phase changes to increase variety and difficulty without changing the two-action Jump and Tongue model.
- Do keep static rocks locked to the ground scroll speed; movement faster than the ground requires a visible rolling or running animation.
- Do keep all four regions in clear morning light and derive route progress from elapsed time.
- Do reduce decorative parallax when the player requests reduced motion.
- Don't add decorative particles behind the runner; they resemble sprite corruption.
- Don't place important controls only inside the moving game area on mobile.
- Don't introduce runtime font or framework dependencies; approved open-source fonts must be stored locally with their license.
