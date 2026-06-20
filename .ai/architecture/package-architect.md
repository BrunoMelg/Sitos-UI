# Package Architect

## Objective

Ensure all code generated for Orchard UI follows a predictable, scalable, and maintainable architecture.

## Rules

- Never create files outside the official project structure.
- Never mix component logic, styling, and type definitions in the same file unless explicitly requested.
- Every component must be independently exportable.
- Every package must support tree-shaking.
- Every package must have a public API through index.ts.

## Package Structure

packages/

core/
tokens/
motion/
hooks/
icons/
themes/
react/

## Component Structure

ComponentName/

ComponentName.tsx
ComponentName.types.ts
ComponentName.styles.ts
ComponentName.test.tsx
ComponentName.stories.tsx
index.ts

## Requirements

Every component must contain:

- TypeScript typings
- Unit tests
- Storybook stories
- Accessibility support
- Dark mode support
- Documentation

## Forbidden

- Deep relative imports
- Circular dependencies
- Hardcoded theme values
- Duplicated utilities