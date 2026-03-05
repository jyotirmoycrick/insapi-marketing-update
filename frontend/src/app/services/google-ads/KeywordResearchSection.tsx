import { UniversalContentSection } from '@/components/UniversalContentSection';
import keywordImage from '@/assets/services/google-ads/google-ads-004-keyword-research.png';

export function KeywordResearchSection() {
  return (
    <UniversalContentSection
      page="google-ads"
      sectionId="keyword-research"
      sectionName="Keyword Research & Targeting"
      imageSrc={keywordImage}
      imageAlt="Keyword Research & Targeting"
      defaultHeading="Keyword Research & Targeting"
      defaultPoints={[
        "High-intent keyword identification",
        "Negative keyword management"
      ]}
      imagePosition="right"
    />
  );
}
