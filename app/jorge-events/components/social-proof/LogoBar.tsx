'use client';

import MotionReveal from '../shared/MotionReveal';

const pressLogos = [
  { name: 'BBC News', file: 'bbc-news.svg' },
  { name: 'CNN', file: 'cnn.svg' },
  { name: 'The Guardian', file: 'the-guardian.svg' },
  { name: 'Vogue', file: 'vogue.svg' },
  { name: 'National Geographic', file: 'national-geographic.svg' },
  { name: 'Tatler', file: 'tatler.svg' },
  { name: 'Condé Nast', file: 'conde-nast.svg' },
];

export default function LogoBar() {
  return (
    <section className="je-credential-bar">
      <div className="je-container-wide">
        <MotionReveal>
          <p className="je-credential-label">As Featured In</p>
          <div className="je-logo-bar">
            {pressLogos.map(({ name, file }) => (
              <img
                key={name}
                src={`/jorge-events/logos/${file}`}
                alt={name}
                className="je-logo-bar-item"
              />
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
