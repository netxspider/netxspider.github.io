import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LikeHeartButton from './LikeHeartButton';
import { LanguageProvider } from '../../context/LanguageContext';

describe('LikeHeartButton', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  test('renders LikeHeartButton and increments count on first click', () => {
    render(
      <LanguageProvider>
        <LikeHeartButton />
      </LanguageProvider>
    );

    const likeBtn = screen.getByRole('button', { name: /like portfolio/i });
    expect(likeBtn).toBeInTheDocument();

    // Initial count is rendered
    const initialCount = screen.getByText('0');
    expect(initialCount).toBeInTheDocument();

    // Clicking increments count
    fireEvent.click(likeBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  test('restricts user to liking once per session period', () => {
    render(
      <LanguageProvider>
        <LikeHeartButton />
      </LanguageProvider>
    );

    const likeBtn = screen.getByRole('button', { name: /like portfolio/i });

    // First click increments
    fireEvent.click(likeBtn);
    expect(screen.getByText('1')).toBeInTheDocument();

    // Second click in same session period does not increment again
    fireEvent.click(likeBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });
});
