import { UniversalFAQ } from '@/components/UniversalFAQ';

export function ContentMarketingFAQSection() {
  return (
    <UniversalFAQ
      page="content-marketing"
      defaultHeading="FAQs"
      defaultSubheading="Find answers to common questions about content marketing"
      defaultFAQs={[
        {
          question: "What is content marketing?",
          answer: "Content marketing is a strategic approach focused on creating and distributing valuable, relevant content to attract and engage your target audience, ultimately driving profitable customer action."
        },
        {
          question: "Why do businesses need content marketing?",
          answer: "Content marketing builds trust, establishes authority, improves SEO rankings, generates leads, and nurtures customer relationships through valuable information that addresses their needs and pain points."
        },
        {
          question: "What types of content do you create?",
          answer: "We create SEO-optimized blog posts, website copy, landing pages, social media content, thought leadership articles, and short-form content tailored to your brand and audience."
        },
        {
          question: "How do you measure content marketing success?",
          answer: "We track metrics including organic traffic, engagement rates, conversion rates, keyword rankings, time on page, social shares, and lead generation to measure content performance and ROI."
        },
        {
          question: "How long does it take to see results?",
          answer: "Content marketing is a long-term strategy. You'll typically see initial engagement within 1-2 months, with significant SEO and traffic improvements appearing within 3-6 months of consistent publishing."
        }
      ]}
    />
  );
}
