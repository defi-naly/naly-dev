import {
  pillars,
  maturityBrackets,
  meadowsHierarchy,
  foundations,
  type PillarId,
  type MaturityId,
  type MeadowsLevel,
  type PillarDefinition,
  type SystemArchetype,
  type AssetId,
  type FoundationDefinition,
} from '../data/method';

// ─── TYPES ───

export interface DimensionScore {
  pillarId: PillarId;
  dimensionName: string;
  score: number | null; // 1–5
  notes: string;
}

export interface PillarScore {
  pillarId: PillarId;
  average: number;
  dimensions: DimensionScore[];
}

export interface DetectedArchetype {
  pillarId: PillarId;
  pillarName: string;
  archetype: SystemArchetype;
  confidence: 'high' | 'medium' | 'low';
}

export interface LeverageRecommendation {
  pillarId: PillarId;
  pillarName: string;
  level: MeadowsLevel;
  levelName: string;
  power: number;
  intervention: string;
  reason: string;
}

export interface DiagnosticResult {
  maturityBracket: MaturityId;
  pillarScores: PillarScore[];
  overallScore: number;
  detectedArchetypes: DetectedArchetype[];
  leverageRecommendations: LeverageRecommendation[];
  grade: string;
  gradeLabel: string;
}

// ─── SCORING ───

export function calculatePillarScores(scores: DimensionScore[]): PillarScore[] {
  return pillars.map((pillar) => {
    const pillarDims = scores.filter((s) => s.pillarId === pillar.id);
    const scored = pillarDims.filter((s) => s.score !== null);
    const avg = scored.length > 0
      ? scored.reduce((sum, s) => sum + (s.score ?? 0), 0) / scored.length
      : 0;

    return {
      pillarId: pillar.id,
      average: Math.round(avg * 10) / 10,
      dimensions: pillarDims,
    };
  });
}

export function calculateOverallScore(pillarScores: PillarScore[]): number {
  const scored = pillarScores.filter((p) => p.average > 0);
  if (scored.length === 0) return 0;
  const avg = scored.reduce((sum, p) => sum + p.average, 0) / scored.length;
  return Math.round(avg * 10) / 10;
}

export function getGrade(score: number): { grade: string; label: string } {
  if (score >= 4.5) return { grade: 'A', label: 'System-Level Advantage' };
  if (score >= 3.5) return { grade: 'B', label: 'Above Average' };
  if (score >= 2.5) return { grade: 'C', label: 'Functional But Fragile' };
  if (score >= 1.5) return { grade: 'D', label: 'Significant Gaps' };
  return { grade: 'F', label: 'Systemic Dysfunction' };
}

// ─── ARCHETYPE DETECTION ───

/**
 * Rule-based archetype detection.
 * Detects which system archetypes are likely active based on scoring patterns.
 */
export function detectArchetypes(
  pillarScores: PillarScore[],
  maturity: MaturityId,
): DetectedArchetype[] {
  const detected: DetectedArchetype[] = [];

  for (const ps of pillarScores) {
    const pillar = pillars.find((p) => p.id === ps.pillarId);
    if (!pillar || ps.average === 0) continue;

    // "Fixes That Fail" — detected when average is low (1–2.5)
    // Indicates surface-level patching without addressing root causes
    if (ps.average <= 2.5) {
      const archetype = pillar.archetypes.find((a) => a.name === 'Fixes That Fail');
      if (archetype) {
        detected.push({
          pillarId: ps.pillarId,
          pillarName: pillar.name,
          archetype,
          confidence: ps.average <= 1.5 ? 'high' : 'medium',
        });
      }
    }

    // "Shifting the Burden" — detected when dimensions are uneven
    // One dimension significantly higher than others suggests over-reliance
    const scores = ps.dimensions.map((d) => d.score ?? 0).filter((s) => s > 0);
    if (scores.length >= 2) {
      const max = Math.max(...scores);
      const min = Math.min(...scores);
      if (max - min >= 2) {
        const archetype = pillar.archetypes.find((a) => a.name === 'Shifting the Burden');
        if (archetype) {
          detected.push({
            pillarId: ps.pillarId,
            pillarName: pillar.name,
            archetype,
            confidence: max - min >= 3 ? 'high' : 'low',
          });
        }
      }
    }

    // Enterprise-specific: low scores in enterprise maturity suggest calcification
    if (maturity === 'enterprise' && ps.average <= 2) {
      // Both archetypes likely active in calcified enterprise systems
      for (const archetype of pillar.archetypes) {
        if (!detected.some((d) => d.pillarId === ps.pillarId && d.archetype.name === archetype.name)) {
          detected.push({
            pillarId: ps.pillarId,
            pillarName: pillar.name,
            archetype,
            confidence: 'medium',
          });
        }
      }
    }
  }

  return detected;
}

// ─── LEVERAGE MAPPING ───

/**
 * Maps pillar scores to Meadows leverage hierarchy.
 * Low scores at different levels indicate where intervention is needed.
 */
