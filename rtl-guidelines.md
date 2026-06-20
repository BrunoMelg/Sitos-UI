# Orchard UI — RTL Guidelines

> **Status: ACTIVE.**  
> This document defines the bidirectional (BiDi) layout policy for Orchard UI.  
> Referenced by [`design-principles.md`](./design-principles.md) §2 and §11.

---

## 1. The Requirement

Every component in Orchard UI must function correctly in both left-to-right (LTR) and right-to-left (RTL) text directions. RTL support is not a post-launch add-on — it is a property of every component from its first implementation.

The mechanism is **CSS logical properties**. No component style may use physical directional properties (`left`, `right`, `padding-left`, `margin-right`, etc.). The CSS renderer resolves logical properties to physical values based on the document direction.

This is a **non-negotiable constraint**, not a best practice.

---

## 2. CSS Logical Properties — Property Mapping

Replace every physical directional property with its logical equivalent.

### Spacing

| Physical property | Logical property | Resolves to in LTR | Resolves to in RTL |
|-------------------|-----------------|-------------------|-------------------|
| `padding-left` | `padding-inline-start` | `padding-left` | `padding-right` |
| `padding-right` | `padding-inline-end` | `padding-right` | `padding-left` |
| `padding-top` | `padding-block-start` | `padding-top` | `padding-top` |
| `padding-bottom` | `padding-block-end` | `padding-bottom` | `padding-bottom` |
| `margin-left` | `margin-inline-start` | `margin-left` | `margin-right` |
| `margin-right` | `margin-inline-end` | `margin-right` | `margin-left` |
| `margin-top` | `margin-block-start` | `margin-top` | `margin-top` |
| `margin-bottom` | `margin-block-end` | `margin-bottom` | `margin-bottom` |

### Sizing

| Physical property | Logical property |
|-------------------|-----------------|
| `width` | `inline-size` |
| `height` | `block-size` |
| `min-width` | `min-inline-size` |
| `max-width` | `max-inline-size` |
| `min-height` | `min-block-size` |
| `max-height` | `max-block-size` |

### Positioning

| Physical property | Logical property |
|-------------------|-----------------|
| `left` | `inset-inline-start` |
| `right` | `inset-inline-end` |
| `top` | `inset-block-start` |
| `bottom` | `inset-block-end` |

### Border

| Physical property | Logical property |
|-------------------|-----------------|
| `border-left` | `border-inline-start` |
| `border-right` | `border-inline-end` |
| `border-top` | `border-block-start` |
| `border-bottom` | `border-block-end` |
| `border-left-width` | `border-inline-start-width` |
| `border-radius: top-left` | `border-start-start-radius` |
| `border-radius: top-right` | `border-start-end-radius` |
| `border-radius: bottom-left` | `border-end-start-radius` |
| `border-radius: bottom-right` | `border-end-end-radius` |

> **Note:** `border-start-start-radius` maps to top-left in LTR and top-right in RTL. Use it when the rounded corner should be at the inline-start side.

### Text alignment

| Physical value | Logical value |
|----------------|---------------|
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `text-align: center` | `text-align: center` (unchanged) |

---

## 3. Vanilla Extract in RTL

Vanilla Extract styles are written in TypeScript. Use logical property names — they map directly to CSS logical properties.

```ts
// packages/react/src/button/button.styles.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@orchard-ui/tokens'

export const buttonBase = style({
  // ✓ Logical — works in LTR and RTL
  paddingInline: vars.spacing.md,
  paddingBlock: vars.spacing.sm,
  marginInlineEnd: vars.spacing.xs,

  // ❌ Physical — breaks RTL
  // paddingLeft: vars.spacing.md,
  // paddingRight: vars.spacing.md,
  // marginRight: vars.spacing.xs,
})
```

Vanilla Extract v1.x supports logical properties natively — write them as camelCase JavaScript properties matching the CSS logical property names.

---

## 4. How Direction is Set

Orchard UI reads direction from the nearest ancestor's `dir` attribute or the document's `direction` CSS property. It does not manage direction itself.

The consuming application sets direction:

```html
<!-- Entire application in RTL -->
<html dir="rtl" lang="ar">

<!-- Or scoped to a specific subtree -->
<div dir="rtl">
  <OrchardComponent />
</div>
```

Components must never hardcode a direction assumption. They must inherit from the document or nearest ancestor.

---

## 5. Motion and Transforms in RTL

Directional animations must flip in RTL. A slide-in from the left in LTR should slide in from the right in RTL.

### The rule

Animations that use `translateX` must be written with directional awareness:

```ts
// ✓ RTL-aware — reads direction and adjusts
const isRTL = document.documentElement.dir === 'rtl'
const slideInX = isRTL ? '100%' : '-100%'

// Or via CSS custom property set by the theme
// --orchard-dir-multiplier: 1 (LTR) or -1 (RTL)
```

### Recommended approach — CSS direction multiplier

The `@orchard-ui/themes` package sets a `--orchard-dir` custom property:

