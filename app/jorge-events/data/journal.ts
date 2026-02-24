export interface JournalPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  heroImage: string;
  content: string;
}

const placeholder = '/jorge-events/placeholder.jpg';

export const journalPosts: JournalPost[] = [
  {
    slug: 'getting-married-at-aynhoe-park',
    title: 'Getting Married at Aynhoe Park: A Photographer\'s Guide',
    category: 'Venue Guide',
    date: '2024-10-15',
    excerpt:
      'Everything you need to know about one of England\'s most photographed wedding venues, from a team that has shot there more than a dozen times.',
    heroImage: placeholder,
    content: `
Aynhoe Park is one of those rare venues that manages to be both wildly dramatic and deeply intimate. We have photographed more than a dozen weddings here, and each one has felt entirely different.

## The Light

The south-facing orangery floods with warm afternoon light from around 2pm. If your ceremony is here, expect golden tones that need almost no editing. The main hall, by contrast, is moody and atmospheric — perfect for candlelit dinners.

## Our Favourite Spots

The rooftop terrace offers sweeping views across the Cherwell Valley. Most couples don't know about it. We always take ten minutes up there during golden hour.

The grand staircase is the obvious choice for portraits, but the library — with its taxidermy and curious objects — tells a more interesting story.

## Practical Notes

Aynhoe is exclusively yours for the weekend, which means no rush. That freedom is invaluable for photography. We recommend building in buffer time between the ceremony and reception — it's when the best candid moments happen.
    `.trim(),
  },
  {
    slug: 'how-to-choose-wedding-photographer',
    title: 'How to Choose a Wedding Photographer: An Honest Guide',
    category: 'Planning',
    date: '2024-09-28',
    excerpt:
      'Forget the checklist articles. Here is what actually matters when choosing someone to document the most important day of your life.',
    heroImage: placeholder,
    content: `
Choosing a wedding photographer is one of the most personal decisions you will make during planning. The flowers fade. The cake gets eaten. Your photographs are what remain.

## Look Beyond the Portfolio

Every photographer's portfolio shows their best work. That's expected. What matters more is consistency. Ask to see full galleries from recent weddings. Can they sustain quality across an entire day, from getting ready at 7am to the last dance at midnight?

## The Relationship Matters

You will spend more time with your photographer on your wedding day than with any other vendor — possibly more than with each other. Chemistry matters. If a consultation feels stiff or transactional, trust that instinct.

## Documentary vs. Directed

These are genuinely different approaches. Documentary photographers capture the day as it unfolds. Directed photographers create images through posing and staging. Neither is better. But you need to know which one you're booking.

We are firmly in the documentary camp. We believe the real moments are always more powerful than the manufactured ones.

## Questions Worth Asking

- Will you be the one photographing our wedding, or will you send an associate?
- How many weddings do you photograph per year?
- Can we see a full gallery from a recent wedding?
- What happens if you're ill on the day?

## Trust Your Gut

If their work makes you feel something — not just "that's nice" but genuinely moves you — that's your photographer.
    `.trim(),
  },
  {
    slug: 'documentary-wedding-photography-explained',
    title: 'What Documentary Wedding Photography Actually Means',
    category: 'Behind the Lens',
    date: '2024-08-12',
    excerpt:
      'The term is everywhere now. But most people using it don\'t come from a documentary background. Here\'s what it means to us.',
    heroImage: placeholder,
    content: `
Documentary photography has a specific lineage. It comes from photojournalism, from press photography, from the tradition of bearing witness to events as they happen. It is not a marketing label.

## The Principle

The principle is simple: observe, don't direct. A documentary photographer's job is to be present, attentive, and invisible. We don't rearrange the scene. We don't ask you to "just do that again." We don't create moments. We capture them.

## Why It Matters for Weddings

Your wedding day is unrepeatable. Every hug, every glance, every laugh that catches you off guard — these are the moments that matter. And they only happen once.

When a photographer asks you to stage a moment, the original moment is already gone. You can't get it back.

## Our Background

Jojo spent her early career in press and documentary work. She photographed conflict zones, political events, and human stories across four continents. In 2007, she won National Geographic's International Photography Contest Grand Prize for documentary photography.

That training shapes everything about how we approach a wedding. We read rooms. We anticipate moments. We know when to be close and when to step back.

## The Result

Documentary wedding images feel different. They feel alive. They have movement, breath, spontaneity. They look like memories feel.
    `.trim(),
  },
];
