# Orchard UI — Color System

> **Status: ACTIVE.**  
> This document is the authoritative specification for the Orchard UI color token system.  
> Referenced by [`design-principles.md`](./design-principles.md) §9 and §10.  
> Token values implemented in `@orchard-ui/tokens`.

---

## 1. Architecture

The color system has three layers. Each layer may only reference the layer below it — never above.

```
Primitive ──▶ Semantic ──▶ Component
  raw hex       meaning       role
```

**Primitive tokens** are raw color values with no semantic meaning. They form the complete palette. Components never reference primitive tokens directly.

**Semantic tokens** map primitive values to meaning (`color.accent`, `color.danger.foreground`). They have different values in light and dark themes. All component styles reference semantic tokens.

**Component tokens** are optional overrides for a specific component (`button.background.primary`). They reference semantic tokens. Used sparingly — most components are fully described by semantic tokens.

---

## 2. Primitive Palette

All values are defined in `packages/tokens/src/primitive/color.json`.

### Gray scale

| Token | Hex | Role |
|-------|-----|------|
| `color.primitive.gray.0` | `#FFFFFF` | Pure white |
| `color.primitive.gray.50` | `#F7F6F3` | Warm off-white — page ground (light) |
| `color.primitive.gray.100` | `#F0EFEC` | Subtle — hover fill, raised surface (light) |
| `color.primitive.gray.200` | `#E5E4E0` | Borders, dividers (light) |
| `color.primitive.gray.300` | `#D1D0CC` | Strong borders, disabled text (light) |
| `color.primitive.gray.400` | `#9D9DA3` | Tertiary text (light), secondary text (dark) |
| `color.primitive.gray.500` | `#6B6B70` | Secondary text (light) |
| `color.primitive.gray.600` | `#4A4A4F` | — |
| `color.primitive.gray.700` | `#3A3A3C` | Raised surface (dark), disabled text (dark) |
| `color.primitive.gray.800` | `#2C2C2E` | Elevated surface (dark) |
| `color.primitive.gray.900` | `#1C1C1E` | Surface (dark), primary text (light) |
| `color.primitive.gray.950` | `#111113` | Page ground (dark) |
| `color.primitive.gray.1000` | `#F2F2F7` | Primary text (dark) |

> `gray.1000` is a near-white used only as text-on-dark. It appears at the end of the scale for numbering consistency, not for luminance ordering.

### Green (brand accent)

| Token | Hex | Role |
|-------|-----|------|
| `color.primitive.green.50` | `#EAF4EE` | Accent subtle background (light) |
| `color.primitive.green.100` | `#D4EAD9` | — |
| `color.primitive.green.200` | `#A8D4B3` | — |
| `color.primitive.green.300` | `#6DB88A` | — |
| `color.primitive.green.400` | `#2D8A5F` | Accent emphasis (light), accent default (dark) |
| `color.primitive.green.500` | `#1A6847` | Accent default (light) |
| `color.primitive.green.600` | `#155738` | Accent emphasis pressed (light) |
| `color.primitive.green.700` | `#0F4028` | — |
| `color.primitive.green.bright` | `#34A870` | Accent emphasis (dark) |

### Red (danger)

| Token | Hex | Role |
|-------|-----|------|
| `color.primitive.red.50` | `#FEF2F2` | Danger subtle background (light) |
| `color.primitive.red.500` | `#DC2626` | Danger default (light) |
| `color.primitive.red.600` | `#B91C1C` | Danger emphasis (light) |
| `color.primitive.red.bright` | `#F87171` | Danger default (dark) |

### Amber (warning)

| Token | Hex | Role |
|-------|-----|------|
| `color.primitive.amber.50` | `#FFFBEB` | Warning subtle background (light) |
| `color.primitive.amber.500` | `#D97706` | Warning default (light) |
| `color.primitive.amber.600` | `#B45309` | Warning emphasis (light) |
| `color.primitive.amber.bright` | `#FBBF24` | Warning default (dark) |

### Blue (info)

