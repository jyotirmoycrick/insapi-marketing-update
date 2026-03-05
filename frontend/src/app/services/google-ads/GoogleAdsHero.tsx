import { UniversalHero } from '@/components/UniversalHero';
import googleAdsHeroImage from '@/assets/services/google-ads/google-ads-001-hero.png';

export function GoogleAdsHero() {
  return (
    <UniversalHero
      page="google-ads"
      imageSrc={googleAdsHeroImage}
      imageAlt="Google Ads Management"
      defaultHeading="Get A Marketing Audit"
      defaultButtonText="GET STARTED NOW"
    />
  );
}
