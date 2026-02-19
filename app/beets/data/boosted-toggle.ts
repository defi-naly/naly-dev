import { CardData } from '../components/ProblemSolutionToggle';

export const boostedToggleCards: CardData[] = [
  {
    offTitle: 'Idle liquidity earns nothing.',
    offResult:
      'In a standard AMM, 80-95% of liquidity sits unused at any time. That capital earns zero yield while waiting for swaps.',
    onTitle: 'Idle capital routes to lending markets.',
    onResult:
      'The vault automatically deploys unused reserves to Aave, Silo, or other lending protocols. Every dollar earns — whether it\'s swapping or lending.',
    stat: 'Dual yield',
  },
  {
    offTitle: 'Choose: LP or lend. Not both.',
    offResult:
      'Splitting capital between AMM pools and lending protocols means managing multiple positions, multiple gas costs, and constant rebalancing.',
    onTitle: 'One position. Two yield streams.',
    onResult:
      'Deposit once and earn swap fees plus lending yield simultaneously. The pool manages the optimal split between active liquidity and lending reserves.',
    stat: 'Single position',
  },
  {
    offTitle: 'Manual yield optimization burns gas.',
    offResult:
      'Moving capital between protocols to chase the best rate costs gas and attention. By the time you act, the opportunity has moved.',
    onTitle: 'Automatic yield routing.',
    onResult:
      'The ERC-4626 buffer layer handles deposits and withdrawals from lending markets at the vault level — no per-user gas overhead.',
    stat: 'Auto-routed',
  },
  {
    offTitle: 'Swap liquidity dries up under load.',
    offResult:
      'If too much capital is lent out, large swaps face slippage. Protocols that lend aggressively sacrifice swap execution.',
    onTitle: 'Dynamic buffer maintains swap depth.',
    onResult:
      'The vault keeps enough reserves for smooth swaps and routes only the surplus to lending. Swap quality stays high under all conditions.',
    stat: 'Always liquid',
  },
];
