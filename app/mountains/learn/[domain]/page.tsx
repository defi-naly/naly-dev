'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import MountainsNav from '../../components/MountainsNav';
import ModuleWrapper from '../../components/ModuleWrapper';
import ProgressTracker from '../../components/ProgressTracker';
import { getDomain, DomainId, TOTAL_MODULES_PER_DOMAIN } from '../../data/domains';
import { loadKnowledge, saveKnowledge, completeModule, startModule, getModuleMastery, KnowledgeState } from '../../lib/knowledge';
import { generateCardsForModule } from '../../lib/cardGenerator';
import { getModuleStrength, getPhaseLabel } from '../../lib/mastery';
import { Check } from 'lucide-react';

// Weather modules
import AtmosphericLayerExplorer from '../../components/weather/AtmosphericLayerExplorer';
import PressureSystemAnimator from '../../components/weather/PressureSystemAnimator';
import FrontPassageTimeline from '../../components/weather/FrontPassageTimeline';
import ThermalTriggerSimulator from '../../components/weather/ThermalTriggerSimulator';
import LapseRateCalculator from '../../components/weather/LapseRateCalculator';
import CloudTypeIdentifier from '../../components/weather/CloudTypeIdentifier';
import ValleyWindCycleAnimator from '../../components/weather/ValleyWindCycleAnimator';
import MountainWaveVisualizer from '../../components/weather/MountainWaveVisualizer';
import ConvergenceZoneFinder from '../../components/weather/ConvergenceZoneFinder';
import ThunderstormDecisionTree from '../../components/weather/ThunderstormDecisionTree';

// Avalanche modules
import AvalancheTriangle from '../../components/avalanche/AvalancheTriangle';
import SlabPhysics from '../../components/avalanche/SlabPhysics';
import SlopeAngleAnalyzer from '../../components/avalanche/SlopeAngleAnalyzer';
import TerrainTrapIdentifier from '../../components/avalanche/TerrainTrapIdentifier';
import SnowpackLayerBuilder from '../../components/avalanche/SnowpackLayerBuilder';
import StabilityTestSimulator from '../../components/avalanche/StabilityTestSimulator';
import WeatherLoadingSimulator from '../../components/avalanche/WeatherLoadingSimulator';
import HumanFactorsScenarios from '../../components/avalanche/HumanFactorsScenarios';
import DecisionFramework from '../../components/avalanche/DecisionFramework';
import CompanionRescueTimer from '../../components/avalanche/CompanionRescueTimer';

// Flying modules
import SoaringFundamentals from '../../components/flying/SoaringFundamentals';
import ReadingTheSky from '../../components/flying/ReadingTheSky';
import ThermalEntry from '../../components/flying/ThermalEntry';
import CenteringGame from '../../components/flying/CenteringGame';
import ClimbingToCloudbase from '../../components/flying/ClimbingToCloudbase';
import ValleyFlying from '../../components/flying/ValleyFlying';
import SpeedToFly from '../../components/flying/SpeedToFly';
import XCTactics from '../../components/flying/XCTactics';
import ConvergenceSeaBreeze from '../../components/flying/ConvergenceSeaBreeze';
import BetweenThermals from '../../components/flying/BetweenThermals';

const toolComponents: Record<string, React.ComponentType<{ onComplete: () => void }>> = {
  // Weather
  AtmosphericLayerExplorer,
  PressureSystemAnimator,
  FrontPassageTimeline,
  ThermalTriggerSimulator,
  LapseRateCalculator,
  CloudTypeIdentifier,
  ValleyWindCycleAnimator,
  MountainWaveVisualizer,
  ConvergenceZoneFinder,
  ThunderstormDecisionTree,
  // Avalanche
  AvalancheTriangle,
  SlabPhysics,
  SlopeAngleAnalyzer,
  TerrainTrapIdentifier,
  SnowpackLayerBuilder,
  StabilityTestSimulator,
  WeatherLoadingSimulator,
  HumanFactorsScenarios,
  DecisionFramework,
  CompanionRescueTimer,
  // Flying
  SoaringFundamentals,
  ReadingTheSky,
  ThermalEntry,
  CenteringGame,
  ClimbingToCloudbase,
  ValleyFlying,
  SpeedToFly,
  XCTactics,
  ConvergenceSeaBreeze,
  BetweenThermals,
};

type PageState = 'overview' | 'module';