| Token | Hex | Role |
|-------|-----|------|
| `color.primitive.blue.50` | `#EFF6FF` | Info subtle background (light) |
| `color.primitive.blue.500` | `#2563EB` | Info default (light) |
| `color.primitive.blue.600` | `#1D4ED8` | Info emphasis (light) |
| `color.primitive.blue.bright` | `#60A5FA` | Info default (dark) |

---

## 3. Semantic Tokens — Light Theme

Defined in `packages/tokens/src/semantic/light.json`. All values reference primitive tokens using `{path.to.primitive}` syntax.

### Background and surface

| Token | Value | Hex reference |
|-------|-------|---------------|
| `color.background.primary` | `{color.primitive.gray.50}` | `#F7F6F3` |
| `color.background.secondary` | `{color.primitive.gray.100}` | `#F0EFEC` |
| `color.surface.default` | `{color.primitive.gray.0}` | `#FFFFFF` |
| `color.surface.raised` | `{color.primitive.gray.100}` | `#F0EFEC` |
| `color.surface.overlay` | `rgba(0, 0, 0, 0.40)` | — (modal scrim) |

### Border

| Token | Value | Hex reference |
|-------|-------|---------------|
| `color.border.default` | `{color.primitive.gray.200}` | `#E5E4E0` |
| `color.border.strong` | `{color.primitive.gray.300}` | `#D1D0CC` |
| `color.border.focus` | `{color.primitive.green.500}` | `#1A6847` |

### Text

| Token | Value | Hex reference | Contrast on surface |
|-------|-------|---------------|---------------------|
| `color.text.primary` | `{color.primitive.gray.900}` | `#1C1C1E` | 16.7:1 ✓ |
| `color.text.secondary` | `{color.primitive.gray.500}` | `#6B6B70` | 5.7:1 ✓ |
| `color.text.tertiary` | `{color.primitive.gray.400}` | `#9D9DA3` | 3.2:1 (non-text only) |
| `color.text.disabled` | `{color.primitive.gray.300}` | `#D1D0CC` | intentionally low |
| `color.text.inverse` | `{color.primitive.gray.0}` | `#FFFFFF` | — (on accent/dark bg) |
| `color.text.link` | `{color.primitive.green.500}` | `#1A6847` | 7.1:1 ✓ |

### Accent

| Token | Value | Hex reference |
|-------|-------|---------------|
| `color.accent.default` | `{color.primitive.green.500}` | `#1A6847` |
| `color.accent.subtle` | `{color.primitive.green.50}` | `#EAF4EE` |
| `color.accent.emphasis` | `{color.primitive.green.400}` | `#2D8A5F` |
| `color.accent.foreground` | `{color.primitive.gray.0}` | `#FFFFFF` — 9.4:1 on accent ✓ |

### Status — Success

| Token | Value | Hex reference |
|-------|-------|---------------|
| `color.success.default` | `{color.primitive.green.500}` | `#1A6847` |
| `color.success.subtle` | `{color.primitive.green.50}` | `#EAF4EE` |
| `color.success.emphasis` | `{color.primitive.green.400}` | `#2D8A5F` |
| `color.success.foreground` | `{color.primitive.gray.0}` | `#FFFFFF` — 9.4:1 on success ✓ |

### Status — Danger

| Token | Value | Hex reference |
|-------|-------|---------------|
| `color.danger.default` | `{color.primitive.red.500}` | `#DC2626` |
| `color.danger.subtle` | `{color.primitive.red.50}` | `#FEF2F2` |
| `color.danger.emphasis` | `{color.primitive.red.600}` | `#B91C1C` |
| `color.danger.foreground` | `{color.primitive.gray.0}` | `#FFFFFF` — 5.9:1 on danger ✓ |

### Status — Warning

| Token | Value | Hex reference |
|-------|-------|---------------|
| `color.warning.default` | `{color.primitive.amber.500}` | `#D97706` |
| `color.warning.subtle` | `{color.primitive.amber.50}` | `#FFFBEB` |
| `color.warning.emphasis` | `{color.primitive.amber.600}` | `#B45309` |
| `color.warning.foreground` | `{color.primitive.gray.0}` | `#FFFFFF` — 4.7:1 on warning ✓ |

### Status — Info

