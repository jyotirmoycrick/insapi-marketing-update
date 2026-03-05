import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/meta-ads/meta-ads-002-platforms.png';

export function Section1() {
  return (
    <UniversalContentSection
      page="meta-ads"
      sectionId="section1"
      sectionName="Meta Ads Strategy"
      imageSrc={image}
      imageAlt="Meta Ads Strategy"
      defaultHeading="Meta Ads Strategy"
      defaultPoints={[
        "Clear campaign goals aligned with your business objectives",
        "Smart budget planning for better ROI"
      ]}
      imagePosition="left"
    />
  );
}
