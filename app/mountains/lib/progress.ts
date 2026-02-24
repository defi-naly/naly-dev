import { DomainId, domains, TOTAL_MODULES_PER_DOMAIN } from '../data/domains';

const STORAGE_KEY = 'mountains-progress';

export interface DomainProgress {
  completedModules: number[];
}

export interface AllProgress {
  weather: DomainProgress;
  avalanche: DomainProgress;
  flying: DomainProgress;
}

function getDefaultProgress(): AllProgress {
  return {
    weather: { completedModules: [] },
    avalanche: { completedModules: [] },
    flying: { completedModules: [] },
  };
}

export function loadProgress(): AllProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as AllProgress;
    }
  } catch {
    // Ignore
  }
  return getDefaultProgress();
}

export function saveProgress(progress: AllProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore
  }
}

export function markModuleComplete(domainId: DomainId, moduleId: number): AllProgress {
  const progress = loadProgress();
  if (!progress[domainId].completedModules.includes(moduleId)) {
    progress[domainId].completedModules.push(moduleId);
    saveProgress(progress);
  }
  return progress;
}

export function isModuleComplete(domainId: DomainId, moduleId: number): boolean {
  const progress = loadProgress();
  return progress[domainId].completedModules.includes(moduleId);
}

export function getDomainCompletionCount(domainId: DomainId): number {
  const progress = loadProgress();
  return progress[domainId].completedModules.length;
}

export function getDomainCompletionPercent(domainId: DomainId): number {
  return Math.round((getDomainCompletionCount(domainId) / TOTAL_MODULES_PER_DOMAIN) * 100);
}

export function getOverallCompletionPercent(): number {
  const total = domains.length * TOTAL_MODULES_PER_DOMAIN;
  const completed = domains.reduce((sum, d) => sum + getDomainCompletionCount(d.id), 0);
  return Math.round((completed / total) * 100);
}

export function resetProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
