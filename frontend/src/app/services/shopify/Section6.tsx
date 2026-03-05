import { UniversalContentSection } from '@/components/UniversalContentSection';
import image from '@/assets/services/shopify/shopify-009-our-strength.png';

export function Section6() {
  return (
    <UniversalContentSection
      page="shopify"
      sectionId="section6"
      sectionName="Store Optimization & Support"
      imageSrc={image}
      imageAlt="Store Optimization & Support"
      defaultHeading="Store Optimization & Support"
      defaultPoints={[
        "Speed and SEO improvements",
        "Ongoing fixes and updates"
      ]}
      imagePosition="right"
    />
  );
}
