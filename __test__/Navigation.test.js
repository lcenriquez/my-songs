import { render, screen, cleanup } from '@testing-library/react';
import Navbar from "../components/Navbar/Navbar";

beforeEach(() => {
  render(<Navbar />);
});
afterEach(cleanup);

describe('Navigation links', () => {

  it('should have a link to the homepage', () => {
    expect(screen.getByText(/mysongs/i)).toBeInTheDocument();
  });

  it('should have a link to the favorite songs page', () => {
    const favoriteSongs = screen.getByRole('link', { name: /my favorite songs/i });
    expect(favoriteSongs).toBeInTheDocument();
  });
});