import { NextResponse } from 'next/server';

const SLF_URL = 'https://aws.slf.ch/api/bulletin/caaml/en/geojson';

// Strip fields the map doesn't need (weather text, snowpack, etc.)
// Keeps: geometry, fill, regions, dangerRatings
const STRIP_KEYS = [
  'weatherForecast',
  'weatherReview',
  'snowpackStructure',
  'tendency',
  'avalancheProblems',
  'customData',
  'validTime',
  'nextUpdate',
  'publicationTime',
  'bulletinID',
  'lang',
  'unscheduled',
];

export async function GET() {
  try {
    const res = await fetch(SLF_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();

    // Slim each feature
    for (const f of data.features) {
      for (const key of STRIP_KEYS) delete f.properties[key];
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('SLF bulletin fetch failed:', error);
    return NextResponse.json(
      { type: 'FeatureCollection', features: [], error: 'SLF unavailable' },
      { status: 502 }
    );
  }
}
