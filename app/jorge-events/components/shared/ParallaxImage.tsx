'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  speed?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  aspectRatio,
  speed = 0.2,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -50}px`, `${speed * 50}px`]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);

  return (
    <div
      ref={ref}
      className={`je-parallax-wrap ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          scale,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        loading="lazy"
      />
    </div>
  );
}
