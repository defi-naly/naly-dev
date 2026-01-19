import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, AlertCircle, DollarSign, TrendingUp, Coins, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const methodologies = [
  {
    icon: DollarSign,
    title: 'Nominal USD',
    color: 'text-[hsl(var(--chart-usd))]',
    description: 'Raw price in US Dollars. Does not account for inflation.',
  },
  {
    icon: TrendingUp,
    title: 'vs Inflation',
    color: 'text-success',
    description: 'Adjusted using PCE Price Index. Shows if you beat inflation.',
  },
  {
    icon: Coins,
    title: 'vs Gold',
    color: 'text-warning',
    description: 'Price divided by gold. Positive = buy more gold now.',
  },
  {
    icon: Home,
    title: 'vs Houses',
    color: 'text-[hsl(var(--chart-house))]',
    description: 'Price vs Case-Shiller. Positive = afford more house.',
  },
];

export function DataNotes() {
  return (
    <div className="space-y-4">
      {/* Methodology Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal-card p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-3.5 h-3.5 text-primary" />
          <span className="terminal-header">Methodology</span>
        </div>
        
        <div className="space-y-3">
          {methodologies.map((method, index) => (
            <motion.div 
              key={method.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-2.5 rounded bg-muted/30"
            >
              <div className="flex items-center gap-2 mb-1">
                <method.icon className={`w-3 h-3 ${method.color}`} />
                <span className="text-xs font-medium">{method.title}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-mono">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Sources */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="terminal-card p-4"
      >
        <span className="terminal-header">Data Sources</span>
        <ul className="space-y-2 text-[10px] text-muted-foreground mt-3 font-mono">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Prices: Yahoo Finance API</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              Inflation:{' '}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="border-b border-dashed border-muted-foreground cursor-help text-foreground/70">PCEPI</span>
                </TooltipTrigger>
                <TooltipContent className="terminal-card p-2">
                  Personal Consumption Expenditures Price Index
                </TooltipContent>
              </Tooltip>
              {' '}(FRED)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              Gold:{' '}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="border-b border-dashed border-muted-foreground cursor-help text-foreground/70">GC=F</span>
                </TooltipTrigger>
                <TooltipContent className="terminal-card p-2">
                  COMEX Gold Futures (front month)
                </TooltipContent>
              </Tooltip>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              Houses:{' '}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="border-b border-dashed border-muted-foreground cursor-help text-foreground/70">Case-Shiller</span>
                </TooltipTrigger>
                <TooltipContent className="terminal-card p-2">
                  S&P/Case-Shiller National Home Price Index
                </TooltipContent>
              </Tooltip>
              {' '}(FRED)
            </span>
          </li>
        </ul>
        
        <div className="flex items-center gap-2 pt-3 mt-3 border-t border-border text-warning/70 text-[10px] font-mono">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>Cached 6-24h. Not financial advice.</span>
        </div>
      </motion.div>
    </div>
  );
}