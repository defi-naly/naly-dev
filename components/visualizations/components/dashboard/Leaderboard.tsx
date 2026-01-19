import { cn } from '@/lib/utils';
import { useLeaderboard, LeaderboardEntry } from '@/hooks/useLeaderboard';
import { Denomination } from '@/types/market';
import { Trophy, TrendingUp, TrendingDown, Crown, Medal, Flame, Skull } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardProps {
  denomination: Denomination;
  onSelectAsset: (assetId: string) => void;
  selectedAsset: string;
}

function formatPercent(value: number): string {
  const pct = (value * 100).toFixed(1);
  return `${value >= 0 ? '+' : ''}${pct}%`;
}

function getRankIcon(index: number, isWinner: boolean) {
  if (isWinner) {
    if (index === 0) return <Crown className="w-4 h-4 text-warning" />;
    if (index === 1) return <Medal className="w-4 h-4 text-muted-foreground" />;
    if (index === 2) return <Medal className="w-4 h-4 text-amber-700" />;
  } else {
    if (index === 0) return <Skull className="w-4 h-4 text-destructive" />;
  }
  return <span className="w-4 text-xs text-muted-foreground text-center">{index + 1}</span>;
}

function LeaderboardItem({ 
  entry, 
  index, 
  isWinner, 
  selectedAsset, 
  onSelectAsset 
}: { 
  entry: LeaderboardEntry; 
  index: number; 
  isWinner: boolean;
  selectedAsset: string; 
  onSelectAsset: (id: string) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: isWinner ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      onClick={() => onSelectAsset(entry.asset.id)}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
        "hover:bg-sidebar-accent/80 hover:scale-[1.02]",
        "group relative overflow-hidden",
        selectedAsset === entry.asset.id
          ? "bg-sidebar-accent ring-1 ring-primary/50"
          : "bg-muted/30"
      )}
    >
      {/* Gradient overlay for top position */}
      {index === 0 && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: isWinner 
              ? `linear-gradient(90deg, hsl(var(--warning) / 0.3), transparent)`
              : `linear-gradient(90deg, hsl(var(--destructive) / 0.3), transparent)`
          }}
        />
      )}
      
      <div className="flex items-center justify-center w-6">
        {getRankIcon(index, isWinner)}
      </div>
      
      <div
        className="w-2 h-2 rounded-full shrink-0 ring-2 ring-background"
        style={{ 
          backgroundColor: entry.asset.color.startsWith('var') 
            ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue(entry.asset.color.slice(4, -1))})`
            : entry.asset.color 
        }}
      />
      
      <span className="flex-1 text-left font-medium truncate">
        {entry.asset.name}
      </span>
      
      <div className="flex items-center gap-2">
        <span className={cn("font-mono text-xs", isWinner ? "text-success" : "text-destructive")}>
          {formatPercent(entry.return1Y)}
        </span>
        <div className={cn("flex items-center gap-0.5 text-xs", isWinner ? "text-success/70" : "text-destructive/70")}>
          {isWinner ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{isWinner ? '+' : ''}{(entry.outperformance * 100).toFixed(0)}pp</span>
        </div>
      </div>
    </motion.button>
  );
}

export function Leaderboard({ denomination, onSelectAsset, selectedAsset }: LeaderboardProps) {
  const { entries, goldReturn, isLoading, winners, losers } = useLeaderboard(denomination);

  const top3Winners = winners.slice(0, 3);
  const top3Losers = losers.slice(-3).reverse(); // Get bottom 3, worst first

  if (isLoading) {
    return (
      <div className="glass-panel rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-warning" />
          <h3 className="text-sm font-medium">vs Gold (1Y)</h3>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted/50 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl p-4 animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-warning" />
          <h3 className="text-sm font-medium">vs Gold (1Y)</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Flame className="w-3 h-3 text-warning" />
          <span>Gold: {formatPercent(goldReturn)}</span>
        </div>
      </div>

      {/* Top 3 Beaters */}
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
          <TrendingUp className="w-3 h-3 text-success" />
          <span className="font-medium">Top Beaters</span>
        </p>
        <AnimatePresence mode="popLayout">
          {top3Winners.length > 0 ? (
            top3Winners.map((entry, index) => (
              <LeaderboardItem
                key={entry.asset.id}
                entry={entry}
                index={index}
                isWinner={true}
                selectedAsset={selectedAsset}
                onSelectAsset={onSelectAsset}
              />
            ))
          ) : (
            <p className="text-xs text-muted-foreground text-center py-2">
              No assets beat gold this year
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="border-t border-border/50" />

      {/* Top 3 Losers */}
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
          <TrendingDown className="w-3 h-3 text-destructive" />
          <span className="font-medium">Underperformers</span>
        </p>
        <AnimatePresence mode="popLayout">
          {top3Losers.length > 0 ? (
            top3Losers.map((entry, index) => (
              <LeaderboardItem
                key={entry.asset.id}
                entry={entry}
                index={index}
                isWinner={false}
                selectedAsset={selectedAsset}
                onSelectAsset={onSelectAsset}
              />
            ))
          ) : (
            <p className="text-xs text-muted-foreground text-center py-2">
              All assets beat gold this year
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
