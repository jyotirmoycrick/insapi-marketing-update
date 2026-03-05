import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/meta-ads/meta-ads-003-strategy.png';

export function Section2() {
  return (
    <UniversalContentSection
      page="meta-ads"
      sectionId="section2"
      sectionName="Audience Targeting & Retargeting"
      imageSrc={image}
      imageAlt="Audience Targeting & Retargeting"
      defaultHeading="Audience Targeting & Retargeting"
      defaultPoints={[
        "Reach the right people with precision",
        "Advanced retargeting to convert interested users"
      ]}
      imagePosition="right"
    />
  );
}