```css
:root,
[dir="ltr"] { --orchard-dir: 1; }
[dir="rtl"]  { --orchard-dir: -1; }
```

Animations that translate horizontally multiply by this value:

```ts
// In a Vanilla Extract keyframes block
'0%': { transform: 'translateX(calc(var(--orchard-dir) * -8px))' },
'100%': { transform: 'translateX(0)' },
```

This means: in LTR, slides come from the left (negative X). In RTL, the multiplier flips the sign — slides come from the right (positive X).

### Animations that do not flip

Not all animations are directional. These are direction-invariant and must not be flipped:

- `opacity` transitions — no direction
- `scale` transforms — symmetric
- `translateY` (vertical) — no horizontal direction
- Spinning animations (loaders) — symmetric
- Pulsing or breathing animations — symmetric

Only `translateX`-based animations that represent entering from or exiting toward a side are affected.

---

## 6. Icon Mirroring

Some icons have directional meaning and must be mirrored in RTL. Others are symmetric and must never be mirrored.

### Mirror in RTL

Icons that represent direction of reading, navigation, or flow:

| Icon | LTR | RTL |
|------|-----|-----|
| Arrow left/right | → meaning "forward" | ← meaning "forward" in RTL |
| Chevron left/right | ‹ for back | › for back in RTL |
| Back button | ← | → |
| Forward button | → | ← |
| Pagination prev/next | ← / → | flip |
| Speech bubble tail | tail on left | tail on right |
| List with bullets on left | bullets move to right | |

### Do not mirror in RTL

Icons whose meaning is not directional:

| Icon | Reason |
|------|--------|
| Play button (▶) | Represents the action of playing, not direction |
| Clock / time | Universal |
| Check / cross | Universal |
| Plus / minus | Universal |
| Upload / download arrows | Vertical — not horizontal |
| Warning, info, error | Universal |
| Magnifying glass | Universal |

### Implementation

Mirror is applied via a CSS class or data attribute set by the icon component:

```tsx
<Icon name="chevron-right" dir="auto" />
```

When `dir="auto"` (default), the icon reads the nearest ancestor's direction and applies:

```ts
const shouldMirror = MIRRORED_ICONS.has(name) && isRTL
const transform = shouldMirror ? 'scaleX(-1)' : 'none'
```

The list `MIRRORED_ICONS` is maintained in `@orchard-ui/icons` as a typed constant.

---

## 7. Component-Specific RTL Behavior

### Input with leading/trailing elements

The `leading` element (icon or prefix) maps to `inline-start` and always appears at the start of reading direction. The `trailing` element maps to `inline-end`.

```
LTR:  [🔍  Search...        ⌘K]
RTL:  [K⌘        ...hcraeS  🔍]
```

### Select / Dropdown

The dropdown trigger arrow appears at `inline-end`. The dropdown list opens aligned to `inline-start` or `inline-end` depending on available space — the same logic applies in both directions.

### Tabs

Tabs read left-to-right in LTR and right-to-left in RTL. The selected tab indicator (underline or bar) follows the selected tab, not a fixed side.

### Toast / Notification

Toasts that appear from a corner:
- Bottom-right in LTR → Bottom-left in RTL
- Top-right in LTR → Top-left in RTL

Use `inset-inline-end` for the toast container position.

### Breadcrumb separator

The separator (›) is directional and must flip in RTL (‹ or reversed orientation).

### Progress bar

Fill direction follows reading direction: left-to-right in LTR, right-to-left in RTL. Use `direction: ltr` if the CSS cannot be made logical, and set `margin-inline-start: auto` for the filled portion. Prefer the logical approach.

---

## 8. Testing RTL

### Manual testing

1. Add `dir="rtl"` to the `<html>` element or to a Storybook decorator wrapper.
2. Verify that every component's layout mirrors correctly.
3. Verify that directional icons are mirrored and non-directional icons are not.
4. Verify that enter/exit animations come from the correct side.
5. Verify that dropdown menus, tooltips, and popovers open on the correct side.

### Storybook

Every component story that has directional implications must include an `RTL` story variant:

```tsx
export const RTL: Story = {
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
}
```

### Automated checks

The ESLint rule `no-physical-properties` (custom rule in `@orchard-ui/eslint-config`) flags any use of physical directional CSS properties inside `.styles.ts` files.

```
error: Use 'paddingInlineStart' instead of 'paddingLeft' [no-physical-properties]
```

This rule runs in CI. A PR that introduces a physical directional property does not merge.

---

## 9. Quick Reference

```
✓ DO                              ❌ DO NOT
────────────────────────────────────────────────────
paddingInlineStart                paddingLeft
paddingInlineEnd                  paddingRight
marginInlineStart                 marginLeft
marginInlineEnd                   marginRight
insetInlineStart                  left
insetInlineEnd                    right
borderInlineStart                 borderLeft
textAlign: 'start'                textAlign: 'left'
textAlign: 'end'                  textAlign: 'right'
translateX(calc(dir * -8px))      translateX(-8px)  ← for directional motion
```
