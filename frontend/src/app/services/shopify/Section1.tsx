import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/shopify/shopify-003-custom-design.png';

export function Section1() {
  return (
    <UniversalContentSection
      page="shopify"
      sectionId="section1"
      sectionName="Custom Shopify Store Design"
      imageSrc={image}
      imageAlt="Custom Shopify Store Design"
      defaultHeading="Custom Shopify Store Design"
      defaultPoints={[
        "Clean, brand-aligned UI/UX",
        "Designed to guide users toward purchase"
      ]}
      imagePosition="left"
    />
  );
}
