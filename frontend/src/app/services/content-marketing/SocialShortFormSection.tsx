import { UniversalContentSection } from '@/components/UniversalContentSection';
import socialImage from '@/assets/services/content-marketing/content-marketing-007-blog-thought-leadership.png';

export function SocialShortFormSection() {
  return (
    <UniversalContentSection
      page="content-marketing"
      sectionId="social-short-form"
      sectionName="Social & Short-Form Content"
      imageSrc={socialImage}
      imageAlt="Social & Short-Form Content"
      defaultHeading="Social & Short-Form Content"
      defaultPoints={[
        "Platform-friendly content formats",
        "Messaging tailored to your audience"
      ]}
      imagePosition="left"
    />
  );
}
