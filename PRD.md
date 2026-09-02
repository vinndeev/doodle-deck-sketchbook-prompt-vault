# Product Requirements Document — Doodle Deck: Sketchbook Prompt Vault

## Problem
Hobbyist artist sits to draw but blanks on what to sketch. No lightweight place to save prompts, browse, random draw.

## Goal
Single-page app that lets user save/browse/randomly draw personal drawing prompts, persist locally, cycle progress.

## Target User
Hobbyist artist (casual, not pro), wants quick inspiration, playful tactile feel.

## Challenge Context
BRAWL 40KB. Single-page, localStorage, no backend. Must feel sketchbook-like.

## User Stories
- As artist, add new prompt with diff/style so I can grow deck
- As artist, see all prompts as cards so I can browse
- As artist, filter by difficulty/style so I find right challenge
- As artist, hit Surprise Me to get random untried prompt highlighted
- As artist, click card to cycle untried→in progress→done with visual cue
- As artist, delete prompt I'm done with
- As artist, refresh page and keep collection

## Required Features
1. Add form: prompt text (required, non-empty), difficulty [easy/medium/hard] (default easy), style [pencil/ink/watercolor/digital] (default pencil), creates status untried
2. Delete per card
3. Card grid display all prompts (newest first)
4. Filter by difficulty (all/easy/medium/hard) AND style (all/pencil/ink/watercolor/digital)
5. Surprise Me button: random pick among status=untried, highlight front-center (spotlight modal/banner), disabled/notice if none
6. localStorage persist (key doodle-deck:v1), load on init, save on mutation
7. Click card cycles status, visual indicator (border color + badge)

## User Flow
Open → see header + Surprise Me + form + filters + grid (empty state if 0) → add prompt → appears in grid → filter updates view → click card cycles → Surprise Me highlights untried → delete removes → refresh restores

## Functional Requirements
- Validation: prompt text trimmed non-empty, max 160 chars, show inline error
- Id generation: timestamp+random
- Newest-first sort by createdAt desc
- Filter combiners: difficulty AND style (both must match unless all)
- Surprise: uniform random among filtered? spec says among all untried — pick from all untried regardless of filter, then scroll/highlight; if zero untried show message
- Status cycle order strictly untried→in progress→done→untried
- Delete immediate, no confirm modal (keep simple) but ensure not accidental — hit area separate from card cycle (stopPropagation)
- Stats footer: total + counts per status

## UX Requirements
- Playful tactile: paper texture, Caveat headings, pencil accents, offset shadow
- Surprise Me dominant big pill
- Card visual: top stripe status color, badge text, tags pills
- Empty/filtered-empty states with message + CTA
- Keyboard: form Tab, card Enter/Space cycles, Esc closes spotlight
- Inline validation feedback

## Responsive Requirements
- Mobile <640: single col, full-width Surprise
- Tablet 640-900: 2-col grid
- Desktop ≥900: sticky form left 380px + grid right

## Accessibility Requirements
- Semantic landmarks, form labels, radiogroups
- Card role button, aria-label includes prompt + status
- aria-live for Surprise result
- Focus visible dashed outline
- Contrast ≥4.5:1, status not color-only (badge text)

## Technical Constraints
- Vanilla HTML/CSS/JS ES modules, JSDoc types, no framework
- localStorage only, no server
- Budget ≤40KB commit
- Modules: storage.js, utils.js, ui.js, app.js, types.js
- package.json test script, test.js node assert

## Acceptance Criteria
- Add valid → appears newest-first, persisted
- Invalid (empty) → error, not added
- Delete → removed from DOM + storage
- Filter diff/style → grid shows only matching, combine correctly
- Surprise with ≥1 untried → one untried highlighted, announced
- Surprise with 0 untried → disabled or message
- Click card cycles through 3 states and border/badge update
- Refresh → collection restored identical order
- No secrets, clean diff, budget under 40KB

## Out of Scope
- Auth, backend, share, image upload, edit prompt, undo, search text, drag-reorder
