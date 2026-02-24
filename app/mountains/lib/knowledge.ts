import { DomainId, domains, Domain } from '../data/domains';
import { SRSCard, getDueCards, toDateString, isCardDue } from './srs';
import { ModuleMastery, createModuleMastery, getModuleStrength, updatePhase } from './mastery';

const STORAGE_KEY = 'mountains-knowledge-v2';
const OLD_STORAGE_KEY = 'mountains-progress';

export interface ReviewStats {
  currentStreak: number;
  longestStreak: number;
  lastReviewDate: string | null;    // ISO date
  reviewHistory: Record<string, number>;  // date → cards reviewed count (last 90 days)
  totalReviews: number;
}

export interface KnowledgeState {
  modules: Record<string, ModuleMastery>;  // key: `${domain}-${moduleSlug}`
  cards: SRSCard[];
  stats: ReviewStats;
  version: number;
}

function moduleKey(domain: DomainId, slug: string): string {
  return `${domain}-${slug}`;
}

function getDefaultStats(): ReviewStats {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastReviewDate: null,
    reviewHistory: {},
    totalReviews: 0,
  };
}

export function createDefaultState(): KnowledgeState {
  const modules: Record<string, ModuleMastery> = {};

  for (const domain of domains) {
    for (const mod of domain.modules) {
      const key = moduleKey(domain.id, mod.slug);
      modules[key] = createModuleMastery(domain.id, mod.id, mod.slug, 'locked');
    }
  }

  return {
    modules,
    cards: [],
    stats: getDefaultStats(),
    version: 2,
  };
}

export function loadKnowledge(): KnowledgeState {
  if (typeof window === 'undefined') return createDefaultState();

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as KnowledgeState;
    }

    // Try migration from old format
    const old = localStorage.getItem(OLD_STORAGE_KEY);
    if (old) {
      return migrateFromOldProgress(JSON.parse(old));
    }
  } catch {
    // Ignore parse errors
  }

  return createDefaultState();
}

export function saveKnowledge(state: KnowledgeState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore
  }
}

// Migration from old mountains-progress format
interface OldDomainProgress {
  completedModules: number[];
}

interface OldAllProgress {
  weather: OldDomainProgress;
  avalanche: OldDomainProgress;
  flying: OldDomainProgress;
}

function migrateFromOldProgress(old: OldAllProgress): KnowledgeState {
  const state = createDefaultState();

  for (const domain of domains) {
    const domainId = domain.id as DomainId;
    const completedIds = old[domainId]?.completedModules || [];

    for (const modId of completedIds) {
      const mod = domain.modules.find(m => m.id === modId);
      if (!mod) continue;

      const key = moduleKey(domainId, mod.slug);
      state.modules[key] = {
        ...state.modules[key],
        phase: 'reviewing',
        completedAt: toDateString(new Date()),
      };
    }
  }

  // Cards will be generated lazily when the card generator is called
  saveKnowledge(state);
  return state;
}

// Module operations
export function startModule(state: KnowledgeState, domain: DomainId, slug: string): KnowledgeState {
  const key = moduleKey(domain, slug);
  const mod = state.modules[key];
  if (!mod || mod.phase !== 'locked') return state;

  const updated = { ...state, modules: { ...state.modules } };
  updated.modules[key] = { ...mod, phase: 'learning' };
  saveKnowledge(updated);
  return updated;
}

export function completeModule(
  state: KnowledgeState,
  domain: DomainId,
  slug: string,
  newCards: SRSCard[],
): KnowledgeState {
  const key = moduleKey(domain, slug);
  const mod = state.modules[key];
  if (!mod) return state;

  const updated = {
    ...state,
    modules: { ...state.modules },
    cards: [...state.cards],
  };

  // Add new cards (avoid duplicates)
  const existingIds = new Set(updated.cards.map(c => c.id));
  for (const card of newCards) {
    if (!existingIds.has(card.id)) {
      updated.cards.push(card);
    }
  }

  updated.modules[key] = {
    ...mod,
    phase: 'reviewing',
    completedAt: mod.completedAt || toDateString(new Date()),
    cardIds: newCards.map(c => c.id),
  };

  saveKnowledge(updated);
  return updated;
}

