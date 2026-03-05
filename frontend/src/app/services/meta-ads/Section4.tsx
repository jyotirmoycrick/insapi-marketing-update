import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/meta-ads/meta-ads-005-creative-design.png';

export function Section4() {
  return (
    <UniversalContentSection
      page="meta-ads"
      sectionId="section4"
      sectionName="Funnel & Landing Page Guidance"
      imageSrc={image}
      imageAlt="Funnel & Landing Page Guidance"
      defaultHeading="Funnel & Landing Page Guidance"
      defaultPoints={[
        "Optimized pages that convert visitors",
        "Streamlined user journeys and funnels"
      ]}
      imagePosition="right"
    />
  );
}