| Token | Value | Hex reference |
|-------|-------|---------------|
| `color.info.default` | `{color.primitive.blue.500}` | `#2563EB` |
| `color.info.subtle` | `{color.primitive.blue.50}` | `#EFF6FF` |
| `color.info.emphasis` | `{color.primitive.blue.600}` | `#1D4ED8` |
| `color.info.foreground` | `{color.primitive.gray.0}` | `#FFFFFF` — 5.1:1 on info ✓ |

---

## 4. Semantic Tokens — Dark Theme

Defined in `packages/tokens/src/semantic/dark.json`. Applied when the root element or any ancestor has `data-theme="dark"`.

### Background and surface

| Token | Value | Hex reference |
|-------|-------|---------------|
| `color.background.primary` | `#111113` | `color.primitive.gray.950` |
| `color.background.secondary` | `#1C1C1E` | `color.primitive.gray.900` |
| `color.surface.default` | `#1C1C1E` | `color.primitive.gray.900` |
| `color.surface.raised` | `#2C2C2E` | `color.primitive.gray.800` |
| `color.surface.overlay` | `rgba(0, 0, 0, 0.60)` | — (darker scrim in dark mode) |

### Border

| Token | Value |
|-------|-------|
| `color.border.default` | `rgba(255, 255, 255, 0.08)` |
| `color.border.strong` | `rgba(255, 255, 255, 0.14)` |
| `color.border.focus` | `#34A870` (green.bright) |

### Text

| Token | Value | Contrast on surface |
|-------|-------|---------------------|
| `color.text.primary` | `#F2F2F7` (gray.1000) | 14.3:1 ✓ |
| `color.text.secondary` | `#98989F` | 5.2:1 ✓ |
| `color.text.tertiary` | `#6B6B70` (gray.500) | 3.1:1 (non-text only) |
| `color.text.disabled` | `#3A3A3C` (gray.700) | intentionally low |
| `color.text.inverse` | `#111113` (gray.950) | — (on accent/light bg) |
| `color.text.link` | `#34A870` (green.bright) | 5.4:1 ✓ |

### Accent

| Token | Value | Notes |
|-------|-------|-------|
| `color.accent.default` | `#2D8A5F` (green.400) | Slightly lighter for dark contrast |
| `color.accent.subtle` | `rgba(45, 138, 95, 0.15)` | Transparent tint on dark surface |
| `color.accent.emphasis` | `#34A870` (green.bright) | |
| `color.accent.foreground` | `#FFFFFF` | 8.1:1 on dark accent ✓ |

### Status — dark theme

| Token | Dark value | Hex | Foreground | Contrast |
|-------|------------|-----|------------|---------|
| `color.success.default` | green.bright | `#34A870` | `#111113` (dark text) | 8.2:1 ✓ |
| `color.success.subtle` | `rgba(52, 168, 112, 0.15)` | — | — | |
| `color.success.foreground` | `#111113` | — | — | Dark text on bright green |
| `color.danger.default` | red.bright | `#F87171` | `#111113` | 6.8:1 ✓ |
| `color.danger.subtle` | `rgba(248, 113, 113, 0.15)` | — | — | |
| `color.danger.foreground` | `#111113` | — | — | Dark text on light red |
| `color.warning.default` | amber.bright | `#FBBF24` | `#111113` | 9.6:1 ✓ |
| `color.warning.subtle` | `rgba(251, 191, 36, 0.15)` | — | — | |
| `color.warning.foreground` | `#111113` | — | — | Dark text on bright amber |
| `color.info.default` | blue.bright | `#60A5FA` | `#111113` | 7.3:1 ✓ |
| `color.info.subtle` | `rgba(96, 165, 250, 0.15)` | — | — | |
| `color.info.foreground` | `#111113` | — | — | Dark text on bright blue |

