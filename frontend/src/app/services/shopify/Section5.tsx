import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/shopify/shopify-008-store-optimization.png';

export function Section5() {
  return (
    <UniversalContentSection
      page="shopify"
      sectionId="section5"
      sectionName="Payment, Shipping & Tax Setup"
      imageSrc={image}
      imageAlt="Payment, Shipping & Tax Setup"
      defaultHeading="Payment, Shipping & Tax Setup"
      defaultPoints={[
        "Smooth checkout experience",
        "Region-specific configurations"
      ]}
      imagePosition="left"
    />
  );
}
