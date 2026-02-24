export interface ServicePackage {
  title: string;
  price: string;
  description: string;
  includes: string[];
  recommended?: boolean;
  slug: string;
}

export const services: ServicePackage[] = [
  {
    title: 'Photography',
    slug: 'photography',
    price: 'From £5,000',
    description:
      'Full-day documentary coverage by Jojo and George. Every moment, every detail, every feeling — captured as it happens.',
    includes: [
      'Pre-wedding consultation',
      'Full-day coverage (no time limits)',
      'Two photographers (Jojo & George)',
      'Preview gallery within two weeks',
      'Full edited gallery (500+ images)',
      'Private online gallery with download',
      'Print-ready high-resolution files',
    ],
  },
  {
    title: 'Cinematography',
    slug: 'cinematography',
    price: 'From £4,500',
    description:
      'Cinematic wedding films that capture the movement, the music, and the emotion that stills alone cannot.',
    includes: [
      'Pre-wedding consultation',
      'Full-day coverage',
      'Highlight film (4-6 minutes)',
      'Full ceremony edit',
      'Full speeches edit',
      'Licensed music',
      'Online delivery in 4K',
    ],
  },
  {
    title: 'Photography & Cinematography',
    slug: 'both',
    price: 'From £8,000',
    recommended: true,
    description:
      'The complete Jorge Events experience. One team, one creative vision, covering every dimension of your day.',
    includes: [
      'Everything in Photography',
      'Everything in Cinematography',
      'Cohesive creative direction',
      'No competing crews on the day',
      'Combined editing workflow',
      'Engagement session included',
      'Priority booking',
    ],
  },
];
