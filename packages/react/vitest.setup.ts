import '@testing-library/jest-dom'
import { configureAxe, toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'

expect.extend(toHaveNoViolations)

export const axe = configureAxe({
  rules: {
    // Ignore region landmark rule — components are tested in isolation, not in a full page
    region: { enabled: false },
  },
})
