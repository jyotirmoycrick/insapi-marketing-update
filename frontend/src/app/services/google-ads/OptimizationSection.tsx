import { UniversalContentSection } from '@/components/UniversalContentSection';
import optimizationImage from '@/assets/services/google-ads/google-ads-008-optimization.png';

export function OptimizationSection() {
  return (
    <UniversalContentSection
      page="google-ads"
      sectionId="optimization"
      sectionName="Optimization & Scaling"
      imageSrc={optimizationImage}
      imageAlt="Optimization & Scaling"
      defaultHeading="Optimization & Scaling"
      defaultPoints={[
        "Continuous performance improvement",
        "Budget scaling strategies"
      ]}
      imagePosition="right"
    />
  );
}
