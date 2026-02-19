'use client';

import { motion } from 'motion/react';

export default function SectionDivider() {
  return (
    <motion.div
      className="section-divider"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: 'center' }}
    />
  );
}
