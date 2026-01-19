import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAssetReturns } from '@/hooks/useAssetReturns';
import { TrendingUp, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TimeRange } from '@/types/market';

interface ReturnsTableProps {
  onSelectAsset: (assetId: string) => void;
  selectedAsset: string;
}

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: '1Y', label: '1Y' },
  { value: '5Y', label: '5Y' },
  { value: '10Y', label: '10Y' },
];

function formatPercent(value: number): string {
  const pct = (value * 100).toFixed(1);
  return `${value >= 0 ? '+' : ''}${pct}%`;
}

function ReturnCell({ value, beats }: { value: number; beats: boolean }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <span className={cn(
        "font-mono text-xs",
        beats ? "text-success" : "text-destructive"
      )}>
        {formatPercent(value)}
      </span>
      {beats ? (
        <Check className="w-3 h-3 text-success" />
      ) : (
        <X className="w-3 h-3 text-destructive/50" />
      )}
    </div>
  );
}

const RANGE_LABELS: Record<TimeRange, string> = {
  '1Y': '1 year',
  '5Y': '5 years',
  '10Y': '10 years',
  'MAX': 'max period',
};

export function ReturnsTable({ onSelectAsset, selectedAsset }: ReturnsTableProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1Y');
  const { data, isLoading } = useAssetReturns(selectedRange);

  const rangeLabel = RANGE_LABELS[selectedRange];

  if (isLoading) {
    return (
      <div className="terminal-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          <span className="terminal-header">Performance Leaderboard</span>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 bg-muted/30 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const beatsInflationCount = data.filter(d => d.beatsInflation).length;
  const beatsGoldCount = data.filter(d => d.beatsGold).length;
  const beatsHousesCount = data.filter(d => d.beatsHouses).length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="terminal-card overflow-hidden"
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span className="terminal-header">Performance Leaderboard</span>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[10px] text-muted-foreground font-mono hidden sm:block">
              // purchasing power comparison
            </p>
            <div className="flex bg-muted rounded p-0.5">
              {TIME_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedRange(range.value)}
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-mono rounded transition-all",
                    selectedRange === range.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-[180px] text-[10px] uppercase tracking-wider">Asset</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">
                <Tooltip>
                  <TooltipTrigger className="cursor-help">
                    <span className="border-b border-dashed border-muted-foreground">vs Inflation</span>
                  </TooltipTrigger>
                  <TooltipContent className="terminal-card p-2">
                    <p className="font-medium text-xs">Real Return ({selectedRange})</p>
                    <p className="text-[10px] text-muted-foreground">
                      Positive = you beat inflation over {rangeLabel}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">
                <Tooltip>
                  <TooltipTrigger className="cursor-help">
                    <span className="border-b border-dashed border-muted-foreground">vs Gold</span>
                  </TooltipTrigger>
                  <TooltipContent className="terminal-card p-2">
                    <p className="font-medium text-xs">Gold-Adjusted Return ({selectedRange})</p>
                    <p className="text-[10px] text-muted-foreground">
                      Positive = you can buy more gold now than {rangeLabel} ago
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">
                <Tooltip>
                  <TooltipTrigger className="cursor-help">
                    <span className="border-b border-dashed border-muted-foreground">vs Houses</span>
                  </TooltipTrigger>
                  <TooltipContent className="terminal-card p-2">
                    <p className="font-medium text-xs">House-Adjusted Return ({selectedRange})</p>
                    <p className="text-[10px] text-muted-foreground">
                      Positive = you can afford more house now than {rangeLabel} ago
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow 
                key={row.asset.id}
                onClick={() => onSelectAsset(row.asset.id)}
                className={cn(
                  "cursor-pointer transition-colors border-border",
                  selectedAsset === row.asset.id && "bg-muted/50"
                )}
              >
                <TableCell className="py-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] text-muted-foreground w-4 font-mono">{index + 1}</span>
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ 
                        backgroundColor: row.asset.color.startsWith('var') 
                          ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue(row.asset.color.slice(4, -1))})`
                          : row.asset.color 
                      }}
                    />
                    <span className="text-sm">{row.asset.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <ReturnCell value={row.realReturn} beats={row.beatsInflation} />
                </TableCell>
                <TableCell className="py-2">
                  <ReturnCell value={row.goldReturn} beats={row.beatsGold} />
                </TableCell>
                <TableCell className="py-2">
                  <ReturnCell value={row.houseReturn} beats={row.beatsHouses} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary row */}
      <div className="p-3 bg-muted/20 border-t border-border flex items-center justify-around text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Beat Inflation:</span>
          <span className="text-success">{beatsInflationCount}/{data.length}</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Beat Gold:</span>
          <span className="text-success">{beatsGoldCount}/{data.length}</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Beat Houses:</span>
          <span className="text-success">{beatsHousesCount}/{data.length}</span>
        </div>
      </div>
    </motion.div>
  );
}