import { UniversalContentSection } from '@/components/UniversalContentSection';
import websiteImage from '@/assets/services/content-marketing/content-marketing-005-website-landing.png';

export function WebsiteLandingSection() {
  return (
    <UniversalContentSection
      page="content-marketing"
      sectionId="website-landing"
      sectionName="Website & Landing Page Content"
      imageSrc={websiteImage}
      imageAlt="Website & Landing Page Content"
      defaultHeading="Website & Landing Page Content"
      defaultPoints={[
        "Clear messaging and value positioning",
        "Content designed to convert visitors"
      ]}
      imagePosition="left"
    />
  );
}
