import { useState } from 'react';
import faqDesktopImage from '@/assets/services/build-a-brand/faq-desktop.png';

export function DesktopFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why Does My Business Need Branding?",
      answer: "Branding helps people recognize and trust your business. If your brand looks unclear or inconsistent, customers hesitate to choose you."
    },
    {
      question: "How Is Branding Different From PR?",
      answer: "Branding is how you look and feel. PR is how you get seen and talked about. Both work together to build trust."
    },
    {
      question: "When Will I Start Seeing Results From PR?",
      answer: "You'll start seeing media mentions within 30-60 days. Long-term trust and authority build over 3-6 months."
    },
    {
      question: "Do You Work With Small Or New Businesses?",
      answer: "Yes. We work with growing businesses that want to look professional and get noticed."
    },
    {
      question: "Will This Help My Business Get More Customers?",
      answer: "Yes. A strong brand and media presence make people trust you more, which leads to more customers."
    }
  ];

  return (
    <section className="relative w-full">
      {/* Full-width background image */}
      <img 
        src={faqDesktopImage} 
        alt="FAQ Background" 
        className="w-full h-auto block brightness-90" 
      />
      
      {/* FAQ Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 lg:pr-24">
        <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">FAQs</h2>
          <p className="text-black mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
            Find answers to common questions about our branding & PR services
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
