import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/shopify/shopify-004-store-development.png';

export function Section2() {
  return (
    <UniversalContentSection
      page="shopify"
      sectionId="section2"
      sectionName="Shopify Store Development"
      imageSrc={image}
      imageAlt="Shopify Store Development"
      defaultHeading="Shopify Store Development"
      defaultPoints={[
        "Custom sections and layouts",
        "Mobile-first, fast-loading builds"
      ]}
      imagePosition="right"
    />
  );
}
