import { UniversalFAQ } from '@/components/UniversalFAQ';

export function MetaAdsFAQSection() {
  return (
    <UniversalFAQ
      page="meta-ads"
      defaultHeading="FAQs"
      defaultSubheading="Find answers to common questions about Meta Ads"
      defaultFAQs={[
        {
          question: "What is Meta Ads?",
          answer: "Meta Ads (formerly Facebook Ads) is an advertising platform that allows businesses to reach their target audience across Facebook, Instagram, Messenger, and WhatsApp with highly targeted campaigns."
        },
        {
          question: "Why should I invest in Meta Ads?",
          answer: "Meta Ads offers unparalleled audience targeting, cost-effective advertising, detailed analytics, and access to billions of active users across multiple platforms, making it ideal for businesses of all sizes."
        },
        {
          question: "How much should I budget for Meta Ads?",
          answer: "Budget depends on your goals and industry. We recommend starting with at least $1,000-$2,000 per month to gather meaningful data and optimize campaigns effectively for best results."
        },
        {
          question: "How do you measure Meta Ads success?",
          answer: "We track key metrics including ROAS (Return on Ad Spend), CPA (Cost Per Acquisition), CTR (Click-Through Rate), conversion rates, engagement metrics, and overall campaign ROI to measure success."
        },
        {
          question: "How long does it take to see results?",
          answer: "Initial results can be seen within 1-2 weeks, but optimal performance typically develops after 30-60 days as we gather data, test creatives, and refine targeting strategies."
        }
      ]}
    />
  );
}
