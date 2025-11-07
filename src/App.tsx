import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GoogleGeminiEffectSection from './components/GoogleGeminiEffectSection';
import ProjectsSection from './components/ProjectsSection';
import LanguagesSection from './components/LanguagesSection';
import AchievementsSection from './components/AchievementsSection';
import GitHubStatsSection from './components/GitHubStatsSection';
import GallerySection from './components/GallerySection';
import GetInTouchSection from './components/GetInTouchSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <GoogleGeminiEffectSection />
      <ProjectsSection />
      <LanguagesSection />
      <AchievementsSection />
      <GitHubStatsSection />
      <GallerySection />
      <GetInTouchSection />
      <Footer />
    </div>
  );
}

export default App;
