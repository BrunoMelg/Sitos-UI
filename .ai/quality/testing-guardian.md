# Testing Guardian

## Objective

Ensure every component is properly tested.

## Required Tests

Every component must have all four:

1. Render — component mounts without throwing
2. Axe — no WCAG violations (MANDATORY — non-negotiable)
3. Interaction — user behavior via userEvent (not fireEvent)
4. Edge Cases — disabled, loading, error, empty states

## Mandatory Test Template

Every component test file must include these two tests at minimum:

```ts
import { renderWithProviders, axe, screen } from '../../test-utils'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('renders without errors', () => {
    renderWithProviders(<ComponentName />)
  })

  it('has no axe violations', async () => {
    const { container } = renderWithProviders(
      <ComponentName aria-label="Component" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

Skipping the axe test is not allowed. If a component cannot pass axe in isolation,
fix the component — do not skip or suppress the test.

## Coverage

Minimum: 80%
Target: 95%

## Interaction Tests

Use @testing-library/user-event, never fireEvent.

```ts
import { userEvent } from '../../test-utils'

it('calls onChange when value changes', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  renderWithProviders(<Input onChange={onChange} />)
  await user.type(screen.getByRole('textbox'), 'hello')
  expect(onChange).toHaveBeenCalled()
})
```

## Forbidden

- Testing implementation details (class names, internal state)
- Snapshot tests of DOM structure — they break on every style change
- Mocking child Orchard components — test the real component
- Skipping the axe test for any reason