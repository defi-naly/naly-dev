'use client';

import ShieldedPoolCard from './ShieldedPoolCard';
import EmissionCard from './EmissionCard';

interface MetricsDashboardProps {
  shieldedPool: {
    pools: { name: string; zec: number; color: string }[];
    totalShielded: number;
    pctOfCirculating: number;
  };
  emission: {
    zecBlockReward: number;
    zecDailyEmission: number;
    zecAnnualInflation: number;
    nextHalvingDate: string;
    daysUntilHalving: number;
    btcEquivDate: string;
    zecAgeDays: number;
  };
  btcAtSameAge: { price: number; supply: number; marketCap: number; day: number; calendarDate: string };
  zecCurrent: { price: number; marketCap: number; supply: number };
}

function formatMarketCap(val: number): string {
  if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
  if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(0)}M`;
  return `$${val.toLocaleString()}`;
}

function formatPrice(val: number): string {
  if (val >= 1000) return `$${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (val >= 1) return `$${val.toFixed(2)}`;
  return `$${val.toFixed(4)}`;
}

export default function MetricsDashboard({
  shieldedPool,
  emission,
  btcAtSameAge,
  zecCurrent,
}: MetricsDashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Market Data Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* ZEC Now Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <div className="text-[10px] font-mono text-zinc-600 uppercase mb-2">ZEC Now</div>
          <div className="text-lg font-mono text-emerald-400 mb-1">
            {formatPrice(zecCurrent.price)}
          </div>
          <div className="text-[10px] font-mono text-zinc-500">
            MCap: {formatMarketCap(zecCurrent.marketCap)}
          </div>
          <div className="text-[10px] font-mono text-zinc-600">
            Supply: {(zecCurrent.supply / 1e6).toFixed(1)}M
          </div>
        </div>

        {/* BTC at Same Age Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <div className="text-[10px] font-mono text-zinc-600 uppercase mb-2">
            BTC at Same Age
          </div>
          <div className="text-lg font-mono text-[#F7931A] mb-1">
            {formatPrice(btcAtSameAge.price)}
          </div>
          <div className="text-[10px] font-mono text-zinc-500">
            MCap: {formatMarketCap(btcAtSameAge.marketCap)}
          </div>
          <div className="text-[10px] font-mono text-zinc-600">
            Supply: {(btcAtSameAge.supply / 1e6).toFixed(1)}M
          </div>
          <div className="text-[9px] font-mono text-zinc-700 mt-1">
            Day {btcAtSameAge.day.toLocaleString()} · {btcAtSameAge.calendarDate}
          </div>
        </div>
      </div>

      {/* Shielded Pool */}
      <ShieldedPoolCard
        pools={shieldedPool.pools}
        totalShielded={shieldedPool.totalShielded}
        pctOfCirculating={shieldedPool.pctOfCirculating}
      />

      {/* Emission */}
      <EmissionCard
        zecBlockReward={emission.zecBlockReward}
        zecDailyEmission={emission.zecDailyEmission}
        zecAnnualInflation={emission.zecAnnualInflation}
        nextHalvingDate={emission.nextHalvingDate}
        daysUntilHalving={emission.daysUntilHalving}
        btcEquivDate={emission.btcEquivDate}
        zecAgeDays={emission.zecAgeDays}
      />
    </div>
  );
}
