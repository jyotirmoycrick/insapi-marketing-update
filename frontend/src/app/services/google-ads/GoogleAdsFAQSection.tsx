import { UniversalFAQ } from '@/components/UniversalFAQ';

export function GoogleAdsFAQSection() {
  return (
    <UniversalFAQ
      page="google-ads"
      defaultHeading="FAQs"
      defaultSubheading="Find answers to common questions about Google Ads"
      defaultFAQs={[
        {
          question: "What is Google Ads?",
          answer: "Google Ads is an online advertising platform where businesses can create ads that appear on Google search results, YouTube, and millions of websites across the Google Display Network."
        },
        {
          question: "How much should I budget for Google Ads?",
          answer: "Budget depends on your industry, competition, and goals. We typically recommend starting with at least $1,500-$3,000 per month to gather meaningful data and achieve results."
        },
        {
          question: "How long does it take to see results?",
          answer: "You can start seeing clicks and traffic immediately, but optimal performance usually develops after 2-3 months as we gather data, test variations, and refine targeting."
        },
        {
          question: "Do you provide reporting?",
          answer: "Yes, we provide detailed monthly reports showing key metrics like impressions, clicks, conversions, cost per acquisition, and ROI, along with insights and recommendations."
        },
        {
          question: "Can you work with my existing campaigns?",
          answer: "Absolutely! We can audit and optimize your existing Google Ads campaigns to improve performance, reduce wasted spend, and increase conversions."
        }
      ]}
    />
  );
}
