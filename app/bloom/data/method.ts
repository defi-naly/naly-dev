// ============================================================
// BLOOM Method Framework — Data Layer
// Systems-Level AI Integration: 4 Pillars × 3 Stages × 3 Maturity
// ============================================================

// ─── TYPES ───

export type PillarId = 'strategy' | 'marketing' | 'sales' | 'operations';
export type StageId = 'discovery' | 'build' | 'validate';
export type MaturityId = 'early' | 'growth' | 'enterprise';
export type MeadowsLevel = 'parameters' | 'feedback' | 'structure' | 'paradigm';

export interface SystemElement {
  type: 'stock' | 'flow' | 'reinforcing_loop' | 'balancing_loop';
  name: string;
  description: string;
}

export interface AuditDimension {
  name: string;
  description: string;
  rubric: [string, string, string, string, string]; // 1–5 scale
}

export interface LeveragePoint {
  level: MeadowsLevel;
  name: string;
  description: string;
  bloomIntervention: string;
}

export interface SystemArchetype {
  name: string;
  pattern: string;
  aiTrap: string;
  bloomResponse: string;
}

export interface PillarDefinition {
  id: PillarId;
  name: string;
  subtitle: string;
  description: string;
  icon: string; // Lucide icon name
  systemElements: SystemElement[];
  auditDimensions: AuditDimension[];
  leveragePoints: LeveragePoint[];
  archetypes: SystemArchetype[];
}

export interface StageActivity {
  pillarId: PillarId;
  activities: string[];
  outputs: string[];
}

export interface StageDefinition {
  id: StageId;
  name: string;
  duration: string;
  description: string;
  perPillar: StageActivity[];
}

export interface MaturityPillarDetail {
  pillarId: PillarId;
  typicalState: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  aiOpportunity: string;
}

export interface MaturityBracket {
  id: MaturityId;
  name: string;
  subtitle: string;
  description: string;
  headcount: string;
  pillarDetails: MaturityPillarDetail[];
}

export interface AuditScorecard {
  pillarId: PillarId;
  dimensions: {
    name: string;
    score: number | null; // 1–5 or null if unscored
    notes: string;
  }[];
}

// ─── PILLARS ───

