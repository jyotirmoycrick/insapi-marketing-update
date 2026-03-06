import { GoogleAdsHero } from './GoogleAdsHero';
import { GoogleAdsSection } from './GoogleAdsSection';
import { GoogleAdsStrategySection } from './GoogleAdsStrategySection';
import { KeywordResearchSection } from './KeywordResearchSection';
import { AdCopywritingSection } from './AdCopywritingSection';
import { LandingPageSection } from './LandingPageSection';
import { ConversionTrackingSection } from './ConversionTrackingSection';
import { OptimizationSection } from './OptimizationSection';
import { OurStrengthSection } from './OurStrengthSection';
import { GoogleAdsFAQSection } from './GoogleAdsFAQSection';
import { GoogleAdsMobilePage } from './GoogleAdsMobilePage';

export function GoogleAdsPage() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block min-h-screen bg-white m-0 p-0">
        <GoogleAdsHero />
        <GoogleAdsSection />
        <GoogleAdsStrategySection />
        <KeywordResearchSection />
        <AdCopywritingSection />
        <LandingPageSection />
        <ConversionTrackingSection />
        <OptimizationSection />
        <OurStrengthSection />
        <GoogleAdsFAQSection />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <GoogleAdsMobilePage />
      </div>
    </>
  );
}
