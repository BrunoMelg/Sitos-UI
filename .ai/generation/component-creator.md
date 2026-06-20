# Component Creator

## Objective

Generate Orchard UI components following all project standards.
Every new component must not repeat the errors catalogued in the Sprint 2 architectural audit.

## Workflow

Before creating a component:

1. Read Package Architect
2. Read Token Enforcer
3. Read Accessibility Guardian
4. Read Apple Design Reviewer
5. Read `.ai/templates/accessibility.checklist.md`

## Required files

| File | Template |
|------|----------|
| `Component.tsx` | `.ai/templates/Component.template.tsx` |
| `Component.css.ts` | `.ai/templates/Component.css.template.ts` |
| `Component.types.ts` | — (create from scratch) |
| `Component.test.tsx` | `.ai/templates/Component.test.template.tsx` |
| `Component.stories.tsx` | — (create from scratch) |
| `index.ts` | — (re-export Component + all types) |

## Non-negotiable rules (enforced by templates)

### Accessibility
- `aria-disabled` (not HTML `disabled`) on custom components — keeps element in tab order.
- `aria-readonly` explicitly set, even for native `<input readOnly>`.
- Error state requires a non-color indicator: icon adjacent to the control (WCAG 1.4.1).
- `aria-labelledby` / `aria-describedby` must point to elements that **exist in the DOM** — use registration pattern, not unconditional IDs.
- Focus ring must never be dimmed — no `opacity` on the whole component for disabled state.

### State attributes
- All state changes set `data-*` attributes in addition to ARIA: `data-disabled`, `data-loading`, `data-invalid`, `data-readonly`.

### CSS
- Hover styles inside `@media (hover: hover)` — no bare `:hover` selectors.
- All animations guarded by `@media (prefers-reduced-motion: no-preference)`.
- Spinner animation: `animation: none; opacity: 0.6` under `prefers-reduced-motion: reduce`.
- Disabled state: override intent CSS vars, NOT `opacity: 0.4` on the component root.
- No `pointer-events: none` on disabled — use `onClick` guard instead.
- CSS logical properties: `inlineSize` not `width`, `paddingBlock` not `padding-top/bottom`, etc.
- `position: relative` on any root that has absolutely-positioned children.

### Loading
- Spinner is `position: absolute`, centred in the root element.
- Content wrapper uses `opacity: 0` when loading — preserves layout width (no layout shift).

### SSR
- `createPortal` gated by `isMounted` state from `useEffect`.
- No `document` / `window` access outside of `useEffect`.

### Stories
- Density story uses `<DensityProvider density={d}>`, never a CSS variable.
- Background uses `var(--orchard-color-background-primary)`, not hardcoded hex.
- Include dark mode + RTL variants for components with directional affordances.

## Quality checklist

Before submitting, complete `.ai/templates/accessibility.checklist.md`.
Score using `component-reviewer.md` — minimum 85 to proceed.

## Failure

If any rule above is violated, fix before merging. Do not file exceptions without updating this document.
