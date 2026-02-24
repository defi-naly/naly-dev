interface StructuredDataProps {
  data: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Jorge Events',
    description:
      'Luxury wedding photography and cinematography by National Geographic Grand Prize winner Jojo and Vogue-published photographer George.',
    url: 'https://jorge-events.com',
    priceRange: '$$$$',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    knowsAbout: [
      'Wedding Photography',
      'Wedding Cinematography',
      'Documentary Photography',
      'Editorial Photography',
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Jojo',
        award: 'National Geographic International Photography Contest Grand Prize',
      },
      {
        '@type': 'Person',
        name: 'George',
        description: 'Vogue-published photographer',
      },
    ],
    sameAs: [
      'https://instagram.com/jorgeevents',
      'https://vimeo.com/jorgeevents',
    ],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function blogPostSchema(post: {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: 'Jorge Events',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jorge Events',
    },
  };
}

export function imageGallerySchema(gallery: {
  names: string;
  venue: string;
  location: string;
  imageCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${gallery.names} Wedding at ${gallery.venue}`,
    description: `Wedding photography at ${gallery.venue}, ${gallery.location} by Jorge Events`,
    numberOfItems: gallery.imageCount,
    creator: {
      '@type': 'Organization',
      name: 'Jorge Events',
    },
  };
}
