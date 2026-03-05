import { UniversalContentSection } from '@/components/UniversalContentSection';
import conversionImage from '@/assets/services/google-ads/google-ads-007-conversion-tracking.png';

export function ConversionTrackingSection() {
  return (
    <UniversalContentSection
      page="google-ads"
      sectionId="conversion-tracking"
      sectionName="Conversion Tracking Setup"
      imageSrc={conversionImage}
      imageAlt="Conversion Tracking Setup"
      defaultHeading="Conversion Tracking Setup"
      defaultPoints={[
        "Accurate conversion measurement",
        "ROI tracking and reporting"
      ]}
      imagePosition="left"
    />
  );
}
