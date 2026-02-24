import Header from './components/Header'
import ShieldHero from './components/ShieldHero'
import BlockStrip from './components/BlockStrip'
import NodeStatus from './components/NodeStatus'
import PeersSummary from './components/PeersSummary'
import PrivacyStatus from './components/PrivacyStatus'
import WalletConnection from './components/WalletConnection'

export default function App() {
  return (
    <div className="min-h-screen bg-sov-bg sov-grain">
      <div className="max-w-[1200px] mx-auto">
        <Header />
        <ShieldHero />
        <BlockStrip />
        <NodeStatus />
        <div className="grid lg:grid-cols-2 gap-6 px-6 py-8">
          <PeersSummary />
          <PrivacyStatus />
        </div>
        <WalletConnection />
      </div>
    </div>
  )
}
