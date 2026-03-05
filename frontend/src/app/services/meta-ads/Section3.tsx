import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/meta-ads/meta-ads-004-audience-targeting.png';

export function Section3() {
  return (
    <UniversalContentSection
      page="meta-ads"
      sectionId="section3"
      sectionName="Ad Creatives & Copy"
      imageSrc={image}
      imageAlt="Ad Creatives & Copy"
      defaultHeading="Ad Creatives & Copy"
      defaultPoints={[
        "Eye-catching visuals that stop the scroll",
        "Clear messaging that drives action"
      ]}
      imagePosition="left"
    />
  );
}
