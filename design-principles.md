# Orchard UI — Design Principles

> **Status: FROZEN — v1.0 · June 2026.**  
> Amendments require a formal RFC and team review.  
> Companion documents: [`component-states.md`](./component-states.md) · [`color-system.md`](./color-system.md) · [`rtl-guidelines.md`](./rtl-guidelines.md)

> These principles govern every visual and behavioral decision in Orchard UI.  
> A component that violates any principle here is not ready to ship.

---

## 1. Apple Philosophy Applied to React

Apple's Human Interface Guidelines are not a visual style. They are a way of thinking about the relationship between software and people. The goal of Apple design is for the interface to disappear — to become so clear and natural that the user's attention stays entirely on their content and their task.

Orchard UI applies this thinking to React:

**Components must never compete with content.**  
A card component exists to hold content, not to assert itself. Its visual presence should be the minimum required to communicate structure.

**Clarity over cleverness.**  
An API that requires reading documentation is the wrong API. A component that requires explanation is the wrong component. Prefer the obvious solution.

**Deference is a design decision.**  
Every visual choice — color, weight, shadow, border — is a claim on the user's attention. Make fewer claims. When a component is at rest, it should be nearly invisible.

**Depth through contrast, not decoration.**  
Hierarchy is communicated by relative contrast between elements — size, weight, and lightness — not by borders, gradients, or shadows.

### What this means in practice

| Apple principle | React expression |
|-----------------|-----------------|
| Clarity | Prop names are intentions, not implementations. `isDisabled`, not `disabledState`. |
| Deference | Default state is minimal. Visual emphasis requires explicit opt-in. |
| Depth | Visual hierarchy comes from the type scale and spacing scale — not from added decoration. |
| Consistency | Every component in the system shares the same rhythm, scale, and motion language. |

### What this is not

Orchard UI is not a clone of Apple's software. It does not imitate SF Pro, macOS windows, or iOS controls. It applies the same *thinking* — the same discipline, the same respect for content, the same preference for calm — to a React component ecosystem.

---

## 2. Spacing

Spacing is not a utility value. It is a design decision that communicates relationship.

Two elements that are close together are related. Two elements with more space between them are less related or belong to different groups. Every spacing decision is a claim about the semantic relationship between adjacent elements.

### The scale

All spacing values come from `@orchard-ui/tokens`. No spacing value may be hardcoded.

| Token | Value | Semantic meaning |
|-------|-------|-----------------|
| `spacing.2xs` | 2px | Hairline gaps. Tight icon-to-label pairing. |
| `spacing.xs` | 4px | Sibling elements within a component. |
| `spacing.sm` | 8px | Closely related elements. Button padding (vertical). |
| `spacing.md` | 16px | Standard component internal padding. |
| `spacing.lg` | 24px | Between related components in a group. |
| `spacing.xl` | 32px | Between sections. Page-level rhythm. |
| `spacing.2xl` | 48px | Major section breaks. |
| `spacing.3xl` | 64px | Page-level margins at large viewports. |

### Rules

**Internal padding** of any component uses `spacing.sm` to `spacing.md`. Never larger. A component that needs more than 16px of internal padding is too large to be a component — it is a layout.

**Between related siblings** (buttons in a toolbar, items in a list): `spacing.xs` to `spacing.sm`.

**Between unrelated sections**: `spacing.xl` minimum. Proximity is meaning. Give unrelated elements enough distance to clearly signal they are separate.

**Vertical rhythm must be consistent.** In a form, the gap between every field is always the same token. Mixed spacing within a group is a mistake.

**All directional spacing uses CSS logical properties (L1).** Never write `padding-left`, `padding-right`, `margin-left`, or `margin-right` in component styles. Use `padding-inline-start`, `padding-inline-end`, `margin-inline-start`, `margin-inline-end`. This is the non-negotiable foundation for RTL support. See [`rtl-guidelines.md`](./rtl-guidelines.md) for the complete property mapping.

### Whitespace is a feature

An empty area is not a failed design. It is the visual equivalent of a breath — it makes what surrounds it easier to read, easier to understand, and more intentional. Do not fill space because it is there.

### Anti-patterns