export function mapLeverageRecommendations(
  pillarScores: PillarScore[],
  maturity: MaturityId,
): LeverageRecommendation[] {
  const recommendations: LeverageRecommendation[] = [];
  const bracket = maturityBrackets.find((b) => b.id === maturity);

  for (const ps of pillarScores) {
    const pillar = pillars.find((p) => p.id === ps.pillarId);
    if (!pillar || ps.average === 0) continue;

    const bracketDetail = bracket?.pillarDetails.find((d) => d.pillarId === ps.pillarId);

    // Select leverage point based on score
    // Low scores (1-2) → paradigm/structure level (highest leverage)
    // Medium scores (2-3) → feedback level
    // Higher scores (3-4) → parameter level (fine-tuning)
    let targetLevel: MeadowsLevel;
    if (ps.average <= 2) {
      targetLevel = 'paradigm';
    } else if (ps.average <= 3) {
      targetLevel = 'structure';
    } else if (ps.average <= 4) {
      targetLevel = 'feedback';
    } else {
      targetLevel = 'parameters';
    }

    const leveragePoint = pillar.leveragePoints.find((lp) => lp.level === targetLevel);
    const hierarchy = meadowsHierarchy.find((h) => h.level === targetLevel);

    if (leveragePoint && hierarchy) {
      const isPriority = bracketDetail?.priority === 'critical' || bracketDetail?.priority === 'high';

      recommendations.push({
        pillarId: ps.pillarId,
        pillarName: pillar.name,
        level: targetLevel,
        levelName: hierarchy.name,
        power: hierarchy.power,
        intervention: leveragePoint.bloomIntervention,
        reason: isPriority
          ? `${pillar.name} is a ${bracketDetail?.priority} priority for ${bracket?.name}-stage companies. ${leveragePoint.description}`
          : leveragePoint.description,
      });
    }
  }

  // Sort by power descending (highest leverage first)
  return recommendations.sort((a, b) => b.power - a.power);
}

// ─── FULL DIAGNOSTIC ───

export function runDiagnostic(
  scores: DimensionScore[],
  maturity: MaturityId,
): DiagnosticResult {
  const pillarScores = calculatePillarScores(scores);
  const overallScore = calculateOverallScore(pillarScores);
  const { grade, label: gradeLabel } = getGrade(overallScore);
  const detectedArchetypes = detectArchetypes(pillarScores, maturity);
  const leverageRecommendations = mapLeverageRecommendations(pillarScores, maturity);

  return {
    maturityBracket: maturity,
    pillarScores,
    overallScore,
    detectedArchetypes,
    leverageRecommendations,
    grade,
    gradeLabel,
  };
}

// ─── HELPERS ───

export function getPillarById(id: PillarId): PillarDefinition | undefined {
  return pillars.find((p) => p.id === id);
}

export function getInitialScores(): DimensionScore[] {
  return pillars.flatMap((pillar) =>
    pillar.auditDimensions.map((dim) => ({
      pillarId: pillar.id,
      dimensionName: dim.name,
      score: null,
      notes: '',
    }))
  );
}

export const PILLAR_ORDER: PillarId[] = ['strategy', 'marketing', 'sales', 'operations'];

// ============================================================
// DURABLE ASSET DIAGNOSTIC — New Model
// ============================================================

export const ASSET_ORDER: AssetId[] = ['distribution', 'trust', 'judgment'];

export interface AssetDimensionScore {
  assetId: AssetId;
  dimensionName: string;
  score: number | null;
}

export interface AssetScore {
  assetId: AssetId;
  average: number;
  dimensions: AssetDimensionScore[];
}

export interface AssetDiagnosticResult {
  assetScores: AssetScore[];
  overallScore: number;
  grade: string;
  gradeLabel: string;
  weakestFoundation: {
    id: AssetId;
    name: string;
    score: number;
    sprintCTA: string;
  };
}

export function getInitialAssetScores(): AssetDimensionScore[] {
  return foundations.flatMap((asset) =>
    asset.dimensions.map((dim) => ({
      assetId: asset.id,
      dimensionName: dim.name,
      score: null,
    }))
  );
}

export function calculateAssetScores(scores: AssetDimensionScore[]): AssetScore[] {
  return foundations.map((asset) => {
    const assetDims = scores.filter((s) => s.assetId === asset.id);
    const scored = assetDims.filter((s) => s.score !== null);
    const avg = scored.length > 0
      ? scored.reduce((sum, s) => sum + (s.score ?? 0), 0) / scored.length
      : 0;

    return {
      assetId: asset.id,
      average: Math.round(avg * 10) / 10,
      dimensions: assetDims,
    };
  });
}

function getAssetGrade(score: number): { grade: string; label: string } {
  if (score >= 4.5) return { grade: 'A', label: 'Strong Foundation' };
  if (score >= 3.5) return { grade: 'B', label: 'Strong but Exposed' };
  if (score >= 2.5) return { grade: 'C', label: 'Vulnerable to Disruption' };
  if (score >= 1.5) return { grade: 'D', label: 'Critical Gaps' };
  return { grade: 'F', label: 'No Foundation' };
}

export function runAssetDiagnostic(scores: AssetDimensionScore[]): AssetDiagnosticResult {
  const assetScores = calculateAssetScores(scores);
  const scored = assetScores.filter((a) => a.average > 0);
  const overallScore = scored.length > 0
    ? Math.round((scored.reduce((sum, a) => sum + a.average, 0) / scored.length) * 10) / 10
    : 0;
  const { grade, label: gradeLabel } = getAssetGrade(overallScore);

  // Find weakest asset
  const weakest = scored.reduce((min, a) => (a.average < min.average ? a : min), scored[0]);
  const weakestDef = foundations.find((d) => d.id === weakest?.assetId);

  return {
    assetScores,
    overallScore,
    grade,
    gradeLabel,
    weakestFoundation: {
      id: weakest?.assetId ?? 'distribution',
      name: weakestDef?.name ?? 'Distribution',
      score: weakest?.average ?? 0,
      sprintCTA: weakestDef?.sprintCTA ?? 'Start a Sprint',
    },
  };
}

export function getAssetById(id: AssetId): FoundationDefinition | undefined {
  return foundations.find((a) => a.id === id);
}
