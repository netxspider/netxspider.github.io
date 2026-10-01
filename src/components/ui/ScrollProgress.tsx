import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999999] h-[3px] pointer-events-none scroll-progress-track bg-white/[0.08]"
      aria-hidden="true"
    >
      <motion.div
        className="scroll-progress-bar h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9),0_0_20px_rgba(255,255,255,0.5)] origin-left will-change-transform relative"
        style={{
          scaleX,
        }}
      >
        {/* Subtle glowing bead at the leading tip of the line */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
      </motion.div>
    </div>
  );
};

export default ScrollProgress;
