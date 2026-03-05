import { UniversalHero } from '@/components/UniversalHero';
import metaAdsHeroImage from '@/assets/services/meta-ads/meta-ads-001-hero.png';

export function MetaAdsHero() {
  return (
    <UniversalHero
      page="meta-ads"
      imageSrc={metaAdsHeroImage}
      imageAlt="Meta Ads Management"
    />
  );
}
