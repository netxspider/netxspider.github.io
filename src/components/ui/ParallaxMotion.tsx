import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxMotionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export const ParallaxMotion: React.FC<ParallaxMotionProps> = ({
  children,
  offset = 40,
  className = '',
  direction = 'vertical',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawTransform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' ? [offset, -offset] : [-offset, offset]
  );

  const smoothTransform = useSpring(rawTransform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={direction === 'vertical' ? { y: smoothTransform } : { x: smoothTransform }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxMotion;
