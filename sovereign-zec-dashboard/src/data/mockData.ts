// ============================================================
// Mock data for Sovereign ZEC Dashboard
// All values representative of a healthy Zebra full node
// ============================================================

export interface PrivacyPool {
  name: string
  symbol: string
  zec: number
  color: string
  colorDim: string
}

export interface RecentBlock {
  height: number
  txCount: number
  shieldedPct: number
  timestamp: number
}

export interface NodeMetric {
  label: string
  value: string
  status?: 'green' | 'amber' | 'red'
}

export interface Peer {
  address: string
  type: 'TOR' | 'CLR'
  direction: 'inbound' | 'outbound'
  latency: number
  version: string
  height: number
}

export interface PrivacyCheck {
  label: string
  description: string
  status: 'pass' | 'warn' | 'fail'
}

export interface WalletConfig {
  endpoint: string
  connected: boolean
  port: number
}

// --- Privacy Pools ---

export const privacyPools: PrivacyPool[] = [
  {
    name: 'Orchard',
    symbol: 'orchard',
    zec: 4_210_000,
    color: '#F4B728',
    colorDim: 'rgba(244, 183, 40, 0.15)',
  },
  {
    name: 'Sapling',
    symbol: 'sapling',
    zec: 7_850_000,
    color: '#A78BFA',
    colorDim: 'rgba(167, 139, 250, 0.15)',
  },
  {
    name: 'Sprout',
    symbol: 'sprout',
    zec: 1_940_000,
    color: '#6B7084',
    colorDim: 'rgba(107, 112, 132, 0.15)',
  },
]

export const totalSupply = 21_000_000
export const totalShielded = privacyPools.reduce((sum, p) => sum + p.zec, 0)
export const shieldedPct = (totalShielded / totalSupply) * 100 // ~66.7%
export const shieldedPctOfCirculating = 30.1 // approximate % of circulating supply

// --- Recent Blocks ---

const now = Date.now()

export const recentBlocks: RecentBlock[] = Array.from({ length: 24 }, (_, i) => ({
  height: 2_345_678 - i,
  txCount: Math.floor(Math.random() * 40) + 5,
  shieldedPct: Math.floor(Math.random() * 45) + 35,
  timestamp: now - i * 75_000,
}))

// --- Node Metrics ---

export const nodeMetrics: NodeMetric[] = [
  { label: 'Height', value: '2,345,678', status: 'green' },
  { label: 'Sync', value: '100.0%', status: 'green' },
  { label: 'Zebra', value: 'v1.9.0', status: 'green' },
  { label: 'Uptime', value: '14d 7h 32m' },
  { label: 'Chain Size', value: '38.2 GB' },
  { label: 'Mempool', value: '12 tx', status: 'green' },
]

export const currentHeight = 2_345_678

// --- Peers ---

export const peers: Peer[] = [
  { address: '5a2f...onion:8233', type: 'TOR', direction: 'outbound', latency: 142, version: '/Zebra:1.9.0/', height: 2_345_678 },
  { address: '7bc1...onion:8233', type: 'TOR', direction: 'outbound', latency: 198, version: '/Zebra:1.9.0/', height: 2_345_677 },
  { address: 'e3d4...onion:8233', type: 'TOR', direction: 'inbound', latency: 87, version: '/zcashd:5.8.0/', height: 2_345_678 },
  { address: '203.0.113.42:8233', type: 'CLR', direction: 'outbound', latency: 34, version: '/Zebra:1.8.0/', height: 2_345_676 },
  { address: '198.51.100.17:8233', type: 'CLR', direction: 'inbound', latency: 52, version: '/zcashd:5.8.0/', height: 2_345_678 },
  { address: 'f9a2...onion:8233', type: 'TOR', direction: 'outbound', latency: 220, version: '/Zebra:1.9.0/', height: 2_345_678 },
  { address: 'b1c8...onion:8233', type: 'TOR', direction: 'inbound', latency: 165, version: '/Zebra:1.9.0/', height: 2_345_675 },
  { address: '192.0.2.88:8233', type: 'CLR', direction: 'outbound', latency: 28, version: '/Zebra:1.9.0/', height: 2_345_678 },
]

export const peerStats = {
  total: peers.length,
  tor: peers.filter((p) => p.type === 'TOR').length,
  clearnet: peers.filter((p) => p.type === 'CLR').length,
  inbound: peers.filter((p) => p.direction === 'inbound').length,
  outbound: peers.filter((p) => p.direction === 'outbound').length,
}

// --- Wallet Connection ---

export const walletConfig: WalletConfig = {
  endpoint: '127.0.0.1:18232',
  connected: true,
  port: 18232,
}

// --- Tor Status ---

export const torStatus = {
  enabled: true,
  circuit: 'established',
  exitNode: false,
}

// --- Privacy Audit ---

export const privacyChecks: PrivacyCheck[] = [
  {
    label: 'Tor Routing',
    description: 'All peer connections routed through Tor',
    status: 'pass',
  },
  {
    label: 'RPC Binding',
    description: 'RPC server bound to localhost only',
    status: 'pass',
  },
  {
    label: 'lightwalletd',
    description: 'Light wallet server running behind Tor',
    status: 'pass',
  },
  {
    label: 'Peer Diversity',
    description: 'Connected to 8+ unique peers across subnets',
    status: 'pass',
  },
  {
    label: 'DNS Leaks',
    description: 'DNS queries routed through Tor',
    status: 'warn',
  },
  {
    label: 'Mempool Broadcast',
    description: 'Transactions broadcast via Dandelion++',
    status: 'pass',
  },
]

// --- Block Stats ---

export const blockStats = {
  avgShielded24h: 62,
  blocks24h: 1152,
  avgBlockTime: '75s',
}
