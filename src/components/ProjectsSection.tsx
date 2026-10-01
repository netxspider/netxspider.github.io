import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import FlipCard from './ui/FlipCard';
import LineSidebar from './ui/LineSidebar';
import ScrollBlurFade from './ui/ScrollBlurFade';
import { playSlideSound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: 'AI & Systems' | 'Full Stack' | 'Mobile & Tools';
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  highlights?: string[];
}

const projects: Project[] = [
  {
    id: '01',
    name: 'MyLullaby',
    subtitle: 'AI Sleep Companion & Face-to-Face Therapy',
    tagline: 'Generative Sleep Stories & Multimodal AI Avatar Sessions',
    description:
      'A holistic emotional wellness platform featuring generative bedtime stories powered by Gemini 2.5 + Google Cloud TTS, and real-time interactive video therapy with Tavus avatars across 15+ languages.',
    category: 'AI & Systems',
    technologies: ['React 19', 'Gemini 2.5', 'Tavus API', 'GCP TTS', 'Firebase', 'Tailwind CSS', 'Razorpay'],
    image: '/projects/1.png',
    githubUrl: 'https://github.com/netxspider/MyLullaby',
    liveUrl: 'https://my-lullaby.web.app/',
    highlights: [
      'Infinite dynamic bedtime story generation tuned to mood and listener preferences',
      'Face-to-face video therapy using Tavus interactive avatars with 15+ language support',
      'Context-aware memory toggle for Luna assistant ensuring absolute user privacy',
      'Tiered subscription economy with automated token refreshing via Razorpay',
    ],
  },
  {
    id: '02',
    name: 'KSP Intelligence Copilot',
    subtitle: 'Karnataka State Police Investigation Assistant',
    tagline: 'Evidence-Grounded Intelligence for Modern Investigations',
    description:
      'Local-first investigative copilot for Karnataka State Police with 5,000 relational FIR records, safe deterministic SQL search, SQLite FTS5 RAG retrieval, relationship graphs, and Amazon Bedrock Nova Lite synthesis.',
    category: 'AI & Systems',
    technologies: ['Next.js', 'Python', 'FastAPI', 'SQLite FTS5', 'Amazon Bedrock', 'Qdrant', 'Leaflet'],
    image: '/projects/2.png',
    githubUrl: 'https://github.com/netxspider/KSPIC',
    liveUrl: 'https://kspic-olrbvvkj.onslate.in/',
    highlights: [
      'Deterministic SQL search over 5,000 relational FIR records with zero hallucinated queries',
      'Hybrid RAG using SQLite FTS5 with optional Qdrant vector retrieval for evidence briefs',
      'Interactive incident mapping and knowledge graph traversal across accused, vehicles & FIRs',
      'Strict audit-ready evidentiary reasoning with verifiable confidence scores',
    ],
  },
  {
    id: '03',
    name: 'POLARIS',
    subtitle: 'AI-Enabled Antarctic Sea-Ice & Navigation System',
    tagline: '3D Navigation Corridor & Tabular Iceberg Trajectory Forecasting',
    description:
      'Prototype for Smart India Hackathon (SIH 2026) with MoES / NCPOR. Lat/lon-accurate 3D Antarctic navigation corridor predicting sea-ice risk via CNN segmentation, tabular iceberg trajectories via LSTM + Coriolis mechanics, and dynamic A* vessel routing.',
    category: 'AI & Systems',
    technologies: ['CesiumJS', 'React', 'Python', 'FastAPI', 'PyTorch CNN', 'LSTM Drift', 'Dynamic A*'],
    image: '/projects/3.png',
    githubUrl: 'https://github.com/netxspider/POLARIS',
    liveUrl: '',
    highlights: [
      'Lat/lon-accurate 3D globe with CesiumJS rendering bathymetry and sea-ice risk overlays',
      'PyTorch CNN segmentation predicting sea-ice concentration from microwave satellite feeds',
      'LSTM + momentum ODE model forecasting tabular iceberg drift with Coriolis forces',
      'Dynamic A* pathfinder computing fuel-efficient routes between Maitri and Bharati stations',
    ],
  },
  {
    id: '04',
    name: 'Newift',
    subtitle: 'Real-Time Viral Trends & Breaking News Hub',
    tagline: "What's Trending Now, Delivered Swift",
    description:
      'High-velocity real-time editorial platform delivering breaking updates, tech insights, and viral pop culture moments with high-frequency live feeds, dark editorial typography, and instant curation.',
    category: 'Full Stack',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WebSockets', 'Vercel'],
    image: '/projects/4.png',
    githubUrl: 'https://github.com/netxspider/newift',
    liveUrl: 'https://newift.netlify.app/',
    highlights: [
      'Instant real-time story streaming with low-latency WebSocket news broadcasting',
      'Editorial minimalist dark aesthetic with high-readability responsive typography',
      'Tag-based filtering for viral trends, technology releases, and world events',
      'SEO-optimized static page generation with on-demand incremental cache revalidation',
    ],
  },
  {
    id: '05',
    name: 'Sumit Sandhu Portfolio',
    subtitle: 'Luxury Brand & Graphic Design Showcase',
    tagline: 'Crafting Visual Stories That Resonate',
    description:
      'Bespoke digital portfolio engineered for high-end graphic and identity design, featuring fluid GSAP scroll interactions, dark gold aesthetic tokens, and interactive project galleries.',
    category: 'Full Stack',
    technologies: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Vite'],
    image: '/projects/5.png',
    githubUrl: '',
    liveUrl: 'https://sumit-sandhu.vercel.app/',
    highlights: [
      'Cinematic dark gold luxury aesthetic tailored for high-end brand presentations',
      'Fluid GSAP-driven scroll pinning, parallax elements, and micro-interactions',
      'Interactive showcase of OTT platform branding, cafe identity design, and typography',
      'Fully responsive, hardware-accelerated smooth transitions across all viewports',
    ],
  },
  {
    id: '06',
    name: 'Thread Simulator',
    subtitle: 'Real-Time OS Visualization & Scheduling Engine',
    tagline: 'Interactive Multi-threaded Application Simulator',
    description:
      'Client-side interactive dashboard simulating OS-level multithreading, CPU scheduling algorithms (FCFS, SJF, Round Robin, SRTF, Priority), user-to-kernel thread models, and real-time SVG Gantt timelines.',
    category: 'AI & Systems',
    technologies: ['React 19', 'Vite', 'Tailwind v4', 'Zustand 5', 'Recharts', 'SVG Animation'],
    image: '/projects/6.png',
    githubUrl: 'https://github.com/netxspider/Real-Time-Multi-threaded-Application-Simulator',
    liveUrl: '',
    highlights: [
      'Tick-based deterministic scheduler engine driving virtual thread state machines',
      '5 scheduling algorithms: FCFS, SJF, Round Robin, SRTF, and Preemptive Priority',
      'Thread Mapper visualizing User Thread → Kernel Thread → CPU connections in live SVG',
      'Real-time Gantt timeline, CPU utilization charts, and complete post-run metrics audit',
    ],
  },
  {
    id: '07',
    name: 'LPU Auto-Connect v2.0',
    subtitle: 'Chrome Extension & Student Productivity Hub',
    tagline: 'Automated WiFi Captive Portal Auth & University Suite',
    description:
      'Intelligent campus Wi-Fi productivity hub featuring automated captive portal authentication with OCR captcha solving, one-click SSO login for university portals (UMS, MyClass, OAS), real-time Wi-Fi latency health tests, and background keep-alive.',
    category: 'Mobile & Tools',
    technologies: ['Chrome Manifest V3', 'TypeScript', 'Tesseract OCR', 'Tailwind CSS', 'Chrome APIs'],
    image: '/projects/7.png',
    githubUrl: '',
    liveUrl: 'https://chromewebstore.google.com/detail/lpu-auto-connect/nnljoijkfchccmadobckkgcpnhbfbefl',
    highlights: [
      'Automated background captive portal login with integrated Captcha OCR solving',
      'One-click credential auto-fill for UMS, MyClass, LPULive, OAS, and NeoBrowser',
      'Real-time Wi-Fi bandwidth tracking, latency tests, and network health score',
      'Custom proxy / VPN tunneling and secure DNS bypassing for unrestricted access',
    ],
  },
  {
    id: '08',
    name: 'Daily Sage 🌿',
    subtitle: 'Offline Mindfulness & Reflection App',
    tagline: 'Daily Mindfulness. One Breath at a Time.',
    description:
      'Cross-platform React Native & Expo mobile mindfulness companion featuring guided 4-7-8 breathing exercises with soothing animations, an encrypted offline-first personal reflection diary with mood tracking, curated daily affirmations, and smart local scheduled notifications.',
    category: 'Mobile & Tools',
    technologies: ['React Native', 'Expo SDK 54', 'TypeScript', 'Zustand', 'AsyncStorage'],
    image: '/projects/8.png',
    githubUrl: 'https://github.com/netxspider/Daily-Sage',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.netxspider.dailysage',
    highlights: [
      'Interactive 4-7-8 guided breathwork module with soothing pacing animations',
      'Encrypted offline-first personal reflection diary and daily mood trend logging',
      '3x daily smart scheduled notifications via native Android Notification Channels',
      'Zero external server tracking with 100% privacy-first local device persistence',
    ],
  },
  {
    id: '09',
    name: 'Swift Share',
    subtitle: 'Local Wireless File Transfer & Sync Utility',
    tagline: 'Fast, Secure Wireless File Sync on Local Wi-Fi',
    description:
      'High-speed local Wi-Fi peer-to-peer file transfer utility enabling direct wireless browsing, media streaming, and high-throughput multi-file downloads between Android devices and desktop web browsers without internet access, third-party cables, or cloud dependencies.',
    category: 'Mobile & Tools',
    technologies: ['Android', 'Kotlin', 'Embedded HTTP Server', 'WebSockets', 'React Web UI'],
    image: '/projects/9.png',
    githubUrl: 'https://github.com/netxspider/Swift-Share',
    liveUrl: '',
    highlights: [
      'Zero-cloud local Wi-Fi file sync eliminating cables and third-party servers',
      'Embedded high-throughput HTTP/WebSocket daemon running directly on Android',
      'Browser client supporting media streaming, bulk downloads, and file previews',
      'Optional PIN passcode protection and custom server port configuration',
    ],
  },
];

type CategoryFilter = 'All' | 'AI & Systems' | 'Full Stack' | 'Mobile & Tools';

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardDims, setCardDims] = useState({ width: 580, height: 362 });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return !document.documentElement.classList.contains('light');
  });

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isDark === 'boolean') {
        setIsDarkMode(customEvent.detail.isDark);
      } else {
        setIsDarkMode(!document.documentElement.classList.contains('light'));
      }
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const filterItems = t.projects.filters;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const activeFilterIndex =
    activeCategory === 'All'
      ? 0
      : activeCategory === 'AI & Systems'
      ? 1
      : activeCategory === 'Full Stack'
      ? 2
      : 3;

  // Dynamic card dimensions calculation for 16:10 aspect ratio on desktop, portrait on mobile
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let targetWidth = 580;
      let targetHeight = 362;
      if (w < 640) {
        targetWidth = Math.min(w - 32, 340);
        // Portrait proportion for mobile so all back card content fits comfortably
        targetHeight = Math.min(Math.max(420, h - 220), 470);
      } else if (w < 1024) {
        targetWidth = Math.min(w - 48, 460);
        targetHeight = Math.min(Math.round(targetWidth * 0.75), 430);
      } else if (w < 1440) {
        targetWidth = 560;
        targetHeight = Math.round(targetWidth * 0.625);
      } else {
        targetWidth = 620;
        targetHeight = Math.round(targetWidth * 0.625);
      }
      setCardDims({
        width: targetWidth,
        height: targetHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Framer Motion vertical-to-horizontal scroll binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate pixel translation based on track and viewport widths
  useEffect(() => {
    const updateTranslate = () => {
      if (trackRef.current && viewportRef.current) {
        const scrollWidth = trackRef.current.scrollWidth;
        const clientWidth = viewportRef.current.clientWidth;
        const diff = Math.max(0, scrollWidth - clientWidth + 60);
        setMaxTranslate(diff);
      }
    };

    updateTranslate();
    window.addEventListener('resize', updateTranslate);
    const timer = setTimeout(updateTranslate, 300);
    return () => {
      window.removeEventListener('resize', updateTranslate);
      clearTimeout(timer);
    };
  }, [filteredProjects, activeCategory, cardDims]);

  // Transform scroll progress to negative X translation
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  // Keep track of current project index based on scroll position
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const count = filteredProjects.length;
    if (count <= 1) {
      setCurrentIndex(0);
      return;
    }
    const idx = Math.min(count - 1, Math.floor(latest * count + 0.05));
    if (idx !== currentIndex) {
      playSlideSound();
      setCurrentIndex(idx);
    }
  });

  // Manual smooth scroll navigation for arrow buttons
  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;

    const count = filteredProjects.length;
    const clampedIndex = Math.max(0, Math.min(count - 1, index));
    const progress = count > 1 ? clampedIndex / (count - 1) : 0;
    const targetScroll = containerTop + progress * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    playSlideSound();
    scrollToIndex(currentIndex - 1);
  };
  const handleNext = () => {
    playSlideSound();
    scrollToIndex(currentIndex + 1);
  };

  const handleFilterClick = (index: number) => {
    playSlideSound();
    const categories: CategoryFilter[] = ['All', 'AI & Systems', 'Full Stack', 'Mobile & Tools'];
    setActiveCategory(categories[index] || 'All');
    scrollToIndex(0);
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-black text-white"
      style={{
        // Dedicated scroll height so user smoothly experiences every project card
        height: `${Math.max(220, filteredProjects.length * 60)}vh`,
      }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden border-t border-white/10 bg-black pt-4 sm:pt-8 md:pt-10 pb-2 sm:pb-4">
        {/* Subtle architectural background grid & ambient light */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        {/* Section Header Heading: Same alignment as 01. About Me, 02. Tech Stack, 04. Connect */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-4 md:px-8 flex-shrink-0 mb-3 sm:mb-8 md:mb-12 pb-1 sm:pb-2">
          <ScrollBlurFade direction="up" distance={30} blur={10}>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              <h2 className="font-display text-2xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-none">
                {t.projects.heading}
              </h2>
              <span className="h-px bg-white/10 flex-1 ml-4" />
            </div>
          </ScrollBlurFade>
        </div>

        {/* Mobile / Tablet Compact Control Bar */}
        <div className="lg:hidden relative z-30 w-full px-4 sm:px-8 mb-2 sm:mb-3 flex-shrink-0">
          <div className="flex items-center justify-between gap-2 bg-neutral-950/70 backdrop-blur-xl border border-white/15 p-2 rounded-2xl">
            {/* Horizontal Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-[65%] sm:max-w-[75%]">
              {filterItems.map((item, idx) => {
                const isActive = activeFilterIndex === idx;
                return (
                  <button
                    key={item}
                    onClick={() => handleFilterClick(idx)}
                    className={`cursor-target flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider transition-all ${
                      isActive
                        ? isDarkMode
                          ? 'bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                          : 'bg-black text-white font-bold'
                        : isDarkMode
                        ? 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                        : 'bg-black/5 border border-black/10 text-neutral-600 hover:text-black'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Quick Index & Arrows */}
            <div className="flex items-center gap-1.5 flex-shrink-0 pl-1 border-l border-white/10">
              <div className="font-mono-tech text-[10px] sm:text-[11px] text-neutral-400">
                <span className="text-white font-bold">
                  {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1}
                </span>
                <span className="text-neutral-500">/</span>
                <span>
                  {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="cursor-target w-6 h-6 rounded-md border border-white/15 bg-white/5 disabled:opacity-20 text-white flex items-center justify-center active:scale-95"
                  aria-label="Previous project"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= filteredProjects.length - 1}
                  className="cursor-target w-6 h-6 rounded-md border border-white/15 bg-white/5 disabled:opacity-20 text-white flex items-center justify-center active:scale-95"
                  aria-label="Next project"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area: Left Filter Sidebar + Right Horizontal Project Cards */}
        <div className="relative z-20 flex-1 w-full flex flex-col lg:flex-row items-stretch overflow-hidden min-h-0">
          {/* LEFT PANEL: Glassmorphic sidebar with description, LineSidebar filter & navigation (Desktop Only) */}
          <div className="relative w-full lg:w-[380px] xl:w-[440px] flex-shrink-0 z-20 hidden lg:flex flex-col justify-between p-5 sm:p-7 lg:p-10 lg:h-full lg:border-r border-white/15 bg-neutral-950/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Subtle frosted glass sheen & ambient radial gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-white/[0.02] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

            {/* Top: Description & Filter */}
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                {t.projects.subheading}
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-mono-tech text-neutral-400 leading-relaxed">
                {t.projects.description}
              </p>

            {/* Filter Navigation via React Bits LineSidebar (Black and White Theme) */}
            <div className="mt-6 sm:mt-8">
              <div className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest mb-3">
                {t.projects.filterLabel}
              </div>
              <LineSidebar
                items={filterItems}
                accentColor={isDarkMode ? '#ffffff' : '#09090b'}
                textColor={isDarkMode ? '#777777' : '#71717a'}
                markerColor={isDarkMode ? '#383838' : '#a1a1aa'}
                showIndex={true}
                showMarker={true}
                proximityRadius={90}
                maxShift={18}
                falloff="smooth"
                markerLength={38}
                markerGap={10}
                tickScale={0.5}
                scaleTick={true}
                itemGap={18}
                fontSize={0.92}
                smoothing={100}
                activeItem={activeFilterIndex}
                onItemClick={handleFilterClick}
                className="w-full"
              />
            </div>
          </div>

          {/* Bottom: Interactive Navigation & Current Project Index Indicator */}
          <div className="relative z-10 hidden lg:block pt-6 border-t border-white/10 mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono-tech text-xs tracking-wider text-neutral-400">
                {t.projects.indexLabel} {'//'}{' '}
                <span className="text-white font-bold">
                  {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1}
                </span>{' '}
                OF 0{filteredProjects.length}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="cursor-target w-8 h-8 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 text-white flex items-center justify-center transition-all"
                  aria-label="Previous project"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= filteredProjects.length - 1}
                  className="cursor-target w-8 h-8 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 text-white flex items-center justify-center transition-all"
                  aria-label="Next project"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Smooth Progress Bar */}
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300 ease-out"
                style={{
                  width: `${((currentIndex + 1) / filteredProjects.length) * 100}%`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono-tech text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{t.projects.scrollHint}</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Horizontal scrolling track of FlipCards */}
        <div
          ref={viewportRef}
          className="flex-1 h-full w-full flex items-center overflow-hidden relative pl-4 sm:pl-8 lg:pl-10"
        >
          {/* Edge gradient masks */}
          <div className="edge-mask-left hidden lg:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="edge-mask-right absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Animated Horizontal Track */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-center gap-6 sm:gap-8 lg:gap-10 pr-16 sm:pr-24 lg:pr-32 py-8"
          >
            {filteredProjects.map((project) => {
              const projectTrans = t.projects.items.find(
                (item) => item.id === parseInt(project.id, 10)
              );
              const categoryText = projectTrans?.category || project.category;
              const titleText = projectTrans?.title || project.name;
              const taglineText = projectTrans?.role || project.tagline || project.subtitle;
              const descText = projectTrans?.description || project.description;

              return (
              <div key={project.id} className="flex-shrink-0 cursor-target">
                <FlipCard
                  width={cardDims.width}
                  height={cardDims.height}
                  radius={20}
                  axis="y"
                  flipOnClick={true}
                  draggable={true}
                  tilt={true}
                  tiltMax={10}
                  glare={true}
                  glareOpacity={0.18}
                  hoverScale={1.03}
                  perspective={1200}
                  stiffness={180}
                  damping={22}
                  background="#0a0a0a"
                  color="#ffffff"
                  shadow={true}
                  shadowColor="#000000"
                  shadowOpacity={0.6}
                  ariaLabel={`Project ${titleText}`}
                  /* FRONT FACE: Absolute pure poster without any overlays or text. Black & White by default, Original color on hover */
                  front={
                    <div className="relative w-full h-full overflow-hidden rounded-[20px] bg-neutral-950 group">
                      <img
                        src={project.image}
                        alt={titleText}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-all duration-700 ease-out grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
                      />
                    </div>
                  }
                  /* BACK FACE: Detailed specification, tags, highlights & interactive GitHub / Live Demo links */
                  back={
                    <div className="relative w-full h-full rounded-[20px] bg-neutral-950/95 border border-white/20 p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-y-auto backdrop-blur-xl">
                      {/* Top Header */}
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-1.5 sm:mb-2">
                          <span className="font-mono-tech text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                            {categoryText}
                          </span>
                          <span className="font-mono-tech text-[9px] sm:text-[10px] text-neutral-400">
                            {t.projects.flipHint} ↩
                          </span>
                        </div>

                        <h4 className="font-display text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                          {titleText}
                        </h4>

                        <p className="font-mono-tech text-[11px] sm:text-xs text-neutral-300 mt-1 line-clamp-1">
                          {taglineText}
                        </p>

                        <p className="font-mono-tech text-[11px] sm:text-sm text-neutral-300 leading-relaxed mt-2 sm:mt-3 line-clamp-3 sm:line-clamp-4">
                          {descText}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-3 sm:mt-4">
                          {project.technologies.slice(0, 6).map((tech) => (
                            <span
                              key={tech}
                              className="font-mono-tech text-[9px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/5 border border-white/10 text-neutral-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Links */}
                      <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                        {/* GitHub Button */}
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] sm:text-xs font-mono-tech text-white transition-all duration-200 group/btn cursor-pointer relative z-20"
                            title={`View ${project.name} on GitHub`}
                          >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-300 group-hover/btn:text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              />
                            </svg>
                            <span>{t.projects.sourceCode}</span>
                          </a>
                        ) : (
                          <div
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono-tech text-neutral-500 cursor-default select-none relative z-20"
                            title="Repository is private"
                          >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              />
                            </svg>
                            <span>Private Code</span>
                          </div>
                        )}

                        {/* Live Demo Button */}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 border border-white text-xs font-mono-tech font-bold text-black transition-all duration-200 shadow-[0_0_12px_rgba(255,255,255,0.25)] group/live cursor-pointer relative z-20"
                            title={`Launch ${project.name} live`}
                          >
                            <span>{t.projects.liveDemo}</span>
                            <svg
                              className="w-3.5 h-3.5 transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        ) : (
                          <div
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tech text-neutral-500 cursor-default select-none relative z-20"
                            title="Live demo not available"
                          >
                            <span>Offline / Local</span>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                />
              </div>
            );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);
};

export default ProjectsSection;
