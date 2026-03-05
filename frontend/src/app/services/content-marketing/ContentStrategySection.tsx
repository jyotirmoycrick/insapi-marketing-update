import { UniversalContentSection } from '@/components/UniversalContentSection';
import strategyImage from '@/assets/services/content-marketing/content-marketing-003-strategy-planning.png';

export function ContentStrategySection() {
  return (
    <UniversalContentSection
      page="content-marketing"
      sectionId="content-strategy"
      sectionName="Content Strategy & Planning"
      imageSrc={strategyImage}
      imageAlt="Content Strategy & Planning"
      defaultHeading="Content Strategy & Planning"
      defaultPoints={[
        "Content mapped to business goals",
        "Topics planned around audience intent"
      ]}
      imagePosition="left"
    />
  );
}