export const pillars: PillarDefinition[] = [
  {
    id: 'strategy',
    name: 'Strategy',
    subtitle: 'Decision Architecture',
    description:
      'Where judgment lives. Business model, competitive positioning, and the decision-making structures that determine where the company goes. The durable asset here is the quality of decisions — the one thing AI accelerates but can\'t replace.',
    icon: 'Compass',
    systemElements: [
      { type: 'stock', name: 'Strategic Clarity', description: 'Accumulated understanding of market position, competitive moat, and direction' },
      { type: 'stock', name: 'Decision Debt', description: 'Unresolved strategic questions that compound into organizational confusion' },
      { type: 'flow', name: 'Market Intelligence', description: 'Rate of new competitive and customer insight entering the system' },
      { type: 'flow', name: 'Resource Allocation', description: 'How capital, time, and attention flow to initiatives' },
      { type: 'reinforcing_loop', name: 'Clarity → Speed → Learning → Clarity', description: 'Clear strategy accelerates execution, generating data that refines strategy further' },
      { type: 'balancing_loop', name: 'Complexity Ceiling', description: 'As strategy succeeds, org complexity rises, slowing the decision loop' },
    ],
    auditDimensions: [
      {
        name: 'Decision Speed',
        description: 'How quickly the organization makes and executes strategic decisions',
        rubric: [
          'Decisions take months, require multiple approval layers',
          'Weekly cadence but frequently revisited or reversed',
          'Clear decision-making framework, 1-2 week cycles',
          'Rapid decisions with defined escalation paths',
          'Real-time strategic adaptation with delegated authority',
        ],
      },
      {
        name: 'Competitive Awareness',
        description: 'Depth and recency of competitive intelligence',
        rubric: [
          'No systematic competitive tracking',
          'Ad-hoc competitor monitoring',
          'Regular competitive reviews, basic positioning',
          'Deep competitive intelligence informing product roadmap',
          'Predictive competitive modeling, first-mover positioning',
        ],
      },
      {
        name: 'Resource Coherence',
        description: 'Alignment between stated strategy and actual resource allocation',
        rubric: [
          'Budget reflects legacy priorities, not current strategy',
          'Some alignment but significant drift',
          'Annual realignment, quarterly reviews',
          'Continuous allocation adjustment tied to strategic KPIs',
          'Dynamic resource allocation with automated triggers',
        ],
      },
    ],
    leveragePoints: [
      { level: 'parameters', name: 'Decision Cycle Time', description: 'Reduce time from insight to action', bloomIntervention: 'AI-powered competitive dashboards and decision briefs' },
      { level: 'feedback', name: 'Market Signal Loop', description: 'Tighten feedback between market changes and strategic response', bloomIntervention: 'Automated market monitoring with anomaly detection' },
      { level: 'structure', name: 'Decision Architecture', description: 'Redesign how decisions flow through the organization', bloomIntervention: 'AI-assisted decision frameworks replacing committee bottlenecks' },
      { level: 'paradigm', name: 'Strategic Mental Model', description: 'Shift from annual planning to continuous strategic adaptation', bloomIntervention: 'Living strategy documents that update from real-time data' },
    ],
    archetypes: [
      { name: 'Fixes That Fail', pattern: 'Adding AI tools to speed up a broken decision process', aiTrap: 'Faster bad decisions are still bad decisions', bloomResponse: 'Fix the decision architecture first, then accelerate it' },
      { name: 'Shifting the Burden', pattern: 'Outsourcing strategic thinking to AI-generated reports', aiTrap: 'Leadership loses the ability to think strategically', bloomResponse: 'AI augments analysis, humans own judgment' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    subtitle: 'Demand Generation System',
    description:
      'Where distribution compounds. Acquisition, brand, content, and the full system that converts attention into interest. The durable asset here is compounding reach — channels, audiences, and brand equity that grow with every cycle.',
    icon: 'Megaphone',
    systemElements: [
      { type: 'stock', name: 'Brand Equity', description: 'Accumulated trust, recognition, and positioning in the market' },
      { type: 'stock', name: 'Content Library', description: 'Published assets that compound organic reach over time' },
      { type: 'flow', name: 'Traffic & Attention', description: 'Rate of new eyeballs reaching the brand' },
      { type: 'flow', name: 'Content Production', description: 'Rate of new content creation and distribution' },
      { type: 'reinforcing_loop', name: 'Content → SEO → Traffic → Authority → Content', description: 'Quality content builds authority, driving organic traffic that justifies more content investment' },
      { type: 'balancing_loop', name: 'Channel Saturation', description: 'As channels mature, cost per acquisition rises, diminishing returns' },
    ],
    auditDimensions: [
      {
        name: 'Channel Mix',
        description: 'Diversification and effectiveness across acquisition channels',
        rubric: [
          'Single-channel dependency (e.g., word of mouth only)',
          '2 channels, inconsistent execution',
          '3+ channels with basic attribution',
          'Multi-channel with clear ROI per channel',
          'Adaptive channel allocation based on real-time performance data',
        ],
      },
      {
        name: 'Content System',
        description: 'Content production pipeline and compounding value',
        rubric: [
          'No content strategy, sporadic posting',
          'Content calendar exists but inconsistent execution',
          'Regular production, basic SEO, some evergreen assets',
          'Systematic content engine with distribution, repurposing, and measurement',
          'AI-augmented content system producing high-quality assets at scale',
        ],
      },
      {
        name: 'Brand Clarity',
        description: 'Consistency and distinctiveness of brand positioning',
        rubric: [
          'No defined brand — looks different on every channel',
          'Basic guidelines exist but loosely followed',
          'Consistent visual and verbal identity across channels',
          'Distinctive positioning with clear differentiation',
          'Brand is a strategic asset that commands premium pricing',
        ],
      },
    ],
    leveragePoints: [
      { level: 'parameters', name: 'Content Velocity', description: 'Increase production speed without sacrificing quality', bloomIntervention: 'AI content pipeline: research → draft → edit → distribute' },
      { level: 'feedback', name: 'Attribution Loop', description: 'Connect marketing spend to revenue outcomes', bloomIntervention: 'Multi-touch attribution with AI pattern recognition' },
      { level: 'structure', name: 'Distribution Architecture', description: 'Redesign how content reaches and re-reaches audiences', bloomIntervention: 'Automated repurposing and distribution across channels' },
      { level: 'paradigm', name: 'Content as Asset', description: 'Shift from content as expense to content as compounding investment', bloomIntervention: 'Evergreen content systems that appreciate over time' },
    ],
    archetypes: [
      { name: 'Fixes That Fail', pattern: 'Flooding channels with AI-generated content', aiTrap: 'Volume without quality destroys brand equity', bloomResponse: 'AI handles production, humans maintain voice and judgment' },
      { name: 'Shifting the Burden', pattern: 'Replacing brand strategy with algorithmic optimization', aiTrap: 'Brand becomes generic — optimized for clicks, not trust', bloomResponse: 'Optimize distribution, not positioning' },
    ],
  },
  {
    id: 'sales',
    name: 'Sales',
    subtitle: 'Revenue Conversion Engine',
    description:
      'Where trust converts. Pipeline, qualification, partnerships, and the system that turns interest into revenue. The durable asset here is relationship capital — the trust that shortens sales cycles and generates referrals.',
    icon: 'Target',
    systemElements: [
      { type: 'stock', name: 'Pipeline Value', description: 'Total potential revenue in active opportunities' },
      { type: 'stock', name: 'Relationship Capital', description: 'Trust and depth across customer and partner networks' },
      { type: 'flow', name: 'Lead Velocity', description: 'Rate of new qualified opportunities entering the pipeline' },
      { type: 'flow', name: 'Conversion Rate', description: 'Speed at which pipeline converts to closed revenue' },
      { type: 'reinforcing_loop', name: 'Wins → Referrals → Pipeline → Wins', description: 'Customer success generates referrals that fill the pipeline' },
      { type: 'balancing_loop', name: 'Capacity Constraint', description: 'Sales team capacity limits how many deals can be actively worked' },
    ],
    auditDimensions: [
      {
        name: 'Pipeline Health',
        description: 'Volume, velocity, and quality of the sales pipeline',
        rubric: [
          'No defined pipeline — deals happen ad hoc',
          'Pipeline exists but unstaged, no velocity metrics',
          'Staged pipeline with basic conversion tracking',
          'Healthy pipeline with predictable velocity and clear stage criteria',
          'AI-scored pipeline with predictive revenue forecasting',
        ],
      },
      {
        name: 'Qualification Rigor',
        description: 'How effectively prospects are qualified or disqualified',
        rubric: [
          'No qualification criteria — every lead gets equal time',
          'Basic BANT but inconsistently applied',
          'Defined ICP and scoring, applied systematically',
          'Multi-signal qualification with behavioral data',
          'AI-driven lead scoring with continuous model refinement',
        ],
      },
      {
        name: 'Deal Execution',
        description: 'Consistency and quality of the sales process from first touch to close',
        rubric: [
          'Every deal is improvised — no playbook',
          'Some templates exist, tribal knowledge dominates',
          'Documented playbook, consistent discovery process',
          'Data-informed playbook with win/loss analysis loop',
          'AI-assisted deal coaching with real-time objection handling',
        ],
      },
    ],
    leveragePoints: [
      { level: 'parameters', name: 'Response Time', description: 'Reduce time from lead to first meaningful contact', bloomIntervention: 'AI-powered lead routing and instant qualification' },
      { level: 'feedback', name: 'Win/Loss Loop', description: 'Systematic learning from every deal outcome', bloomIntervention: 'Automated win/loss analysis with pattern detection' },
      { level: 'structure', name: 'Pipeline Architecture', description: 'Redesign how deals flow through stages', bloomIntervention: 'AI-scored pipeline replacing manual stage gates' },
      { level: 'paradigm', name: 'Buyer-Led Sales', description: 'Shift from seller-push to buyer-pull model', bloomIntervention: 'AI-personalized buyer journeys with self-service paths' },
    ],
    archetypes: [
      { name: 'Fixes That Fail', pattern: 'Using AI to automate outbound spam', aiTrap: 'More touchpoints, less trust — response rates crater', bloomResponse: 'AI personalizes at scale, humans build relationships' },
      { name: 'Shifting the Burden', pattern: 'Replacing sales judgment with AI scoring', aiTrap: 'Team loses ability to read deals — becomes score-dependent', bloomResponse: 'AI informs judgment, doesn\'t replace it' },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    subtitle: 'Delivery & Efficiency Engine',
    description:
      'Where efficiency becomes margin. Workflows, tooling, team structure, and the delivery systems that determine throughput. The durable asset here is process maturity — operational knowledge that compounds into structural cost advantage.',
    icon: 'Settings',
    systemElements: [
      { type: 'stock', name: 'Process Maturity', description: 'Accumulated operational knowledge encoded in systems and documentation' },
      { type: 'stock', name: 'Technical Debt', description: 'Accumulated shortcuts and workarounds that slow future work' },
      { type: 'flow', name: 'Throughput', description: 'Rate of work completed per unit time' },
      { type: 'flow', name: 'Error Rate', description: 'Rate of mistakes, rework, and quality failures' },
      { type: 'reinforcing_loop', name: 'Automation → Speed → Margin → Investment → Automation', description: 'Automation improves margins, funding further automation' },
      { type: 'balancing_loop', name: 'Complexity Tax', description: 'Each new tool or process adds maintenance overhead' },
    ],
    auditDimensions: [
      {
        name: 'Workflow Clarity',
        description: 'How well-defined and documented operational workflows are',
        rubric: [
          'No documented workflows — everything is in people\'s heads',
          'Some documentation, but outdated and incomplete',
          'Core workflows documented and maintained',
          'Workflows documented, measured, and regularly optimized',
          'Self-updating workflows with AI-identified bottlenecks',
        ],
      },
      {
        name: 'Tool Cohesion',
        description: 'Integration and effectiveness of the tool stack',
        rubric: [
          'Tool chaos — duplicated tools, no integration',
          'Core tools defined but manual data transfer between them',
          'Key integrations working, some automation',
          'Integrated tool ecosystem with automated handoffs',
          'AI-orchestrated tool stack with intelligent routing',
        ],
      },
      {
        name: 'Delivery Reliability',
        description: 'Predictability and consistency of output quality',
        rubric: [
          'Delivery is unpredictable — deadlines regularly missed',
          'Some predictability but frequent scope/timeline changes',
          'Reliable delivery with defined capacity planning',
          'High reliability with buffer management and risk mitigation',
          'Predictive delivery with AI-optimized resource scheduling',
        ],
      },
    ],
    leveragePoints: [
      { level: 'parameters', name: 'Cycle Time', description: 'Reduce time from request to delivery', bloomIntervention: 'AI automation of repetitive workflows' },
      { level: 'feedback', name: 'Quality Loop', description: 'Tighten feedback between output quality and process improvement', bloomIntervention: 'AI-powered quality checks and anomaly detection' },
      { level: 'structure', name: 'Team Topology', description: 'Redesign how work flows between teams', bloomIntervention: 'AI-assisted capacity planning and workload balancing' },
      { level: 'paradigm', name: 'Operations as Product', description: 'Shift from ops as cost center to ops as competitive advantage', bloomIntervention: 'Internal operations that become external products' },
    ],
    archetypes: [
      { name: 'Fixes That Fail', pattern: 'Adding AI tools to patch broken processes', aiTrap: 'More tools, more complexity, same broken workflow', bloomResponse: 'Simplify the process first, then automate the simplified version' },
      { name: 'Shifting the Burden', pattern: 'Automating away operational knowledge', aiTrap: 'When the AI breaks, nobody knows how to do the work', bloomResponse: 'Automate execution, retain understanding' },
    ],
  },
];

// ─── STAGES ───

export const stages: StageDefinition[] = [
  {
    id: 'discovery',
    name: 'Discovery',
    duration: '~1 week',
    description: 'Map system state per pillar, score audit dimensions, identify the highest-leverage AI interventions.',
    perPillar: [
      {
        pillarId: 'strategy',
        activities: ['Map decision flows', 'Interview leadership on strategic clarity', 'Audit resource allocation vs. stated priorities'],
        outputs: ['Decision Architecture Map', 'Strategic Alignment Score', 'Top 3 Leverage Points'],
      },
      {
        pillarId: 'marketing',
        activities: ['Audit channel performance', 'Map content pipeline', 'Assess brand consistency'],
        outputs: ['Channel Effectiveness Report', 'Content System Diagnosis', 'Brand Audit Score'],
      },
      {
        pillarId: 'sales',
        activities: ['Map pipeline stages', 'Analyze win/loss patterns', 'Assess qualification process'],
        outputs: ['Pipeline Health Report', 'Conversion Bottleneck Map', 'Qualification Framework Assessment'],
      },
      {
        pillarId: 'operations',
        activities: ['Map core workflows', 'Audit tool stack', 'Measure delivery reliability'],
        outputs: ['Workflow Efficiency Map', 'Tool Stack Assessment', 'Delivery Scorecard'],
      },
    ],
  },
  {
    id: 'build',
    name: 'Build',
    duration: '2–4 weeks',
    description: 'Implement AI at the leverage points identified in Discovery. Fixed scope, working software — not a roadmap.',
    perPillar: [
      {
        pillarId: 'strategy',
        activities: ['Build competitive intelligence dashboard', 'Implement decision brief automation', 'Create resource allocation tracker'],
        outputs: ['Live Competitive Dashboard', 'AI Decision Brief System', 'Resource Alignment Dashboard'],
      },
      {
        pillarId: 'marketing',
        activities: ['Build content pipeline', 'Implement attribution tracking', 'Set up automated distribution'],
        outputs: ['AI Content Engine', 'Attribution Dashboard', 'Multi-Channel Distribution System'],
      },
      {
        pillarId: 'sales',
        activities: ['Build lead scoring model', 'Implement deal coaching system', 'Create pipeline analytics'],
        outputs: ['AI Lead Scoring', 'Deal Intelligence Dashboard', 'Pipeline Prediction Model'],
      },
      {
        pillarId: 'operations',
        activities: ['Automate identified workflows', 'Build quality monitoring', 'Implement capacity planning'],
        outputs: ['Automated Workflow System', 'Quality Dashboard', 'Capacity Planning Tool'],
      },
    ],
  },
  {
    id: 'validate',
    name: 'Validate',
    duration: '90 days',
    description: 'Measure system-level outcomes. Did the intervention change system behavior, or just move metrics?',
    perPillar: [
      {
        pillarId: 'strategy',
        activities: ['Measure decision cycle time', 'Track strategic alignment drift', 'Assess competitive response time'],
        outputs: ['Decision Velocity Report', 'Strategic Coherence Score', 'Competitive Position Change'],
      },
      {
        pillarId: 'marketing',
        activities: ['Measure content ROI', 'Track channel efficiency changes', 'Assess brand perception shift'],
        outputs: ['Content System ROI', 'CAC Trajectory Report', 'Brand Equity Assessment'],
      },
      {
        pillarId: 'sales',
        activities: ['Measure pipeline velocity changes', 'Track conversion improvements', 'Assess deal quality shifts'],
        outputs: ['Pipeline Velocity Report', 'Conversion Analysis', 'Revenue Quality Score'],
      },
      {
        pillarId: 'operations',
        activities: ['Measure throughput changes', 'Track error rate reduction', 'Assess team capacity gains'],
        outputs: ['Efficiency Gains Report', 'Quality Improvement Score', 'Capacity Utilization Change'],
      },
    ],
  },
];

// ─── MATURITY BRACKETS ───

export const maturityBrackets: MaturityBracket[] = [
  {
    id: 'early',
    name: 'Early',
    subtitle: 'Pre-Product / 1–10 People',
    description: 'Need foundations before optimization. The system doesn\'t exist yet — building the wrong one wastes everything.',
    headcount: '1–10',
    pillarDetails: [
      { pillarId: 'strategy', typicalState: 'Founder intuition, no documented strategy', priority: 'critical', aiOpportunity: 'AI-powered market validation and competitive scanning before committing resources' },
      { pillarId: 'marketing', typicalState: 'Personal brand and network-driven', priority: 'medium', aiOpportunity: 'Content system that turns founder knowledge into distributable assets' },
      { pillarId: 'sales', typicalState: 'Founder-led sales, no pipeline', priority: 'high', aiOpportunity: 'AI qualification to focus limited selling time on highest-probability deals' },
      { pillarId: 'operations', typicalState: 'Ad hoc, everyone does everything', priority: 'low', aiOpportunity: 'Lightweight automation of the 3-4 workflows that repeat daily' },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    subtitle: 'PMF Achieved / Scaling',
    description: 'Have product, need systems to scale. The org grew faster than its processes — everything is held together with duct tape.',
    headcount: '10–100',
    pillarDetails: [
      { pillarId: 'strategy', typicalState: 'Strategy exists but execution drifts', priority: 'high', aiOpportunity: 'Real-time strategic dashboards that keep growing teams aligned' },
      { pillarId: 'marketing', typicalState: 'Some channels working, can\'t scale them', priority: 'critical', aiOpportunity: 'AI content engine + attribution to scale what works and kill what doesn\'t' },
      { pillarId: 'sales', typicalState: 'Pipeline exists but leaky and unpredictable', priority: 'critical', aiOpportunity: 'AI-scored pipeline and deal coaching to make sales predictable' },
      { pillarId: 'operations', typicalState: 'Processes breaking under volume', priority: 'high', aiOpportunity: 'Workflow automation at the breaking points — focus on the 20% causing 80% of pain' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'Established / Calcified',
    description: 'Have systems, but they\'re inefficient or misaligned. Decades of accumulated process debt. Change is slow because everything is connected.',
    headcount: '100+',
    pillarDetails: [
      { pillarId: 'strategy', typicalState: 'Annual planning cycles, committee decisions', priority: 'critical', aiOpportunity: 'AI-assisted decision architecture to break committee bottlenecks' },
      { pillarId: 'marketing', typicalState: 'Large team, fragmented channels, attribution black hole', priority: 'high', aiOpportunity: 'Multi-touch attribution and content system that unifies fragmented efforts' },
      { pillarId: 'sales', typicalState: 'CRM-heavy, forecast-driven, relationship-dependent', priority: 'medium', aiOpportunity: 'AI deal intelligence layered on existing CRM infrastructure' },
      { pillarId: 'operations', typicalState: 'Legacy systems, change management hell', priority: 'critical', aiOpportunity: 'AI layer on top of legacy systems — improve without replacing' },
    ],
  },
];

// ─── MEADOWS LEVERAGE HIERARCHY ───

export const meadowsHierarchy: {
  level: MeadowsLevel;
  name: string;
  description: string;
  power: number; // 1–4, 4 being highest leverage
}[] = [
  { level: 'parameters', name: 'Parameters', description: 'Numbers, constants, sizes — the easiest to change, the least effective.', power: 1 },
  { level: 'feedback', name: 'Feedback Loops', description: 'The delays, strengths, and connections between system elements.', power: 2 },
  { level: 'structure', name: 'System Structure', description: 'The rules, architecture, and power dynamics that shape behavior.', power: 3 },
  { level: 'paradigm', name: 'Paradigm', description: 'The mindset, beliefs, and mental models from which the system arises.', power: 4 },
];

// ─── AUDIT SCORECARD TEMPLATE ───

export function createBlankScorecard(): AuditScorecard[] {
  return pillars.map((pillar) => ({
    pillarId: pillar.id,
    dimensions: pillar.auditDimensions.map((dim) => ({
      name: dim.name,
      score: null,
      notes: '',
    })),
  }));
}

// ============================================================
// FOUNDATION MODEL — Diagnostic Framework
// 3 Foundations × 3 Dimensions each
// ============================================================

export type AssetId = 'distribution' | 'trust' | 'judgment';

export interface AssetDimension {
  name: string;
  description: string;
  rubric: [string, string, string, string, string];
}

export interface FoundationDefinition {
  id: AssetId;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  dimensions: AssetDimension[];
  sprintCTA: string;
  sprintDuration: string;
  price: number;
}

export const foundations: FoundationDefinition[] = [
  {
    id: 'distribution',
    name: 'Distribution',
    subtitle: 'How you reach people',
    description:
      'The channels, systems, and assets that put your product in front of the right audience — and keep compounding reach over time.',
    icon: 'Radio',
    dimensions: [
      {
        name: 'Website Effectiveness',
        description: 'How well does your website convert visitors?',
        rubric: [
          'No website, or a placeholder with no clear purpose',
          'Website exists but unclear messaging, no conversion paths',
          'Clear value prop, basic conversion flow, some analytics',
          'Optimized landing pages, strong CTAs, measurable conversion rates',
          'High-converting site with personalization, A/B testing, and continuous optimization',
        ],
      },
      {
        name: 'Content System',
        description: 'Do you have a content pipeline that compounds?',
        rubric: [
          'No content strategy — sporadic or nonexistent publishing',
          'Some blog posts or social, but no system or cadence',
          'Regular publishing with basic SEO and distribution',
          'Content engine with repurposing, distribution, and measurement',
          'Compounding content system — evergreen assets driving organic growth at scale',
        ],
      },
      {
        name: 'Channel Diversity',
        description: 'How many acquisition channels actively work?',
        rubric: [
          'Single-channel dependency (word of mouth, one referral source)',
          'Two channels, inconsistent execution on both',
          'Three or more channels with basic tracking',
          'Multi-channel with clear attribution and ROI per channel',
          'Adaptive channel portfolio — reallocating spend based on real-time performance',
        ],
      },
    ],
    sprintCTA: 'Start a Distribution Sprint',
    sprintDuration: '1 week',
    price: 15000,
  },
  {
    id: 'trust',
    name: 'Trust',
    subtitle: 'Why people believe you',
    description:
      'The proof, consistency, and reputation that make strangers willing to buy. Trust is the asset that turns attention into revenue.',
    icon: 'Shield',
    dimensions: [
      {
        name: 'Brand Clarity',
        description: 'Is your positioning distinct and consistent?',
        rubric: [
          'No defined brand — looks different on every channel',
          'Basic logo and colors, but messaging is inconsistent',
          'Consistent visual and verbal identity across channels',
          'Distinctive positioning with clear differentiation from competitors',
          'Brand is a strategic asset — commands premium pricing and instant recognition',
        ],
      },
      {
        name: 'Social Proof',
        description: 'Do you have visible proof that customers trust you?',
        rubric: [
          'No testimonials, case studies, or reviews visible anywhere',
          'A few testimonials but not prominently displayed',
          'Case studies and reviews on site, some third-party validation',
          'Strong proof across multiple formats — video, stats, logos, reviews',
          'Overwhelming proof — industry awards, press, user-generated advocacy',
        ],
      },
      {
        name: 'Reputation System',
        description: 'Can new customers verify your credibility independently?',
        rubric: [
          'No independent verification possible — trust requires a conversation',
          'Some online presence but sparse or outdated',
          'Active profiles on review sites, LinkedIn, or industry directories',
          'Strong independent presence — easy to verify through multiple sources',
          'Public track record that sells for you — buyers arrive pre-convinced',
        ],
      },
    ],
    sprintCTA: 'Start a Trust Sprint',
    sprintDuration: '1 week',
    price: 15000,
  },
  {
    id: 'judgment',
    name: 'Judgment',
    subtitle: 'How you make decisions',
    description:
      'The speed, clarity, and quality of organizational decision-making — the one asset AI accelerates but cannot replace.',
    icon: 'Brain',
    dimensions: [
      {
        name: 'Decision Speed',
        description: 'How quickly can your org decide what to build next?',
        rubric: [
          'Decisions take months — multiple approval layers, constant revisiting',
          'Weekly cadence but decisions are frequently reversed or stalled',
          'Clear decision-making framework with 1–2 week cycles',
          'Rapid decisions with defined escalation paths and delegated authority',
          'Real-time strategic adaptation — decisions happen in hours, not weeks',
        ],
      },
      {
        name: 'AI Integration',
        description: 'Are you using AI for execution, or just adding tools?',
        rubric: [
          'No AI usage — or just ChatGPT for ad-hoc questions',
          'A few AI tools adopted but not integrated into workflows',
          'AI used systematically in at least one core workflow',
          'AI embedded across multiple functions with measurable output gains',
          'AI is a force multiplier — team ships 3-5x more with same headcount',
        ],
      },
      {
        name: 'Build vs Buy Clarity',
        description: 'Do you know what to build vs what to buy?',
        rubric: [
          'No framework — decisions are reactive, political, or based on inertia',
          'Some awareness but inconsistent — often building what should be bought',
          'Clear criteria for build vs buy, applied to most decisions',
          'Strong framework with total cost of ownership analysis and regular review',
          'Strategic clarity — core IP is built, everything else is bought or automated',
        ],
      },
    ],
    sprintCTA: 'Start a Judgment Sprint',
    sprintDuration: '1 week',
    price: 15000,
  },
];
