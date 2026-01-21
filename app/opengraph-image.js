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
            fontSize: 64,
            fontWeight: 'bold',
          }}
        >
          <span style={{ color: '#f59e0b' }}>N</span>
          <span style={{ color: '#ffffff', marginLeft: 16 }}>naly.dev</span>
        </div>
        <p
          style={{
            fontSize: 28,
            color: '#737373',
            marginTop: 24,
          }}
        >
          Decoding money.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
