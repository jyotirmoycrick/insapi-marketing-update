import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/shopify/shopify-006-app-integration.png';

export function Section3() {
  return (
    <UniversalContentSection
      page="shopify"
      sectionId="section3"
      sectionName="Product & Collection Setup"
      imageSrc={image}
      imageAlt="Product & Collection Setup"
      defaultHeading="Product & Collection Setup"
      defaultPoints={[
        "SEO-friendly product structure",
        "Smart navigation and filters"
      ]}
      imagePosition="left"
    />
  );
}
