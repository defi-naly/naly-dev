'use client';

import { useState, FormEvent } from 'react';

const SUBSTACK_URL = 'https://moneyverse.substack.com';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email');
      return;
    }
    setError('');
    window.open(
      `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  return (
    <section className="bloom-section newsletter-section">
      <div className="newsletter-content">
        <h3 className="newsletter-headline">
          We write about judgment, systems, and what AI actually changes.
        </h3>
        <p className="newsletter-label">Weekly. No filler.</p>
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter-input-wrapper">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              className={error ? 'contact-input error' : 'contact-input'}
            />
            {error && <span className="contact-error">{error}</span>}
          </div>
          <button type="submit" className="cta-button newsletter-submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
