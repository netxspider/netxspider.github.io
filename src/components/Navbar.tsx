import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playHoverSound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const { currentLanguage, setLanguage, languages, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [animStage, setAnimStage] = useState<'ball' | 'expanding' | 'ready'>('ball');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Utility Controls: Sound, Language, Theme
  const [isSoundOn, setIsSoundOn] = useState<boolean>(() => {
    return localStorage.getItem('sound_fx') === 'true';
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_theme') !== 'light';
  });
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);

  const navItems = [
    { name: t.nav.home, href: '#hero', id: 'home' },
    { name: t.nav.about, href: '#about', id: 'about' },
    { name: t.nav.stack, href: '#stack', id: 'stack' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: t.nav.connect, href: '#connect', id: 'connect' },
  ];

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navTrackRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const isManualNavRef = useRef(false);
  const manualNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize theme class on html document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { isDark: isDarkMode } }));
  }, [isDarkMode]);

  // Click outside to close language popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Web Audio Synthesizer for tactile feedback
  const playTactileAudio = (type: 'tick' | 'toggle' | 'switch') => {
    if (!isSoundOn && type !== 'toggle') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'tick') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'toggle') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isSoundOn ? 420 : 640, now);
        osc.frequency.exponentialRampToValueAtTime(isSoundOn ? 280 : 960, now + 0.07);
        gain.gain.setValueAtTime(0.38, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
        osc.start(now);
        osc.stop(now + 0.08);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.055);
        gain.gain.setValueAtTime(0.32, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.065);
      }
    } catch {
      // Graceful fallback if audio is unavailable
    }
  };

  const toggleSoundFx = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    localStorage.setItem('sound_fx', String(nextState));
    if (nextState) {
      setTimeout(() => playTactileAudio('toggle'), 10);
    }
  };

  const toggleTheme = () => {
    playTactileAudio('tick');
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    localStorage.setItem('portfolio_theme', nextTheme ? 'dark' : 'light');
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { isDark: nextTheme } }));
  };

  const selectLanguage = (code: any) => {
    playTactileAudio('tick');
    setLanguage(code);
    setIsLangMenuOpen(false);
  };

  // Play the ball-drop and navbar expansion sequence on mount
  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setAnimStage('expanding');
    }, 600);

    const readyTimer = setTimeout(() => {
      setAnimStage('ready');
      window.dispatchEvent(new CustomEvent('controls-visibility', { detail: { isVisible: true } }));
    }, 1000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(readyTimer);
      if (manualNavTimeoutRef.current) {
        clearTimeout(manualNavTimeoutRef.current);
      }
    };
  }, []);

  // Scroll direction detection: scrolling down transforms to ball, scrolling up transforms back to expanded form
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScrollDirection = () => {
      if (isManualNavRef.current) return;
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;
      const diff = currentScrollY - prevScrollY;

      // If near the top, stay expanded
      if (currentScrollY < 60) {
        setAnimStage('ready');
        window.dispatchEvent(new CustomEvent('controls-visibility', { detail: { isVisible: true } }));
      } else if (diff > 8 && currentScrollY > 80) {
        // Moving down -> transform into round ball
        setAnimStage('ball');
        setIsMobileMenuOpen(false);
        window.dispatchEvent(new CustomEvent('controls-visibility', { detail: { isVisible: false } }));
      } else if (diff < -6) {
        // Moving up -> transform back to expanded form
        setAnimStage('ready');
        window.dispatchEvent(new CustomEvent('controls-visibility', { detail: { isVisible: true } }));
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollDirection);
  }, []);

  // Passive scroll spy to highlight the current section in view
  useEffect(() => {
    const handleScroll = () => {
      if (isManualNavRef.current) return;

      const scrollPos = window.scrollY + 200;
      const sectionMap: { [key: string]: string } = {
        hero: 'home',
        about: 'about',
        stack: 'stack',
        projects: 'projects',
        connect: 'connect',
        contact: 'connect',
      };

      const ids = ['connect', 'projects', 'stack', 'about', 'hero'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionMap[id] || 'home');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string, href: string) => {
    playTactileAudio('tick');
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    isManualNavRef.current = true;
    if (manualNavTimeoutRef.current) {
      clearTimeout(manualNavTimeoutRef.current);
    }
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 1000);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId) || document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const handleResumeDownload = () => {
    playTactileAudio('tick');
    const link = document.createElement('a');
    link.href = '/ArnavRajCV.pdf';
    link.download = 'ArnavRajCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isExpanded = animStage !== 'ball';
  const isContentReady = animStage === 'ready';

  return (
    <nav className="fixed top-5 inset-x-0 z-50 flex flex-col items-center pointer-events-none px-4 md:px-8">
      {/* 
        ========================================================================
        CENTERED EXPANDING GLASSMORPHIC NAVBAR
        Contains:
          - netxspider (Left)
          - Home, About, Stack, Projects, Connect (Middle - Draggable & Clickable)
          - Resume (Right)
        ========================================================================
      */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          maxWidth: isExpanded ? 680 : 44,
          width: isExpanded ? '100%' : '44px',
        }}
        transition={{
          y: { type: 'spring', stiffness: 280, damping: 20, mass: 0.8 },
          opacity: { duration: 0.2 },
          maxWidth: { type: 'spring', stiffness: 200, damping: 24, mass: 0.85 },
          width: { type: 'spring', stiffness: 200, damping: 24, mass: 0.85 },
        }}
        className="pointer-events-auto relative h-[44px] rounded-full backdrop-blur-2xl bg-neutral-950/75 border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden flex items-center justify-between"
      >
        {/* Subtle glass specular highlight & lighting */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-full" />

        {/* Collapsed State: Interactive Pulse Dot inside the Round Ball */}
        {!isExpanded && (
          <button
            onClick={() => setAnimStage('ready')}
            onMouseEnter={() => playHoverSound()}
            aria-label="Expand navigation"
            title="Expand Navigation"
            className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform duration-200 shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-pulse" />
          </button>
        )}

        {/* Inner Navigation Content */}
        <motion.div
          animate={{
            opacity: isContentReady ? 1 : 0,
            scale: isContentReady ? 1 : 0.95,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`w-full flex items-center justify-between px-3 md:px-4 ${
            !isExpanded ? 'pointer-events-none invisible' : ''
          }`}
        >
          {/* Left: netxspider Logo */}
          <div className="flex items-center shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('home', '#hero');
              }}
              onMouseEnter={() => playHoverSound()}
              className="group flex items-center gap-2 cursor-pointer select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform duration-200 shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              <span className="text-xs md:text-sm font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                netxspider
              </span>
            </a>
          </div>

          {/* Middle: Home, About, Stack, Projects, Connect */}
          <div
            ref={navTrackRef}
            className="hidden md:flex items-center gap-0.5 px-1 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] select-none"
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href}
                  onMouseEnter={() => playHoverSound()}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(item.id, item.href);
                  }}
                  className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors duration-150 select-none cursor-pointer ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/[0.14] rounded-full border border-white/20 shadow-[0_1px_4px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                        mass: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right: Resume Button (Minimalist Black / White) */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              onClick={handleResumeDownload}
              onMouseEnter={() => playHoverSound()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-3 py-1 bg-white text-black text-xs font-semibold rounded-full hover:bg-neutral-200 transition-all duration-150 flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,255,255,0.15)] cursor-pointer select-none"
            >
              <span>{t.nav.resume}</span>
              <svg
                className="w-3 h-3 transition-transform duration-150 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v11m0 0l-3-3m3 3l3-3M4 19h16"
                />
              </svg>
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onMouseEnter={() => playHoverSound()}
              aria-label="Toggle Navigation Menu"
              className="md:hidden flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white bg-white/5 border border-white/10 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* 
        ========================================================================
        OUTSIDE UTILITY CONTROLS (Positioned at the Right End of the Header)
        Contains:
          - Sound Effects Toggle (Tick/Haptic Audio)
          - Global Language Selector (Interactive Dropdown)
          - Dark / Light Mode Toggle
        Matches the exact glassmorphic design and 44px pill height of the navbar.
        ========================================================================
      */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{
          y: isContentReady ? 0 : -40,
          opacity: isContentReady ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`hidden md:flex absolute right-4 md:right-8 top-0 h-[44px] rounded-full backdrop-blur-2xl bg-neutral-950/75 border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)] px-2 items-center gap-1 ${
          isContentReady ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Specular lighting */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-full" />

        {/* 1. Sound Effects Toggle */}
        <button
          onClick={toggleSoundFx}
          onMouseEnter={() => playHoverSound()}
          aria-label={isSoundOn ? 'Turn sound effects off' : 'Turn sound effects on'}
          title={isSoundOn ? 'Sound Effects: On' : 'Sound Effects: Off'}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 ${
            isSoundOn
              ? 'text-white bg-white/10 shadow-[0_0_8px_rgba(255,255,255,0.15)]'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          {isSoundOn ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-1.5l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          )}
        </button>

        {/* 2. Global Languages Selector */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => {
              playTactileAudio('tick');
              setIsLangMenuOpen(!isLangMenuOpen);
            }}
            onMouseEnter={() => playHoverSound()}
            aria-label={t.nav.langTitle}
            title={`${t.nav.langTitle}: ${currentLanguage}`}
            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 000 18M12 3a14.5 14.5 0 010 18" />
            </svg>
          </button>

          {/* Glassmorphic Language Popover */}
          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.94 }}
                transition={{ duration: 0.14, ease: 'easeOut' }}
                className={`absolute right-0 top-full mt-2 w-40 rounded-xl backdrop-blur-2xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 border transition-colors ${
                  isDarkMode
                    ? 'bg-neutral-950/95 border-white/15 text-neutral-300'
                    : 'bg-white/95 border-neutral-200 text-neutral-800 shadow-[0_12px_40px_rgba(0,0,0,0.12)]'
                }`}
              >
                {languages.map((lang) => {
                  const isSelected = currentLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      onMouseEnter={() => playHoverSound()}
                      className={`w-full px-2.5 py-1.5 text-xs font-medium rounded-lg text-left transition-colors flex items-center justify-between ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-white/10 text-white font-semibold'
                            : 'bg-black/10 text-black font-semibold'
                          : isDarkMode
                          ? 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                          : 'text-neutral-600 hover:text-black hover:bg-black/[0.05]'
                      }`}
                    >
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className={`text-[10px] font-mono-tech ${isDarkMode ? 'text-white/50' : 'text-neutral-400'}`}>
                        {lang.code}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          onMouseEnter={() => playHoverSound()}
          aria-label={isDarkMode ? t.nav.themeLight : t.nav.themeDark}
          title={isDarkMode ? t.nav.themeDark : t.nav.themeLight}
          className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
        >
          {isDarkMode ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
              />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Mobile Drawer (with navigation items + mobile utility bar) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`pointer-events-auto md:hidden mt-2 w-[92vw] max-w-[340px] rounded-2xl backdrop-blur-2xl p-2.5 shadow-2xl flex flex-col gap-1.5 border transition-colors ${
              isDarkMode
                ? 'bg-neutral-950/90 border-white/15'
                : 'bg-white/95 border-neutral-200 shadow-[0_16px_48px_rgba(0,0,0,0.12)]'
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => playHoverSound()}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(item.id, item.href);
                  }}
                  className={`px-3 py-2 text-xs font-medium rounded-xl transition-colors duration-150 flex items-center justify-between ${
                    isActive
                      ? isDarkMode
                        ? 'bg-white/10 text-white font-semibold'
                        : 'bg-black/10 text-black font-semibold'
                      : isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                      : 'text-neutral-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isDarkMode
                          ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                          : 'bg-black shadow-[0_0_6px_rgba(0,0,0,0.4)]'
                      }`}
                    />
                  )}
                </a>
              );
            })}

            {/* Mobile Language Selector */}
            <div className="pt-2 border-t border-white/10 px-1">
              <div className="text-[10px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-1.5 px-1">
                {t.nav.langTitle}
              </div>
              <div className="grid grid-cols-4 gap-1">
                {languages.map((lang) => {
                  const isSelected = currentLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      onMouseEnter={() => playHoverSound()}
                      className={`px-2 py-1.5 text-xs font-mono-tech rounded-lg text-center transition-colors ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'bg-black text-white font-bold shadow-sm'
                          : isDarkMode
                          ? 'bg-white/5 text-neutral-400 hover:text-white'
                          : 'bg-black/5 text-neutral-600 hover:text-black'
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Utility Controls Row */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-around px-2">
              <button
                onClick={toggleSoundFx}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white py-1 px-2 rounded-lg"
              >
                <span>{isSoundOn ? `🔊 ${t.nav.soundOn}` : `🔇 ${t.nav.soundOff}`}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white py-1 px-2 rounded-lg"
              >
                <span>{isDarkMode ? '🌙 Dark' : '☀️ Light'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
