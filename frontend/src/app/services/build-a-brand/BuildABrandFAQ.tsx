import { useState } from 'react';
import faqImage from '@/assets/services/build-a-brand/faq-mobile.png';

export function BuildABrandFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why Does My Business Need Branding?",
      answer: "Branding helps people recognize and trust your business.\n\nIf your brand looks unclear or inconsistent, customers hesitate to choose you."
    },
    {
      question: "How Is Branding Different From PR?",
      answer: ""
    },
    {
      question: "When Will I Start Seeing Results From PR?",
      answer: ""
    },
    {
      question: "Do You Work With Small Or New Businesses?",
      answer: ""
    },
    {
      question: "Will This Help My Business Get More Customers?",
      answer: ""
    }
  ];

  return (
    <section className="relative bg-white">
      <img src={faqImage} alt="Build a Brand FAQ" className="w-full block" />
      
      {/* FAQ Overlay */}
      <div className="absolute left-0 right-0 px-6" style={{ top: '38%' }}>
        <h2 className="text-4xl font-bold mb-10 text-gray-900">FAQS</h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-8">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-start text-left"
              >
                <span className="font-semibold text-xl text-gray-800 pr-4 leading-snug">
                  {faq.question}
                </span>
                <span className="text-3xl text-gray-600 flex-shrink-0">
                  {openIndex === index ? '−' : '∨'}
                </span>
              </button>
              
              {openIndex === index && faq.answer && (
                <div className="mt-4 text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