> In dark mode, status foreground tokens use dark text (#111113) instead of white because the bright status colors are high-luminance — white text on them would fail contrast. This is the reverse of light mode, where status colors are dark and use white foreground.

---

## 5. The Foreground Token Contract

Every color that may be used as a background must have a corresponding `.foreground` token. This is the foreground contract:

| Background token | Foreground token | Purpose |
|-----------------|-----------------|---------|
| `color.accent.default` | `color.accent.foreground` | Primary button label, accent badge text |
| `color.accent.subtle` | `color.text.primary` | Selected row text |
| `color.success.default` | `color.success.foreground` | Filled success badge |
| `color.success.subtle` | `color.text.primary` | Success alert text |
| `color.danger.default` | `color.danger.foreground` | Filled danger badge, delete button label |
| `color.danger.subtle` | `color.danger.default` | Inline error text on subtle background |
| `color.warning.default` | `color.warning.foreground` | Filled warning badge |
| `color.warning.subtle` | `color.text.primary` | Warning alert text |
| `color.info.default` | `color.info.foreground` | Filled info badge |
| `color.info.subtle` | `color.text.primary` | Info alert text |

### Rule

Any component that renders text or an icon on a colored background must use the paired foreground token. Hardcoding `#fff` or `#000` against a semantic background is a violation — the pairing is the only guarantee of contrast in both themes.

```tsx
// ✓ Correct — uses foreground token; theme-safe
style={{
  background: vars.color.accent.default,
  color: vars.color.accent.foreground,
}}

// ❌ Wrong — breaks in dark mode where accent may be lighter
style={{
  background: vars.color.accent.default,
  color: '#ffffff',
}}
```

---

## 6. Usage Rules

### One accent. Always.

Orchard UI uses a single accent color. Adding a second accent creates ambiguity about what is interactive. If a product needs multiple "brand" colors, they are expressed through illustration and marketing surfaces — not through component accent tokens.

### Do not use color for hierarchy

Color does not establish visual hierarchy in Orchard UI. `color.text.primary` is for primary content; `color.text.secondary` for supporting content. Using a custom color to make something "stand out" competes with the accent and status system.

### Status colors communicate state, not severity alone

`danger` is not "important." It is "this will fail or destroy something." An important (but safe) button is a primary button, not a danger button.

### Opacity-based borders in dark mode

Dark mode borders use `rgba(255, 255, 255, 0.08)` rather than a fixed gray. This makes borders adaptive — they work on any dark surface without looking too light or too dark.

---

## 7. Brand Customization

The accent color is the only color that can be customized without breaking the system.

To change the accent:
1. Override `color.accent.default`, `color.accent.subtle`, `color.accent.emphasis`, and `color.accent.foreground` in both light and dark themes.
2. Verify each `color.accent.foreground` value maintains ≥ 4.5:1 contrast against `color.accent.default`.
3. Verify `color.accent.default` maintains ≥ 3:1 against `color.surface.default` (for focus ring visibility).
4. Supply the override via a custom Vanilla Extract theme created with `createTheme` against the Orchard theme contract.

Do not customize neutral or status colors. Neutrals must remain perceptually neutral (warm gray, not tinted) to avoid appearing as a second accent. Status colors must remain universally recognizable.

---

## 8. Contrast Verification Checklist

Before any token value is committed, verify:

- [ ] `color.text.primary` ≥ 4.5:1 against `color.surface.default` in light theme
- [ ] `color.text.primary` ≥ 4.5:1 against `color.surface.default` in dark theme
- [ ] `color.text.secondary` ≥ 4.5:1 against `color.surface.default` in both themes
- [ ] `color.text.link` ≥ 4.5:1 against `color.surface.default` in both themes
- [ ] `color.accent.default` ≥ 3:1 against `color.surface.default` (focus ring)
- [ ] `color.accent.foreground` ≥ 4.5:1 against `color.accent.default` in both themes
- [ ] `color.danger.default` ≥ 3:1 against `color.surface.default` in both themes
- [ ] `color.danger.foreground` ≥ 4.5:1 against `color.danger.default` in both themes
- [ ] `color.warning.foreground` ≥ 4.5:1 against `color.warning.default` in both themes
- [ ] `color.success.foreground` ≥ 4.5:1 against `color.success.default` in both themes
- [ ] `color.info.foreground` ≥ 4.5:1 against `color.info.default` in both themes
- [ ] Focus ring (2px `color.accent.default`) ≥ 3:1 against adjacent background in all states

Tool: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or Stark Figma plugin.
