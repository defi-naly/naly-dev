// Local image assets (downloaded from jorge-events.com)
const base = '/jorge-events/photos';

export const images = {
  weddingHero: `${base}/01-wedding-hero.jpg`,
  portraitCouple: `${base}/02-couple-portrait.jpg`,
  coupleBW: `${base}/03-couple-bw.jpg`,
  ceremony: `${base}/04-ceremony.jpg`,
  reception: `${base}/05-reception.jpg`,
  detail: `${base}/06-detail.jpg`,
  candid: `${base}/07-candid.jpg`,
  venue: `${base}/08-venue.jpg`,
  moment: `${base}/09-moment.jpg`,
  film: `${base}/10-film.jpg`,
  prep: `${base}/11-prep.jpg`,
  coupleWalk: `${base}/12-couple-walk.jpg`,
  venueNight: `${base}/13-venue-night.jpg`,
  firstDance: `${base}/14-first-dance.jpg`,
  gardenPortrait: `${base}/15-garden-portrait.jpg`,
  ceremonyWide: `${base}/16-ceremony-wide.jpg`,
  receptionMoment: `${base}/17-reception-moment.jpg`,
  bridePortrait: `${base}/18-bride-portrait.jpg`,
  coupleEmbrace: `${base}/19-couple-embrace.jpg`,
  floralDetail: `${base}/20-floral-detail.jpg`,
  filmGrain: `${base}/21-film-grain.jpg`,
  candidLaugh: `${base}/22-candid-laugh.jpg`,
  aboutCover: `${base}/about-cover.jpg`,
  aboutPortrait: `${base}/about-portrait.jpg`,
};

// Cycle through available images for portfolio cards/galleries
export const portfolioImages = [
  images.weddingHero,
  images.portraitCouple,
  images.reception,
  images.ceremony,
  images.coupleBW,
  images.detail,
  images.candid,
  images.venue,
  images.moment,
  images.film,
  images.prep,
  images.coupleWalk,
  images.venueNight,
  images.firstDance,
  images.gardenPortrait,
  images.ceremonyWide,
  images.receptionMoment,
  images.bridePortrait,
  images.coupleEmbrace,
  images.floralDetail,
  images.filmGrain,
  images.candidLaugh,
];

export const galleryImages = [...portfolioImages];
