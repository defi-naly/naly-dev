export type GalleryCategory = 'wedding' | 'editorial' | 'event';

export interface GalleryItem {
  slug: string;
  names: string;
  venue: string;
  location: string;
  date: string;
  category: GalleryCategory;
  heroImage: string;
  excerpt: string;
  testimonial?: {
    quote: string;
    attribution: string;
  };
  images: string[];
}

// Placeholder images — replace with real assets
const placeholder = '/jorge-events/placeholder.jpg';

export const galleries: GalleryItem[] = [
  {
    slug: 'sophie-and-james',
    names: 'Sophie & James',
    venue: 'Aynhoe Park',
    location: 'Oxfordshire',
    date: '2024-06-15',
    category: 'wedding',
    heroImage: placeholder,
    excerpt:
      'A sun-drenched celebration at one of England\'s most iconic country houses. Sophie and James wanted their day to feel like a gathering of old friends — unhurried, joyful, and full of laughter.',
    testimonial: {
      quote:
        'Jojo and George didn\'t just photograph our wedding. They captured the feeling of it.',
      attribution: 'Sophie & James',
    },
    images: Array(18).fill(placeholder),
  },
  {
    slug: 'priya-and-daniel',
    names: 'Priya & Daniel',
    venue: 'The Savoy',
    location: 'London',
    date: '2024-03-22',
    category: 'wedding',
    heroImage: placeholder,
    excerpt:
      'An intimate ceremony at one of London\'s grand dames, followed by a reception that brought together two cultures, three languages, and more joy than one room should hold.',
    images: Array(20).fill(placeholder),
  },
  {
    slug: 'charlotte-and-hugo',
    names: 'Charlotte & Hugo',
    venue: 'Le Manoir aux Quat\'Saisons',
    location: 'Oxfordshire',
    date: '2023-09-08',
    category: 'wedding',
    heroImage: placeholder,
    excerpt:
      'Autumnal light, a Michelin-starred venue, and a couple whose elegance was matched only by their warmth. This wedding was a masterclass in understated luxury.',
    testimonial: {
      quote: 'The film made us cry. Our parents cried. Even our wedding planner cried.',
      attribution: 'Charlotte & Hugo',
    },
    images: Array(22).fill(placeholder),
  },
  {
    slug: 'elena-and-marcus',
    names: 'Elena & Marcus',
    venue: 'Babington House',
    location: 'Somerset',
    date: '2024-08-10',
    category: 'wedding',
    heroImage: placeholder,
    excerpt:
      'A weekend wedding at the Soho House countryside estate. Elena and Marcus filled two days with their closest friends, late-night swimming, and spontaneous speeches by the fire.',
    images: Array(16).fill(placeholder),
  },
  {
    slug: 'amara-and-tobias',
    names: 'Amara & Tobias',
    venue: 'Kew Gardens',
    location: 'London',
    date: '2023-05-20',
    category: 'wedding',
    heroImage: placeholder,
    excerpt:
      'Botanical beauty meets urban sophistication. Amara and Tobias married surrounded by rare orchids and palm trees in one of London\'s most extraordinary settings.',
    images: Array(19).fill(placeholder),
  },
  {
    slug: 'isabella-and-oliver',
    names: 'Isabella & Oliver',
    venue: 'Cliveden House',
    location: 'Berkshire',
    date: '2024-07-27',
    category: 'wedding',
    heroImage: placeholder,
    excerpt:
      'A black-tie affair at the stately home where a prince once courted an American actress. Isabella and Oliver wrote their own history in its gilded rooms.',
    images: Array(24).fill(placeholder),
  },
  {
    slug: 'cartier-london',
    names: 'Cartier',
    venue: 'New Bond Street',
    location: 'London',
    date: '2024-01-18',
    category: 'event',
    heroImage: placeholder,
    excerpt:
      'Private collection launch for Cartier at their New Bond Street flagship. An evening of precision, sparkle, and quiet luxury.',
    images: Array(12).fill(placeholder),
  },
  {
    slug: 'tatler-editorial',
    names: 'Tatler Editorial',
    venue: 'The Connaught',
    location: 'London',
    date: '2023-11-05',
    category: 'editorial',
    heroImage: placeholder,
    excerpt:
      'A commissioned editorial for Tatler magazine, shot on location at The Connaught Hotel in Mayfair.',
    images: Array(10).fill(placeholder),
  },
];

export const featuredSlugs = [
  'sophie-and-james',
  'priya-and-daniel',
  'charlotte-and-hugo',
  'elena-and-marcus',
  'amara-and-tobias',
  'isabella-and-oliver',
];