```
❌  padding: 13px;                  — arbitrary, hardcoded
❌  margin-bottom: 1.5rem;          — arbitrary, not from scale
❌  gap: 6px;                       — not a token value
✓   padding: {spacing.md};          — intentional, from scale
✓   gap: {spacing.sm};              — communicates close relationship
```

---

## 3. Typography

Typography is the primary tool for communicating hierarchy. A component system with a correct type scale needs almost no other visual distinction between levels of information.

### The scale

> **rem note (S2):** Font-size values in this table are design reference values in `px` for tooling and communication. In CSS and in the token system they resolve to `rem` calculated against a 16px root (`body` 17px → `1.0625rem`). This preserves browser font-size preferences and satisfies **WCAG 1.4.4 Resize Text**. Never set `font-size` using `px` in component styles.

Derived from Apple's Dynamic Type system, adapted for web. All values come from `@orchard-ui/tokens`.

| Role | Size | Weight | Line height | Tracking |
|------|------|--------|-------------|---------|
| `caption2` | 11px | 400 | 1.45 | +0.04em |
| `caption1` | 12px | 400 | 1.50 | +0.02em |
| `footnote` | 13px | 400 | 1.55 | 0 |
| `subheadline` | 15px | 400 | 1.55 | −0.01em |
| `body` | 17px | 400 | 1.65 | −0.01em |
| `callout` | 16px | 500 | 1.55 | −0.01em |
| `title3` | 20px | 600 | 1.30 | −0.02em |
| `title2` | 22px | 700 | 1.20 | −0.03em |
| `title1` | 28px | 700 | 1.15 | −0.04em |
| `largeTitle` | 34px | 700 | 1.10 | −0.05em |

### Rules

**Tracking is inverse to size.** Large type needs tighter tracking to feel intentional and composed. Small type needs looser tracking to remain legible. Never apply negative tracking to body text.

**Weight creates hierarchy before size does.** Within a card, distinguish the title from the description using weight first (`600` vs `400`), not by jumping to a larger size. Size jumps should be reserved for true level changes.

**Line height is generous at reading sizes, tight at display sizes.** Body text at 17px needs 1.65 line height to be comfortable for sustained reading. Display text at 34px+ at 1.65 would feel loose and unintentional — use 1.1.

**Never use more than three type sizes in the same visual unit.** A card with four different font sizes is a card that has not decided what matters.

**Do not style text by overriding token values.** The `Text` component accepts a `variant` that maps to the scale above. Do not reach for arbitrary `fontSize` or `fontWeight` values.

### System font stack

Orchard UI uses the system font stack by default. This is deliberate: system fonts are what the user's operating system considers legible and beautiful. Using the system font means Orchard components feel native to their context.

