'use client';

export default function LifeMarkers({ data }) {
  const { markers } = data;
  
  return (
    <div className="border border-neutral-800 bg-terminal-surface h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
          Life Markers
        </span>
      </div>
      
      {/* Markers */}
      <div className="p-4">
        <div className="space-y-0">
          {markers.map((marker, i) => (
            <div 
              key={i}
              className={`
                relative py-3 pl-6
                ${i !== markers.length - 1 ? 'border-l border-neutral-700 ml-1' : 'ml-1'}
              `}
            >
              {/* Dot */}
              <div 
                className={`
                  absolute left-0 top-3 w-2.5 h-2.5 rounded-full -translate-x-1/2
                  ${i === markers.length - 1 
                    ? 'bg-terminal-accent' 
                    : 'bg-neutral-700 border border-neutral-600'
                  }
                `}
              />
              
              {/* Content */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-white">{marker.label}</span>
                    <span className="font-mono text-xs text-neutral-600">{marker.year}</span>
                  </div>
                  <div className="font-mono text-xs text-neutral-500">
                    Home: {marker.homeMultiple.toFixed(1)}x income
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-mono text-sm ${
                    i === markers.length - 1 ? 'text-terminal-accent' : 'text-white'
                  }`}>
                    ${marker.purchasingPower.toFixed(2)}
                  </div>
                  {i > 0 && (
                    <div className="font-mono text-xs text-red-400">
                      -{(100 - marker.purchasingPower).toFixed(0)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
