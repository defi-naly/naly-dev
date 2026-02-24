export interface Era {
  year: string
  name: string
  subtitle: string
  description: string
  highlight: string
}

export const TIMELINE_DATA: Era[] = [
  {
    year: '2016',
    name: 'Launch',
    subtitle: 'Genesis Block',
    description:
      'October 28, 2016: Zcash launches with the first practical implementation of zk-SNARKs in a cryptocurrency. The trusted setup ceremony involves six participants across multiple continents.',
    highlight: 'First production zk-SNARKs',
  },
  {
    year: '2018',
    name: 'Sapling',
    subtitle: 'Practical Privacy',
    description:
      'Sapling makes shielded transactions 100x faster and 97% lighter on memory — proof generation drops from ~40 seconds to under 3 seconds. Mobile wallets can finally create shielded transactions.',
    highlight: '100x faster proofs',
  },
  {
    year: '2022',
    name: 'Orchard',
    subtitle: 'Trustless Proofs',
    description:
      'The Halo 2 proving system eliminates the trusted setup entirely through recursive proof composition. No more trusted ceremonies — the cryptography verifies itself.',
    highlight: 'No trusted setup',
  },
  {
    year: '2025+',
    name: 'Tachyon',
    subtitle: 'Scaling Privacy',
    description:
      'The next evolution: Proof-of-Stake consensus, crosschain bridges to Ethereum, and block times targeting sub-second finality. Zcash becomes a privacy platform, not just a privacy coin.',
    highlight: 'PoS + scaling',
  },
]
