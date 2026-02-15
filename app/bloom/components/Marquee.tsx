'use client';

const items = [
  'DEFI',
  'PRIVACY',
  'INFRASTRUCTURE',
  'ZCASH',
  'INNOVATION',
  'BLOOM',
  'TIPZ',
  'BUILDERS',
];

export default function Marquee() {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