export function updateCardAfterReview(state: KnowledgeState, updatedCard: SRSCard): KnowledgeState {
  const updated = {
    ...state,
    cards: state.cards.map(c => c.id === updatedCard.id ? updatedCard : c),
    modules: { ...state.modules },
  };

  // Update module phase based on new card strengths
  const key = moduleKey(updatedCard.domain, updatedCard.moduleSlug);
  const mod = updated.modules[key];
  if (mod) {
    updated.modules[key] = updatePhase(mod, updated.cards);
  }

  saveKnowledge(updated);
  return updated;
}

export function recordReviewSession(state: KnowledgeState, cardsReviewed: number): KnowledgeState {
  const today = toDateString(new Date());
  const updated = {
    ...state,
    stats: { ...state.stats },
  };

  // Update review history
  updated.stats.reviewHistory = { ...updated.stats.reviewHistory };
  updated.stats.reviewHistory[today] = (updated.stats.reviewHistory[today] || 0) + cardsReviewed;
  updated.stats.totalReviews += cardsReviewed;

  // Update streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toDateString(yesterday);

  if (updated.stats.lastReviewDate === yesterdayStr || updated.stats.lastReviewDate === today) {
    if (updated.stats.lastReviewDate !== today) {
      updated.stats.currentStreak += 1;
    }
  } else {
    updated.stats.currentStreak = 1;
  }

  if (updated.stats.currentStreak > updated.stats.longestStreak) {
    updated.stats.longestStreak = updated.stats.currentStreak;
  }

  updated.stats.lastReviewDate = today;

  // Prune old review history (keep 90 days)
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);
  const cutoffStr = toDateString(cutoff);
  for (const date of Object.keys(updated.stats.reviewHistory)) {
    if (date < cutoffStr) {
      delete updated.stats.reviewHistory[date];
    }
  }

  saveKnowledge(updated);
  return updated;
}

// Readiness scoring
export function getDomainStrength(state: KnowledgeState, domainId: DomainId): number {
  const domain = domains.find(d => d.id === domainId);
  if (!domain) return 0;

  let totalStrength = 0;
  let moduleCount = 0;

  for (const mod of domain.modules) {
    const key = moduleKey(domainId, mod.slug);
    const mastery = state.modules[key];
    if (!mastery) continue;

    moduleCount++;
    totalStrength += getModuleStrength(mastery, state.cards);
  }

  return moduleCount > 0 ? Math.round(totalStrength / moduleCount) : 0;
}

export function getReadinessScore(state: KnowledgeState): number {
  const domainWeights = domains.map(d => getDomainStrength(state, d.id));
  const avgStrength = domainWeights.reduce((a, b) => a + b, 0) / domainWeights.length;

  // Penalize by overdue cards
  const dueCards = getDueCards(state.cards);
  const overduePenalty = Math.min(dueCards.length * 2, 20); // Max 20 point penalty

  return Math.max(0, Math.round(avgStrength - overduePenalty));
}

export function getDueCardCount(state: KnowledgeState): number {
  return getDueCards(state.cards).length;
}

export function getCompletedModuleCount(state: KnowledgeState, domainId?: DomainId): number {
  return Object.values(state.modules).filter(m => {
    if (domainId && m.domain !== domainId) return false;
    return m.completedAt !== null;
  }).length;
}

export function getModuleMastery(state: KnowledgeState, domain: DomainId, slug: string): ModuleMastery | undefined {
  return state.modules[moduleKey(domain, slug)];
}

// Check if streak is still active (called on load)
export function validateStreak(state: KnowledgeState): KnowledgeState {
  if (!state.stats.lastReviewDate) return state;

  const today = toDateString(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toDateString(yesterday);

  // If last review was before yesterday, streak is broken
  if (state.stats.lastReviewDate < yesterdayStr) {
    const updated = {
      ...state,
      stats: { ...state.stats, currentStreak: 0 },
    };
    saveKnowledge(updated);
    return updated;
  }

  return state;
}
