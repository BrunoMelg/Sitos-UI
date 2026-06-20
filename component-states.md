# Orchard UI — Component States

> **Status: ACTIVE.**  
> This document defines the canonical state policy for all interactive components in Orchard UI.  
> It is referenced by [`design-principles.md`](./design-principles.md) §8 and enforced during component review.

---

## 1. State Taxonomy

Every interactive component in Orchard UI is described by a finite set of states. A state is a condition that changes what the component communicates — visually, to assistive technology, and in terms of what interactions are available.

### Canonical states

| State | Trigger | Applies to |
|-------|---------|------------|
| `default` | Component is mounted and idle | All |
| `hover` | Pointer is over the element | Desktop only. Never the only way to access information. |
| `focus-visible` | Element received keyboard focus | All interactive elements |
| `active` | Element is being pressed/activated | Buttons, links, clickable rows |
| `disabled` | Component is not interactive | Buttons, inputs, selects, checkboxes |
| `error` | Component has failed validation or a system error occurred | Inputs, forms, async components |
| `loading` | Component is waiting for async content | Buttons, skeletons, async list items |
| `empty` | Component has no content to display | Lists, tables, search results, async data |
| `readonly` | Component displays a value but does not accept input | Inputs, textareas, selects |
| `selected` | Item is chosen within a group | List items, tabs, radio groups |
| `checked` | Boolean state is on | Checkbox, switch/toggle |
| `indeterminate` | Partially checked (e.g. parent of mixed children) | Checkbox |

---

## 2. State Definitions

### `default`

The resting state. No visual emphasis beyond the component's base design. This state should be as quiet as possible — it is the baseline from which every other state is a departure.

- **Visual:** Base token values. No emphasis.
- **ARIA:** No additional state attributes. Roles and labels are always present.
- **Interaction:** All interactions available.

---

### `hover`

The pointer is over the interactive element.

- **Visual:** Subtle background fill using `color.surface.raised` or a tint. Never a border change alone. Never a color shift that would lose contrast.
- **ARIA:** No change. Hover is a pointer-device concept invisible to assistive technology.
- **Interaction:** Cursor changes to `pointer`. Scope all hover styles with `@media (hover: hover)` — never with a breakpoint.
- **Constraint:** Any information revealed only on hover must have a focus-visible equivalent. Hover-only information is inaccessible to keyboard and touch users.

---

### `focus-visible`

The element received focus via keyboard navigation (Tab, Shift+Tab, arrow keys) or programmatic focus.

- **Visual:** A 2px solid focus ring using `color.accent`. The ring must be visible against any background the component appears on — including images, dark surfaces, and colored backgrounds. Add a `box-shadow` offset of 2px white (or dark in dark mode) to lift the ring off any background. Never suppress `outline` without an equivalent replacement.
- **ARIA:** No change. The focus-visible state is communicated by position and OS-level announcements.
- **Interaction:** All interactions available via keyboard.
- **CSS:** Use `:focus-visible` (not `:focus`) to prevent mouse-click focus rings.

```css
/* ✓ Correct — keyboard focus only */
:focus-visible {
  outline: 2px solid var(--orchard-color-accent);
  outline-offset: 2px;
}

/* ❌ Wrong — fires on mouse click too */
:focus {
  outline: 2px solid var(--orchard-color-accent);
}
```

---

### `active`

The element is being pressed — mouse button held down, or touch press active.

- **Visual:** Scale down slightly (`transform: scale(0.97)`) and/or deepen background by one step toward `color.accent.emphasis`. The active state should be perceptible but brief.
- **ARIA:** `aria-pressed="true"` on toggle buttons only. Not on single-action buttons.
- **Interaction:** The interaction completes on release (mouseup/pointerup), not on press (mousedown).

---

### `disabled`

The component is not interactive. The user cannot activate it.

- **Visual:** Reduced opacity (use `color.text.disabled` for text, `color.border.default` at reduced opacity for borders). Do not use `opacity: 0.5` on the whole component — it creates accessibility issues with focus rings. Apply token-level muting selectively.
- **ARIA:** `aria-disabled="true"` on the element. Do **not** use the HTML `disabled` attribute on custom components — it removes the element from tab order, making it invisible to screen readers. `aria-disabled` keeps it focusable and lets screen readers announce the state.
  - Exception: native `<input>`, `<button>`, `<select>` elements may use HTML `disabled` when there is no need to communicate the state to screen readers.
- **Interaction:** No pointer events. No keyboard activation. No hover state. Cursor changes to `not-allowed`.
- **Combination rules:** `disabled` overrides `error`, `loading`, and `readonly`. A disabled component never shows error styling.

---

### `error`

The component's value or state is invalid, or a system error occurred during an async operation.

