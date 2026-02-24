'use client';

import { useState } from 'react';
import MountainsNav from '../components/MountainsNav';
import FieldChecklist from '../components/FieldChecklist';
import FieldDecisionTree from '../components/FieldDecisionTree';
import QuickRefCard from '../components/QuickRefCard';

type Section = 'checklists' | 'decisions' | 'reference';

export default function FieldPage() {
  const [activeSection, setActiveSection] = useState<Section>('checklists');

  return (
    <>
      <MountainsNav />

      <main className="mt-main">
        <div className="mt-container mt-field">
          <div className="mt-domain-header" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
            <h1>Field Companion</h1>
            <div className="mt-domain-header-meta">
              Checklists, decision trees, and quick reference for the mountains
            </div>
          </div>

          {/* Section tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            {(['checklists', 'decisions', 'reference'] as Section[]).map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                style={{
                  padding: '0.6rem 1.2rem',
                  border: `1px solid ${activeSection === s ? 'var(--mt-bright)' : 'var(--mt-border)'}`,
                  background: activeSection === s ? 'rgba(255,255,255,0.06)' : 'transparent',
                  color: activeSection === s ? 'var(--mt-bright)' : 'var(--mt-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Checklists */}
          {activeSection === 'checklists' && (
            <div className="mt-field-sections">
              <div className="mt-field-section">
                <div className="mt-field-section-body">
                  <FieldChecklist
                    title="Pre-Flight Weather Assessment"
                    accent="var(--mt-weather)"
                    items={[
                      { id: 'w1', text: 'Check synoptic situation — fronts, pressure systems, wind direction' },
                      { id: 'w2', text: 'Note surface temperature and dewpoint — calculate cloudbase (LCL)' },
                      { id: 'w3', text: 'Assess atmospheric stability — check lapse rates and inversion levels' },
                      { id: 'w4', text: 'Check wind speed and direction at ridge height and above' },
                      { id: 'w5', text: 'Look for signs of thunderstorm potential — instability + moisture + trigger' },
                      { id: 'w6', text: 'Identify thermal sources — dark surfaces, slopes facing the sun' },
                      { id: 'w7', text: 'Check for mountain wave indicators — strong cross-ridge winds, lenticulars' },
                      { id: 'w8', text: 'Note time of valley wind transitions — morning calm window' },
                    ]}
                  />
                </div>
              </div>

              <div className="mt-field-section">
                <div className="mt-field-section-body">
                  <FieldChecklist
                    title="Avalanche Terrain Evaluation"
                    accent="var(--mt-avalanche)"
                    items={[
                      { id: 'a1', text: 'Check the avalanche bulletin — danger level, problem types, aspects' },
                      { id: 'a2', text: 'Assess slope angle — is the slope in the 30-45° danger zone?' },
                      { id: 'a3', text: 'Identify terrain traps — gullies, cliffs, creek beds, trees below' },
                      { id: 'a4', text: 'Check aspect and elevation against bulletin critical ranges' },
                      { id: 'a5', text: 'Look for signs of recent avalanche activity — crowns, debris, whumpfing' },
                      { id: 'a6', text: 'Assess wind loading — which aspects have received wind-transported snow?' },
                      { id: 'a7', text: 'Consider the human factors — am I being influenced by biases?' },
                      { id: 'a8', text: 'Identify escape routes and safe zones before entering terrain' },
                      { id: 'a9', text: 'Verify all group members have beacons on and searchable' },
                      { id: 'a10', text: 'Set spacing and communication plan for exposed terrain' },
                    ]}
                  />
                </div>
              </div>

              <div className="mt-field-section">
                <div className="mt-field-section-body">
                  <FieldChecklist
                    title="Thermal Day Planning"
                    accent="var(--mt-flying)"
                    items={[
                      { id: 'f1', text: 'Calculate expected cloudbase from temperature and dewpoint' },
                      { id: 'f2', text: 'Estimate trigger temperature and thermal start time' },
                      { id: 'f3', text: 'Identify thermal sources along planned route — dark fields, ridges, towns' },
                      { id: 'f4', text: 'Plan route along energy lines — cloud streets, convergence zones' },
                      { id: 'f5', text: 'Set McCready value based on expected climb rates' },
                      { id: 'f6', text: 'Note sea breeze timing if flying near coast' },
                      { id: 'f7', text: 'Identify landing options along the route every 10km' },
                      { id: 'f8', text: 'Set time limits for overdevelopment / thunderstorm cutoff' },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Decision Trees */}
          {activeSection === 'decisions' && (
            <div className="mt-field-sections">
              <div className="mt-field-section">
                <div className="mt-field-section-body">
                  <FieldDecisionTree
                    title="Should I fly today?"
                    nodes={[
                      {
                        id: 'wind', question: 'Is the wind speed at launch under 25 km/h and within 30° of the ideal direction?',
                        yes: 'stability', noResult: { text: 'Do not fly. Wind conditions are outside safe limits for launch.', safe: false },
                      },
                      {
                        id: 'stability', question: 'Is the atmosphere stable enough? (No CB development, no severe turbulence forecast)',
                        yes: 'thermals', noResult: { text: 'Do not fly. Thunderstorm or severe turbulence risk is too high.', safe: false },
                      },
                      {
                        id: 'thermals', question: 'Are thermals expected to develop? (Surface heating sufficient, no strong inversion)',
                        yes: 'skill',
                        noResult: { text: 'Conditions may support ridge or wave flying but not thermal flights. Assess accordingly.', safe: true },
                      },
                      {
                        id: 'skill', question: 'Are conditions within your skill level? (Wind, turbulence, cloudbase all manageable)',
                        yesResult: { text: 'Go fly! Conditions look good. Monitor weather throughout the flight and have a landing plan.', safe: true },
                        noResult: { text: 'Wait for calmer conditions or fly a conservative local flight to build experience.', safe: false },
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="mt-field-section">
                <div className="mt-field-section-body">
                  <FieldDecisionTree
                    title="Is this slope safe?"
                    nodes={[
                      {
                        id: 'angle', question: 'Is the slope angle under 30°?',
                        yesResult: { text: 'Low avalanche risk. Slopes under 30° rarely produce slab avalanches. Watch for terrain traps below.', safe: true },
                        no: 'danger',
                      },
                      {
                        id: 'danger', question: 'Is the avalanche danger rating Low or Moderate for this aspect and elevation?',
                        yes: 'signs', no: 'considerable',
                      },
                      {
                        id: 'considerable', question: 'Are you on a wind-loaded or sun-affected aspect mentioned in the bulletin?',
                        yesResult: { text: 'Do not enter this terrain. The bulletin specifically identifies this aspect as dangerous.', safe: false },
                        no: 'signs',
                      },
                      {
                        id: 'signs', question: 'Do you see any red flags? (Whumpfing, cracking, recent avalanche debris, loading)',
                        noResult: { text: 'Proceed with caution. Manage terrain (spacing, escape routes, one at a time). Reassess constantly.', safe: true },
                        yesResult: { text: 'Do not enter this slope. Active signs of instability are present.', safe: false },
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Reference */}
          {activeSection === 'reference' && (
            <div className="mt-ref-cards">
              <QuickRefCard
                title="Lapse Rates"
                accent="var(--mt-weather)"
                items={[
                  { label: 'Dry Adiabatic', value: '3.0°C / 1000ft (9.8°C/km)' },
                  { label: 'Moist Adiabatic', value: '~1.5°C / 1000ft (varies)' },
                  { label: 'Standard Environmental', value: '2.0°C / 1000ft (6.5°C/km)' },
                  { label: 'Cloudbase (LCL)', value: '222 × (Temp - Dewpoint) feet' },
                ]}
              />
              <QuickRefCard
                title="Slope Angles"
                accent="var(--mt-avalanche)"
                items={[
                  { label: '< 30°', value: 'Low slab risk (runout zone)' },
                  { label: '30-35°', value: 'Prime avalanche zone (most activity)' },
                  { label: '35-45°', value: 'Highest danger zone (93% of fatalities)' },
                  { label: '> 45°', value: 'Constant sloughing, no slab buildup' },
                ]}
              />
              <QuickRefCard
                title="Cloud Types"
                accent="var(--mt-weather)"
                items={[
                  { label: 'Cumulus', value: 'Thermals — flat base, cauliflower top' },
                  { label: 'Lenticular', value: 'Mountain waves — smooth lens shape' },
                  { label: 'Cumulonimbus', value: 'Thunderstorm — anvil top, AVOID' },
                  { label: 'Stratus', value: 'Stable layer — no lift, poor visibility' },
                ]}
              />
              <QuickRefCard
                title="Burial Survival"
                accent="var(--mt-avalanche)"
                items={[
                  { label: '0-18 min', value: '~90% survival if found' },
                  { label: '18-35 min', value: 'Rapid decline to ~30%' },
                  { label: '35+ min', value: '< 27% (asphyxiation phase)' },
                  { label: 'Key', value: 'Companion rescue is the ONLY option' },
                ]}
              />
              <QuickRefCard
                title="McCready Speed-to-Fly"
                accent="var(--mt-flying)"
                items={[
                  { label: 'MC = 0', value: 'Fly at best L/D speed' },
                  { label: 'MC = 1', value: 'Weak thermals ahead — fly slightly faster' },
                  { label: 'MC = 2-3', value: 'Good thermals — fly faster, accept more sink' },
                  { label: 'In sink', value: 'Add speed proportional to sink rate' },
                ]}
              />
              <QuickRefCard
                title="Heuristic Traps"
                accent="var(--mt-avalanche)"
                items={[
                  { label: 'Familiarity', value: 'I\'ve skied this before, it was fine' },
                  { label: 'Commitment', value: 'We drove 3 hours to get here' },
                  { label: 'Expert Halo', value: 'The guide says it\'s safe' },
                  { label: 'Social Proof', value: 'Everyone else is skiing it' },
                  { label: 'Scarcity', value: 'The powder won\'t last' },
                ]}
              />
              <QuickRefCard
                title="Wind & Avalanche"
                accent="var(--mt-avalanche)"
                items={[
                  { label: 'Windward', value: 'Snow stripped, usually safer' },
                  { label: 'Lee (downwind)', value: 'Wind slab deposits, DANGER' },
                  { label: 'Cross-loaded', value: 'Gullies filled by oblique wind' },
                  { label: 'Rule of thumb', value: '2cm wind slab = 20cm natural snow danger' },
                ]}
              />
              <QuickRefCard
                title="Valley Wind Cycle"
                accent="var(--mt-flying)"
                items={[
                  { label: 'Night-Dawn', value: 'Katabatic (downslope) — cold, calm' },
                  { label: 'Morning', value: 'Transition — calmest window' },
                  { label: 'Afternoon', value: 'Anabatic (upslope) — strong valley wind' },
                  { label: 'Evening', value: 'Transition back to katabatic' },
                ]}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
