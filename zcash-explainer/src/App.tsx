import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/hero/Hero'
import { Footer } from './components/Footer'
import { SectionDivider } from './components/SectionDivider'
import { WhyPrivacy } from './components/sections/WhyPrivacy'
import { TxDemo } from './components/sections/TxDemo'
import { FullQuote } from './components/sections/FullQuote'
import { Origin } from './components/sections/Origin'
import { ZkProofFlow } from './components/sections/ZkProofFlow'
import { SelectiveDisclosure } from './components/sections/SelectiveDisclosure'
import { Timeline } from './components/sections/Timeline'
import { Tachyon } from './components/sections/Tachyon'
import { Tokenomics } from './components/sections/Tokenomics'
import { Landscape } from './components/sections/Landscape'
import { Future } from './components/sections/Future'
import { CallToAction } from './components/sections/CallToAction'

export function App() {
  return (
    <>
      <div className="zec-grain" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
      <ScrollProgress />
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <SectionDivider />
        <WhyPrivacy />          {/* 01 — Problem */}
        <SectionDivider />
        <Origin />              {/* 02 — Story + context */}
        <SectionDivider />

        <FullQuote
          quote="Arguing that you don't care about privacy because you have nothing to hide is like arguing you don't care about free speech because you have nothing to say."
          author="Edward Snowden"
        />

        <SectionDivider />
        <TxDemo />              {/* 03 — Show don't tell */}
        <SectionDivider />
        <ZkProofFlow />         {/* 04 — How it works */}
        <SectionDivider />
        <SelectiveDisclosure /> {/* 05 — Practical application */}
        <SectionDivider />
        <Landscape />           {/* 06 — Why Zcash vs alternatives */}
        <SectionDivider />

        <FullQuote
          quote="Privacy is necessary for an open society in the electronic age. We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy."
          author="Eric Hughes"
          role="A Cypherpunk's Manifesto (1993)"
        />

        <SectionDivider />
        <Timeline />            {/* 07 — Where it's been */}
        <SectionDivider />
        <Tachyon />             {/* 07b — Where it's going */}
        <SectionDivider />
        <Tokenomics />          {/* 08 — The money case */}
        <SectionDivider />
        <Future />              {/* 09 — Thesis */}
        <SectionDivider />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
