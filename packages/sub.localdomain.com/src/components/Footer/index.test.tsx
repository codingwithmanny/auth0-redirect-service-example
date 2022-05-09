// Imports
// ========================================================
import '@testing-library/jest-dom';
import { render, screen } from '../../../utils/test-utils';
import Footer from '.';

// Tests
// ========================================================
describe('Footer', async () => {
  /**
   * 
   */
  it('should render the footer', () => {
    // Setup
    // n/a

    // Init
    render(<Footer />);

    // Expectations
    expect(screen.getByText('Made by')).toBeInTheDocument()
  })
});