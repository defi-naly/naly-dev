'use client';

import MotionReveal from '../MotionReveal';
import ContactForm from '../ContactForm';

export default function MethodCTA() {
  return (
    <div className="method-cta">
      <MotionReveal>
        <h2>Tell us what you&apos;re <span className="highlight">building</span>.</h2>
        <p>We&apos;ll tell you if the method fits.</p>
        <ContactForm />
        <p className="cta-subtext">One conversation. No slides. No proposals.</p>
      </MotionReveal>
    </div>
  );
}
