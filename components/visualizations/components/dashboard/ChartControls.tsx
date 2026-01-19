import { Denomination, TimeRange, ChartScale, DENOMINATION_LABELS, DENOMINATION_DESCRIPTIONS } from '@/types/market';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, DollarSign, TrendingUp, Home, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChartControlsProps {
  denomination: Denomination;
  range: TimeRange;
  scale: ChartScale;
  normalized: boolean;
  onDenominationChange: (value: Denomination) => void;
  onRangeChange: (value: TimeRange) => void;
  onScaleChange: (value: ChartScale) => void;
  onNormalizedChange: (value: boolean) => void;
}

const denomIcons: Record<Denomination, typeof DollarSign> = {
  usd: DollarSign,
  real: TrendingUp,
  gold: Coins,
  house: Home,
};

export function ChartControls({
  denomination,
  range,
  scale,
  normalized,
  onDenominationChange,
  onRangeChange,
  onScaleChange,
  onNormalizedChange,
}: ChartControlsProps) {
  const DenomIcon = denomIcons[denomination];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="terminal-card p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="terminal-header">Controls</span>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-primary animate-ping opacity-50" />
          </div>
          <span>LIVE</span>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-6">
        {/* Denomination Toggle */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <DenomIcon className="w-3 h-3 text-primary" />
            <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Denomination</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3 h-3 text-muted-foreground/50 cursor-help hover:text-muted-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="terminal-card p-3 max-w-xs">
                <p className="font-medium text-xs mb-1">{DENOMINATION_LABELS[denomination]}</p>
                <p className="text-[10px] text-muted-foreground">{DENOMINATION_DESCRIPTIONS[denomination]}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <ToggleGroup
            type="single"
            value={denomination}
            onValueChange={(value) => value && onDenominationChange(value as Denomination)}
            variant="denomination"
            size="sm"
          >
            <ToggleGroupItem value="usd" className="font-mono text-xs">USD</ToggleGroupItem>
            <ToggleGroupItem value="real" className="font-mono text-xs">Real</ToggleGroupItem>
            <ToggleGroupItem value="gold" className="font-mono text-xs">Gold</ToggleGroupItem>
            <ToggleGroupItem value="house" className="font-mono text-xs">House</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="w-px h-8 bg-border" />

        {/* Time Range */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Time Range</Label>
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={(value) => value && onRangeChange(value as TimeRange)}
            variant="control"
            size="sm"
          >
            <ToggleGroupItem value="1Y" className="font-mono text-xs">1Y</ToggleGroupItem>
            <ToggleGroupItem value="5Y" className="font-mono text-xs">5Y</ToggleGroupItem>
            <ToggleGroupItem value="10Y" className="font-mono text-xs">10Y</ToggleGroupItem>
            <ToggleGroupItem value="MAX" className="font-mono text-xs">Max</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="w-px h-8 bg-border" />

        {/* Scale */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Scale</Label>
          <ToggleGroup
            type="single"
            value={scale}
            onValueChange={(value) => value && onScaleChange(value as ChartScale)}
            variant="control"
            size="sm"
          >
            <ToggleGroupItem value="linear" className="font-mono text-xs">Linear</ToggleGroupItem>
            <ToggleGroupItem value="log" className="font-mono text-xs">Log</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="w-px h-8 bg-border" />

        {/* Normalized Toggle */}
        <div className="flex items-center gap-3">
          <Switch
            id="normalized"
            checked={normalized}
            onCheckedChange={onNormalizedChange}
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="normalized" className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors font-mono">
            Indexed (100)
          </Label>
        </div>
      </div>
    </motion.div>
  );
}