```
-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

Custom brand fonts are supported via the theme contract, not by overriding defaults.

---

## 4. Motion

Animation is explanation, not decoration.

Before adding any animation, ask: does this motion help the user understand what happened? If the answer is "it makes the interface feel more alive" or "it looks good," the animation should not exist.

### The scale

All durations come from `@orchard-ui/motion`.

| Token | Value | Usage |
|-------|-------|-------|
| `duration.instant` | 0ms | State changes that must feel immediate. Checkbox, toggle. |
| `duration.fast` | 100ms | Micro-interactions. Hover, active press, focus ring appearance. |
| `duration.normal` | 200ms | UI transitions. Dropdown open, tooltip, popover. |
| `duration.slow` | 350ms | Overlay appearances. Modal, sheet, drawer. |
| `duration.deliberate` | 500ms | Page-level transitions. Onboarding, empty state reveals. |

### Easing

| Context | Easing | Rationale |
|---------|--------|-----------|
| Elements entering the screen | ease-out | Fast start, slow finish. The object arrives and settles. |
| Elements leaving the screen | ease-in | Slow start, fast finish. The object departs quickly. |
| In-place state changes | ease-in-out | Symmetric. No abrupt start or end. |

Never use `linear` easing. It reads as mechanical and unnatural.

### What to animate

Only `opacity` and `transform` (translate, scale). Animating `height`, `width`, `padding`, or `margin` causes layout recalculations and degrades performance.

```
✓  transform: translateY(4px) → translateY(0)   — GPU-composited
✓  opacity: 0 → 1                               — GPU-composited
❌  height: 0 → auto                             — layout recalculation
❌  margin-top: 0 → 16px                         — layout recalculation
```

### `prefers-reduced-motion`

Every animation is conditional. If the user has requested reduced motion, motion stops — or is replaced with an instant opacity transition where a static alternative is not enough. This is not optional.

```css
@media (prefers-reduced-motion: reduce) {
  /* All transitions either instant or removed */
}
```

### Anti-patterns

- Animating for decoration: remove it.
- Multiple simultaneous unrelated animations: resolve to one or choreograph them.
- Looping animations in UI (spinners are the only exception): stop them.
- Duration above 500ms for any transition the user triggered: they are waiting for the result.

---

## 5. Visual Hierarchy

Hierarchy tells the user where to look first, second, and third. In Orchard UI, hierarchy is expressed through exactly four tools: **size, weight, contrast, and spacing**. Everything else is noise.

### The four tools

**Size** is the most powerful signal. A heading at 28px over body text at 17px needs nothing else to establish hierarchy. Do not add color, weight, or decoration to a size that already speaks.

**Weight** communicates importance within the same size. A card title at `600` and a card description at `400` — same font size, clear hierarchy. Weight is cheaper and more precise than size for creating distinction within a component.

**Contrast** is the second most powerful tool. A dark text on a light background outranks lighter text on the same background. Secondary text uses `color.text.secondary`, not `color.text.primary`. This is a semantic decision, not a style preference.

**Spacing** groups and separates. Elements with less space between them are perceived as more related. This creates hierarchy without any change in color or size.

### What hierarchy is not

| ❌ Not a hierarchy tool | Why |
|-------------------------|-----|
| Strong borders | They add visual weight without adding information. |
| Heavy shadows | They create noise, not hierarchy. A card does not need a shadow to be read as elevated — it needs contrast with the background. |
| Multiple accent colors | One accent color, used intentionally, carries more meaning than three. Each additional color is a claim on attention. |
| Gradients | Gradients communicate energy, not hierarchy. They are decoration. |

### Elevation model

Elevation is expressed as contrast against the ground, not as shadows. A surface at elevation 1 has a background color slightly different from the ground. This is visible, clean, and works in both light and dark themes without any change in shadow values.

| Level | Usage | Shadow |
|-------|-------|--------|
| 0 | Ground / page background | None |
| 1 | Cards, list items | None — contrast only |
| 2 | Popovers, tooltips | `shadow.sm` — barely perceptible |
| 3 | Modals, sheets | `shadow.md` |
| 4 | Notifications, toasts | `shadow.lg` |

---

## 6. Composition

Orchard UI is a system of composable parts. Components are not self-contained UI blocks — they are tools that combine.

### Compound components

Complex components are built from smaller, focused pieces. The consumer owns the composition.

```tsx
// ✓ Compound — consumer controls structure
<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Confirm action</Dialog.Title>
      <Dialog.Description>This cannot be undone.</Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

// ❌ Monolithic — hides the structure, limits customization
<Dialog
  trigger={<Button>Open</Button>}
  title="Confirm action"
  description="This cannot be undone."
/>
```

The monolithic version is convenient for the simplest case and impossible for every other case.

### The `asChild` pattern

Any component that renders an interactive element supports `asChild`. This delegates the component's behavior and accessibility attributes to the consumer's element, without wrapping it in an extra DOM node.

```tsx
// The Button behavior and aria attributes land on the Link element
<Button asChild>
  <a href="/settings">Go to Settings</a>
</Button>
```

### `asChild` vs `as` — decision rule (C3)

**Use `asChild`** when the consumer's element must own the DOM node — wrapping a router `<Link>`, a third-party button, or any element with its own event handlers. The primitive's element is not rendered; the consumer's element takes its place and receives the primitive's behavior and ARIA attributes as props.

**Use `as`** when Orchard controls the DOM node but needs a different HTML tag — `<Heading as="h2">` renders Orchard's element as an `h2`. Orchard's props, styles, and behavior stay fully intact.

The criterion: **`asChild` hands off the element. `as` changes the tag.**

```tsx
// asChild — router Link owns the DOM node; Button contributes behavior
<Button asChild>
  <Link to="/settings">Settings</Link>
</Button>

