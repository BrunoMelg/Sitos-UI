/**
 * Test utilities for Orchard UI components.
 *
 * Every component test file must import { renderWithProviders, axe } from here
 * instead of importing directly from @testing-library/react or jest-axe.
 *
 * Required test pattern per component:
 *
 *   it('renders without errors', () => {
 *     renderWithProviders(<Component />)
 *   })
 *
 *   it('has no axe violations', async () => {
 *     const { container } = renderWithProviders(<Component />)
 *     expect(await axe(container)).toHaveNoViolations()
 *   })
 */
export { render as renderWithProviders } from '@testing-library/react'
export { axe } from '../vitest.setup'
export { screen, within, waitFor, act } from '@testing-library/react'
export { userEvent } from '@testing-library/user-event'
