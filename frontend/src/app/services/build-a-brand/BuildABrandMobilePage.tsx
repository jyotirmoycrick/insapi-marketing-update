import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import { Footer } from '../../components/Footer';
import { Check } from 'lucide-react';
import { useState } from 'react';
import heroImage from '@/assets/services/build-a-brand/hero-mobile.png';
import section01 from '@/assets/services/build-a-brand/section-01.png';
import section02 from '@/assets/services/build-a-brand/section-02.png';
import section03 from '@/assets/services/build-a-brand/section-03.png';
import section04 from '@/assets/services/build-a-brand/section-04.png';
import section07 from '@/assets/services/build-a-brand/section-07.png';
import section08 from '@/assets/services/build-a-brand/section-08.png';
import faqImage from '@/assets/services/build-a-brand/faq-mobile.png';

export function BuildABrandMobilePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why Does My Business Need Branding?",
      answer: "Branding helps people recognize and trust your business.\nIf your brand looks unclear or inconsistent, customers hesitate to choose you."
    },
    {
      question: "How Is Branding Different From PR?",
      answer: "Branding is how you look and sound. PR is how you're seen publicly.\nBoth work together to build trust and visibility."
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
    <div className="w-full bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full block m-0 p-0 leading-none">
        <div className="w-full block m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <img 
            src={heroImage} 
            alt="Build a Brand - Branding & Digital PR" 
            className="w-full h-auto block m-0 p-0 leading-none"
            style={{ verticalAlign: 'bottom', display: 'block' }}
          />
        </div>
        
        {/* Form Overlay */}
        <div className="flex absolute top-0 left-0 w-full h-full items-start justify-center pt-2 px-2 pointer-events-none">
          <div className="w-full max-w-[380px] pointer-events-auto">
            <UniversalFormMobile 
              formHeading="Talk To Our Expert"
              buttonText="GET STARTED NOW"
              pageId="build-a-brand"
            />
          </div>
        </div>
      </section>

      {/* Section 01 */}
      <section className="relative bg-white">
        <img src={section01} alt="Build a Brand Section" className="w-full block" />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full px-6 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What We Help You Achieve</h2>
          
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Clear brand identity that customers remember
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Consistent brand voice across all platforms
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Strong public image that builds trust
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Media presence that adds authority
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Professional positioning in your market
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 */}
      <section className="bg-white">
        {/* White Background Text Section */}
        <div className="bg-white px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Branding Services</h2>
          <p className="text-gray-700 text-sm mb-8 text-center leading-relaxed">
            We create brands that look professional and feel reliable.
          </p>
          
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Brand strategy & positioning
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Logo & visual identity direction
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Brand guidelines (colors, fonts, tone)
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Website & social brand alignment
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Rebranding for growing businesses
              </p>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mt-8 text-center leading-relaxed">
            <span className="font-semibold text-gray-900">Result:</span> A brand that looks serious, confident, and established.
          </p>
        </div>
        
        {/* Image Section */}
        <div className="w-full">
          <img src={section02} alt="Branding Services" className="w-full block" />
        </div>
      </section>

      {/* Section 03 */}
      <section className="bg-white">
        {/* White Background Text Section */}
        <div className="bg-white px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our PR Services</h2>
          <p className="text-gray-700 text-sm mb-8 text-center leading-relaxed">
            We get your business seen in the right places.
          </p>
          
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Press release writing & distribution
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Media outreach & relationship building
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Industry publication features
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Thought leadership positioning
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                Crisis communication support
              </p>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mt-8 text-center leading-relaxed">
            <span className="font-semibold text-gray-900">Result:</span> Your business gets noticed, trusted, and talked about.
          </p>
        </div>
        
        {/* Image Section */}
        <div className="w-full">
          <img src={section03} alt="PR Services" className="w-full block" />
        </div>
      </section>

      {/* Section 04 */}
      <section className="bg-white">
        {/* White Background Text Section */}
        <div className="bg-white px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Strength In Branding & PR</h2>
          
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                We don't just design—we build brands that mean something
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                We connect you with real media, not just press release sites
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                We make sure your brand and message stay consistent everywhere
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <p className="text-gray-900 text-base leading-relaxed font-medium">
                We work with businesses that want to grow, not just look good
              </p>
            </div>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="w-full">
          <img src={section04} alt="Our Strength" className="w-full block" />
        </div>
      </section>

      {/* Section 07 */}
      <section className="bg-white">
        <img src={section07} alt="Build a Brand Section" className="w-full block" />
      </section>

      {/* Section 08 with Button */}
      <section className="relative bg-white">
        <img src={section08} alt="Ready to Build" className="w-full block" />
        
        {/* Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pt-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            BOOK A FREE BRANDING CONSULTATION
            <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
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

      <Footer />
    </div>
  );
}
