'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecisionNode from '../DecisionNode';
import QuizBlock from '../QuizBlock';

interface HumanFactorsScenariosProps {
  onComplete: () => void;
}

interface Scenario {
  id: string;
  title: string;
  heuristic: string;
  heuristicName: string;
  situation: string;
  options: {
    label: string;
    consequence: string;
    correct?: boolean;
  }[];
  debrief: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'familiarity',
    title: 'The Familiar Run',
    heuristic: 'FAMILIARITY',
    heuristicName: 'Familiarity Trap',
    situation:
      "You've skied this run 50 times without incident. The avalanche bulletin says \"Considerable\" danger at alpine elevations, specifically calling out the aspect and elevation band of your favorite run. But you know this slope -- you've never seen it slide.",
    options: [
      {
        label: 'Go -- I know this slope',
        consequence:
          'Past experience on a slope does NOT predict future stability. Snowpack conditions change daily. The avalanche that kills you will be the first one you see on that slope. Familiarity breeds complacency.',
      },
      {
        label: 'Wait for conditions to improve',
        consequence:
          'Good call. When the bulletin specifically calls out your aspect and elevation, waiting is the disciplined choice. The slope will still be there when conditions improve.',
        correct: true,
      },
      {
        label: 'Turn back and choose a lower-angle alternative',
        consequence:
          'Excellent decision. Choosing terrain that matches the conditions shows mature risk management. You can still enjoy the day on safer terrain.',
        correct: true,
      },
    ],
    debrief:
      'The Familiarity Trap is one of the most insidious heuristic biases. Having skied a slope many times without incident creates a false sense of safety. Avalanches are rare events -- a slope can go years between cycles. Your personal history on a slope is statistically irrelevant to today\'s conditions.',
  },
  {
    id: 'commitment',
    title: 'The Long Drive',
    heuristic: 'COMMITMENT',
    heuristicName: 'Commitment Trap',
    situation:
      "You drove 4 hours to get here, the group is already geared up, and you bought an expensive backcountry hut reservation. At the trailhead, you check the updated avalanche bulletin -- it's been upgraded to \"High\" danger overnight due to a surprise wind event. The group is eager to go.",
    options: [
      {
        label: 'Go -- we already invested too much to turn back',
        consequence:
          'The sunk cost fallacy in avalanche terrain is deadly. No amount of money, time, or social pressure is worth your life. \"High\" danger means natural avalanches are likely and human-triggered avalanches are very likely.',
      },
      {
        label: 'Wait at the hut and reassess tomorrow',
        consequence:
          'Strong decision. The hut reservation is still useful. High danger often drops within 24-48 hours as the snowpack adjusts. You can enjoy the hut and tour tomorrow if conditions improve.',
        correct: true,
      },
      {
        label: 'Turn back -- the drive home is worth being alive',
        consequence:
          'The hardest but most correct decision. When danger is High, the entire day should be scratched for avalanche terrain. The drive home is disappointing but the only guaranteed safe option.',
        correct: true,
      },
    ],
    debrief:
      'The Commitment Trap activates when you\'ve invested time, money, or effort into an objective. The sunk cost fallacy makes you feel that turning back "wastes" the investment. But in avalanche terrain, the only wasted trip is the one you don\'t come home from. The 4-hour drive, the hut fee, the gear prep -- none of it changes the snowpack.',
  },
  {
    id: 'expert-halo',
    title: 'The Expert',
    heuristic: 'EXPERT HALO',
    heuristicName: 'Expert Halo Trap',
    situation:
      "The most experienced person in your group -- a certified guide with 20 years of backcountry experience -- takes a quick look at the slope and says \"It looks fine, let's go.\" They didn't dig a pit or check the bulletin this morning. The slope is 38 degrees, north-facing, and loaded with recent wind deposit.",
    options: [
      {
        label: 'Go -- they are the expert',
        consequence:
          'Deferring to authority without critical thinking is dangerous. Even experts make mistakes, especially when they skip their own assessment protocol. Expertise does not override physics.',
      },
      {
        label: 'Wait -- ask the expert to dig a pit first',
        consequence:
          'Good instinct. Requesting that even an expert follow standard assessment protocol is not disrespectful -- it\'s responsible group management. A true expert will welcome the suggestion.',
        correct: true,
      },
      {
        label: 'Turn back -- too many red flags regardless of who says it\'s fine',
        consequence:
          'Correct. 38 degrees, north-facing, wind-loaded, and no formal assessment? These are objective red flags that no amount of expertise can dismiss with a glance. Trust the terrain evidence over any individual\'s opinion.',
        correct: true,
      },
    ],
    debrief:
      'The Expert Halo effect causes people to defer to perceived authority figures without independent evaluation. Even experienced guides have been caught in avalanches. True expertise is demonstrated through process -- checking the bulletin, assessing terrain, digging pits -- not through casual dismissal of obvious danger signs.',
  },
  {
    id: 'social-proof',
    title: 'The Crowd',
    heuristic: 'SOCIAL PROOF',
    heuristicName: 'Social Proof Trap',
    situation:
      "At the popular backcountry access point, you see tracks from three other groups that have already gone up the slope you\'re planning to ski. The avalanche danger is \"Considerable\" and the slope is clearly in the danger zone described in the bulletin. But if three groups went and nothing happened...",
    options: [
      {
        label: 'Go -- three groups already proved it is safe',
        consequence:
          'Other groups skiing a slope does NOT make it safe. It may simply mean the trigger point hasn\'t been hit yet. In fact, multiple groups loading a slope throughout the day can INCREASE the cumulative stress on weak layers. You could be the unlucky trigger.',
      },
      {
        label: 'Wait and observe from a safe spot',
        consequence:
          'Reasonable approach. Observing conditions from a safe distance lets you gather more information. But remember: absence of avalanches does not equal stability.',
        correct: true,
      },
      {
        label: 'Turn back -- other people\'s choices don\'t change the snowpack',
        consequence:
          'Exactly right. The snowpack doesn\'t care how many people have crossed it. The bulletin says Considerable danger on this aspect -- that assessment is based on the physical snowpack, not on a popularity contest.',
        correct: true,
      },
    ],
    debrief:
      'Social Proof is the tendency to assume that if others are doing something, it must be safe. In avalanche terrain, this is particularly dangerous because: (1) those groups may have made the same poor decision, (2) additional loading from multiple groups increases stress on weak layers, and (3) the trigger point is unpredictable -- the 4th group could be the one that releases the slide.',
  },
  {
    id: 'scarcity',
    title: 'The Powder Window',
    heuristic: 'SCARCITY',
    heuristicName: 'Scarcity Trap',
    situation:
      "40cm of fresh powder fell overnight. The avalanche danger is \"Considerable\" with natural avalanches observed on similar aspects. But by tomorrow the powder will be tracked out, and by the day after it will be sun-crusted. This is a once-in-a-season powder day. The clock is ticking.",
    options: [
      {
        label: 'Go -- this powder won\'t last',
        consequence:
          'Scarcity thinking overrides rational risk assessment. Fresh powder after a significant storm is precisely when avalanche danger peaks. The best powder day of your life means nothing if it is your last day.',
      },
      {
        label: 'Wait for the snowpack to stabilize, even if the powder gets tracked',
        consequence:
          'This is the correct call. The snowpack needs time to bond and settle after a big storm. Trading perfect powder for safety is the mark of someone who will ski many more powder days in the future.',
        correct: true,
      },
      {
        label: 'Turn back -- find low-angle terrain for today',
        consequence:
          'Smart compromise. You can still enjoy fresh snow on slopes under 30 degrees where avalanche risk is minimal. The steeps can wait for the danger to drop.',
        correct: true,
      },
    ],
    debrief:
      'The Scarcity Trap exploits our fear of missing out. When something feels rare or time-limited -- fresh powder, a weather window, a once-a-year trip -- our decision-making shifts from analytical to emotional. This is considered the most dangerous heuristic trap because it affects even experienced backcountry travelers who know better but feel the pull of \"now or never.\"',
  },
];

