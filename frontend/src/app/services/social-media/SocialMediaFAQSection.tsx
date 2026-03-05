import { UniversalFAQ } from '@/components/UniversalFAQ';

export function SocialMediaFAQSection() {
  return (
    <UniversalFAQ
      page="social-media"
      defaultHeading="FAQs"
      defaultSubheading="Find answers to common questions about social media marketing"
      defaultFAQs={[
        {
          question: "What is social media marketing?",
          answer: "Social media marketing involves creating and sharing content on social platforms to achieve marketing and branding goals. It includes posting text, images, videos, and engaging with your audience to build brand awareness and drive business results."
        },
        {
          question: "Which social media platforms should my business be on?",
          answer: "The best platforms depend on your target audience and business goals. Most businesses benefit from Facebook and Instagram, while B2B companies should focus on LinkedIn. We help identify the right platforms for your specific needs."
        },
        {
          question: "How often should we post on social media?",
          answer: "Posting frequency varies by platform and audience. Generally, we recommend 3-5 posts per week on Facebook and Instagram, daily on Twitter, and 2-3 times per week on LinkedIn for optimal engagement without overwhelming your audience."
        },
        {
          question: "Do you create the content or do we?",
          answer: "We handle all content creation including copywriting, graphic design, and video editing. You provide brand guidelines and approval, while we take care of the creative work and posting schedule."
        },
        {
          question: "How do you measure social media success?",
          answer: "We track key metrics including follower growth, engagement rates, reach, website traffic, lead generation, and conversions. You'll receive regular reports showing how social media contributes to your business goals."
        }
      ]}
    />
  );
}
