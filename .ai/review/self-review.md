# Self Review

## Objective

Before finalizing any implementation, perform a complete self-audit.

Never assume generated code is correct.

Review every category below.

---

## Architecture Review

Validate against:

- Package Architect
- Project Structure

Checklist:

- Correct file structure
- Correct exports
- No circular dependencies
- No duplicated responsibilities

Pass / Fail

---

## Design Review

Validate against:

- Design Language
- Apple Design Reviewer
- Token Enforcer

Checklist:

- Uses design tokens
- Consistent spacing
- Consistent radius
- Consistent typography
- Consistent shadows
- Consistent motion

Pass / Fail

---

## Accessibility Review

Validate against:

- Accessibility Guardian

Checklist:

- Keyboard navigation
- Focus visibility
- ARIA attributes
- Screen reader support
- Contrast compliance
- Reduced motion support

Pass / Fail

---

## Security Review

Validate against:

- Security Guardian

Checklist:

- No dangerous HTML rendering
- No unsafe user input handling
- No exposed secrets
- No unsafe execution patterns

Pass / Fail

---

## Performance Review

Validate against:

- Performance Guardian

Checklist:

- No unnecessary renders
- No unnecessary state
- No expensive computations in render
- Proper memoization when appropriate

Pass / Fail

---

## API Review

Validate against:

- API Designer

Checklist:

- Predictable prop names
- Consistent API
- Easy to understand
- Easy to discover

Pass / Fail

---

## Testing Review

Validate against:

- Testing Guardian

Checklist:

- Tests exist
- Critical paths covered
- Accessibility tested
- Edge cases tested

Pass / Fail

---

## Documentation Review

Checklist:

- Usage examples
- Props documented
- Accessibility documented
- Variants documented

Pass / Fail

---

## Storybook Review

Checklist:

- All variants covered
- Dark mode covered
- Responsive examples covered
- Controls configured

Pass / Fail

---

## Final Score

Architecture: /10

Design: /10

Accessibility: /10

Security: /10

Performance: /10

API: /10

Testing: /10

Documentation: /10

Storybook: /10

Total: /90

---

## Approval Criteria

90 = Exceptional

80-89 = Approved

70-79 = Needs Improvement

Below 70 = Rejected

---

## Rule

Never finalize implementation without completing the Self Review.