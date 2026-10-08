---
version: alpha
colors:
  forest-950: "#102d20"
  forest-800: "#173f2a"
  forest-600: "#2f6b3c"
  leaf-400: "#7fcf47"
  straw-500: "#f4b942"
  straw-300: "#ffd77a"
  parchment: "#fff4cf"
  ink: "#1c251d"
  danger: "#b94232"
typography:
  display:
    fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
  body:
    fontFamily: "'Trebuchet MS', Arial, sans-serif"
  data:
    fontFamily: "'Courier New', monospace"
rounded:
  board: "24px"
  control: "14px"
  compact: "12px"
spacing:
  compact: "8px"
  standard: "16px"
  roomy: "28px"
components:
  gameBoard:
    radius: "24px"
    border: "5px solid #fff4cf"
  primaryButton:
    radius: "14px"
    background: "#173f2a"
  jumpButton:
    radius: "16px"
    background: "#f4b942"
---

## Overview

The game feels like a lively illustrated adventure map for players on phones and computers. Its signature is a straw-hat-yellow control language framed by deep forest green, echoing the protagonist without copying generic pirate UI. The surface is a hybrid: expressive around the game board and restrained inside the play area.

Avoid glossy casino styling, neon cyberpunk palettes, generic glass dashboards, and excessive decorative motion.

## Colors

Forest tones own the application shell and primary actions. Straw yellow signals playable actions and score accents. Parchment is reserved for the game frame and start card. Danger red is semantic and should only appear for failure or risk.

Runtime ownership: the custom properties at the top of `assets/css/style.css` implement these values directly. `DESIGN.md` is the normative source; changes to a durable token must update both files together.

## Typography

Impact is used sparingly for the title and short game-state headlines. Trebuchet MS carries instructions and controls. Courier New is exclusive to score data so digits remain stable while the game runs.

## Layout

Desktop uses a wide 16:9 board with the title and score above it. Narrow screens switch the board to a tall 4:5 stage and expose a full-width touch control below it. Safe-area insets and unusually narrow embedded browser views are supported without horizontal overflow.

## Elevation & Depth

Depth comes from the board frame and pressable button shadows. Static text and score surfaces remain quiet. Backdrop blur is limited to the opening layer and scoreboard, where it protects legibility over scenery.

## Shapes

The board uses a large soft rectangle; controls use sturdy medium-radius geometry. The asymmetric lower-right radius on the start card gives it a map-page character and is the sole expressive shape flourish.

## Components

All actions use native buttons with hover, active, focus-visible, disabled, and touch states. The overlay preserves one primary action. Mobile keeps the jump target at least 60px tall. Score blocks reserve stable width to prevent movement.

## Do's and Don'ts

- Do keep pixel artwork crisp with `image-rendering: pixelated`.
- Do preserve transparent breathing room around animated sprites.
- Do keep gameplay controls usable with keyboard, pointer, and touch.
- Don't add decorative particles behind the runner; they resemble sprite corruption.
- Don't place important controls only inside the moving game area on mobile.
- Don't introduce external font or framework dependencies for this static game.
