import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const lhElement = screen.getByText(/master recipe/i);
  expect(lhElement).toBeInTheDocument();
});
