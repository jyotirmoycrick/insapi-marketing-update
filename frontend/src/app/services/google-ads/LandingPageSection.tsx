import { UniversalContentSection } from '@/components/UniversalContentSection';
import landingPageImage from '@/assets/services/google-ads/google-ads-006-landing-page.png';

export function LandingPageSection() {
  return (
    <UniversalContentSection
      page="google-ads"
      sectionId="landing-page"
      sectionName="Landing Page Alignment"
      imageSrc={landingPageImage}
      imageAlt="Landing Page Alignment"
      defaultHeading="Landing Page Alignment"
      defaultPoints={[
        "Ad-to-page message match",
        "Conversion-focused page design"
      ]}
      imagePosition="right"
    />
  );
}
