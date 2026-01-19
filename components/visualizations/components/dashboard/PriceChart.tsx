import { useEffect, useRef, useMemo } from 'react';
import { ChartScale, Denomination, DENOMINATION_LABELS } from '@/types/market';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface PriceChartProps {
  data: { timestamps: number[]; values: number[] } | null;
  assetName: string;
  denomination: Denomination;
  scale: ChartScale;
  normalized: boolean;
  isLoading?: boolean;
  color?: string;
}

export function PriceChart({
  data,
  assetName,
  denomination,
  scale,
  normalized,
  isLoading,
  color = 'hsl(var(--primary))',
}: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const chartData = useMemo(() => {
    if (!data || data.values.length === 0) return null;

    const values = normalized
      ? data.values.map((v) => (v / data.values[0]) * 100)
      : data.values;

    const processedValues = scale === 'log'
      ? values.map((v) => (v > 0 ? Math.log10(v) : 0))
      : values;

    return {
      timestamps: data.timestamps,
      values,
      processedValues,
      min: Math.min(...processedValues),
      max: Math.max(...processedValues),
      originalMin: Math.min(...values),
      originalMax: Math.max(...values),
    };
  }, [data, normalized, scale]);

  const returnPercent = useMemo(() => {
    if (!data || data.values.length < 2) return 0;
    return ((data.values[data.values.length - 1] / data.values[0]) - 1) * 100;
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !chartData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 24, right: 70, bottom: 40, left: 20 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Get computed colors
    const styles = getComputedStyle(document.documentElement);
    const gridColor = `hsla(${styles.getPropertyValue('--border')}, 0.15)`;
    const textColor = `hsl(${styles.getPropertyValue('--muted-foreground')})`;
    const primaryColor = color.startsWith('hsl') ? color : `hsl(${styles.getPropertyValue('--primary')})`;

    // Draw grid with dashed lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);

    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const y = padding.top + (chartHeight / yTicks) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw Y axis labels
    ctx.fillStyle = textColor;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'left';

    const { min, max, originalMin, originalMax } = chartData;
    const range = max - min || 1;
    
    for (let i = 0; i <= yTicks; i++) {
      const y = padding.top + (chartHeight / yTicks) * i;
      const processedValue = max - (range / yTicks) * i;
      
      let displayValue: number;
      if (scale === 'log') {
        displayValue = Math.pow(10, processedValue);
      } else {
        displayValue = originalMax - ((originalMax - originalMin) / yTicks) * i;
      }
      
      let label: string;
      if (normalized) {
        label = displayValue.toFixed(0);
      } else if (denomination === 'gold' || denomination === 'house') {
        label = displayValue.toFixed(4);
      } else {
        label = displayValue >= 1000
          ? `$${(displayValue / 1000).toFixed(1)}k`
          : `$${displayValue.toFixed(0)}`;
      }
      
      ctx.fillText(label, width - padding.right + 8, y + 3);
    }

    // Draw X axis labels
    const xTicks = 6;
    ctx.textAlign = 'center';
    for (let i = 0; i <= xTicks; i++) {
      const x = padding.left + (chartWidth / xTicks) * i;
      const idx = Math.floor((chartData.timestamps.length - 1) * (i / xTicks));
      const date = new Date(chartData.timestamps[idx]);
      const label = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      ctx.fillText(label, x, height - 12);
    }

    // Draw line
    const points = chartData.processedValues.map((value, i) => ({
      x: padding.left + (i / (chartData.processedValues.length - 1)) * chartWidth,
      y: padding.top + ((max - value) / range) * chartHeight,
    }));

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, primaryColor.replace(')', ' / 0.15)').replace('hsl', 'hsla'));
    gradient.addColorStop(0.5, primaryColor.replace(')', ' / 0.05)').replace('hsl', 'hsla'));
    gradient.addColorStop(1, primaryColor.replace(')', ' / 0)').replace('hsl', 'hsla'));

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    points.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line with subtle glow
    ctx.shadowColor = primaryColor;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point, i) => {
      if (i > 0) ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw end point dot
    const lastPoint = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(lastPoint.x, lastPoint.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = primaryColor;
    ctx.fill();

  }, [chartData, color, scale, denomination, normalized]);

  if (isLoading) {
    return (
      <div className="terminal-card p-6 h-[380px] flex flex-col items-center justify-center">
        <BarChart3 className="w-10 h-10 text-muted-foreground/30 mb-4" />
        <p className="text-sm text-muted-foreground font-mono">Loading market data...</p>
        <p className="text-[10px] text-muted-foreground/50 mt-1 font-mono">// fetching from Yahoo Finance</p>
      </div>
    );
  }

  if (!data || data.values.length === 0) {
    return (
      <div className="terminal-card p-6 h-[380px] flex flex-col items-center justify-center">
        <BarChart3 className="w-10 h-10 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground text-sm font-mono">No data available</p>
      </div>
    );
  }

  const isPositive = returnPercent >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="terminal-card p-5"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{assetName}</h2>
          <p className="text-[10px] text-muted-foreground mt-1 font-mono">
            {DENOMINATION_LABELS[denomination]} • {scale === 'log' ? 'Log' : 'Linear'}
            {normalized && ' • Base 100'}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-semibold tracking-tight">
            {normalized
              ? ((data.values[data.values.length - 1] / data.values[0]) * 100).toFixed(2)
              : denomination === 'gold' || denomination === 'house'
              ? data.values[data.values.length - 1].toFixed(4)
              : `$${data.values[data.values.length - 1].toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          </p>
          <div className={`flex items-center justify-end gap-1 mt-0.5 ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="font-mono text-xs font-medium">
              {isPositive ? '+' : ''}{returnPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      <div ref={containerRef} className="h-64 w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </motion.div>
  );
}