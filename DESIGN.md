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
  sky-night: "#243b8f"
  lantern: "#ffb24a"
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
  hoppingFrog: {}
  jumpStates: {}
  flyingInsect: {}
  animatedBoar: {}
  beetleWave: {}
  phaseBanner: {}
---

## Overview

The game feels like a lively illustrated adventure map for players on phones and computers. Its signature is the frog's long tongue crossing the playfield to catch animated insects, supported by a straw-hat-yellow control language framed by deep forest green. The surface is a hybrid: expressive on the opening card and restrained while the player is running. A three-phase journey moves from sunny village to ancient forest and moonlit castle, with crossfades, continuous mirrored scenery and parallax communicating progress without visible image seams.

Avoid glossy casino styling, neon cyberpunk palettes, generic glass dashboards, and excessive decorative motion.

## Colors

Forest tones own the application shell and primary actions. Straw yellow signals playable actions and score accents. Parchment is reserved for the game frame, phase banner, and start card. Danger red is semantic and should only appear for failure or risk. Sky Night and Lantern belong only to the final castle phase, preserving contrast while raising the sense of difficulty.

Runtime ownership: the custom properties at the top of `assets/css/style.css` implement these values directly. `DESIGN.md` is the normative source; changes to a durable token must update both files together.

## Typography

Pixelify Sans is bundled locally under the SIL Open Font License and owns titles, game-state headlines, controls, HUD labels and tabular score digits. Its blocky construction recalls classic building games without copying their lettering, while softer terminals and the green-and-straw shadow treatment keep the voice specific to the frog world. Trebuchet MS remains the reading face for instructions and longer messages. Runtime mapping is centralized in `assets/css/style.css` through `--font-display`, `--font-ui`, `--font-body` and `--font-data`; the local font file prevents layout from depending on a third-party request.

## Layout

The playfield occupies the available browser viewport up to a 1600 × 900 maximum instead of sitting inside a decorative page frame. The title, phase, score, record, pause and play controls live inside the stage as a game HUD. Narrow screens become a full-height portrait stage with two large touch targets anchored to opposite bottom corners. Safe-area insets and unusually narrow embedded browser views are supported without horizontal overflow. The phase progress line remains inside the board.

## Elevation & Depth

Depth comes from continuous mirrored scenery, independently moving ground, overlapping character layers and pressable button shadows. Static text and score surfaces remain quiet. Backdrop blur is limited to the opening layer and HUD, where it protects legibility over scenery.

## Shapes

Desktop uses a restrained soft rectangle around the stage; the mobile stage reaches the viewport edges. Controls use sturdy medium-radius geometry. The asymmetric lower-right radius on the start card gives it a map-page character and is the sole expressive shape flourish.

## Components

All actions use native buttons with hover, active, focus-visible, disabled, and touch states. The overlay preserves one primary action and is reused for pause without resetting the current run. Mobile keeps both Jump and Tongue targets at least 60px tall. The tongue is a separate transparent overlay anchored to the mouth, so attacking never replaces or rescales the frog. The frog uses an eight-frame short-hop cycle based on real anuran locomotion: compression, bilateral hind-leg extension, toe-off, airborne recovery, forelimb contact and landing. A player-triggered high jump selects dedicated takeoff, rise, apex, fall and landing poses from the same sheet according to vertical velocity, preserving identity and scale. Its white muzzle, eye, nose and straw hat remain consistent in every pose. Forest boars use a separate four-frame gallop instead of artificial bobbing. Beetles are hostile: they arrive mostly in high two- or three-creature waves that invite a jump-and-tongue move; rare low waves are allowed only while the obstacle lane is clear. Score blocks reserve stable width to prevent movement. Compact mossy rocks, wooden wheels and forest boars share one runtime system but keep distinct silhouettes, forgiving collision insets, speeds and point values. Moving moss platforms are non-damaging surfaces: the frog can land on their top, ride briefly and jump again. World motion uses one standard run speed modified deliberately by biome: neutral in the village, faster in the forest and slower at night. Phase thresholds leave enough running time for each biome to establish its own rhythm.

## Do's and Don'ts

- Do keep pixel artwork crisp with `image-rendering: pixelated`.
- Do preserve transparent breathing room around animated sprites.
- Do keep gameplay controls usable with keyboard, pointer, and touch.
- Do use the tongue only for capturable insects and keep its hit area visually aligned with the sprite.
- Do keep the frog's cream-white nose readable in every running frame.
- Do keep the frog's body scale fixed when the tongue overlay appears.
- Do use the jump sprite states to match takeoff, ascent, apex, descent and landing velocity.
- Do reserve a reaction gap around low beetle waves; high waves may form compact groups of two or three.
- Do mirror the second scenery panel so long-running backgrounds never expose a hard seam.
- Do use phase changes to increase variety and difficulty without changing the two-action Jump and Tongue model.
- Do reduce decorative parallax when the player requests reduced motion.
- Don't add decorative particles behind the runner; they resemble sprite corruption.
- Don't place important controls only inside the moving game area on mobile.
- Don't introduce runtime font or framework dependencies; approved open-source fonts must be stored locally with their license.
