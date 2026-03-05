import { UniversalHero } from '@/components/UniversalHero';
import heroImage from '@/assets/services/social-media/social-media-001-hero.png';

export function SocialMediaHero() {
  return (
    <UniversalHero
      page="social-media"
      imageSrc={heroImage}
      imageAlt="Social Media Marketing Services"
    />
  );
}
