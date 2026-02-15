'use client';

import { motion } from 'motion/react';
import ScrollFade from '../ScrollFade';

export default function MethodHero() {
  return (
    <section className="method-hero">
      <ScrollFade>
        <motion.p
          className="method-hero-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          The BLOOM Method
        </motion.p>
        <motion.h1
          className="method-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Map the System.<br />Then Change It.
        </motion.h1>
        <motion.p
          className="method-hero-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Four pillars. Three stages. One question: are you building assets that compound?
        </motion.p>
      </ScrollFade>
    </section>
  );
}
