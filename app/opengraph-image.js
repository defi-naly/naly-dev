import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'naly.dev - Decoding Money';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 16,
            background: '#111',
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#22c55e',
            }}
          >
            N
          </span>
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#ffffff',
            margin: 0,
          }}
        >
          naly.dev
        </h1>
        <p
          style={{
            fontSize: 32,
            color: '#22c55e',
            marginTop: 16,
          }}
        >
          Decoding Money
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
