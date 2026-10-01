import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/ui/HoverMaskReveal', () => () => <div data-testid="hover-mask">HoverMask</div>);
jest.mock('./components/ui/Lanyard', () => () => <div data-testid="lanyard">Lanyard</div>);

test('renders netxspider brand in navbar', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/netxspider/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
