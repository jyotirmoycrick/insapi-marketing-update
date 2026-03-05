import { UniversalContentSection } from '@/components/UniversalContentSection';
import adCopyImage from '@/assets/services/google-ads/google-ads-005-ad-copywriting.png';

export function AdCopywritingSection() {
  return (
    <UniversalContentSection
      page="google-ads"
      sectionId="ad-copywriting"
      sectionName="Ad Copywriting"
      imageSrc={adCopyImage}
      imageAlt="Ad Copywriting"
      defaultHeading="Ad Copywriting"
      defaultPoints={[
        "Compelling ad headlines and descriptions",
        "A/B testing for optimal performance"
      ]}
      imagePosition="left"
    />
  );
}
