import { cn } from '@/lib/utils';
import { Denomination, DENOMINATION_LABELS } from '@/types/market';
import { TrendingUp, TrendingDown, Activity, BarChart2, Percent, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StatsPanelProps {
  assetName: string;
  denomination: Denomination;
  range: string;
  stats: {
    cagr: number;
    maxDrawdown: number;
    volatility: number;
    startValue: number;
    endValue: number;
    totalReturn: number;
  } | null;
  isLoading?: boolean;
}

function formatPercent(value: number): string {
  const formatted = (value * 100).toFixed(2);
  return `${value >= 0 ? '+' : ''}${formatted}%`;
}

function formatValue(value: number, denomination: Denomination): string {
  if (denomination === 'gold' || denomination === 'house') {
    return value.toFixed(4);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function StatsPanel({ assetName, denomination, range, stats, isLoading }: StatsPanelProps) {
  if (isLoading) {
    return (
      <div className="terminal-card p-4">
        <div className="h-3 bg-muted rounded w-24 mb-4 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-2.5 bg-muted/50 rounded w-12 animate-pulse" />
              <div className="h-5 bg-muted/50 rounded w-16 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="terminal-card p-4">
        <p className="text-muted-foreground text-xs font-mono">// select an asset to view statistics</p>
      </div>
    );
  }

  const statItems = [
    {
      label: 'CAGR',
      value: formatPercent(stats.cagr),
      isPositive: stats.cagr >= 0,
      icon: Percent,
      tooltip: 'Compound Annual Growth Rate',
    },
    {
      label: 'Total Return',
      value: formatPercent(stats.totalReturn),
      isPositive: stats.totalReturn >= 0,
      icon: stats.totalReturn >= 0 ? TrendingUp : TrendingDown,
      tooltip: 'Total return over selected period',
    },
    {
      label: 'Max Drawdown',
      value: formatPercent(-stats.maxDrawdown),
      isPositive: false,
      icon: TrendingDown,
      tooltip: 'Maximum peak-to-trough decline',
    },
    {
      label: 'Volatility',
      value: formatPercent(stats.volatility),
      isPositive: null,
      icon: Activity,
      tooltip: 'Annualized standard deviation',
    },
    {
      label: 'Start Value',
      value: formatValue(stats.startValue, denomination),
      isPositive: null,
      icon: Calendar,
      tooltip: `Value at start of ${range} range`,
    },
    {
      label: 'End Value',
      value: formatValue(stats.endValue, denomination),
      isPositive: null,
      icon: BarChart2,
      tooltip: `Current value`,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="terminal-card p-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="terminal-header">{assetName}</span>
        <span className="text-[10px] text-muted-foreground font-mono px-2 py-0.5 bg-muted rounded">
          {DENOMINATION_LABELS[denomination]} • {range}
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {statItems.map((item, index) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-1 cursor-help group"
              >
                <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider group-hover:text-foreground transition-colors">
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </p>
                <p
                  className={cn(
                    "font-mono text-sm font-medium",
                    item.isPositive === true && "text-success",
                    item.isPositive === false && "text-destructive"
                  )}
                >
                  {item.value}
                </p>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className="terminal-card p-2">
              <p className="text-[10px]">{item.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </motion.div>
  );
}