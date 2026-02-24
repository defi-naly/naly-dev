import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="je-footer">
      <div className="je-container">
        <div className="je-footer-grid">
          <div>
            <div className="je-footer-brand">Jorge Events</div>
            <p className="je-footer-tagline">
              Documentary wedding photography and cinematography by siblings Jojo and George.
              Based in the UK, available worldwide.
            </p>
            <p className="je-footer-credential">
              National Geographic Grand Prize Winner &middot; Vogue Published
            </p>
            <div className="je-footer-social" style={{ marginTop: '1.5rem' }}>
              <a
                href="https://instagram.com/jorgeevents"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://vimeo.com/jorgeevents"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vimeo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 7.42c-.1 2.07-1.54 4.9-4.33 8.5C14.78 19.66 12.3 21.5 10.23 21.5c-1.28 0-2.37-1.18-3.26-3.55L5.4 12.6C4.8 10.23 4.15 9.04 3.44 9.04c-.16 0-.72.34-1.68 1.01L.7 8.68c1.06-.93 2.1-1.86 3.14-2.8 1.41-1.22 2.47-1.86 3.18-1.93 1.67-.16 2.7 0.98 3.08 3.42.41 2.63.7 4.27.85 4.9.47 2.14.99 3.21 1.56 3.21.44 0 1.1-.7 1.98-2.1.88-1.4 1.35-2.46 1.42-3.2.12-1.22-.35-1.83-1.43-1.83-.51 0-1.03.12-1.57.35 1.04-3.42 3.04-5.08 5.98-5C20.77 3.77 22.12 5.02 22 7.42z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="je-footer-col">
            <h4>Explore</h4>
            <Link href="/jorge-events/portfolio">Portfolio</Link>
            <Link href="/jorge-events/films">Films</Link>
            <Link href="/jorge-events/journal">Journal</Link>
          </div>
          <div className="je-footer-col">
            <h4>Information</h4>
            <Link href="/jorge-events/about">About</Link>
            <Link href="/jorge-events/services">Services</Link>
            <Link href="/jorge-events/faq">FAQ</Link>
            <Link href="/jorge-events/contact">Contact</Link>
          </div>
        </div>
        <div className="je-footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jorge Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
