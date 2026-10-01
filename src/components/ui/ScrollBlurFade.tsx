import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ScrollBlurFadeProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  blur?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollBlurFade: React.FC<ScrollBlurFadeProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 36,
  blur = 12,
  duration = 0.75,
  className = '',
  threshold = 0.12,
  once = false,
  ...props
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blur}px)`,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount: threshold, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Apple-style silky smooth quint cubic-bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollBlurFade;
