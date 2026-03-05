import { useState } from 'react';
import faqImage from '@/assets/services/build-a-brand/faq-desktop.png';

export function DesktopFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why Does My Business Need Branding?",
      answer: "Branding helps people recognize and trust your business. If your brand looks unclear or inconsistent, customers hesitate to choose you."
    },
    {
      question: "How Is Branding Different From PR?",
      answer: "Branding is how you look and sound. PR is how you're seen publicly. Both work together to build trust and visibility."
    },
    {
      question: "When Will I Start Seeing Results From PR?",
      answer: "PR builds over time. You may see early mentions in 4-8 weeks, but lasting authority takes consistent effort."
    },
    {
      question: "Do You Work With Small Or New Businesses?",
      answer: "Yes. We help businesses at every stage build a strong, professional brand and public presence."
    },
    {
      question: "Will This Help My Business Get More Customers?",
      answer: "Yes. A strong brand and trusted reputation make it easier for customers to choose you over competitors."
    }
  ];

  return (
    <section className="relative bg-white">
      <img src={faqImage} alt="FAQ Background" className="w-full block" />
      
      {/* FAQ Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center py-16">
        <div className="max-w-4xl w-full px-8">
          <h2 className="text-5xl font-bold mb-12 text-gray-900 text-center">FAQS</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="font-semibold text-xl text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <span className="text-3xl text-gray-600 flex-shrink-0">
                    {openIndex === index ? '−' : '∨'}
                  </span>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 text-lg text-gray-600 leading-relaxed">
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
