import heroMobileImage from '@/assets/services/shopify/hero-mobile.png';
import platformsSection from '@/assets/services/shopify/platforms-section.png';
import section01 from '@/assets/services/shopify/section-01.png';
import section02 from '@/assets/services/shopify/section-02.png';
import section03 from '@/assets/services/shopify/section-03.png';
import section04 from '@/assets/services/shopify/section-04.png';
import section05 from '@/assets/services/shopify/section-05.png';
import section06 from '@/assets/services/shopify/section-06.png';
import section07 from '@/assets/services/shopify/section-07.png';
import ourStrength from '@/assets/services/shopify/our-strength.png';
import faqImage from '@/assets/services/shopify/faq-mobile.png';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import { Footer } from '../../components/Footer';
import { Check } from 'lucide-react';
import { useState } from 'react';

export function ShopifyMobilePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do You Use Templates Or Custom Designs?",
      answer: "We customize themes or build custom layouts based on your needs."
    },
    {
      question: "Will My Store Be Mobile-Friendly?",
      answer: ""
    },
    {
      question: "Can You Migrate From Another Platform?",
      answer: ""
    },
    {
      question: "Is SEO Included?",
      answer: ""
    },
    {
      question: "Do You Offer Post-Launch Support?",
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
            alt="Shopify Services" 
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
              pageId="shopify"
            />
          </div>
        </div>
      </section>

      {/* Platforms & Tools Section */}
      <section className="relative bg-white">
        <img src={platformsSection} alt="Platforms & Tools We Use" className="w-full block" />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Platforms & Tools We Use
          </h2>
          <p className="text-sm text-gray-700 text-center mb-6 max-w-[340px]">
            We work with Shopify's ecosystem to build stable and scalable stores:
          </p>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Shopify & Shopify Plus</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Liquid, HTML, CSS, JavaScript</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Custom & Premium Themes</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Shopify Apps & Integrations</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Payment & Shipping Setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01 */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col items-center px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Custom Shopify Store Design
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clean, brand-aligned UI/UX</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Designed to guide users toward purchase</span>
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
            Shopify Store Development
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Custom sections and layouts</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Mobile-first, fast-loading builds</span>
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
            Product & Collection Setup
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">SEO-friendly product structure</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Smart navigation and filters</span>
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
            App Integration & Customization
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Trusted apps only</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Performance-safe integrations</span>
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
            Payment, Shipping & Tax Setup
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Smooth checkout experience</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Region-specific configurations</span>
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
            Store Optimization & Support
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Speed and UX improvements</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Ongoing fixes and updates</span>
            </div>
          </div>
        </div>
        
        <img src={section06} alt="Section 06" className="w-full block" />
      </section>

      {/* Our Strength Section */}
      <section className="relative bg-white">
        <img src={ourStrength} alt="Our Strength In Shopify Development" className="w-full block" />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Strength In Shopify Development
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Conversion-first store structure</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clean, scalable code</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Strong focus on mobile shopping</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Attention to checkout experience</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clear communication & timelines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 07 with Button */}
      <section className="relative bg-white">
        <img src={section07} alt="Ready to Launch" className="w-full block" />
        
        {/* Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pt-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            BOOK A FREE SHOPIFY CONSULTATION
            <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-white">
        <img src={faqImage} alt="Shopify FAQ" className="w-full block" />
        
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
