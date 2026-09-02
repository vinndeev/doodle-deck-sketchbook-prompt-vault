# Roadmap — Doodle Deck

## Phase 1 — Foundation ~5min P0
Objective: scaffold + types + storage
- init index.html shell, css/styles.css tokens, js/modules
- types.js JSDoc @typedef Prompt, Difficulty, Style, Status
- storage.js load/save (key doodle-deck:v1)
- utils.js id/today/filter/surprise helpers
- package.json test script
Validation: loads empty + persists

## Phase 2 — Core Features ~25min P0
- Form add: validation, create Prompt, save, re-render
- Card grid render: newest-first, status stripe/badge, tags, delete btn
- Click card cycle status untried→in progress→done
- Filter bar: difficulty + style (ALL + values), combined AND
- Surprise Me: random untried, spotlight highlight, edge case 0 untried
- Delete wiring (stopPropagation)
Validation: all 7 required features manual test + refresh

## Phase 3 — UX and Responsive ~10min P1
- Parchment paper texture, Caveat/DM Sans, pencil shadow
- Empty/filtered empty states, stats footer counts
- Sticky form ≥900px, grid responsive 1→2→3 cols
- Surprise spotlight modal + aria-live + Esc close
- Hover lift, focus ring, motion reduce
Validation: mobile/desktop visual + keyboard flow

## Phase 4 — Technical Hardening ~5min P1
- JSDoc everywhere, // @ts-check optional
- escapeHtml XSS guard, trim/limit 160
- Module seams clean, no circular
- Budget check ≤40KB
Validation: no diagnostics, diff sized

## Phase 5 — Testing ~7min P0
- test.js node assert: storage roundtrip, filter AND, cycle, surprise, validation, newest-first
- npm test passes
Validation: 10+ asserts pass, README documents

## Phase 6 — Challenge Audit ~8min P0
- Brief audit every req, flow end-to-end
- Responsive, a11y, security, repo clean
- Final verify + result text
