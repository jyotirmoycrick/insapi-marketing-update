import { useState } from 'react';
import faqImage from '@/assets/shared/shared-001-branding-desk.png';

export function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why Can't My Business Grow Without Branding?",
      answer: "Your brand is the foundation of how customers perceive and trust you. Without clear branding, you blend in with competitors and struggle to build lasting customer relationships."
    },
    {
      question: "What's Included In Your Branding Services?",
      answer: "We provide comprehensive branding services including logo design, brand guidelines, visual identity, and marketing collateral to ensure consistency across all platforms."
    },
    {
      question: "How Does PR Help My Business?",
      answer: "PR builds credibility and authority by getting your brand featured in media outlets, establishing thought leadership, and managing your public reputation effectively."
    },
    {
      question: "How Long Does The Branding Process Take?",
      answer: "The branding process typically takes 4-8 weeks depending on the scope of work, including research, design iterations, and finalization of brand guidelines."
    },
    {
      question: "Do You Work With Startups Or Only Established Companies?",
      answer: "We work with businesses at all stages - from startups building their first brand identity to established companies looking to rebrand or enhance their market position."
    }
  ];

  return (
    <section className="relative w-full">
      {/* Full-width background image */}
      <img 
        src={faqImage} 
        alt="FAQ" 
        className="w-full h-auto block" 
      />
      
      {/* FAQ Content Overlay - NO WHITE BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 lg:pr-24">
        <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">FAQs</h2>
          <p className="text-black mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
            Find answers to common questions about branding & PR
          </p>
          
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-3 md:py-4 flex justify-between items-center text-left hover:text-gray-700 transition-colors"
                >
                  <span className="font-semibold pr-4 text-xs sm:text-sm md:text-base text-black">{faq.question}</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-light text-black flex-shrink-0">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="pb-3 md:pb-4 text-black text-xs sm:text-sm md:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
