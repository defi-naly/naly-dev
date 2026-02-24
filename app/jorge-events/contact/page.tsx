'use client';

import { Suspense, useState, useEffect, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MotionReveal from '../components/shared/MotionReveal';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  names?: string;
  email?: string;
  date?: string;
  message?: string;
}

const SERVICE_PARAM_MAP: Record<string, string> = {
  photography: 'Photography',
  cinematography: 'Cinematography',
  both: 'Both',
};

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageInner() {
  const searchParams = useSearchParams();
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [venue, setVenue] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [foundUs, setFoundUs] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>('idle');

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && SERVICE_PARAM_MAP[serviceParam]) {
      setServices([SERVICE_PARAM_MAP[serviceParam]]);
    }
  }, [searchParams]);

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!names.trim()) newErrors.names = 'Please enter your names';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!message.trim()) newErrors.message = 'Please tell us about your day';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');

    try {
      const res = await fetch('/api/jorge-events/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          names: names.trim(),
          email: email.trim(),
          weddingDate,
          venue: venue.trim(),
          services,
          foundUs: foundUs.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) throw new Error('Failed');
      setFormState('success');
    } catch {
      setFormState('error');
    }
  }

  if (formState === 'success') {
    return (
      <>
        <Header />
        <section className="je-page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="je-container" style={{ textAlign: 'center' }}>
            <MotionReveal>
              <h1 className="je-heading je-heading-lg">Thank You</h1>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <p className="je-body je-body-lg" style={{ marginTop: '1.5rem', maxWidth: 500, marginInline: 'auto' }}>
                We have received your inquiry and will be in touch within 24 hours.
                In the meantime, you might enjoy browsing our latest work.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.2}>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="/jorge-events/portfolio" className="je-btn je-btn-dark">View Portfolio</a>
                <a href="https://instagram.com/jorgeevents" target="_blank" rel="noopener noreferrer" className="je-btn je-btn-ghost">
                  Follow on Instagram
                </a>
              </div>
            </MotionReveal>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="je-page-hero">
        <div className="je-container">
          <MotionReveal>
            <p className="je-caption">Contact</p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <p className="je-cta-scarcity" style={{ marginTop: '1rem' }}>
              15 weddings per year &mdash; limited availability
            </p>
            <h1 className="je-heading je-heading-xl" style={{ marginTop: '1rem' }}>
              Tell Us About Your Day
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <p className="je-body" style={{ marginTop: '1rem' }}>
              We respond within 24 hours.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container je-contact-grid">

          {/* Form */}
          <MotionReveal>
            <form className="je-form" onSubmit={handleSubmit} noValidate>
              <div className="je-form-row">
                <div className="je-form-field">
                  <label className="je-form-label">Your Names</label>
                  <input
                    type="text"
                    className={`je-form-input ${errors.names ? 'error' : ''}`}
                    placeholder="First & partner's name"
                    value={names}
                    onChange={(e) => { setNames(e.target.value); if (errors.names) setErrors((p) => ({ ...p, names: undefined })); }}
                    disabled={formState === 'submitting'}
                  />
                  {errors.names && <span className="je-form-error">{errors.names}</span>}
                </div>
                <div className="je-form-field">
                  <label className="je-form-label">Email</label>
                  <input
                    type="email"
                    className={`je-form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                    disabled={formState === 'submitting'}
                  />
                  {errors.email && <span className="je-form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="je-form-row">
                <div className="je-form-field">
                  <label className="je-form-label">Wedding Date</label>
                  <input
                    type="date"
                    className="je-form-input"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    disabled={formState === 'submitting'}
                  />
                </div>
                <div className="je-form-field">
                  <label className="je-form-label">Venue / Location</label>
                  <input
                    type="text"
                    className="je-form-input"
                    placeholder="Venue name or area"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    disabled={formState === 'submitting'}
                  />
                </div>
              </div>

              <div className="je-form-field">
                <label className="je-form-label">Services</label>
                <div className="je-form-checkboxes">
                  {['Photography', 'Cinematography', 'Both'].map((s) => (
                    <label key={s} className="je-form-checkbox">
                      <input
                        type="checkbox"
                        checked={services.includes(s)}
                        onChange={() => toggleService(s)}
                        disabled={formState === 'submitting'}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="je-form-field">
                <label className="je-form-label">Tell us about your day</label>
                <textarea
                  className={`je-form-input je-form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="What are you envisioning? Any details you'd like to share..."
                  rows={5}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }}
                  disabled={formState === 'submitting'}
                />
                {errors.message && <span className="je-form-error">{errors.message}</span>}
              </div>

              <div className="je-form-field">
                <label className="je-form-label">How did you find us?</label>
                <input
                  type="text"
                  className="je-form-input"
                  placeholder="Instagram, Google, referral..."
                  value={foundUs}
                  onChange={(e) => setFoundUs(e.target.value)}
                  disabled={formState === 'submitting'}
                />
              </div>

              {formState === 'error' && (
                <p className="je-form-error" style={{ marginBottom: '1rem' }}>
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                className="je-btn je-btn-dark"
                disabled={formState === 'submitting'}
                style={formState === 'submitting' ? { opacity: 0.6 } : undefined}
              >
                {formState === 'submitting' ? 'Sending...' : 'Check Our Availability'}
              </button>
            </form>
          </MotionReveal>

          {/* Testimonial sidebar */}
          <MotionReveal delay={0.2}>
            <div style={{ position: 'sticky', top: '8rem' }}>
              <div style={{ borderLeft: '2px solid var(--je-accent)', paddingLeft: '1.5rem' }}>
                <p className="je-editorial" style={{ fontSize: 'var(--je-text-lg)', color: 'var(--je-text)', lineHeight: 1.5 }}>
                  &ldquo;Working with siblings who share that kind of creative
                  shorthand is something else entirely. They move together like
                  one person.&rdquo;
                </p>
                <p className="je-caption" style={{ marginTop: '1rem' }}>
                  Elena &amp; Marcus &mdash; Babington House, Summer 2023
                </p>
              </div>

              <div className="je-response-promise" style={{ marginTop: '3rem' }}>
                <p className="je-caption" style={{ marginBottom: '0.75rem' }}>Response Promise</p>
                <p className="je-body">
                  We respond to every inquiry within 24 hours. If your date is
                  available, we&apos;ll send you a custom proposal with full pricing
                  details and arrange a time to chat.
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
