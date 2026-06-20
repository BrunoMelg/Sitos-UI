# Accessibility Guardian

## Objective

Ensure every component is accessible by default.

## Requirements

### Keyboard

- Fully keyboard navigable
- Logical tab order
- Escape support when applicable

### Screen Readers

- Proper ARIA attributes
- Accessible labels
- Accessible descriptions

### Focus

- Visible focus indicators
- Focus state cannot rely only on color

### Contrast

- WCAG AA minimum

### Motion

- Respect prefers-reduced-motion

### Themes

- Light Mode
- Dark Mode

## Validation

Every component must pass:

- Keyboard navigation
- Screen reader support
- Contrast validation
- Reduced motion validation

## Failure

Any missing requirement causes failure.