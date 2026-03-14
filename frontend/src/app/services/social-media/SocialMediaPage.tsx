import { SocialMediaHero } from './SocialMediaHero';
import { PlatformsSection } from './PlatformsSection';
import { ProcessSection } from './ProcessSection';
import { WhyChooseSection } from './WhyChooseSection';
import { ResultsSection } from './ResultsSection';
import { ReadyToTurnSection } from './ReadyToTurnSection';
import { SocialMediaFAQSection } from './SocialMediaFAQSection';
import { SocialMediaMobilePage } from './SocialMediaMobilePage';
import { useEffect, useState } from 'react';

export function SocialMediaPage() {
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);

    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      {isMobile ? (
        <SocialMediaMobilePage />
      ) : (
        <div className="min-h-screen bg-white m-0 p-0">
          <SocialMediaHero />
          <PlatformsSection />
          <ProcessSection />
          <WhyChooseSection />
          <ResultsSection />
          <ReadyToTurnSection />
          <SocialMediaFAQSection />
        </div>
      )}
    </>
  );
}
