import { CardData } from '../components/ProblemSolutionToggle';

export const weightedToggleCards: CardData[] = [
  {
    offTitle: 'Portfolio drifts. You rebalance manually.',
    offResult:
      'Every rebalance costs gas, creates taxable events, and requires you to decide when to act. Most people never rebalance at all.',
    onTitle: 'Arbitrageurs rebalance for you.',
    onResult:
      'The invariant math creates profit for traders who push your pool back to target weights. Free rebalancing — and they pay you swap fees to do it.',
    stat: 'Self-balancing',
  },
  {
    offTitle: 'One pair per pool. Fragmented liquidity.',
    offResult:
      'Traditional AMMs pair two tokens. A 5-asset portfolio means managing 4+ separate positions across multiple pools.',
    onTitle: 'Up to 8 tokens in one pool.',
    onResult:
      'Define your entire portfolio in a single position. One deposit, one LP token, one source of yield.',
    stat: 'Multi-asset',
  },
  {
    offTitle: 'Equal weight only. No thesis expression.',
    offResult:
      '50/50 pools force equal exposure. You can\'t overweight convictions or build asymmetric bets.',
    onTitle: 'Any weight ratio you want.',
    onResult:
      '80/20, 60/20/20, or any custom split. Express your thesis in the pool weights and let the market maintain it.',
    stat: 'Custom ratios',
  },
  {
    offTitle: 'LP tokens stuck in one protocol.',
    offResult:
      'Your position lives in one contract. No collateral value, no staking, no composability with the rest of DeFi.',
    onTitle: 'Standard ERC-20 LP tokens.',
    onResult:
      'Use your BPT as collateral, stake it for additional yield, or trade it on secondary markets. Full DeFi composability.',
    stat: 'Composable',
  },
];