- **Visual:** Border changes to `color.danger`. An error icon appears adjacent to the control. An error message appears below the control using `color.danger` text. Color is never the only signal.
- **ARIA:** `aria-invalid="true"` on the input. `aria-describedby` points to the error message element. The error message element has a unique `id`.
- **Interaction:** The component remains fully interactive in error state. The user must be able to correct the value.
- **Never:** Use `error` for visual emphasis or warnings. Error communicates invalidity or failure — nothing else.

```tsx
// ✓ Correct error state
<Input
  aria-invalid={isInvalid}
  aria-describedby={isInvalid ? 'email-error' : undefined}
/>
{isInvalid && (
  <span id="email-error" role="alert">
    Enter a valid email address.
  </span>
)}
```

---

### `loading`

The component is waiting for an async operation to complete.

- **Visual:** A spinner or shimmer replaces or overlays the component's content. The component's interactive surface is suppressed during loading (pointer events off, cursor default or `wait`).
- **ARIA:** `aria-busy="true"` on the component root. If the loading replaces meaningful content, `aria-live="polite"` on a status region announces completion. For buttons: the label can change to the loading label, or an `aria-label` can override the visual label.
- **Interaction:** No user interaction during loading. If the user triggered the loading (e.g. form submit), disable re-submission.
- **Duration:** If loading exceeds 1 second, a skeleton or spinner must be visible. If it can complete in under 100ms, show nothing (avoid flicker).
- **Combination rules:** `loading` and `disabled` do not coexist. A loading component is temporarily non-interactive by nature — it does not need to be disabled.

---

### `empty`

The component has no content to display.

- **Visual:** An empty state illustration or message occupies the content area. It should communicate: what is missing, why it is missing, and what the user can do. A blank space is never acceptable.
- **ARIA:** The empty state content is in the DOM, not hidden. Screen readers announce it naturally.
- **Interaction:** Empty states often include a primary action (e.g. "Add your first item"). That action follows standard interactive state rules.

---

### `readonly`

The component displays a value but does not accept input. The value exists and is valid — it simply cannot be changed in this context.

- **Visual:** Reduced background (often `color.surface` instead of `color.surface.raised`). No edit affordances. No hover state. Cursor is `default`, not `pointer` or `text`.
- **ARIA:** `aria-readonly="true"` on the element. The element remains focusable and its value is announced.
- **Interaction:** The element remains in tab order. The user can read and copy the value. No modification is possible.
- **Distinction from `disabled`:** Readonly content is semantically valid and intentionally visible. Disabled content is unavailable. Use `readonly` when the value matters to the user; use `disabled` when the control is irrelevant in the current context.

---

### `selected`

An item is the active or chosen member of a group. Used in tabs, lists, navigation menus, radio groups.

- **Visual:** Background fill using `color.accent.subtle`. Text uses `color.accent` or `color.text.primary` depending on context. A leading indicator (colored bar, checkmark) confirms selection without relying on color alone.
- **ARIA:** `aria-selected="true"` on the selected item within a `listbox`, `tablist`, or `grid`. `aria-current="page"` on navigation items representing the current route.
- **Interaction:** The selected item does not activate on click (it is already selected). Selection changes when another item is activated.

---

### `checked`

Boolean state: the control is on. Used in checkboxes and switches.

- **Visual:** Checkbox: checkmark icon with `color.accent` background. Switch: filled track in `color.accent`, thumb moves to the end.
- **ARIA:** `aria-checked="true"` on the control.
- **Interaction:** `Space` toggles the state.

---

### `indeterminate`

The control is partially checked — used when a parent checkbox represents a group of children with mixed checked/unchecked states.

- **Visual:** A horizontal dash (–) inside the checkbox, with `color.accent` background.
- **ARIA:** `aria-checked="mixed"` on the checkbox element.
- **Interaction:** `Space` moves from `indeterminate` to `checked`. A second `Space` moves to `unchecked`.

---

## 3. State Combinations

Not all states can coexist. The table below defines which combinations are valid.

| Base state | + `hover` | + `focus-visible` | + `active` | + `error` | + `loading` | + `selected` |
|------------|----------|-------------------|------------|-----------|-------------|--------------|
| `default` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `hover` | — | ✓ | ✓ | ✓ | — | ✓ |
| `focus-visible` | ✓ | — | ✓ | ✓ | — | ✓ |
| `disabled` | — | — | — | — | — | — |
| `loading` | — | ✓ | — | — | — | — |
| `readonly` | — | ✓ | — | — | — | — |
| `error` | ✓ | ✓ | ✓ | — | — | — |
| `selected` | ✓ | ✓ | ✓ | ✓ | ✓ | — |

### Key rules

