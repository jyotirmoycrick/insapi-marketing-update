import { UniversalContentSection } from '@/components/UniversalContentSection';
import seoImage from '@/assets/services/content-marketing/content-marketing-004-seo-content.png';

export function SEOContentSection() {
  return (
    <UniversalContentSection
      page="content-marketing"
      sectionId="seo-content"
      sectionName="SEO Content Creation"
      imageSrc={seoImage}
      imageAlt="SEO Content Creation"
      defaultHeading="SEO Content Creation"
      defaultPoints={[
        "Search-focused, Google-safe writing",
        "Optimized structure and readability"
      ]}
      imagePosition="right"
    />
  );
}