export default function DomainPage() {
  const params = useParams();
  const domainId = params.domain as DomainId;
  const domain = getDomain(domainId);

  const [pageState, setPageState] = useState<PageState>('overview');
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [moduleComplete, setModuleComplete] = useState(false);
  const [showTakeaway, setShowTakeaway] = useState(false);
  const [knowledge, setKnowledge] = useState<KnowledgeState | null>(null);

  useEffect(() => {
    setKnowledge(loadKnowledge());
  }, []);

  const handleStartModule = useCallback((moduleId: number) => {
    const mod = domain?.modules.find(m => m.id === moduleId);
    if (!mod || !knowledge) return;

    // Mark module as learning if locked
    const mastery = getModuleMastery(knowledge, domainId, mod.slug);
    if (mastery?.phase === 'locked') {
      setKnowledge(startModule(knowledge, domainId, mod.slug));
    }

    setActiveModuleId(moduleId);
    setPageState('module');
    setModuleComplete(false);
    setShowTakeaway(false);
    window.scrollTo(0, 0);
  }, [domain, domainId, knowledge]);

  const handleModuleComplete = useCallback(() => {
    setModuleComplete(true);
    setShowTakeaway(true);
    if (activeModuleId !== null && knowledge) {
      const mod = domain?.modules.find(m => m.id === activeModuleId);
      if (mod) {
        const cards = generateCardsForModule(domainId, mod.slug);
        const updated = completeModule(knowledge, domainId, mod.slug, cards);
        setKnowledge(updated);
      }
    }
  }, [activeModuleId, domain, domainId, knowledge]);

  const handleContinue = useCallback(() => {
    if (activeModuleId !== null && activeModuleId < TOTAL_MODULES_PER_DOMAIN) {
      const nextId = activeModuleId + 1;
      const nextMod = domain?.modules.find(m => m.id === nextId);
      if (nextMod && knowledge) {
        const mastery = getModuleMastery(knowledge, domainId, nextMod.slug);
        if (mastery?.phase === 'locked') {
          setKnowledge(startModule(knowledge, domainId, nextMod.slug));
        }
      }
      setActiveModuleId(nextId);
      setModuleComplete(false);
      setShowTakeaway(false);
      window.scrollTo(0, 0);
    } else {
      setPageState('overview');
      setActiveModuleId(null);
    }
  }, [activeModuleId, domain, domainId, knowledge]);

  const handleBack = useCallback(() => {
    setPageState('overview');
    setActiveModuleId(null);
  }, []);

  if (!domain) {
    return (
      <>
        <MountainsNav />
        <main className="mt-main">
          <div className="mt-container" style={{ paddingTop: '6rem' }}>
            <p style={{ color: 'var(--mt-muted)' }}>Domain not found.</p>
          </div>
        </main>
      </>
    );
  }

  const activeModule = domain.modules.find(m => m.id === activeModuleId);

  const renderModuleContent = () => {
    if (!activeModule) return null;
    const Component = toolComponents[activeModule.tool];
    if (!Component) return null;
    return <Component onComplete={handleModuleComplete} />;
  };

  const getCompletedModules = (): number[] => {
    if (!knowledge) return [];
    return domain.modules
      .filter(m => knowledge.modules[`${domainId}-${m.slug}`]?.completedAt)
      .map(m => m.id);
  };

  const completedModules = getCompletedModules();

  return (
    <>
      <div className="mt-bg">
        <div className="mt-bg-topo" />
        <div className="mt-bg-noise" />
        <div className="mt-bg-vignette" />
      </div>

      <MountainsNav />

      <main className="mt-main">
        <AnimatePresence mode="wait">
          {pageState === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-container"
            >
              <div className="mt-domain-header">
                <div className="mt-domain-header-tag" style={{ color: domain.accent }}>
                  {domain.book}
                </div>
                <h1 style={{ color: domain.accent }}>{domain.name}</h1>
                <div className="mt-domain-header-meta">
                  {domain.author}
                </div>
              </div>

              <ProgressTracker
                completed={completedModules.length}
                total={TOTAL_MODULES_PER_DOMAIN}
                accent={domain.accent}
              />

              <div className="mt-module-list" style={{ marginTop: '1rem', paddingBottom: '4rem' }}>
                {domain.modules.map((mod, i) => {
                  const done = completedModules.includes(mod.id);
                  const mastery = knowledge?.modules[`${domainId}-${mod.slug}`];
                  const strength = mastery ? getModuleStrength(mastery, knowledge!.cards) : 0;
                  const phase = mastery ? getPhaseLabel(mastery.phase) : '';

                  return (
                    <motion.button
                      key={mod.id}
                      className={`mt-module-item ${done ? 'completed' : ''}`}
                      style={done ? { borderLeftColor: domain.accent } : undefined}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleStartModule(mod.id)}
                    >
                      <div className="mt-module-number">{String(mod.id).padStart(2, '0')}</div>
                      <div className="mt-module-info">
                        <div className="mt-module-title">{mod.title}</div>
                        <div className="mt-module-concept">{mod.concept}</div>
                      </div>
                      {done && strength > 0 && (
                        <div className="mt-module-strength" style={{ color: domain.accent }}>
                          {strength}%
                        </div>
                      )}
                      <div className="mt-module-badge">{mod.difficulty}</div>
                      <div
                        className={`mt-module-check ${done ? 'done' : ''}`}
                        style={done ? { borderColor: domain.accent, background: domain.accent } : undefined}
                      >
                        {done && <Check size={12} style={{ color: 'var(--mt-void)' }} />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {pageState === 'module' && activeModule && (
            <ModuleWrapper
              key={`module-${activeModuleId}`}
              module={activeModule}
              currentModule={activeModuleId!}
              totalModules={TOTAL_MODULES_PER_DOMAIN}
              domainId={domainId}
              domainAccent={domain.accent}
              isComplete={moduleComplete}
              showTakeaway={showTakeaway}
              onContinue={handleContinue}
              onBack={handleBack}
            >
              {renderModuleContent()}
            </ModuleWrapper>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