export default function HumanFactorsScenarios({ onComplete }: HumanFactorsScenariosProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [decisions, setDecisions] = useState<(number | null)[]>(Array(SCENARIOS.length).fill(null));
  const [showDebrief, setShowDebrief] = useState(false);
  const [allComplete, setAllComplete] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const scenario = SCENARIOS[currentScenario];
  const hasDecided = decisions[currentScenario] !== null;
  const correctCount = decisions.filter((d, i) => d !== null && SCENARIOS[i].options[d]?.correct).length;

  const handleDecide = useCallback((index: number) => {
    setDecisions(prev => {
      const next = [...prev];
      next[currentScenario] = index;
      return next;
    });
    setTimeout(() => setShowDebrief(true), 300);
  }, [currentScenario]);

  const handleNext = useCallback(() => {
    setShowDebrief(false);
    if (currentScenario < SCENARIOS.length - 1) {
      setTimeout(() => setCurrentScenario(prev => prev + 1), 200);
    } else {
      setAllComplete(true);
      // onComplete is called after quiz
    }
  }, [currentScenario]);

  const handleQuizCorrect = useCallback(() => {
    setQuizPassed(true);
    onComplete();
  }, [onComplete]);

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {!allComplete ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* Progress */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
              }}>
                SCENARIO {currentScenario + 1} OF {SCENARIOS.length}
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {SCENARIOS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: i === currentScenario
                        ? 'var(--mt-avalanche)'
                        : decisions[i] !== null
                          ? (SCENARIOS[i].options[decisions[i]!]?.correct ? '#4ADE80' : 'var(--mt-danger)')
                          : 'var(--mt-border)',
                      transition: 'background 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-module-split">
              {/* Left: Scenario card */}
              <div>
                <div style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1.25rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--mt-bright)',
                    marginBottom: '0.75rem',
                  }}>
                    {scenario.title}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm, 0.875rem)',
                    color: 'var(--mt-muted)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}>
                    {scenario.situation}
                  </p>
                </div>
              </div>

              {/* Right: Decision + Debrief */}
              <div>
                <DecisionNode
                  prompt="What do you do?"
                  options={scenario.options}
                  onDecide={handleDecide}
                />

                {/* Debrief */}
                <AnimatePresence>
                  {showDebrief && hasDecided && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ marginTop: '1.25rem' }}
                    >
                      {/* Heuristic reveal */}
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--mt-border)',
                        borderLeft: '3px solid var(--mt-avalanche)',
                        borderRadius: '0 8px 8px 0',
                        padding: '1rem',
                        marginBottom: '1rem',
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs, 0.75rem)',
                          color: 'var(--mt-avalanche)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase' as const,
                          marginBottom: '0.5rem',
                        }}>
                          HEURISTIC TRAP: {scenario.heuristic}
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm, 0.875rem)',
                          color: 'var(--mt-bright)',
                          lineHeight: 1.7,
                          margin: 0,
                        }}>
                          {scenario.debrief}
                        </p>
                      </div>

                      {/* Next button */}
                      <button
                        onClick={handleNext}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'transparent',
                          border: '1px solid var(--mt-avalanche)',
                          color: 'var(--mt-avalanche)',
                          borderRadius: 8,
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-base, 1rem)',
                          cursor: 'pointer',
                        }}
                      >
                        {currentScenario < SCENARIOS.length - 1
                          ? `Next Scenario (${currentScenario + 2}/${SCENARIOS.length})`
                          : 'View Results'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Score summary */}
          <div style={{
            background: 'var(--mt-surface)',
            border: `1px solid ${correctCount >= 4 ? '#4ADE80' : correctCount >= 2 ? '#F5A623' : 'var(--mt-danger)'}`,
            borderRadius: 8,
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs, 0.75rem)',
              color: 'var(--mt-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              marginBottom: '0.5rem',
            }}>
              YOUR SCORE
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: correctCount >= 4 ? '#4ADE80' : correctCount >= 2 ? '#F5A623' : 'var(--mt-danger)',
              marginBottom: '0.25rem',
            }}>
              {correctCount} / {SCENARIOS.length}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm, 0.875rem)',
              color: 'var(--mt-muted)',
            }}>
              correct decisions
            </div>
          </div>

          {/* Scenario review */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            {SCENARIOS.map((s, i) => {
              const decision = decisions[i];
              const wasCorrect = decision !== null && s.options[decision]?.correct;
              return (
                <div key={s.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 6,
                }}>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: wasCorrect ? '#4ADE80' : 'var(--mt-danger)',
                    flexShrink: 0,
                  }} />
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm, 0.875rem)',
                    color: 'var(--mt-bright)',
                    flex: 1,
                  }}>
                    {s.title}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs, 0.75rem)',
                    color: 'var(--mt-muted)',
                  }}>
                    {s.heuristicName}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quiz */}
          <QuizBlock
            question="Which heuristic trap is considered the most dangerous because it affects even experienced backcountry travelers?"
            options={[
              { text: 'Familiarity -- believing a slope is safe because you have skied it before' },
              { text: 'Commitment -- refusing to turn back after a large investment of time or money' },
              { text: 'Expert Halo -- deferring to an authority figure without independent assessment' },
              { text: 'Scarcity -- making risky decisions because conditions feel rare or time-limited', correct: true },
            ]}
            explanation={'The Scarcity Trap (also called "powder fever") is considered the most dangerous heuristic because it bypasses even well-trained analytical thinking. Experienced backcountry travelers who would never ski a dangerous slope on a normal day find themselves rationalizing risks when the powder is deep and the window is closing. The emotional urgency of "now or never" overrides years of training and discipline.'}
            onCorrect={handleQuizCorrect}
          />

          {quizPassed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                marginTop: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--mt-avalanche)',
                borderRadius: 8,
                padding: '1rem',
                textAlign: 'center',
                color: 'var(--mt-avalanche)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm, 0.875rem)',
              }}
            >
              Module complete. Recognizing heuristic traps is the first defense against poor decisions in avalanche terrain.
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
