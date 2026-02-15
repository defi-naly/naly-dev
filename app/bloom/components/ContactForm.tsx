'use client';

import { useState, FormEvent } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [formState, setFormState] = useState<FormState>('idle');

  function validate() {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }
    if (!message.trim()) newErrors.message = 'Tell us what you\'re building';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');

    try {
      const res = await fetch('/api/bloom/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setFormState('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setFormState('error');
    }
  }

  if (formState === 'success') {
    return (
      <div className="contact-form" style={{ textAlign: 'center', padding: '2rem 0' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '0.75rem' }}>
          Received.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
          We&apos;ll be in touch within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-row">
        <div className="contact-field">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: undefined })); }}
            className={errors.name ? 'contact-input error' : 'contact-input'}
            disabled={formState === 'submitting'}
          />
          {errors.name && <span className="contact-error">{errors.name}</span>}
        </div>
        <div className="contact-field">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
            className={errors.email ? 'contact-input error' : 'contact-input'}
            disabled={formState === 'submitting'}
          />
          {errors.email && <span className="contact-error">{errors.email}</span>}
        </div>
      </div>
      <div className="contact-field">
        <textarea
          placeholder="What are you building?"
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(prev => ({ ...prev, message: undefined })); }}
          className={errors.message ? 'contact-input contact-textarea error' : 'contact-input contact-textarea'}
          rows={4}
          disabled={formState === 'submitting'}
        />
        {errors.message && <span className="contact-error">{errors.message}</span>}
      </div>
      {formState === 'error' && (
        <p className="contact-error" style={{ marginBottom: '1rem', textAlign: 'center' }}>
          Something went wrong. Try again or email hello@bloom.studio directly.
        </p>
      )}
      <button
        type="submit"
        className="cta-button contact-submit"
        disabled={formState === 'submitting'}
        style={formState === 'submitting' ? { opacity: 0.6 } : undefined}
      >
        {formState === 'submitting' ? 'Sending...' : 'Book an Assessment'}
      </button>
    </form>
  );
}
