import heroMobileImage from '@/assets/services/google-ads/hero-mobile.png';
import afterHeroImage from '@/assets/services/google-ads/after-hero-section.png';
import section01 from '@/assets/services/google-ads/section-01.png';
import section02 from '@/assets/services/google-ads/section-02.png';
import section03 from '@/assets/services/google-ads/section-03.png';
import section04 from '@/assets/services/google-ads/section-04.png';
import section05 from '@/assets/services/google-ads/section-05.png';
import section06 from '@/assets/services/google-ads/section-06.png';
import faqImage from '@/assets/services/google-ads/faq-mobile.png';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import { Footer } from '../../components/Footer';
import { Check } from 'lucide-react';
import { useState } from 'react';

export function GoogleAdsMobilePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why Does My Business Need Branding?",
      answer: "Branding helps people recognize and trust your business.\nIf your brand looks unclear or inconsistent, customers hesitate to choose you."
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
    <div className="w-full bg-white overflow-x-hidden">
      {/* Hero Section with Form Overlay */}
      <section className="relative w-full block m-0 p-0 leading-none">
        <div className="w-full block m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <img 
            src={heroMobileImage} 
            alt="Google Ads Services" 
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
              pageId="google-ads"
            />
          </div>
        </div>
      </section>

      {/* After Hero Section */}
      <section className="relative bg-white">
        <img src={afterHeroImage} alt="After Hero Section" className="w-full block" />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Google Ads Platforms We Manage
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Google Search Ads</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Google Display Ads</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Performance Max (PMax)</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">YouTube Ads</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Remarketing Campaigns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01 - Google Ads Strategy */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Google Ads Strategy
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Campaign structure based on intent</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Smart budget allocation for ROI</span>
            </div>
          </div>
        </div>
        
        <img src={section01} alt="Google Ads Strategy" className="w-full block" />
      </section>

      {/* Section 02 - Keyword Research & Targeting */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Keyword Research & Targeting
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">High-buying-intent keywords only</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Negative keywords to cut waste</span>
            </div>
          </div>
        </div>
        
        <img src={section02} alt="Keyword Research" className="w-full block" />
      </section>

      {/* Section 03 - Ad Copywriting */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Ad Copywriting
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clear, relevant, high-CTR ad copy</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Aligned with search intent</span>
            </div>
          </div>
        </div>
        
        <img src={section03} alt="Ad Copywriting" className="w-full block" />
      </section>

      {/* Section 04 - Landing Page Alignment */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Landing Page Alignment
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Ads matched with page intent</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Better Quality Score & lower CPC</span>
            </div>
          </div>
        </div>
        
        <img src={section04} alt="Landing Page Alignment" className="w-full block" />
      </section>

      {/* Section 05 - Conversion Tracking Setup */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Conversion Tracking Setup
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Accurate tracking for leads & sales</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clean data for real decisions</span>
            </div>
          </div>
        </div>
        
        <img src={section05} alt="Conversion Tracking Setup" className="w-full block" />
      </section>

      {/* Section 06 - Optimization & Scaling */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Optimization & Scaling
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Continuous bid & keyword optimization</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Scale profitable campaigns safely</span>
            </div>
          </div>
        </div>
        
        <img src={section06} alt="Optimization & Scaling" className="w-full block" />
      </section>

      {/* FAQ Section */}
      <section className="relative bg-white">
        <img src={faqImage} alt="Google Ads FAQ" className="w-full block" />
        
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
