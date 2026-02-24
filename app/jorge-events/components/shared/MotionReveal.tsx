'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  variant?: 'fade' | 'clip' | 'split';
}

export default function MotionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
  variant = 'fade',
}: MotionRevealProps) {
  // ---- Clip variant: curtain-up via clipPath ----
  if (variant === 'clip') {
    return (
      <motion.div
        className={className}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    );
  }

  // ---- Split variant: each child line slides up from overflow ----
  if (variant === 'split') {
    return (
      <motion.div
        className={`${className} je-split-reveal`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div
          variants={{
            hidden: { y: '100%' },
            visible: { y: '0%' },
          }}
          transition={{
            duration: 0.8,
            delay,
            type: 'spring',
            stiffness: 100,
            damping: 20,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  // ---- Default fade variant (enhanced) ----
  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: -distance };
      case 'right': return { opacity: 0, x: distance };
      case 'none': return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 };
      case 'left':
      case 'right': return { opacity: 1, x: 0 };
      case 'none': return { opacity: 1 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
