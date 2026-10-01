import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const LoadingScreen: React.FC = () => {
  const {
    isLoading,
    isLanguageSwitching,
    loadingProgress,
    loadingStatusText,
    currentLanguage,
    languages,
  } = useLanguage();

  const activeLangObj = languages.find((l) => l.code === currentLanguage);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: 'blur(10px)',
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999999] flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden bg-black text-white"
        >
          {/* Subtle Ambient Background Grid & Radial Spotlight */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[160px] pointer-events-none" />

          {/* Top Bar: System ID & Status */}
          <div className="relative z-10 w-full max-w-4xl flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_#ffffff]" />
              <span className="font-mono-tech text-xs tracking-widest text-neutral-300 uppercase">
                {isLanguageSwitching
                  ? `LOCALE // RECONFIGURING [${currentLanguage}]`
                  : 'NETXSPIDER // SYSTEM BOOT'}
              </span>
            </div>

            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono-tech text-neutral-300">
              <span className="text-neutral-500 mr-1.5">LOCALE:</span>
              <span className="text-white font-semibold">
                {activeLangObj ? `${activeLangObj.nativeName} [${activeLangObj.code}]` : currentLanguage}
              </span>
            </div>
          </div>

          {/* Center Stage: Futuristic Rotating Rings + Big Numerical Gauge */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-md">
            {/* Concentric Rotating Cyber Rigs */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-8">
              {/* Outer dashed spinning ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin"
                style={{ animationDuration: '24s' }}
              />

              {/* Middle reverse counter-rotating segmented ring */}
              <div
                className="absolute inset-2.5 rounded-full border border-white/10 border-t-white/50 border-r-transparent animate-spin"
                style={{ animationDuration: '10s', animationDirection: 'reverse' }}
              />

              {/* Inner glowing pulse ring */}
              <div className="absolute inset-6 rounded-full border border-white/15 bg-white/[0.02] shadow-[inset_0_0_20px_rgba(255,255,255,0.06)]" />

              {/* Center Counter */}
              <div className="flex flex-col items-center justify-center relative z-20">
                <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  {loadingProgress < 10 ? `0${loadingProgress}` : loadingProgress}%
                </span>
                <span className="font-mono-tech text-[10px] tracking-widest text-neutral-400 uppercase mt-1">
                  {isLanguageSwitching ? 'TRANSFORMATION' : 'CALIBRATING'}
                </span>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full max-w-xs sm:max-w-sm h-1 bg-white/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-white shadow-[0_0_12px_#ffffff,0_0_24px_rgba(255,255,255,0.7)] relative"
                style={{ width: `${loadingProgress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              >
                {/* Glowing bead on front tip */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              </motion.div>
            </div>

            {/* Terminal Status Text with Animated Blinking Cursor */}
            <div className="min-h-[24px] flex items-center justify-center px-4 text-center">
              <p className="font-mono-tech text-xs text-neutral-300 tracking-wide inline-flex items-center gap-1.5 truncate max-w-sm">
                <span>{loadingStatusText || 'SYNCHRONIZING SYSTEM DATA...'}</span>
                <span className="inline-block w-1.5 h-3.5 bg-white animate-pulse" />
              </p>
            </div>
          </div>

          {/* Bottom Bar: Available Target Language Badges */}
          <div className="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-t border-white/10 pt-4">
            <div className="text-[11px] font-mono-tech text-neutral-500">
              ARNAV RAJ // PERSONALIZED PORTFOLIO INTERACTION
            </div>

            <div className="flex items-center gap-2">
              {languages.map((lang) => {
                const isActive = lang.code === currentLanguage;
                return (
                  <div
                    key={lang.code}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono-tech transition-all flex items-center gap-1 ${
                      isActive
                        ? 'bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                        : 'bg-white/5 text-neutral-400 border border-white/10'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="opacity-60 text-[9px]">[{lang.code}]</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
