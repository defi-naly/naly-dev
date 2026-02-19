'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  RefreshCw,
  Scale,
  TrendingUp,
} from 'lucide-react';
import { PoolType } from '../data/pools';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  RefreshCw,
  Scale,
  TrendingUp,
};

interface PoolCardProps {
  pool: PoolType;
  index: number;
}

export default function PoolCard({ pool, index }: PoolCardProps) {
  const Icon = iconMap[pool.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/beets/${pool.slug}`} className="pool-card">
        <div
          className="pool-card-accent"
          style={{ background: pool.gradient }}
        />
        <div className="pool-card-icon">
          {Icon && <Icon size={24} strokeWidth={1.5} />}
        </div>
        <h3 className="pool-card-name">{pool.name}</h3>
        <p className="pool-card-tagline">{pool.tagline}</p>
        <p className="pool-card-desc">{pool.description}</p>
        <div className="pool-card-stats">
          {pool.stats.map((stat, i) => (
            <div key={i} className="pool-card-stat">
              <span className="pool-card-stat-value">{stat.value}</span>
              <span className="pool-card-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <span className="pool-card-cta">
          Learn More <span className="pool-card-cta-arrow">&rarr;</span>
        </span>
      </Link>
    </motion.div>
  );
}
