export interface Film {
  slug: string;
  names: string;
  venue: string;
  location: string;
  vimeoId: string;
  posterImage: string;
  excerpt: string;
}

const placeholder = '/jorge-events/placeholder.jpg';

export const films: Film[] = [
  {
    slug: 'sophie-and-james-film',
    names: 'Sophie & James',
    venue: 'Aynhoe Park',
    location: 'Oxfordshire',
    vimeoId: '000000000',
    posterImage: placeholder,
    excerpt:
      'A sun-drenched celebration at Aynhoe Park. This highlight film captures the laughter, the tears, and the quiet moments in between.',
  },
  {
    slug: 'charlotte-and-hugo-film',
    names: 'Charlotte & Hugo',
    venue: 'Le Manoir aux Quat\'Saisons',
    location: 'Oxfordshire',
    vimeoId: '000000001',
    posterImage: placeholder,
    excerpt:
      'Autumn light filtering through centuries-old gardens. Charlotte and Hugo\'s film is a study in understated emotion.',
  },
  {
    slug: 'elena-and-marcus-film',
    names: 'Elena & Marcus',
    venue: 'Babington House',
    location: 'Somerset',
    vimeoId: '000000002',
    posterImage: placeholder,
    excerpt:
      'A weekend of celebration, captured in five minutes. Late-night swimming, fireside speeches, and a love story told in motion.',
  },
  {
    slug: 'priya-and-daniel-film',
    names: 'Priya & Daniel',
    venue: 'The Savoy',
    location: 'London',
    vimeoId: '000000003',
    posterImage: placeholder,
    excerpt:
      'Two cultures, one love, and a ceremony at one of London\'s most iconic hotels. This film captures the energy of a day that bridged worlds.',
  },
];
