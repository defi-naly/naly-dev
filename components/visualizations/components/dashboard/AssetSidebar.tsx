import { cn } from '@/lib/utils';
import { ASSETS, Asset } from '@/types/market';
import { TrendingUp, Coins, Building2, Cpu, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssetSidebarProps {
  selectedAsset: string;
  onSelectAsset: (assetId: string) => void;
}

const categoryIcons = {
  index: BarChart3,
  stock: TrendingUp,
  crypto: Coins,
  commodity: Building2,
  etf: Cpu,
};

const categoryLabels = {
  index: 'Indices',
  stock: 'Mag 7 Stocks',
  crypto: 'Crypto',
  commodity: 'Commodities',
  etf: 'ETFs',
};

export function AssetSidebar({ selectedAsset, onSelectAsset }: AssetSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  
  const groupedAssets = ASSETS.reduce((acc, asset) => {
    if (!acc[asset.category]) {
      acc[asset.category] = [];
    }
    acc[asset.category].push(asset);
    return acc;
  }, {} as Record<string, Asset[]>);

  const categoryOrder: Array<keyof typeof categoryLabels> = ['index', 'stock', 'crypto', 'commodity', 'etf'];

  return (
    <motion.aside 
      animate={{ width: collapsed ? 56 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="bg-sidebar border-r border-sidebar-border flex flex-col relative"
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute -right-3 top-16 z-10 w-6 h-6 rounded-full",
          "bg-sidebar border border-sidebar-border",
          "flex items-center justify-center",
          "hover:bg-sidebar-accent transition-colors"
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
      
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-50" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <h1 className="text-base font-semibold text-foreground tracking-tight">
                  TruValue
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[11px] text-muted-foreground mt-2 overflow-hidden font-mono"
            >
              ~/truvalue $ see --real-value
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        {categoryOrder.map((category) => {
          const assets = groupedAssets[category];
          if (!assets) return null;
          
          const Icon = categoryIcons[category];
          
          return (
            <div key={category}>
              <div className={cn(
                "flex items-center gap-2 px-2 py-1 terminal-header",
                collapsed && "justify-center"
              )}>
                <Icon className="w-3 h-3 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {categoryLabels[category]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="space-y-0.5 mt-1.5">
                {assets.map((asset, index) => (
                  <motion.button
                    key={asset.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => onSelectAsset(asset.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-sm transition-all",
                      "hover:bg-sidebar-accent",
                      collapsed && "justify-center px-2",
                      selectedAsset === asset.id
                        ? "bg-sidebar-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    title={collapsed ? asset.name : undefined}
                  >
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full shrink-0 transition-transform",
                        selectedAsset === asset.id && "scale-150"
                      )}
                      style={{ backgroundColor: asset.color.startsWith('var') 
                        ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue(asset.color.slice(4, -1))})`
                        : asset.color 
                      }}
                    />
                    <AnimatePresence>
                      {!collapsed && (
                        <>
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="truncate flex-1 text-left text-[13px]"
                          >
                            {asset.name}
                          </motion.span>
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-[10px] text-muted-foreground font-mono"
                          >
                            {asset.symbol.length > 6 ? asset.symbol.slice(0, 4) + '…' : asset.symbol}
                          </motion.span>
                        </>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
      
      <AnimatePresence>
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 border-t border-sidebar-border"
          >
            <p className="text-[10px] text-muted-foreground font-mono">
              // data via Yahoo Finance & FRED
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}