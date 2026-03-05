import { UniversalHero } from '@/components/UniversalHero';
import heroImage from '@/assets/services/build-a-brand/build-a-brand-001-hero.png';

export function BuildABrandDesktopHero() {
  return (
    <UniversalHero
      page="build-a-brand"
      imageSrc={heroImage}
      imageAlt="Build a Brand - Branding & Digital PR"
      defaultHeading="Talk To Our Expert"
      defaultButtonText="GET STARTED NOW"
    />
  );
}
