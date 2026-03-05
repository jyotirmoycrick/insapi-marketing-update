import { UniversalContentSection } from '@/components/UniversalContentSection';
import strategyImage from '@/assets/services/google-ads/google-ads-003-strategy.png';

export function GoogleAdsStrategySection() {
  return (
    <UniversalContentSection
      page="google-ads"
      sectionId="strategy"
      sectionName="Google Ads Strategy"
      imageSrc={strategyImage}
      imageAlt="Google Ads Strategy"
      defaultHeading="Google Ads Strategy"
      defaultPoints={[
        "Campaign goals aligned with business objectives",
        "Audience targeting and segmentation"
      ]}
      imagePosition="left"
    />
  );
}
