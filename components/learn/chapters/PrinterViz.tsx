'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { PrinterIcon } from '@/components/icons/GameIcons';

interface PrinterVizProps {
  onComplete: () => void;
}

interface DataPoint {
  year: number;
  value: number;
}

const M2_DATA: DataPoint[] = [
  { year: 1971, value: 0.69 },
  { year: 1980, value: 1.6 },
  { year: 1990, value: 3.3 },
  { year: 2000, value: 4.9 },
  { year: 2008, value: 8.2 },
  { year: 2015, value: 12.3 },
  { year: 2020, value: 15.4 },
  { year: 2024, value: 21.5 },
];

interface Annotation {
  year: number;
  label: string;
  color: string;
}

const ANNOTATIONS: Annotation[] = [
  { year: 1971, label: 'Nixon ends gold standard', color: '#f59e0b' },
  { year: 2008, label: 'Financial crisis response', color: '#3b82f6' },
  { year: 2020, label: 'COVID stimulus', color: '#ef4444' },
];

const START_YEAR = 1971;
const END_YEAR = 2024;
const ANIMATION_DURATION = 8000;

type Phase = 'setup' | 'animating' | 'reveal';

function interpolateValue(year: number): number {
  if (year <= M2_DATA[0].year) return M2_DATA[0].value;
  if (year >= M2_DATA[M2_DATA.length - 1].year) return M2_DATA[M2_DATA.length - 1].value;

  for (let i = 0; i < M2_DATA.length - 1; i++) {
    if (year >= M2_DATA[i].year && year <= M2_DATA[i + 1].year) {
      const t = (year - M2_DATA[i].year) / (M2_DATA[i + 1].year - M2_DATA[i].year);
      return M2_DATA[i].value + t * (M2_DATA[i + 1].value - M2_DATA[i].value);
    }
  }
  return M2_DATA[M2_DATA.length - 1].value;
}

export default function PrinterViz({ onComplete }: PrinterVizProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [currentYear, setCurrentYear] = useState(START_YEAR);
  const [currentValue, setCurrentValue] = useState(0.69);
  const [progress, setProgress] = useState(0);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleStart = () => {
    setPhase('animating');
  };

  useEffect(() => {
    if (phase !== 'animating') return;

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

      const easedProgress = 1 - Math.pow(1 - rawProgress, 2);
      setProgress(easedProgress);

      const year = Math.floor(START_YEAR + (END_YEAR - START_YEAR) * easedProgress);
      setCurrentYear(year);
      setCurrentValue(interpolateValue(year));

      const annotation = ANNOTATIONS.find(a =>
        Math.abs(year - a.year) < 2 && year >= a.year
      );
      setActiveAnnotation(annotation || null);

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase('reveal');
      }
    };

    requestAnimationFrame(animate);
  }, [phase]);

  useEffect(() => {
    if (phase === 'reveal' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  const chartWidth = 320;
  const chartHeight = 180;
  const padding = { top: 20, right: 20, bottom: 30, left: 45 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const xScale = (year: number) =>
    padding.left + ((year - START_YEAR) / (END_YEAR - START_YEAR)) * innerWidth;

  const yScale = (value: number) =>
    padding.top + innerHeight - (value / 22) * innerHeight;

  const pathData = M2_DATA.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${xScale(d.year)} ${yScale(d.value)}`
  ).join(' ');

  const clipX = xScale(currentYear);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      <div className="text-center mb-2">
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
          M2 Money Supply (Trillions USD)
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {phase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg max-w-sm mx-auto">
                <PrinterIcon className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <p className="text-zinc-300 font-mono text-sm">
                  Since 1971, the dollar hasn't been backed by gold.
                </p>
                <p className="text-zinc-500 font-mono text-sm mt-2">
                  So what happened to the money supply?
                </p>
              </div>

              <motion.button
                onClick={handleStart}
                className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                START
              </motion.button>
            </motion.div>
          )}

          {(phase === 'animating' || phase === 'reveal') && (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs text-zinc-500">
                    Year: {currentYear}
                  </span>
                  <span className="font-mono text-lg text-amber-500 font-bold">
                    ${currentValue.toFixed(1)}T
                  </span>
                </div>

                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full"
                >
                  <defs>
                    <clipPath id="chart-clip">
                      <rect x="0" y="0" width={clipX} height={chartHeight} />
                    </clipPath>
                  </defs>

                  {/* Grid lines */}
                  {[0, 5.5, 11, 16.5, 22].map((val) => (
                    <line
                      key={val}
                      x1={padding.left}
                      y1={yScale(val)}
                      x2={chartWidth - padding.right}
                      y2={yScale(val)}
                      stroke="#27272a"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {[0, 11, 22].map((val) => (
                    <text
                      key={val}
                      x={padding.left - 8}
                      y={yScale(val) + 4}
                      textAnchor="end"
                      fill="#52525b"
                      className="font-mono text-[10px]"
                    >
                      ${val}T
                    </text>
                  ))}

                  {/* X-axis labels */}
                  {[1971, 1990, 2008, 2024].map((year) => (
                    <text
                      key={year}
                      x={xScale(year)}
                      y={chartHeight - 8}
                      textAnchor="middle"
                      fill="#52525b"
                      className="font-mono text-[10px]"
                    >
                      {year}
                    </text>
                  ))}

                  {/* Line chart - revealed portion */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    clipPath="url(#chart-clip)"
                  />

                  {/* Line chart - unrevealed (dim) */}
                  {phase === 'animating' && (
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#3f3f46"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Annotation markers */}
                  {ANNOTATIONS.map((annotation) => {
                    const isRevealed = currentYear >= annotation.year;
                    return (
                      <g key={annotation.year}>
                        <line
                          x1={xScale(annotation.year)}
                          y1={padding.top}
                          x2={xScale(annotation.year)}
                          y2={chartHeight - padding.bottom}
                          stroke={isRevealed ? annotation.color : '#27272a'}
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          opacity={isRevealed ? 0.5 : 0.2}
                        />
                        {isRevealed && (
                          <circle
                            cx={xScale(annotation.year)}
                            cy={yScale(interpolateValue(annotation.year))}
                            r="4"
                            fill={annotation.color}
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Current position dot */}
                  {phase === 'animating' && (
                    <circle
                      cx={xScale(currentYear)}
                      cy={yScale(currentValue)}
                      r="5"
                      fill="#f59e0b"
                    />
                  )}
                </svg>

                {/* Year progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between font-mono text-[10px] text-zinc-600 mb-1">
                    <span>{START_YEAR}</span>
                    <span>{END_YEAR}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Annotation callout */}
              {activeAnnotation && phase === 'animating' && (
                <motion.div
                  key={activeAnnotation.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <span
                    className="font-mono text-sm"
                    style={{ color: activeAnnotation.color }}
                  >
                    {activeAnnotation.year}: {activeAnnotation.label}
                  </span>
                </motion.div>
              )}

              {/* Reveal Stats */}
              {phase === 'reveal' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center">
                    <p className="text-amber-500 font-mono text-sm font-medium">
                      $0.69T → $21.5T — that's 31x more dollars.
                    </p>
                    <p className="text-zinc-400 font-mono text-xs mt-2">
                      40% of all dollars in existence were created since 2020.
                    </p>
                  </div>

                  <div className="text-center">
                    <Link
                      href="/tools/truvalue"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 font-mono text-xs transition-colors"
                    >
                      Explore Full Dashboard
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
