import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/meta-ads/meta-ads-007-analytics.png';

export function Section6() {
  return (
    <UniversalContentSection
      page="meta-ads"
      sectionId="section6"
      sectionName="Optimization & Scaling"
      imageSrc={image}
      imageAlt="Optimization & Scaling"
      defaultHeading="Optimization & Scaling"
      defaultPoints={[
        "Ongoing testing to improve results",
        "Strategic scaling when performance is strong"
      ]}
      imagePosition="right"
    />
  );
}
