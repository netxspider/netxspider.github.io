import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lanyard from './ui/Lanyard';
import ScrollBlurFade from './ui/ScrollBlurFade';
import ParallaxMotion from './ui/ParallaxMotion';
import { playHoverSound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative min-h-screen bg-black text-white py-20 md:py-28 px-4 md:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Subtle ambient architectural background grid & monochrome glow with parallax */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <ParallaxMotion offset={50} className="absolute top-1/4 -left-32 pointer-events-none">
        <div className="w-96 h-96 bg-white/[0.025] rounded-full blur-[140px]" />
      </ParallaxMotion>
      <ParallaxMotion offset={-50} className="absolute bottom-1/4 -right-32 pointer-events-none">
        <div className="w-96 h-96 bg-white/[0.025] rounded-full blur-[140px]" />
      </ParallaxMotion>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Header Heading: Animated Blur Fade-In */}
        <ScrollBlurFade direction="up" distance={30} blur={10}>
          <div className="flex items-center gap-3 sm:gap-4 mb-10 md:mb-14">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-none">
              {t.about.heading}
            </h2>
            <span className="h-px bg-white/10 flex-1 ml-4" />
          </div>
        </ScrollBlurFade>

        {/* Two-Column Layout: Left = ID Card (compact box), Right = Textual Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT SIDE: ID Card Component (Sliding in smoothly from left with blur fade) */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center w-full">
            <ScrollBlurFade direction="right" distance={40} delay={0.1} className="w-full flex justify-center">
              <div
                id="id-card-area"
                data-no-cursor="true"
                className="w-full max-w-sm sm:max-w-md h-[400px] sm:h-[520px] lg:h-[620px] relative rounded-2xl border border-white/15 bg-neutral-950/60 backdrop-blur-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Interactive Badge Hint in the top bar */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] font-mono-tech text-neutral-400 tracking-wider">
                    {t.about.idBadge}
                  </span>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono-tech text-neutral-200 tracking-wider backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                    <span>{t.about.dragBadge}</span>
                  </div>
                </div>

                {/* The 3D Lanyard Component - Enlarged via camera distance and cardScale */}
                <div className="w-full h-full flex items-center justify-center">
                  <Lanyard
                    position={[0, 0, 15]}
                    gravity={[0, -40, 0]}
                    fov={20}
                    transparent={true}
                    frontImage="/arnav-id.jpg"
                    backImage="/hero-mask.jpg"
                    imageFit="cover"
                    cardScale={2.7}
                    lanyardWidth={1}
                  />
                </div>

                {/* Bottom Subtle Barcode / Tech Detail */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono-tech text-neutral-400 pointer-events-none">
                  <span>RAPIER3D // INTERACTIVE</span>
                  <span>ARNAV RAJ // DEV</span>
                </div>
              </div>
            </ScrollBlurFade>
          </div>

          {/* RIGHT SIDE: Textual Content (Sliding in smoothly from right with blur fade) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center space-y-7 z-10">
            <ScrollBlurFade direction="left" distance={40} delay={0.15}>
              {/* Subheading with blur-fade */}
              <div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                  {t.about.subheading}
                </h3>
              </div>
            </ScrollBlurFade>

            {/* 2-3 Lines of Summary */}
            <ScrollBlurFade direction="left" distance={30} delay={0.25}>
              <div className="relative border-l-2 border-white/30 pl-5 py-1">
                <p className="font-mono-tech text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
                  {t.about.summary}
                </p>
              </div>
            </ScrollBlurFade>

            {/* Button: Read Full Version */}
            <ScrollBlurFade direction="up" distance={25} delay={0.35}>
              <div className="flex items-center pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  onMouseEnter={() => playHoverSound()}
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-95"
                >
                  <span className="font-mono-tech text-xs uppercase tracking-wider font-bold">{t.about.readFullBtn}</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </ScrollBlurFade>
          </div>

        </div>
      </div>

      {/* Full Version Modal / Drawer */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-neutral-900 border border-white/15 rounded-2xl p-6 sm:p-8 md:p-10 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                onMouseEnter={() => playHoverSound()}
                className="absolute top-5 right-5 p-2 rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="space-y-2 mb-8 pr-8">
                <span className="text-xs uppercase tracking-[0.25em] font-mono-tech text-neutral-400">
                  {'// ' + t.about.modalSubtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white">
                  {t.about.modalTitle}
                </h3>
                <p className="text-xs font-mono-tech text-neutral-400">
                  {t.about.modalSubtitle}
                </p>
              </div>

              {/* Modal Body Content (Consistent font-mono-tech descriptions) */}
              <div className="space-y-6 text-xs sm:text-sm text-neutral-300 font-mono-tech leading-relaxed">
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-2 font-display flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                    {t.about.experienceTitle}
                  </h4>
                  <p className="text-neutral-400">
                    {t.about.highlight1}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-2 font-display flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                    {t.about.highlightsTitle}
                  </h4>
                  <p className="text-neutral-400">
                    {t.about.highlight2}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-2 font-display flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                    {t.about.philosophyTitle}
                  </h4>
                  <p className="text-neutral-400">
                    {t.about.modalPhilosophy}
                  </p>
                </div>

                {/* Tech Capabilities List */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-wider font-mono-tech text-neutral-400 mb-3">
                    Technical Proficiencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React 19',
                      'Next.js',
                      'TypeScript',
                      'Three.js / WebGL',
                      'PyTorch',
                      'Python / Flask',
                      'Node.js / Express',
                      'Tailwind CSS',
                      'Firebase',
                      'PostgreSQL / MongoDB',
                      'Distributed Systems',
                      'Generative AI'
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-xs font-mono-tech border border-white/10 bg-white/5 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  onMouseEnter={() => playHoverSound()}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono-tech text-neutral-300 hover:text-white hover:border-white/40 transition-colors"
                >
                  {t.about.closeBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutSection;
