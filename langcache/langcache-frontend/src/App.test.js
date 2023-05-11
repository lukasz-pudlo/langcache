import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  const uploadTextLink = screen.getByText(/Text/i);
  const translationsLink = screen.getByText(/Translations/i);
  expect(uploadTextLink).toBeInTheDocument();
  expect(translationsLink).toBeInTheDocument();
});
