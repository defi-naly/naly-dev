'use client';

import { testimonials } from '../../data/testimonials';
import MotionReveal from '../shared/MotionReveal';
import { StaggerContainer, StaggerItem } from '../shared/StaggerContainer';

export default function FeaturedTestimonial() {
  const featured = testimonials.find((t) => t.featured) || testimonials[0];
  const others = testimonials.filter((t) => t !== featured).slice(0, 3);

  return (
    <div>
      <MotionReveal>
        <div className="je-testimonial-featured">
          <span className="je-testimonial-deco-quote" aria-hidden="true">&ldquo;</span>
          <p className="je-testimonial-quote">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <p className="je-testimonial-attribution">
            <span className="je-testimonial-name">{featured.name}</span>
            {' '}&mdash; {featured.detail}
          </p>
        </div>
      </MotionReveal>

      <StaggerContainer className="je-testimonial-carousel">
        {others.map((t) => (
          <StaggerItem key={t.name}>
            <div className="je-testimonial-card">
              <p className="je-testimonial-card-quote">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="je-testimonial-card-name">{t.name}</p>
              <p className="je-testimonial-card-detail">{t.detail}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
