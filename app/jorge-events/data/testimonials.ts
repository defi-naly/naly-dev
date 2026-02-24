export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'My mum called me three days later, sobbing. She\'d been looking at a photograph of herself watching me walk down the aisle — and had no idea her face looked like that. She said, "Now I know how much I love you."',
    name: 'Sophie & James',
    detail: 'Aynhoe Park, Oxfordshire \u2014 Summer 2024',
  },
  {
    quote:
      'There\'s a photo of Daniel and me behind the chapel, just the two of us, foreheads together, not speaking. We didn\'t know anyone was there. When we saw it, we both went quiet. That image is the truest thing from our entire wedding.',
    name: 'Priya & Daniel',
    detail: 'The Savoy, London \u2014 Autumn 2023',
    featured: true,
  },
  {
    quote:
      'We expected beautiful pictures. What we didn\'t expect was to watch our film and feel everything again — the nervousness, the joy, the moment Hugo\'s voice cracked during his vows. Our wedding planner cried. It\'s the most precious thing we own.',
    name: 'Charlotte & Hugo',
    detail: 'Le Manoir aux Quat\'Saisons \u2014 Spring 2024',
  },
  {
    quote:
      'Working with siblings who share that kind of creative shorthand is something else entirely. They move together like one person — and somehow they\'re always exactly where the feeling is. You never have to explain what you want. They just know.',
    name: 'Elena & Marcus',
    detail: 'Babington House, Somerset \u2014 Summer 2023',
  },
];
