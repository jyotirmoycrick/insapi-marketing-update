import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/meta-ads/meta-ads-006-campaign-management.png';

export function Section5() {
  return (
    <UniversalContentSection
      page="meta-ads"
      sectionId="section5"
      sectionName="Conversion Tracking Setup"
      imageSrc={image}
      imageAlt="Conversion Tracking Setup"
      defaultHeading="Conversion Tracking Setup"
      defaultPoints={[
        "Proper pixel installation with tracking",
        "Accurate data for better optimization"
      ]}
      imagePosition="left"
    />
  );
}