// as — Orchard owns the DOM node; only the HTML tag changes
<Heading as="h2">Section title</Heading>
```

### `React.forwardRef` on every component

Every component in `@orchard-ui/primitives` and `@orchard-ui/react` uses `React.forwardRef`. Without this, consumers cannot manage focus programmatically, integrate with animation libraries that need DOM nodes, or build accessible patterns that require imperative ref access.

### Separation of behavior and style

`@orchard-ui/primitives` owns behavior: keyboard interaction, ARIA attributes, focus management, state. It has no CSS.

`@orchard-ui/react` owns visual expression: tokens, Vanilla Extract styles, design variants. It delegates behavior to primitives entirely.

A component in `@orchard-ui/react` is a primitive with a skin. The skin never re-implements the behavior.

### Polymorphic components

Components that could render as different semantic elements accept an `as` prop.

```tsx
<Heading as="h1">Page title</Heading>
<Heading as="h2">Section title</Heading>
<Text as="label" htmlFor="name">Name</Text>
<Text as="p">Description</Text>
```

The visual style is controlled by variant. The semantic element is controlled by `as`. They are independent concerns.

---

## 7. Density

Density is not a visual style. It is a decision about information priority.

Compact density is appropriate when the user needs to see more data at once and has chosen a context where they have accepted that tradeoff — a data table, a code editor, a sidebar. Regular density is the default for everything else.

### The density scale

| Density | Size prop | Padding | Font size | Appropriate for |
|---------|-----------|---------|-----------|----------------|
| Compact | `sm` | `spacing.xs` – `spacing.sm` | `subheadline` (15px) | Tables, menus, dropdowns, tooltips, sidebars |
| Regular | `md` | `spacing.sm` – `spacing.md` | `body` (17px) | Forms, cards, dialogs, standard UI |
| Comfortable | `lg` | `spacing.md` – `spacing.lg` | `body` (17px) | Marketing, onboarding, empty states |

### What density controls

- Internal component padding
- Component height (for form controls, buttons)
- Gap between sibling elements within a component
- Font size within a bounded two-step scale

### What density does not control

- **Font size, beyond two defined steps.** There are exactly two type sizes for component interiors: `body` (17px) for standard contexts and `subheadline` (15px) for compact contexts. Compact density maps to `subheadline` — never to `footnote` (13px) or smaller. A dropdown, table row, or context menu at 17px is uncomfortably large; at 13px it becomes illegible. `subheadline` (15px) is the calibrated midpoint for control-density contexts.
- **Color or contrast.** Density changes space and type size within the defined scale — not visual language.
- **Animation duration.** Motion stays the same across densities.

### Touch targets

Regardless of density, every interactive element maintains a minimum 44×44px touch target. A visually compact button can have a larger invisible interaction area. This is not optional — it is the Apple HIG minimum and WCAG 2.5.5 best practice.

---

## 8. Accessibility

Accessibility is the first design principle in Orchard UI. It is not a checklist at the end of development. A component that is not accessible is not complete, regardless of how it looks.

### The hierarchy of implementation

1. **Semantic HTML.** A `<button>` element is always preferred over `<div role="button">`. Native elements carry behavior, keyboard support, and accessibility semantics at zero cost. Use them.

2. **ARIA when HTML is insufficient.** ARIA supplements — it does not replace. Use it to add information that HTML cannot express: live regions, expanded/collapsed states, relationships between elements.

3. **Keyboard navigation.** Every interactive component is fully operable by keyboard. If it cannot be used without a mouse, it is not shipped.

### WCAG AA compliance (minimum)

| Requirement | Threshold |
|-------------|-----------|
| Normal text contrast | 4.5:1 |
| Large text contrast (18px+ regular, 14px+ bold) | 3:1 |
| UI component and focus indicator | 3:1 against adjacent colors |
| Focus indicator | Minimum 2px, visible on all backgrounds |

### Keyboard interaction patterns

| Component | Required keys |
|-----------|--------------|
| Button | `Enter`, `Space` |
| Link | `Enter` |
| Checkbox | `Space` |
| Radio group | `Arrow` keys within group, `Tab` out |
| Dialog | `Escape` to close, `Tab`/`Shift+Tab` inside trap |
| Select | `Enter`/`Space` to open, `Arrow` keys to navigate, `Escape` to close |
| Combobox | `Arrow` keys + character filtering, `Enter` to select |
| Tabs | `Arrow` keys between tabs, `Tab` into panel |
| Disclosure | `Enter`/`Space` to toggle |

### Focus management

**Focus trapping.** Modal dialogs, sheets, and drawers trap focus within their bounds. When closed, focus returns to the element that triggered them.

**Focus ring visibility.** The focus ring must be visible in all themes, on all backgrounds. Never suppress the focus ring without a custom replacement that is equally visible.

**Focus order.** The tab order follows the visual order of the layout. Do not use `tabindex` values above 0.

### State communication

Color is never the only indicator of state. Every state change communicates through at least two channels: color and one of (icon, label, pattern, weight).

```
✓  Error: red border + error icon + "Required field" label
❌  Error: red border alone
```

### ARIA requirements per component type

Every interactive component provides:

- **role** — what kind of element it is
- **accessible name** — what it is called (from label, aria-label, or aria-labelledby)
- **state** — its current condition (aria-expanded, aria-selected, aria-disabled, etc.)
- **description** — additional context where helpful (aria-describedby)

### Motion and vestibular safety

All animations respect `prefers-reduced-motion: reduce`. When this preference is active:

- Transitions that communicate state change become instant (opacity only, no transform).
- Entrance/exit animations are removed.
- Any looping or continuous motion stops entirely.

There is no component in Orchard UI that animates regardless of user preference.

### Testing requirements

Every component passes all four layers of accessibility testing before release:

1. **Automated** — axe-core in Storybook and in vitest via `@testing-library/jest-dom`
2. **Keyboard** — manual verification of every interaction pattern
3. **Screen reader** — VoiceOver (macOS/iOS) and NVDA (Windows)
4. **Contrast** — verified in both light and dark themes

A component that passes automated checks but fails manual keyboard testing has not passed accessibility review.

### Component state policy (S3)

The canonical definition of component states — state taxonomy, visual rules, ARIA requirements, state combinations, and the controlled/uncontrolled API naming convention — is maintained in [`component-states.md`](./component-states.md). Every interactive component in Orchard UI conforms to that policy.

---

## 9. Color System

Color communicates state. It does not create hierarchy.

Hierarchy is the job of size, weight, contrast, and spacing — tools established in section 5. Color's only job is to convey meaning: this is interactive, this is selected, this failed, this succeeded. When color is used for decoration or structure, it exhausts its capacity to communicate meaning.

### Color categories

**Neutral** — 95% of the interface. These are the most important colors because they are everywhere.

| Token | Role |
|-------|------|
| `color.ground` | Page background. The canvas. |
| `color.surface` | Elevated surfaces: cards, list rows, input fields. |
| `color.surface.raised` | Floating surfaces: popovers, dropdowns, tooltips. |
| `color.border` | Subtle separators, input outlines, dividers. |
| `color.text.primary` | Main content. Full contrast. |
| `color.text.secondary` | Supporting text. Reduced contrast. |
| `color.text.tertiary` | Metadata, placeholders, timestamps. |
| `color.text.disabled` | Unavailable states. Not interactive. |

**Accent** — one color. Used intentionally and sparingly.

| Token | Role |
|-------|------|
| `color.accent` | The primary interactive signal: focus rings, selected states, primary buttons, links, progress. |
| `color.accent.subtle` | Tinted backgrounds: selected item row, alert background. |
| `color.accent.emphasis` | Hover and pressed states of accent-colored elements. |
| `color.accent.foreground` | Text and icons rendered on top of `color.accent` backgrounds. Guaranteed ≥ 4.5:1 contrast against `color.accent`. |

**Status** — communicates outcomes and system states. Never decorative.

| Token | Meaning | Use for |
|-------|---------|---------|
| `color.success` | Positive outcome | Confirmation, completion, valid state |
| `color.success.subtle` | Success tint | Alert backgrounds, badge fills |
| `color.success.foreground` | Text/icons on success backgrounds | Badge labels, filled alert text |
| `color.warning` | Caution required | Degraded state, recoverable issue |
| `color.warning.subtle` | Warning tint | Alert backgrounds |
| `color.warning.foreground` | Text/icons on warning backgrounds | Badge labels, filled alert text |
| `color.danger` | Failure or irreversibility | Errors, destructive actions, invalid state |
| `color.danger.subtle` | Danger tint | Error field backgrounds, alert fills |
| `color.danger.foreground` | Text/icons on danger backgrounds | Badge labels, filled alert text |
| `color.info` | Neutral information | Informational callouts with no urgency |
| `color.info.subtle` | Info tint | Callout backgrounds |
| `color.info.foreground` | Text/icons on info backgrounds | Badge labels, filled alert text |

### Accent strategy

The accent is a signal. Every use of the accent color on a non-interactive element dilutes what the accent means everywhere else. When users see the accent, they should think: "I can interact with this" or "this is selected." If the accent appears on decorative backgrounds or section headers, this learned association breaks.

Use accent for:
- Focus rings
- Selected and active states
- Primary call-to-action buttons
- Links
- Progress indicators
- Checkmarks, radio fills

Do not use accent for:
- Decorative section backgrounds
- Icons that are not interactive
- Typography that is not a link
- Illustrations

### Status color rules

**`danger` is not emphasis.** Danger red communicates error or destruction. A button is not dangerous because it is important — it is dangerous because clicking it causes irreversible harm. Never use danger for visual weight alone.

**`info` is not accent.** Info blue and accent often share a hue family. Info is for neutral callouts. Accent is for interaction. When they appear together, they must be visually distinct enough that users can tell which is interactive.

**Status colors always pair with a non-color signal.** An error state is a red border plus an error icon plus an error message. Color alone fails users who cannot distinguish it.

---

## 10. Dark Mode

Dark mode is not inverted light mode.

Inverting light mode produces an interface where shadows glow, pure white text halates against pure black, and colors that worked in light destroy contrast in dark. Dark mode is a different set of values for the same semantic tokens, designed from the ground up for a low-luminance context.

### How Orchard defines dark mode

The same semantic token names. Different values.

```
color.ground:         light → #F7F6F3     dark → #111113
color.surface:        light → #FFFFFF     dark → #1C1C1E
color.surface.raised: light → #F0EFEC     dark → #2C2C2E
color.text.primary:   light → #1C1C1E     dark → #F2F2F7
color.text.secondary: light → #6B6B70     dark → #98989F
color.border:         light → #E5E4E0     dark → rgba(255,255,255,0.08)
```

Every component code references `color.ground`. The theme provides the value. Nothing in component code changes between themes.

### Elevation in dark mode

In light mode, elevation is expressed by surfaces becoming lighter — cards are white on a gray ground. In dark mode, the same logic holds: elevated surfaces are *slightly lighter than the ground*, not the reverse. The darkest value is always the ground.

| Level | Light surface | Dark surface |
|-------|--------------|-------------|
| 0 — Ground | `#F7F6F3` | `#111113` |
| 1 — Cards | `#FFFFFF` | `#1C1C1E` |
| 2 — Raised | `#F0EFEC` | `#2C2C2E` |
| 3 — Overlay | `#FFFFFF` + `shadow.md` | `#3A3A3C` + `shadow.md` |

