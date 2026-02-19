export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'What is reCLAMMs?',
    answer:
      'reCLAMMs (Readjusting Concentrated Liquidity AMM) is a new pool type built on Balancer V3. It automatically adjusts liquidity concentration ranges to follow market price — no manual management, no oracles, no keepers.',
  },
  {
    question: 'How is this different from Uniswap V3?',
    answer:
      'Uniswap V3 requires LPs to manually set and adjust price ranges. When price moves out of range, you stop earning fees. reCLAMMs ranges auto-adjust, so your liquidity is always working. Plus, positions are fungible ERC-20 tokens instead of NFTs.',
  },
  {
    question: 'Do I need to actively manage my position?',
    answer:
      'No. Deploy once and earn fees. The pool handles range adjustments on-chain. No monitoring, no rebalancing transactions, no gas costs for maintenance.',
  },
  {
    question: 'What makes reCLAMMs JIT resistant?',
    answer:
      'The pool design makes just-in-time liquidity attacks economically unviable. Bots cannot profitably front-run swaps by adding and removing liquidity in the same block.',
  },
  {
    question: 'Is reCLAMMs audited?',
    answer:
      'reCLAMMs is built on Balancer V3, which has been audited by multiple firms. The reCLAMMs pool module inherits the security properties of the V3 vault architecture.',
  },
  {
    question: 'What chain is this on?',
    answer:
      'reCLAMMs is live on Sonic through Beets, the largest DEX on the Sonic network. Sonic offers fast finality and low transaction costs.',
  },
];
