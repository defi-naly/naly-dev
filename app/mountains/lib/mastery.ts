import { DomainId } from '../data/domains';
import { SRSCard, getCardStrength } from './srs';

export type MasteryPhase = 'locked' | 'learning' | 'reviewing' | 'mastered' | 'relearning';

export interface ModuleMastery {
  domain: DomainId;
  moduleId: number;
  moduleSlug: string;
  phase: MasteryPhase;
  completedAt: string | null;     // ISO date when first completed
  cardIds: string[];              // IDs of associated SRS cards
}

export function getModuleStrength(mastery: ModuleMastery, cards: SRSCard[]): number {
  const moduleCards = cards.filter(c => mastery.cardIds.includes(c.id));
  if (moduleCards.length === 0) {
    if (mastery.phase === 'learning') return 5;
    return 0;
  }
  const avg = moduleCards.reduce((sum, c) => sum + getCardStrength(c), 0) / moduleCards.length;
  return Math.round(avg);
}

export function updatePhase(mastery: ModuleMastery, cards: SRSCard[]): ModuleMastery {
  const strength = getModuleStrength(mastery, cards);
  const moduleCards = cards.filter(c => mastery.cardIds.includes(c.id));
  const updated = { ...mastery };

  switch (mastery.phase) {
    case 'locked':
      // Stays locked until explicitly unlocked by starting the module
      break;

    case 'learning':
      // Transition to reviewing once module is completed and cards are generated
      if (mastery.completedAt && mastery.cardIds.length > 0) {
        updated.phase = 'reviewing';
      }
      break;

    case 'reviewing':
      // Transition to mastered when all cards have strength 70+ and interval 30+
      if (moduleCards.length > 0 && moduleCards.every(c => getCardStrength(c) >= 70 && c.interval >= 30)) {
        updated.phase = 'mastered';
      }
      break;

    case 'mastered':
      // Drop to relearning if strength falls below 50
      if (strength < 50) {
        updated.phase = 'relearning';
      }
      break;

    case 'relearning':
      // Back to reviewing once strength recovers above 40
      if (strength >= 40) {
        updated.phase = 'reviewing';
      }
      break;
  }

  return updated;
}

export function createModuleMastery(
  domain: DomainId,
  moduleId: number,
  moduleSlug: string,
  phase: MasteryPhase = 'locked',
): ModuleMastery {
  return {
    domain,
    moduleId,
    moduleSlug,
    phase,
    completedAt: null,
    cardIds: [],
  };
}

export function getPhaseColor(phase: MasteryPhase, strength: number): string {
  switch (phase) {
    case 'locked': return 'var(--mt-border)';
    case 'learning': return 'var(--mt-muted)';
    case 'reviewing':
      if (strength < 30) return 'var(--mt-muted)';
      if (strength < 70) return '#F59E0B'; // amber
      return '#22C55E'; // green
    case 'mastered': return '#22C55E';
    case 'relearning': return 'var(--mt-danger)';
  }
}

export function getPhaseLabel(phase: MasteryPhase): string {
  switch (phase) {
    case 'locked': return 'Not started';
    case 'learning': return 'Learning';
    case 'reviewing': return 'Reviewing';
    case 'mastered': return 'Mastered';
    case 'relearning': return 'Relearning';
  }
}
