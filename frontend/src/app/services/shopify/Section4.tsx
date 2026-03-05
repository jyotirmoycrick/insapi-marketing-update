import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/shopify/shopify-007-payment-setup.png';

export function Section4() {
  return (
    <UniversalContentSection
      page="shopify"
      sectionId="section4"
      sectionName="App Integration & Customization"
      imageSrc={image}
      imageAlt="App Integration & Customization"
      defaultHeading="App Integration & Customization"
      defaultPoints={[
        "Essential app setup",
        "Performance-safe integrations"
      ]}
      imagePosition="right"
    />
  );
}
