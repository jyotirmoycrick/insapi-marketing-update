import { MetaAdsHero } from './MetaAdsHero';
import { MetaAdsProcessTitle } from './MetaAdsProcessTitle';
import { Section1 } from './Section1';
import { Section2 } from './Section2';
import { Section3 } from './Section3';
import { Section4 } from './Section4';
import { Section5 } from './Section5';
import { Section6 } from './Section6';
import { OurStrengthSection } from './OurStrengthSection';
import { ReadyToGrowSection } from './ReadyToGrowSection';
import { MetaAdsFAQSection } from './MetaAdsFAQSection';
import { MetaAdsMobilePage } from './MetaAdsMobilePage';
import { Footer } from '../../components/Footer';

export function MetaAdsPage() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block min-h-screen bg-white m-0 p-0">
        <MetaAdsHero />
        <MetaAdsProcessTitle />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <OurStrengthSection />
        <ReadyToGrowSection />
        <MetaAdsFAQSection />
        <Footer />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <MetaAdsMobilePage />
      </div>
    </>
  );
}
