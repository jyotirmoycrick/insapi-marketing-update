import { ContentMarketingHero } from './ContentMarketingHero';
import { ContentChannelsSection } from './ContentChannelsSection';
import { ContentStrategySection } from './ContentStrategySection';
import { SEOContentSection } from './SEOContentSection';
import { WebsiteLandingSection } from './WebsiteLandingSection';
import { BlogLeadershipSection } from './BlogLeadershipSection';
import { SocialShortFormSection } from './SocialShortFormSection';
import { ContentOptimizationSection } from './ContentOptimizationSection';
import { WhatWeFocusOnSection } from './WhatWeFocusOnSection';
import { OurStrengthSection } from './OurStrengthSection';
import { ReadyToBuildSection } from './ReadyToBuildSection';
import { ContentMarketingFAQSection } from './ContentMarketingFAQSection';
import { ContentMarketingMobilePage } from './ContentMarketingMobilePage';
import { Footer } from '../../components/Footer';

export function ContentMarketingPage() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block min-h-screen bg-white m-0 p-0">
        <ContentMarketingHero />
        <ContentChannelsSection />
        <ContentStrategySection />
        <SEOContentSection />
        <WebsiteLandingSection />
        <BlogLeadershipSection />
        <SocialShortFormSection />
        <ContentOptimizationSection />
        <WhatWeFocusOnSection />
        <OurStrengthSection />
        <ReadyToBuildSection />
        <ContentMarketingFAQSection />
        <Footer />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <ContentMarketingMobilePage />
      </div>
    </>
  );
}
