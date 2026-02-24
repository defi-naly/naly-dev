'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';

interface SLFFeature {
  type: 'Feature';
  geometry: GeoJSON.Geometry;
  properties: {
    fill?: string;
    regions?: { name: string }[];
    dangerRatings?: { mainValue: string }[];
  };
}

interface SLFCollection {
  type: 'FeatureCollection';
  features: SLFFeature[];
}

const DANGER_LEVELS: Record<string, { label: string; color: string }> = {
  low:           { label: '1 — Low',           color: '#CCFF66' },
  moderate:      { label: '2 — Moderate',      color: '#FFFF00' },
  considerable:  { label: '3 — Considerable',  color: '#FF9900' },
  high:          { label: '4 — High',          color: '#FF0000' },
  very_high:     { label: '5 — Very High',     color: '#9B0000' },
};

const CACHE_KEY = 'mt-slf-bulletin';

function FitBounds({ data }: { data: SLFCollection }) {
  const map = useMap();
  useEffect(() => {
    if (data.features.length === 0) return;
    const layer = L.geoJSON(data as GeoJSON.FeatureCollection);
    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [data, map]);
  return null;
}

export default function DangerMap() {
  const [geojson, setGeojson] = useState<SLFCollection | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const geoRef = useRef<L.GeoJSON | null>(null);
  const cachedRef = useRef(false);

  const fetchData = (retryCount = 0) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch('/api/slf-bulletin', { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data: SLFCollection) => {
        setGeojson(data);
        setLoading(false);
        setError(false);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch { /* storage full — ignore */ }
      })
      .catch(() => {
        if (!cachedRef.current && retryCount < 1) {
          setTimeout(() => fetchData(retryCount + 1), 2000);
        } else if (!cachedRef.current) {
          setError(true);
          setLoading(false);
        }
      })
      .finally(() => clearTimeout(timeout));
  };

  useEffect(() => {
    // Stale-while-revalidate: show cached data instantly, refresh in background
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        setGeojson(JSON.parse(cached));
        setLoading(false);
        cachedRef.current = true;
      }
    } catch { /* no cache — continue */ }

    fetchData();
  }, []);

  const onEachFeature = (feature: SLFFeature, layer: L.Layer) => {
    const props = feature.properties;
    const regionNames = props.regions?.map((r) => r.name).join(', ') || 'Unknown';
    const dangerValue = props.dangerRatings?.[0]?.mainValue || 'unknown';
    const level = DANGER_LEVELS[dangerValue];
    const label = level ? level.label : dangerValue;

    const popup = L.popup({
      className: 'mt-danger-popup',
      closeButton: false,
    }).setContent(
      `<div class="mt-danger-popup-inner">
        <div class="mt-danger-popup-region">${regionNames}</div>
        <div class="mt-danger-popup-level" style="color:${props.fill || '#fff'}">${label}</div>
      </div>`
    );

    (layer as L.Path).bindPopup(popup);

    (layer as L.Path).on({
      mouseover: (e) => {
        const target = e.target as L.Path;
        target.setStyle({ fillOpacity: 0.6, weight: 2 });
        target.openPopup();
      },
      mouseout: (e) => {
        const target = e.target as L.Path;
        target.setStyle({ fillOpacity: 0.4, weight: 1 });
        target.closePopup();
      },
    });
  };

  const style = (feature: GeoJSON.Feature | undefined) => {
    const fill = (feature?.properties as SLFFeature['properties'])?.fill || '#FF9900';
    return {
      fillColor: fill,
      fillOpacity: 0.4,
      color: fill,
      weight: 1,
      opacity: 0.8,
    };
  };

  // Observed levels from current data for legend
  const observedLevels = geojson
    ? Array.from(
        new Set(
          geojson.features
            .map((f) => f.properties.dangerRatings?.[0]?.mainValue)
            .filter(Boolean)
        )
      )
    : [];

  return (
    <div>
      <div className="mt-danger-map-header">
        <div>
          <h2 className="mt-danger-map-title">Avalanche Danger</h2>
          <p className="mt-danger-map-subtitle">SLF bulletin — updated daily</p>
        </div>
      </div>

      {loading && (
        <div className="mt-danger-map-container">
          <div className="mt-danger-map-skeleton">
            <div className="mt-danger-map-spinner" />
            <span>Loading bulletin...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-danger-map-container">
          <div className="mt-danger-map-error">
            <span>Failed to load avalanche data</span>
            <button onClick={() => fetchData()} className="mt-danger-map-retry">
              Retry
            </button>
          </div>
        </div>
      )}

      {!loading && !error && geojson && (
        <>
          <div className="mt-danger-map-container">
            <MapContainer
              center={[46.8, 8.2]}
              zoom={8}
              scrollWheelZoom={false}
              attributionControl={false}
              minZoom={7}
              maxZoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
              />
              <GeoJSON
                ref={geoRef}
                data={geojson as GeoJSON.FeatureCollection}
                style={style}
                onEachFeature={onEachFeature as (feature: GeoJSON.Feature, layer: L.Layer) => void}
              />
              <FitBounds data={geojson} />
            </MapContainer>
          </div>

          <div className="mt-danger-map-legend">
            {Object.entries(DANGER_LEVELS).map(([key, val]) => (
              <span
                key={key}
                style={{ opacity: observedLevels.includes(key) ? 1 : 0.35 }}
              >
                <span
                  className="mt-danger-map-legend-dot"
                  style={{ background: val.color }}
                />
                {val.label}
              </span>
            ))}
          </div>

          <div className="mt-danger-map-attribution">
            Data:{' '}
            <a
              href="https://www.slf.ch/en/avalanche-bulletin-and-snow-situation.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              SLF / WSL
            </a>{' '}
            (CC BY 4.0) · Tiles:{' '}
            <a
              href="https://carto.com/attributions"
              target="_blank"
              rel="noopener noreferrer"
            >
              CARTO
            </a>{' '}
            ·{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap
            </a>
          </div>
        </>
      )}
    </div>
  );
}