- **`disabled` is terminal.** A disabled component has no other visual states. It does not hover, focus, activate, or show error.
- **`loading` suppresses pointer states.** Loading components do not have hover or active states — the user cannot interact with them.
- **`readonly` accepts focus, not interaction.** Readonly elements can receive `focus-visible` for reading/copying. They do not hover or activate.
- **`error` + `focus-visible` is common and expected.** A field with an error should show both the error styling and the focus ring when focused.
- **`loading` + `error` is invalid.** A loading state implies an operation is in progress. An error state implies the operation has completed and failed. These cannot coexist — the error state follows the loading state.

---

## 4. Controlled vs. Uncontrolled API

Every stateful component in Orchard UI supports both controlled (consumer manages state) and uncontrolled (component manages state internally) patterns.

### The naming convention

| Pattern | Prop suffix | Example |
|---------|-------------|---------|
| Controlled value | `value` / `is`-prefix | `value`, `isOpen`, `isChecked`, `isDisabled` |
| Uncontrolled default | `default`-prefix | `defaultValue`, `defaultOpen`, `defaultChecked` |
| Change handler | `on[State]Change` | `onChange`, `onOpenChange`, `onCheckedChange` |

### `is`-prefix for controlled booleans

Boolean controlled props use `is` as a prefix to disambiguate from HTML attributes and to signal that they are controlled:

```tsx
// ✓ Controlled boolean — the parent owns this state
<Switch isChecked={checked} onCheckedChange={setChecked} />

// ✓ Uncontrolled boolean — the Switch owns its state
<Switch defaultChecked={false} onCheckedChange={handleChange} />
```

### `default`-prefix for uncontrolled defaults

The `default`-prefixed prop sets the initial state. After mount, the component manages state internally. The handler fires on changes but does not control the component.

```tsx
// ✓ Uncontrolled — component manages its own open state
<Select defaultValue="option-a" onChange={trackAnalytics} />

// ✓ Controlled — parent manages value; onChange must update it
<Select value={selected} onChange={setSelected} />
```

### Invariants

- A `value` prop without `onChange` is an error. Log a dev-mode warning.
- A `defaultValue` prop is ignored when `value` is also provided. Log a dev-mode warning.
- All `on*Change` handlers receive the new value as their first argument, and the synthetic event (if any) as their second.
- State change handlers never directly mutate state — they notify. Side effects belong in the consumer's handler.

---

## 5. State CSS Architecture

States are applied via data attributes on the component root element, not via class toggling. This decouples state from styling and makes states observable from outside the component.

```html
<!-- ✓ State via data attributes -->
<button data-state="hover focus-visible" aria-label="Submit">Submit</button>

<!-- In Vanilla Extract -->
selectors: {
  '&[data-state~="hover"]': { background: vars.color.surface.raised },
  '&[data-state~="focus-visible"]': { outline: `2px solid ${vars.color.accent}` },
  '&[data-disabled]': { cursor: 'not-allowed', opacity: 0.4 },
}
```

### Data attribute conventions

| State | Data attribute |
|-------|----------------|
| disabled | `data-disabled` (presence = disabled) |
| error | `data-invalid` |
| loading | `data-loading` |
| readonly | `data-readonly` |
| selected | `data-selected` |
| checked | `data-checked` (value: `"true"` or `"false"` or `"mixed"`) |
| hover | Applied via JS in rare cases where CSS `:hover` is insufficient |
| focus-visible | Applied via JS when `focus-visible` polyfill is needed |

---

## 6. States by Component Category

### Form controls (Input, Textarea, Select, Combobox)

Applicable states: `default`, `hover`, `focus-visible`, `disabled`, `error`, `loading`, `readonly`

The `error` state requires:
1. Border color → `color.danger`
2. Error icon → rendered after the input
3. Error message → below the input, linked via `aria-describedby`
4. `aria-invalid="true"` on the `<input>`

### Action controls (Button, Link, IconButton)

Applicable states: `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`

Loading buttons replace their label with a spinner and suppress re-submission. The button's width must not change during loading — use absolute positioning for the spinner.

### Selection controls (Checkbox, Switch, Radio)

Applicable states: `default`, `hover`, `focus-visible`, `active`, `disabled`, `checked`, `indeterminate` (checkbox only)

### Navigation and choice (Tabs, Select Options, List Items)

Applicable states: `default`, `hover`, `focus-visible`, `disabled`, `selected`

### Data display (Table rows, Cards, List items with actions)

Applicable states: `default`, `hover`, `focus-visible`, `selected`, `loading` (skeleton), `empty`

### Disclosure and overlay (Dialog, Popover, Tooltip, Accordion)

Applicable states: `default`, `open`/`closed` (treated as distinct visual states, not listed in canonical taxonomy — see individual component specs)