Shadows in dark mode are nearly invisible against dark backgrounds. The elevation model falls back entirely to surface color contrast. This is why `shadow.sm` barely contributes to elevation 2 in dark mode — the difference between `#111113` and `#2C2C2E` already communicates the elevation clearly.

### Color saturation in dark mode

Status colors at full saturation — danger red, warning amber, success green — can be too aggressive against dark surfaces and can also fail contrast requirements. In dark mode, these colors shift:

- Slightly lighter (higher luminance)
- Slightly less saturated
- Always verified at 4.5:1 contrast against `color.surface` in dark

The accent follows the same rule. The accent in dark mode is not the same hex as in light mode — it is adjusted to read at the correct visual weight on a dark surface.

### The semantic token promise

This is the entire reason semantic tokens are non-negotiable. A component that uses `color.text.primary` adapts to dark mode for free. A component that uses `#1C1C1E` becomes invisible against a dark ground.

No hardcoded color value survives a theme switch correctly.

### Common dark mode failures

| Failure | Cause |
|---------|-------|
| White text on pure black — halation effect | Using `#000000` ground instead of a slightly warmer near-black |
| Invisible shadows | Assuming light-mode shadow values translate to dark |
| Washed-out status colors | Using the same hex for success/danger/warning in both themes |
| Invisible borders | Using the same border color in both themes instead of adjusting opacity |
| Contrast not re-verified | Assuming light-mode contrast ratios hold in dark |

