import heroMobileImage from '@/assets/services/meta-ads/hero-mobile.png';
import section01 from '@/assets/services/meta-ads/section-01.png';
import section02 from '@/assets/services/meta-ads/section-02.png';
import section03 from '@/assets/services/meta-ads/section-03.png';
import section04 from '@/assets/services/meta-ads/section-04.png';
import section05 from '@/assets/services/meta-ads/section-05.png';
import section06 from '@/assets/services/meta-ads/section-06.png';
import section07 from '@/assets/services/meta-ads/section-07.png';
import section08 from '@/assets/services/meta-ads/section-08.png';
import whatWeFocusOn from '@/assets/services/meta-ads/what-we-focus-on.png';
import faqImage from '@/assets/services/meta-ads/faq-mobile.png';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import { Footer } from '../../components/Footer';
import { Check } from 'lucide-react';
import { useState } from 'react';

export function MetaAdsMobilePage() {
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
            alt="Meta Ads Services" 
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
              pageId="meta-ads"
            />
          </div>
        </div>
      </section>

      {/* After Hero Section */}
      <section className="bg-white py-8 px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Our Meta Ads Process
        </h2>
        <p className="text-base text-gray-700 text-center leading-relaxed">
          Everything needed to run effective Facebook & Instagram ad campaigns.
        </p>
      </section>

      {/* Section 01 */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Meta Ads Strategy
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clear campaign structure based on your goal</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Smart budget planning for better ROI</span>
            </div>
          </div>
        </div>
        
        <img src={section01} alt="Section 01" className="w-full block" />
      </section>

      {/* Section 02 */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Audience Targeting & Retargeting
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Reach high-intent and relevant users</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Retarget visitors to improve conversions</span>
            </div>
          </div>
        </div>
        
        <img src={section02} alt="Section 02" className="w-full block" />
      </section>

      {/* Section 03 */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Ad Creatives & Copy
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clean, scroll-stopping ad visuals</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clear messaging that drives action</span>
            </div>
          </div>
        </div>
        
        <img src={section03} alt="Section 03" className="w-full block" />
      </section>

      {/* Section 04 */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Funnel & Landing Page Guidance
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
        
        <img src={section04} alt="Section 04" className="w-full block" />
      </section>

      {/* Section 05 */}
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
        
        <img src={section05} alt="Section 05" className="w-full block" />
      </section>

      {/* Section 06 */}
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
        
        <img src={section06} alt="Section 06" className="w-full block" />
      </section>

      {/* What We Focus On Section */}
      <section className="relative bg-white">
        <img src={whatWeFocusOn} alt="What We Focus On" className="w-full block" />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            What We Focus On
          </h2>
          <p className="text-sm text-gray-700 text-center mb-6 max-w-[340px]">
            We don't run ads for impressions alone. We focus on outcomes that matter.
          </p>
          
          <div className="w-full max-w-[340px] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Qualified leads</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Sales & inquiries</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Lower cost per result</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Consistent performance</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Scalable growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 07 */}
      <section className="bg-white">
        <img src={section07} alt="Section 07" className="w-full block" />
      </section>

      {/* Section 08 with Button */}
      <section className="relative bg-white">
        <img src={section08} alt="Ready to Grow" className="w-full block" />
        
        {/* Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pt-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            BOOK A FREE META ADS CONSULTATION
            <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-white">
        <img src={faqImage} alt="Meta Ads FAQ" className="w-full block" />
        
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
