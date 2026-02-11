// Footer occupies global 0.92–1.0
const FOOTER_START = 0.92;
const FOOTER_END = 1.0;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function Footer() {
  return <section className="footer-spacer" />;
}

export function FooterOverlay({ progress }: { progress: number }) {
  const fp = clamp((progress - FOOTER_START) / (FOOTER_END - FOOTER_START), 0, 1);

  if (progress < FOOTER_START - 0.02) return null;

  const linksReveal = clamp(fp / 0.30, 0, 1);
  const closingReveal = clamp((fp - 0.40) / 0.30, 0, 1);

  return (
    <div className="footer-overlay">
      <div className="footer-bottom">
        <div className="footer-links" style={{ opacity: linksReveal }}>
          <a href="https://x.com/defi_naly" target="_blank" rel="noopener noreferrer" className="footer-link">@defi_naly</a>
          <span className="footer-link-dot">&middot;</span>
          <a href="https://moneyverse.substack.com" target="_blank" rel="noopener noreferrer" className="footer-link">The Moneyverse</a>
          <span className="footer-link-dot">&middot;</span>
          <a href="https://github.com/defi-naly" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
        </div>
        <p className="footer-closing" style={{ opacity: closingReveal }}>
          the systems that matter are the ones nobody controls
        </p>
      </div>
    </div>
  );
}
