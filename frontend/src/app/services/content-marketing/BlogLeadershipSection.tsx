import { UniversalContentSection } from '@/components/UniversalContentSection';
import blogImage from '@/assets/services/content-marketing/content-marketing-006-creative-process.png';

export function BlogLeadershipSection() {
  return (
    <UniversalContentSection
      page="content-marketing"
      sectionId="blog-leadership"
      sectionName="Blog & Thought Leadership"
      imageSrc={blogImage}
      imageAlt="Blog & Thought Leadership"
      defaultHeading="Blog & Thought Leadership"
      defaultPoints={[
        "Authority-building long-form content",
        "Consistent publishing for growth"
      ]}
      imagePosition="right"
    />
  );
}
