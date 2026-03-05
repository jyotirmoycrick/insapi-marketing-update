import { UniversalHero } from '@/components/UniversalHero';
import heroImage from '@/assets/services/build-a-brand/build-a-brand-001-hero.png';

export function ServiceHero() {
  return (
    <UniversalHero
      page="services"
      imageSrc={heroImage}
      imageAlt="Branding & PR Services"
    />
  );
}
