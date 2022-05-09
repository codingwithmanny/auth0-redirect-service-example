// Imports
// ========================================================
import { render } from '@testing-library/react'

// Render
// ========================================================
/**
 * 
 * @param ui 
 * @param options 
 * @returns 
 */
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  })

// Exports
// ========================================================
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }