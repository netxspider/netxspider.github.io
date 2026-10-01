import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import HoverMaskReveal from './ui/HoverMaskReveal';
import { playHoverSound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

const easeCubic = [0.16, 1, 0.3, 1] as const;

const TICKER_ITEMS = [
  'ARNAV RAJ',
  'NETXSPIDER',
  'FULL STACK DEVELOPER',
  'DATA SCIENTIST',
  'WEB DESIGNER',
  'GENERATIVE AI & LLMs',
  'COMPUTER VISION',
  'DISTRIBUTED SYSTEMS',
  'MINIMALIST INTERFACE DESIGN',
  'NEURAL ARCHITECTURES',
  'SYSTEMS ONLINE',
];

const getFormattedDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ms = String(now.getMilliseconds()).padStart(3, '0');
  return `${year}.${month}.${day} // ${hours}:${minutes}:${seconds}:${ms}`;
};

const LiveSystemTime: React.FC = () => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animId: number;
    let lastTime = 0;
    const updateTime = (timestamp: number) => {
      if (timestamp - lastTime >= 100) {
        lastTime = timestamp;
        if (spanRef.current) {
          spanRef.current.textContent = getFormattedDateTime();
        }
      }
      animId = requestAnimationFrame(updateTime);
    };

    animId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <span ref={spanRef} className="text-neutral-200">{getFormattedDateTime()}</span>;
};

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  // Typewriter state for titles
  const titles = t.hero.roles;
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentFull = titles[titleIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && displayText === currentFull) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentFull.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Motion variants: Components animate from horizontal center to down when page loads
  const leftColumnVariants: Variants = {
    hidden: { opacity: 0, x: 50, y: -45 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        ease: easeCubic,
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const centerImageVariants: Variants = {
    hidden: { opacity: 0, y: -50, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: easeCubic,
        delay: 0.1,
      },
    },
  };

  const rightColumnVariants: Variants = {
    hidden: { opacity: 0, x: -50, y: -45 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        ease: easeCubic,
        staggerChildren: 0.1,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeCubic,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between w-full px-4 md:px-8 pt-24 pb-4 overflow-hidden bg-black text-white"
    >
      {/* Subtle ambient spotlight centered behind portrait */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="hero-spotlight w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[140px]" />
      </div>

      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main 3-Column Hero Grid: Full Screen Width (Matches exact controls right border) */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch my-auto pt-4 lg:pt-2">
        {/* =========================================================================
            LEFT COLUMN: ARNAV RAJ / NETXSPIDER + Description + Compact Buttons
            Animates from horizontal center to down on page load
            Placed on z-20 with min-w-0 & overflow-visible so text sits cleanly above
            the transparent background image without pushing the center image
            ========================================================================= */}
        <motion.div
          className="lg:col-span-4 min-w-0 flex flex-col justify-center space-y-6 order-2 lg:order-1 relative z-20 overflow-visible"
          variants={leftColumnVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              <span className="font-mono-tech text-[10px] tracking-wider uppercase text-neutral-300">
                {t.hero.sysOnline}
              </span>
            </div>
          </motion.div>

          {/* Typing & Retyping Main Title */}
          <motion.div variants={itemVariants} className="space-y-0.5 relative z-30">
            <p className="font-mono-tech text-[10px] tracking-widest text-neutral-400 uppercase">
              {t.hero.identityProtocol}
            </p>
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-none min-h-[1.15em] flex items-center whitespace-nowrap">
              <span>{displayText}</span>
              <span className="inline-block w-[2.5px] h-[0.85em] bg-white ml-1.5 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </h1>
          </motion.div>

          {/* Short 1-2 line description */}
          <motion.p
            variants={itemVariants}
            className="font-mono-tech text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm"
          >
            {t.hero.bio}
          </motion.p>

          {/* Quick Action CTAs */}
          <motion.div variants={itemVariants} className="flex items-center gap-2.5 pt-2">
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => playHoverSound()}
              className="px-4 py-2 bg-white text-black font-sans-clean text-xs font-semibold rounded-full hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-1.5 group cursor-pointer active:scale-95"
            >
              <span>{t.hero.exploreBtn}</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <button
              onClick={() => scrollToSection('connect')}
              onMouseEnter={() => playHoverSound()}
              className="px-4 py-2 bg-transparent border border-white/20 text-white font-sans-clean text-xs font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-200 cursor-pointer active:scale-95"
            >
              {t.hero.contactBtn}
            </button>
          </motion.div>
        </motion.div>

        {/* =========================================================================
            CENTER COLUMN: UNBOXED CENTRIC PORTRAIT + FLUID FUTURISTIC MASK REVEAL
            Placed at exact horizontal center (col-span-4 of 12 with min-w-0)
            ========================================================================= */}
        <motion.div
          className="lg:col-span-4 min-w-0 flex flex-col justify-center items-center order-1 lg:order-2 relative z-10 w-full"
          variants={centerImageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Centric Unboxed Image Container */}
          <div
            id="hero-image-area"
            data-no-cursor="true"
            className="relative mx-auto w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px] xl:max-w-[440px] aspect-[985/1024] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] flex justify-center items-center"
          >
            <HoverMaskReveal
              imageBase={{
                src: '/hero-person.png',
                alt: 'Arnav Raj',
              }}
              imageHover={{
                src: '/hero-mask.png',
                alt: 'Arnav Raj Cybernetic Mask',
              }}
              borderRadius="0px"
              radius={130}
              blur={0.5}
              circleBoost={0.85}
              texture={0.35}
              timeSpeed={5}
              splatRadius={0.12}
              velocityDissipation={0.98}
              shrinkTimeSeconds={1.4}
              curl={35}
              pressureIterations={25}
              parallax={true}
              parallaxAmount={20}
              parallaxSmoothing={0.1}
              className="w-full h-full bg-transparent hover-mask-reveal"
            />
          </div>
        </motion.div>

        {/* =========================================================================
            RIGHT COLUMN: Quote at Top & 3 Roles at Bottom
            ALL COMPONENTS ARE 100% FLUSH TO THE EXACT SAME RIGHT BORDER AS THE CONTROLS
            ========================================================================= */}
        <motion.div
          className="lg:col-span-4 min-w-0 flex flex-col justify-between items-end text-right h-full w-full order-3 space-y-8 lg:space-y-0 relative z-20"
          variants={rightColumnVariants}
          initial="hidden"
          animate="visible"
        >
          {/* TOP RIGHT: Philosophy Quote (Aligned to exact controls right border) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-end text-right space-y-1 w-full max-w-[280px]"
          >
            <span className="font-mono-tech text-[9px] tracking-widest text-neutral-400 uppercase text-right">
              {t.hero.philosophyTitle}
            </span>
            <blockquote className="font-serif-quote italic text-sm sm:text-base lg:text-lg text-neutral-200 leading-snug text-right">
              {t.hero.philosophyQuote}
            </blockquote>
          </motion.div>

          {/* BOTTOM RIGHT: The Three Roles (Aligned to exact same right border as the quote) */}
          <div className="flex flex-col items-end text-right space-y-4 sm:space-y-5 w-full mt-auto">
            {/* Role 1: Web Designer */}
            <motion.div variants={itemVariants} className="flex flex-col items-end text-right group cursor-default w-full">
              <span className="block font-mono-tech text-[9px] uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors text-right">
                {t.hero.role1Tag}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-neutral-300 transition-colors text-right">
                {t.hero.role1Title}
              </h3>
              <p className="font-mono-tech text-[11px] text-neutral-400 mt-0.5 text-right">
                {t.hero.role1Desc}
              </p>
            </motion.div>

            {/* Role 2: Full Stack Developer */}
            <motion.div variants={itemVariants} className="flex flex-col items-end text-right group cursor-default w-full">
              <span className="block font-mono-tech text-[9px] uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors text-right">
                {t.hero.role2Tag}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-neutral-300 transition-colors text-right">
                {t.hero.role2Title}
              </h3>
              <p className="font-mono-tech text-[11px] text-neutral-400 mt-0.5 text-right">
                {t.hero.role2Desc}
              </p>
            </motion.div>

            {/* Role 3: Data Scientist */}
            <motion.div variants={itemVariants} className="flex flex-col items-end text-right group cursor-default w-full">
              <span className="block font-mono-tech text-[9px] uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors text-right">
                {t.hero.role3Tag}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-neutral-300 transition-colors text-right">
                {t.hero.role3Title}
              </h3>
              <p className="font-mono-tech text-[11px] text-neutral-400 mt-0.5 text-right">
                {t.hero.role3Desc}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          HORIZONTAL ROW BELOW IMAGES:
          - Center: Standalone "Move to Reveal" component
          - Live Date & Time with Milliseconds: Flush to the exact same right border
          ========================================================================= */}
      <div className="relative z-10 w-full mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left balance spacer */}
        <div className="hidden lg:block lg:w-1/3" />

        {/* Standalone Move to Reveal in the exact center */}
        <div className="flex justify-center items-center sm:w-auto lg:w-1/3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm text-[10px] sm:text-[11px] font-mono-tech select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </span>
            <span className="tracking-widest uppercase text-white/90">{t.hero.revealHint}</span>
          </div>
        </div>

        {/* Live Date and Time with milliseconds on the same horizontal line, flush right with controls border */}
        <div className="flex justify-center sm:justify-end items-center sm:w-auto lg:w-1/3 text-center sm:text-right">
          <div className="flex items-center gap-2 font-mono-tech text-[10px] sm:text-[11px] text-neutral-400 tabular-nums tracking-wider select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
            <span className="text-white/40 uppercase">{t.hero.liveTime}</span>
            <LiveSystemTime />
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM MOVING TEXT BAND (INCREASED HEIGHT)
          ========================================================================= */}
      <div className="relative z-10 w-full overflow-hidden border-y border-white/[0.08] bg-white/[0.01] backdrop-blur-sm py-4 sm:py-5 mt-6 sm:mt-8 select-none">
        <motion.div
          className="flex items-center gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 28,
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-10 font-mono-tech text-xs sm:text-sm uppercase tracking-[0.28em] text-neutral-400"
            >
              <span className="hover:text-white transition-colors">{item}</span>
              <span className="text-white/20">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
