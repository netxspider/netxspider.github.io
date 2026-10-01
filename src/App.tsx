import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import LanguagesSection from './components/LanguagesSection';
import ProjectsSection from './components/ProjectsSection';
import GetInTouchSection from './components/GetInTouchSection';
import Footer from './components/Footer';
import TrailingCursor from './components/ui/TrailingCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import LoadingScreen from './components/ui/LoadingScreen';
import LikeHeartButton from './components/ui/LikeHeartButton';
import { LanguageProvider } from './context/LanguageContext';
import { initGlobalClickSound } from './utils/soundEffects';

function App() {
  useEffect(() => {
    const cleanup = initGlobalClickSound();
    return cleanup;
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black transition-colors duration-300">
        <LoadingScreen />
        <ScrollProgress />
        <TrailingCursor />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <LanguagesSection />
        <ProjectsSection />
        <GetInTouchSection />
        <Footer />
        <LikeHeartButton />
      </div>
    </LanguageProvider>
  );
}

export default App;