### Contrast is verified independently per theme

A component that passes WCAG AA contrast in light mode has provided zero evidence about its dark mode contrast. Every contrast requirement is verified against the dark theme values separately.

---

## 11. Responsiveness

Components adapt. Content does not shrink.

Orchard UI does not define page layouts or grid systems — those are the application's responsibility. What Orchard defines is how components behave internally across different viewport contexts.

### Breakpoints

| Token | Min width | Context |
|-------|-----------|---------|
| `breakpoint.mobile` | 0px | Single column. Touch primary. Thumb reach. |
| `breakpoint.tablet` | 768px | Two-column capable. Mixed input. |
| `breakpoint.desktop` | 1024px | Multi-column. Cursor primary. Hover meaningful. |
| `breakpoint.wide` | 1440px | Generous whitespace. Maximum content width. |

These are named contexts, not arbitrary pixel thresholds. A breakpoint represents a change in the user's context and input method — not just a change in screen width.

### How components adapt

**Touch targets are always 44×44px minimum on `mobile` and `tablet`.** The visual size of a button can be compact. Its interaction area cannot be. This is enforced regardless of density setting. On desktop, cursor precision reduces this requirement, but Orchard maintains 32px minimum for all sizes.

**Hover states exist only on `desktop`.** On touch devices, hover states that reveal information are an accessibility failure — that information is permanently hidden from touch users. Any information communicated by hover must have an accessible equivalent. Use `@media (hover: hover)` to scope hover styles, not breakpoints alone.

