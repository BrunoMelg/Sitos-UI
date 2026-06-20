import '@testing-library/jest-dom'
import { configureAxe, toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'

expect.extend(toHaveNoViolations)

configureAxe({
  rules: {
    // color-contrast requires computed styles — not available in jsdom
    'color-contrast': { enabled: false },
  },
})
