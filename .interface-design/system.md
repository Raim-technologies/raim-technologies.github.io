# Raim Technologies — Design System

## Direction

Precise, technical, engineered. Like opening a well-built tool.
NOT warm. NOT playful. NOT "clean and modern" (that means nothing).
This is a software engineering company — the site should feel like one.

## Who

IT decision-makers (CTO, IT manager, business owner) in Japan evaluating a development partner. They're comparing Raim against other IT services companies. Confidence must come from craft, not claims.

## Intent

The site projects engineering competence through precision, not decoration. Every element earns its place. Green is a signal, not a theme.

---

## Tokens

```css
/* Ink — text hierarchy */
--ink: #111827;
--ink-2: #374151;
--ink-3: #6b7280;
--ink-4: #9ca3af;

/* Ground — surfaces */
--ground: #ffffff;
--ground-alt: #f8f9fb;

/* Rule — borders */
--rule: rgba(0, 0, 0, 0.08);
--rule-strong: rgba(0, 0, 0, 0.14);

/* Signal — the green. Used with intent. */
--signal: #1dbd4d;
--signal-hover: #13a13e;
--signal-surface: rgba(29, 189, 77, 0.06);
```

Token names are expressive: "ink" (technical drawings), "ground" (paper/canvas), "rule" (printed lines), "signal" (system indicator). Reading the tokens should tell you what kind of product this is.

## Typography

- **Body**: `Inter` + `Noto Sans JP`
- **Mono**: `JetBrains Mono` — used for labels, numbers, metadata, copyright, section identifiers
- The contrast between clean sans-serif (body) and precise monospace (accents) creates the "engineered tool" feel

### Hierarchy

| Level | Weight | Size | Use |
|-------|--------|------|-----|
| Headline | 700 | clamp 1.5-2rem | Section titles |
| Subhead | 600 | 1.1-1.25rem | Card titles |
| Body | 400 | 0.9-1rem | Paragraphs |
| Label (mono) | 400 | 0.75-0.85rem | Section labels, metadata, numbers |
| Muted | 400 | 0.75rem | Copyright, timestamps |

## Spacing

8px base unit. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 80.

- Section padding: 80px (desktop), 60px (mobile)
- Card padding: 32px (desktop), 24px (mobile)
- Card gap: 24px
- Container max: 1200px, padding 24px

## Depth Strategy

**Borders-only.** No drop shadows. No surface color jumps.

- Standard: `rgba(0, 0, 0, 0.08)` — barely visible, provides structure
- Emphasis: `rgba(0, 0, 0, 0.14)` — for hover states, stronger boundaries
- All border-radius: 0. Sharp corners reinforce precision.

Exception: Header scroll state uses `box-shadow: 0 1px 3px rgba(0,0,0,0.04)` — a whisper, not a shadow.

## Green Usage — "Signal, Not Decoration"

Green appears ONLY where it carries meaning:

| Where | Why |
|-------|-----|
| Header top-bar (2px) | System active indicator |
| Nav active underline | Current location |
| "Technology" accent word | Brand identity word |
| Service numbers (dimmed) | Structural marker |
| Primary buttons | Call to action |
| Link hover states | Interactive feedback |
| Form focus borders | Active input |
| Required field markers | Status |
| Card hover left-accent | Selected/active indicator |

Green does NOT appear on: icon backgrounds, section labels, philosophy text, decorative elements.

---

## Signature Elements

Three elements that make this site identifiably "Raim":

### 1. Header Top-Bar
A 2px green line at the very top of the viewport (above the header). Like a "system status: active" indicator. Always present. `.header::before`.

### 2. Card Hover Left-Accent
When hovering any card or list item, a 2px green line appears on the left inner edge via `box-shadow: inset 2px 0 0 var(--signal)`. This mirrors a code editor's active line indicator. Applied to: `.feature-card`, `.service-card`, `.work-card`, `.service-features-list li`.

### 3. Number Line Notation
Service numbers (01, 02, 03) display in monospace with a trailing 24px horizontal line: `01 ——`. Like a log entry or system output. Applied via `::after` pseudo-element on `.service-number` and `.service-detail-number`.

### 4. Signal Bar Accent
The hero subtitle is preceded by a 24px green horizontal bar (`::before` on `.hero-title-sub`). This small green dash before the monospace label acts as a cursor or prompt marker — like a terminal prompt. Same visual language as the number line notation.

### Supporting: Dot Grid Texture
A subtle radial-gradient dot grid (`24px` spacing, `rgba(0,0,0,0.04)` dots) appears on hero sections (main hero via `.hero-bg`, subpage heroes via `.page-hero::before`). Engineering paper texture — a Raim "place" marker.

### Supporting: Monospace System
All labels, metadata, numbers, and structural text use `--font-mono`. This runs through the entire site: section labels, page labels, service numbers, company info dt fields, signature name (English), copyright, contact labels, detail notes.

---

## Component Patterns

### Section Header (left-aligned)
```
.section-label (mono, --ink-4, uppercase, letterspaced)
.section-title (bold, --ink)
```
Always left-aligned. Never centered (except CTA).

### Card
- 1px `--rule` border, no shadow, no radius
- 32px padding
- Hover: border → `--rule-strong`, left-accent (inset shadow)
- Icons: bare line icons in `--ink-4`, green on card hover

### Page Hero (subpages)
- `--ground-alt` background
- Dot grid texture via `::before`
- Mono label + bold title, left-aligned

### Feature Icon
- 40x40 flex container, no background, no box
- 24px stroke icons, `--ink-4`, stroke-width 1.5
- Green on parent hover

### Primary Button
- `--signal` background, white text
- No radius
- Hover: `--signal-hover`

### Outline Button
- Transparent bg, `--ink` text
- 1px `--rule-strong` border
- Hover: border darkens to `--ink-3`

---

## Responsive

- 1024px: 2-column grids, single-column service features
- 768px: Mobile nav, single-column grids, --space-9 → 60px
- 480px: Compact hero (single column), smaller titles

## Files

- `css/style.css` — All styles, single file
- `js/main.js` — Mobile nav, scroll shadow, form handling, intersection observer
- Fonts: Google Fonts (Inter, JetBrains Mono, Noto Sans JP)
- Icons: Lucide (served locally)
