import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsSection from './ProjectsSection';
import FlipCard from './ui/FlipCard';
import { LanguageProvider } from '../context/LanguageContext';

describe('FlipCard clickability & interaction', () => {
  it('does not flip when clicking on an interactive link or button inside the card', () => {
    const onFlipChange = jest.fn();
    render(
      <FlipCard
        defaultFlipped={true}
        onFlipChange={onFlipChange}
        front={<div>Front</div>}
        back={
          <div>
            <a href="https://example.com" id="test-link">
              Visit Site
            </a>
            <button id="test-button">Click Me</button>
            <div id="test-bg">Background Area</div>
          </div>
        }
      />
    );

    const link = screen.getByRole('link', { name: 'Visit Site' });
    const button = screen.getByRole('button', { name: 'Click Me' });

    // Pointerdown and click on link
    fireEvent.pointerDown(link, { pointerId: 1, button: 0 });
    fireEvent.click(link);
    expect(onFlipChange).not.toHaveBeenCalled();

    // Pointerdown and click on button
    fireEvent.pointerDown(button, { pointerId: 1, button: 0 });
    fireEvent.click(button);
    expect(onFlipChange).not.toHaveBeenCalled();
  });
});

describe('ProjectsSection links and descriptions', () => {
  it('renders updated project links and descriptions correctly', () => {
    render(
      <LanguageProvider>
        <ProjectsSection />
      </LanguageProvider>
    );

    // Verify MyLullaby link
    const myLullabyLink = screen.getByTitle('Launch MyLullaby live');
    expect(myLullabyLink).toHaveAttribute('href', 'https://my-lullaby.web.app/');

    // Verify KSP links
    const kspGithub = screen.getByTitle('View KSP Intelligence Copilot on GitHub');
    expect(kspGithub).toHaveAttribute('href', 'https://github.com/netxspider/KSPIC');
    const kspLive = screen.getByTitle('Launch KSP Intelligence Copilot live');
    expect(kspLive).toHaveAttribute('href', 'https://kspic-olrbvvkj.onslate.in/');

    // Verify Newift live link
    const newiftLive = screen.getByTitle('Launch Newift live');
    expect(newiftLive).toHaveAttribute('href', 'https://newift.netlify.app/');

    // Verify Sumit Sandhu (no github, live demo present)
    const sumitLive = screen.getByTitle('Launch Sumit Sandhu Portfolio live');
    expect(sumitLive).toHaveAttribute('href', 'https://sumit-sandhu.vercel.app/');

    // Verify LPU Auto-Connect (no github, web store live link present, authentic description)
    const lpuLive = screen.getByTitle('Launch LPU Auto-Connect v2.0 live');
    expect(lpuLive).toHaveAttribute(
      'href',
      'https://chromewebstore.google.com/detail/lpu-auto-connect/nnljoijkfchccmadobckkgcpnhbfbefl'
    );
    expect(screen.getByText(/Intelligent campus Wi-Fi productivity hub/i)).toBeInTheDocument();

    // Verify Daily Sage (play store live link present, authentic description)
    const dailySageLive = screen.getByTitle('Launch Daily Sage 🌿 live');
    expect(dailySageLive).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.netxspider.dailysage'
    );
    expect(screen.getByText(/Cross-platform React Native & Expo mobile mindfulness companion/i)).toBeInTheDocument();

    // Verify Swift Share (no live link, authentic description)
    expect(
      screen.getByText(/High-speed local Wi-Fi peer-to-peer file transfer utility/i)
    ).toBeInTheDocument();

    // Ensure Gau Seva, Voice Navigation, AirSync are completely removed
    expect(screen.queryByText(/Gau Seva Foundation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Voice Navigation App/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/AirSync Local/i)).not.toBeInTheDocument();
  });
});
