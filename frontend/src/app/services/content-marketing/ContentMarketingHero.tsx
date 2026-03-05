import { UniversalHero } from '@/components/UniversalHero';
import contentMarketingHeroImage from '@/assets/services/content-marketing/content-marketing-001-hero.png';

export function ContentMarketingHero() {
  return (
    <UniversalHero
      page="content-marketing"
      imageSrc={contentMarketingHeroImage}
      imageAlt="Content Marketing Services"
    />
  );
}
