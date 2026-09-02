# Design Brief — Doodle Deck: Sketchbook Prompt Vault

## Overview
Single-page prompt vault for hobbyist artist. Playful tactile sketchbook feel — paper textures, hand-drawn headings, pencil-stroke accents — but remain fully functional, scannable, fast. Mobile first, desktop 2-col.

## Design Goals
- Immediate delight: Surprise Me dominant, tactile invite
- Glanceable cards: prompt + tags + status instant read
- Low friction add/cycle/filter, no blank-page block
- Feels like opening sketchbook, not dashboard

## Design Principles
- Paper first, UI second — off-white + subtle grain, not flat gray
- Hand-drawn warmth + clean readability — display font for headings, system sans for data
- Pencil-stroke imperfections over geometric perfection
- Color codes carry meaning (difficulty/style/status), not decor

## Color System
- Paper: `#FFFCF5` (page), `#FDF6E3` alternative card warmth, `#F2EAD3` border
- Ink: `#1A1A18` text, `#5C5A54` muted, `#9A9590` placeholder
- Accent pencil: `#2B2B2B` stroke, `#E8E0C8` fill highlight
- Difficulty: easy `#7DB86E` / medium `#E8A838` / hard `#D96C4A`
- Style: pencil `#6B7280` / ink `#111827` / watercolor `#38BDF8` / digital `#A78BFA`
- Status untried `#E5E0CC` dashed / in progress `#F59E0B` solid amber / done `#10B981` solid green
- Texture: subtle noise SVG + ruled margin line `#F4C2C2` left accent option

## Typography
- Display: `Caveat` 700 for H1/H2/card prompt (hand-drawn)
- Body: `DM Sans` or `Inter` 400/600 for labels, tags, buttons
- Scale: H1 2.4rem (mobile) → 3rem desktop, card prompt 1.15rem, meta 0.8rem uppercase tracked
- Handwritten prompt text line-height 1.4, slight rotation variation optional

## Layout
- Max width 1100px centered, 16px gutters mobile 24px desktop
- Top: header + Surprise Me hero (big tactile button)
- Middle: sticky form (left) + filter bar + card grid (right) → ≥900px 2-col (380px form | 1fr grid), <900px stack
- Grid: `repeat(auto-fill, minmax(220px, 1fr))` gap 16px
- Footer summary: counts + counts by status

## Spacing
- 8pt base: 4/8/12/16/24/32
- Card padding 16px, gap 12px internal
- Section gap 24px vertical

## Elevation
- Flat paper stack, not shadow heavy — cards `1px solid #E8E0C8` + `box-shadow: 2px 3px 0 #E8E0C8` (pencil offset) + slight rotate 0.3deg on hover
- Surprise highlight: scale + ring + paper lift

## Shapes
- Radius 12px cards, 10px buttons, 8px tags
- Pencil underline wavy SVG for headings
- Rough border option via slight border-radius variation

## Components
- Button primary Surprise Me: big pill 48px height, `#1A1A18` bg, `#FFFCF5` text, pencil scribble icon
- Form: dashed paper fieldset, inputs underlined style, validation inline red `#D96C4A`
- Cards: paper texture bg, top stripe = status color, tags as small pills, delete icon top-right, hover rotate
- Filter: segmented pills or select dropdowns — pill toggles for diff/style
- Highlight modal/spotlight: centered card enlarged with backdrop blur, `aria-modal`
- Badge status: dot + label uppercase

## Interaction States
- Hover card lift 2px + shadow deepen
- Click card → status cycle → border color animate 180ms, badge update, subtle toast optional
- Active filter pill: dark bg light text
- Focus visible: 2px dashed `#1A1A18` outline-offset 2px
- Surprise: if no untried → disabled state + helper text
- Delete: confirm via inline or immediate with no undo (localStorage)

## Responsive Behavior
- <640: single col, header stack, Surprise full-width, grid 1 col
- 640-900: grid 2 col
- ≥900: form sticky top 24px, grid 2-3 col
- Touch targets ≥40px, swipe not needed

## Accessibility
- Semantic HTML: header/main/section/form/ul>li
- Radiogroup for difficulty/style in form, select for filter with labels
- Surprise button `aria-live` announcement of picked prompt
- Status cycle via click + keyboard Enter/Space on card (role button)
- Color not sole indicator — badge text + border + icon
- Contrast paper/ink ≥7:1, tags ≥4.5:1
- Reduce motion: disable rotate/lift if prefers-reduced-motion

## Do's
- Keep paper texture subtle, not noisy
- Hand-drawn only for headings/prompts, keep controls legible sans
- Status color + label always together
- Empty state with sketch doodle + CTA

## Don'ts
- No heavy glassmorphism/neon — breaks sketchbook
- No tiny tags — min 11px
- No card inside card inside card
- No generic dashboard grid without tactile details

## Tokens (CSS vars)
```css
--paper: #FFFCF5; --paper-2:#FDF6E3; --line:#E8E0C8;
--ink:#1A1A18; --muted:#5C5A54;
--easy:#7DB86E; --med:#E8A838; --hard:#D96C4A;
--pencil:#6B7280; --ink-tag:#111827; --water:#38BDF8; --digital:#A78BFA;
--untried:#E5E0CC; --progress:#F59E0B; --done:#10B981;
--radius:12px; --shadow:2px 3px 0 #E8E0C8;
```