**Density and viewport are independent settings.** Viewport context does not automatically change density. A compact table is compact on both mobile and desktop — the consumer decides density. What changes on mobile is the touch target padding (invisible, added automatically), not the visual density.

**The mobile density paradox.** The intuitive assumption is that mobile needs denser components because the screen is smaller. The opposite is true. Fingers are less precise than cursors — adjacent interactive elements need more separation on touch, not less. When in doubt, use regular density on mobile, not compact.

### What does not change with breakpoint

| Invariant | Rule |
|-----------|------|
| Font sizes | The type scale does not have responsive steps. `body` is 17px everywhere. |
| Color | No color changes are driven by viewport. |
| Accessibility | WCAG requirements have no responsive exceptions. |
| Keyboard behavior | Keyboard patterns and ARIA are identical at all viewports. |
| Focus management | Focus trapping, focus return, and focus visibility work the same everywhere. |
| Reading direction | RTL/LTR is a document context set by the `dir` attribute — not a breakpoint concern. All components function correctly in both directions via logical properties. See [`rtl-guidelines.md`](./rtl-guidelines.md). |

### Content does not shrink

If content does not fit, the container scrolls, the layout reflows, or the content wraps. Content is never scaled down to fit. Scaling text to fit a container produces text at an unpredictable size — often below the accessible minimum — and removes the user's ability to increase it via browser zoom.

Text truncation with `text-overflow: ellipsis` is permitted only when the full content is accessible by another path: a tooltip on hover/focus, an expand button, or a native `title` attribute. Truncation that hides information permanently is not permitted.

```
✓  Truncated label with tooltip revealing full text
✓  Collapsed list row with expand action
❌  Text cut off with no way to see the full content
❌  Font size reduced below subheadline (15px) to force content to fit
```

---

## Summary

| Principle | The rule in one sentence |
|-----------|--------------------------|
| Philosophy | The component disappears; the content remains. |
| Spacing | Distance encodes relationship. Every gap is a decision. |
| Typography | Weight creates hierarchy before size does. |
| Motion | Animate to explain, never to decorate. |
| Hierarchy | Four tools only: size, weight, contrast, spacing. |
| Composition | Ship systems of parts, not monolithic blocks. |
| Density | Space and type-size change within a bounded scale. Color and motion do not. |
| Accessibility | If it isn't accessible, it isn't finished. |
| Color | Color communicates state. It does not create hierarchy. |
| Dark Mode | Different values, same token names. Never an inversion. |
| Responsiveness | Components adapt. Content does not shrink. |
