import faqImage from '@/assets/shared/shared-002-faq.png';
import { useState } from 'react';

export function ServiceFAQShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in your branding services?",
      answer: "Our branding services include brand strategy, logo design, visual identity, brand guidelines, messaging framework, and brand positioning to create a cohesive and memorable brand."
    },
    {
      question: "How does PR help my business grow?",
      answer: "PR builds credibility and trust by getting your brand featured in media outlets, establishing thought leadership, and creating positive public perception that drives customer confidence."
    },
    {
      question: "Do you work with startups or only established businesses?",
      answer: "We work with both! Whether you're a startup building your first brand or an established business looking to rebrand, we tailor our approach to your stage and goals."
    },
    {
      question: "How long does a branding project take?",
      answer: "A typical branding project takes 6-12 weeks, depending on scope. This includes discovery, strategy development, design iterations, and final delivery of all brand assets."
    },
    {
      question: "Can you help with both branding and PR together?",
      answer: "Absolutely! We specialize in integrated branding and PR strategies that work together to build a strong, credible brand presence both visually and in the media."
    }
  ];

  return (
    <section className="relative w-full">
      {/* Full-width background image */}
      <img 
        src={faqImage} 
        alt="FAQ Background" 
        className="w-full h-auto block" 
      />
      
      {/* FAQ Content Overlay - NO WHITE BACKGROUND */}
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
