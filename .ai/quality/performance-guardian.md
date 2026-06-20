# Performance Guardian

## Objective

Prevent performance regressions in components and the token system.

---

## Bundle Size Limits

These are hard limits enforced per package. A PR that exceeds them requires
explicit approval from a second reviewer with a written justification.

| Package | JS limit (gzip) | CSS limit (gzip) |
|---------|----------------|-----------------|
| `@orchard-ui/tokens` | 8 KB | 12 KB |
| Individual component (e.g. `/button`) | 10 KB | 8 KB |
| `@orchard-ui/react` (full bundle) | 400 KB | 300 KB |

Measure with: `pnpm build && npx size-limit` (once size-limit is configured).

---

## React Rendering Rules

### ThemeProvider must not use useState for theme storage

The theme is stored as a `data-theme` attribute on the DOM root, not in React
state. Changing the theme must not trigger any React re-renders.

```ts
// ✓ Correct — no React state, no re-renders
function setTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('orchard-theme', theme)
}

// ❌ Wrong — every toggle re-renders the entire tree
const [theme, setTheme] = useState<'light' | 'dark'>('light')
```

### Context values must be stable

Any Context value object must be memoized. An unstable reference causes all
consumers to re-render on every parent render, even if the data is unchanged.

```ts
// ✓ Correct
const value = useMemo(() => ({ density }), [density])

// ❌ Wrong — new object on every render
const value = { density }
```

### No expensive computations in render

Move derived values outside the component or into useMemo when computation
is non-trivial (string transforms, array filtering, complex conditionals).

```ts
// ✓ Correct
const sortedItems = useMemo(() => items.toSorted(compareFn), [items])

// ❌ Wrong — sorts on every render
const sortedItems = items.toSorted(compareFn)
```

### Avoid anonymous functions in JSX that create new references on every render

```tsx
// ✓ Correct — stable reference
const handleClick = useCallback(() => { ... }, [dep])
<Button onClick={handleClick} />

// ❌ Wrong for performance-critical paths
<Button onClick={() => { ... }} />
```

---

## Vanilla Extract Rules

### Prefer style() over inline styles

VE `style()` generates a static class at build time. Inline styles are applied
at runtime and bypass VE's optimization.

```ts
// ✓ Correct — static class, zero runtime
const buttonBase = style({ padding: vars.spacing.md })

// ❌ Wrong — runtime style, not optimized
<button style={{ padding: vars.spacing.md }} />
```

### recipe() cross-product limit

A `recipe()` with many variant combinations generates one CSS class per
combination at build time. Exceeding ~100 combinations for a single component
is a warning sign.

```ts
// Warning — 5 × 6 × 3 = 90 combinations is near the limit
recipe({
  variants: {
    variant: { solid, outline, ghost, subtle, link },    // 5
    intent:  { neutral, accent, danger, warning, success, info }, // 6
    size:    { sm, md, lg },                             // 3
  }
})
```

If a combination is not used in any product surface, don't add it as a variant.
Unused CSS is still generated and shipped.

### Never resolve CSS custom properties in JavaScript

```ts
// ✓ Correct — CSS var reference only
const color = vars.color.accent.default  // 'var(--orchard-accent-default)'

// ❌ Wrong — runtime DOM read, breaks SSR, blocks rendering
const color = getComputedStyle(el).getPropertyValue('--orchard-accent-default')
```

---

## Build Performance

The Turborepo pipeline caches outputs. A slow build invalidates the cache.

- Token SD build should complete in < 3s (no external network calls, pure file transforms)
- Per-package tsup build should complete in < 10s
- Full monorepo build (`pnpm build`) should complete in < 60s on a warm cache

If a build step exceeds these limits consistently, investigate before adding
more files to that step.

---

## Validation Checklist

Before merging any component PR:

- [ ] No `useState` for theme or global display state
- [ ] No `getComputedStyle` calls for CSS var resolution
- [ ] Context values wrapped in `useMemo`
- [ ] Event handlers stable via `useCallback` when passed as props
- [ ] VE `recipe()` combinations count documented in the component file
- [ ] No inline styles for values available as tokens
