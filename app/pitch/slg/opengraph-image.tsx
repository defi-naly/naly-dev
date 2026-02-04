import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Swiss Liquidity Gateway — Investment Deck';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          padding: '60px',
          gap: '60px',
        }}
      >
        {/* Swiss Cross */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '240px',
            height: '240px',
            backgroundColor: '#E53935',
            borderRadius: '24px',
            position: 'relative',
          }}
        >
          {/* Horizontal bar */}
          <div
            style={{
              position: 'absolute',
              width: '140px',
              height: '48px',
              backgroundColor: '#FFFFFF',
              borderRadius: '4px',
            }}
          />
          {/* Vertical bar */}
          <div
            style={{
              position: 'absolute',
              width: '48px',
              height: '140px',
              backgroundColor: '#FFFFFF',
              borderRadius: '4px',
            }}
          />
        </div>

        {/* Text Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            SWISS LIQUIDITY
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            GATEWAY
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: '#6B7280',
              marginTop: '24px',
            }}
          >
            CHF Stablecoin Infrastructure for Aave v4
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '32px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: '#E53935',
                borderRadius: '2px',
              }}
            />
            <span style={{ fontSize: '18px', color: '#9CA3AF' }}>
              Investment Deck v1.0
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
