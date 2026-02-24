import { DomainId } from '../data/domains';

export type CardType = 'concept' | 'application' | 'connection';

export interface SRSCard {
  id: string;                    // `${domain}-${moduleSlug}-${cardType}`
  domain: DomainId;
  moduleSlug: string;
  moduleId: number;
  cardType: CardType;
  question: string;
  answer: string;
  // SM-2 fields
  interval: number;              // Days until next review
  repetitions: number;           // Successful reviews in a row
  easeFactor: number;            // >= 1.3
  nextReview: string;            // ISO date string (YYYY-MM-DD)
  lastReview: string | null;     // ISO date string or null if never reviewed
}

// SM-2 grade scale: 0 (blackout) → 5 (perfect recall)
// Simplified UI: Again=1, Hard=3, Good=4, Easy=5
export type Grade = 0 | 1 | 2 | 3 | 4 | 5;

export function createCard(
  domain: DomainId,
  moduleSlug: string,
  moduleId: number,
  cardType: CardType,
  question: string,
  answer: string,
  initialDueOffset: number = 0,
): SRSCard {
  const now = new Date();
  now.setDate(now.getDate() + initialDueOffset);
  return {
    id: `${domain}-${moduleSlug}-${cardType}`,
    domain,
    moduleSlug,
    moduleId,
    cardType,
    question,
    answer,
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    nextReview: toDateString(now),
    lastReview: null,
  };
}

export function calculateNextReview(card: SRSCard, grade: Grade): SRSCard {
  const updated = { ...card };
  updated.lastReview = toDateString(new Date());

  if (grade < 3) {
    // Failed — reset repetitions, keep easeFactor
    updated.repetitions = 0;
    updated.interval = 1;
  } else {
    // Successful recall
    if (updated.repetitions === 0) {
      updated.interval = 1;
    } else if (updated.repetitions === 1) {
      updated.interval = 6;
    } else {
      updated.interval = Math.round(updated.interval * updated.easeFactor);
    }
    updated.repetitions += 1;
  }

  // Update ease factor (SM-2 formula)
  updated.easeFactor = updated.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (updated.easeFactor < 1.3) updated.easeFactor = 1.3;

  // Set next review date
  const next = new Date();
  next.setDate(next.getDate() + updated.interval);
  updated.nextReview = toDateString(next);

  return updated;
}

export function getCardStrength(card: SRSCard): number {
  // Strength 0-100 based on interval, ease factor, and repetitions
  // A card with interval 30+ days, high ease, many reps = 100
  const intervalScore = Math.min(card.interval / 30, 1) * 50;        // 0-50 from interval
  const easeScore = ((card.easeFactor - 1.3) / (2.5 - 1.3)) * 20;   // 0-20 from ease
  const repScore = Math.min(card.repetitions / 5, 1) * 30;            // 0-30 from reps
  return Math.round(Math.max(0, Math.min(100, intervalScore + easeScore + repScore)));
}

export function isCardDue(card: SRSCard, date?: Date): boolean {
  const today = toDateString(date || new Date());
  return card.nextReview <= today;
}

export function getDueCards(cards: SRSCard[], date?: Date): SRSCard[] {
  return cards
    .filter(c => isCardDue(c, date))
    .sort((a, b) => {
      // Most overdue first
      if (a.nextReview !== b.nextReview) return a.nextReview < b.nextReview ? -1 : 1;
      // Then by card type priority: concept > application > connection
      const typeOrder: Record<CardType, number> = { concept: 0, application: 1, connection: 2 };
      return typeOrder[a.cardType] - typeOrder[b.cardType];
    });
}

export function getOverdueDays(card: SRSCard, date?: Date): number {
  const today = date || new Date();
  const due = new Date(card.nextReview + 'T00:00:00');
  const diff = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}
