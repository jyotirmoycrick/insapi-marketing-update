import { UniversalContentSection } from '@/components/UniversalContentSection';
import optimizationImage from '@/assets/services/content-marketing/content-marketing-008-social-short-form.png';

export function ContentOptimizationSection() {
  return (
    <UniversalContentSection
      page="content-marketing"
      sectionId="content-optimization"
      sectionName="Content Optimization & Refresh"
      imageSrc={optimizationImage}
      imageAlt="Content Optimization & Refresh"
      defaultHeading="Content Optimization & Refresh"
      defaultPoints={[
        "Improve existing content performance",
        "Update content to stay relevant"
      ]}
      imagePosition="right"
    />
  );
}
