import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { LanguageProvider } from '../context/LanguageContext';

test('renders netxspider logo and navigation links', () => {
  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>
  );
  expect(screen.getByText('netxspider')).toBeInTheDocument();
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Stack')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  expect(screen.getByText('Connect')).toBeInTheDocument();
  expect(screen.getByText('Resume')).toBeInTheDocument();
});

test('renders utility controls for sound, language, and theme toggle', () => {
  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>
  );
  const soundBtn = screen.getByRole('button', { name: /sound effects/i });
  const langBtn = screen.getByRole('button', { name: /language selector/i });
  const themeBtn = screen.getByRole('button', { name: /theme:/i });

  expect(soundBtn).toBeInTheDocument();
  expect(langBtn).toBeInTheDocument();
  expect(themeBtn).toBeInTheDocument();

  // Test toggling theme
  fireEvent.click(themeBtn);
  expect(screen.getByRole('button', { name: /theme: dark/i })).toBeInTheDocument();

  // Test language popover
  fireEvent.click(langBtn);
  expect(screen.getByText('English')).toBeInTheDocument();
  expect(screen.getByText('Español')).toBeInTheDocument();
  expect(screen.getByText('Français')).toBeInTheDocument();
  expect(screen.getByText('हिन्दी')).toBeInTheDocument();
});
