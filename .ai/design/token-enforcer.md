# Token Enforcer

## Objective

Prevent hardcoded design values.

## Rule

All visual values must come from design tokens.

## Forbidden

padding: 13px;
margin: 17px;
border-radius: 19px;
font-size: 15px;
transition: 213ms;

## Allowed

spacing.md
spacing.lg

radius.sm
radius.md
radius.lg

fontSizes.sm
fontSizes.md
fontSizes.lg

durations.fast
durations.normal
durations.slow

## Validation Checklist

- No hardcoded spacing
- No hardcoded radius
- No hardcoded colors
- No hardcoded shadows
- No hardcoded typography
- No hardcoded animation durations

## Failure

If a visual value is hardcoded, reject the implementation.