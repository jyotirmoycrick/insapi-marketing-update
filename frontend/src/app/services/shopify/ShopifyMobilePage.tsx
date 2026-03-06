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
import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';

export function ShopifyMobilePage() {
  const [heroMobileImageSrc, setHeromobileimageSrc] = useState(heroMobileImage);
  const [platformsSectionSrc, setPlatformssectionSrc] = useState(platformsSection);
  const [section01Src, setSection01Src] = useState(section01);
  const [section02Src, setSection02Src] = useState(section02);
  const [section03Src, setSection03Src] = useState(section03);
  const [section04Src, setSection04Src] = useState(section04);
  const [section05Src, setSection05Src] = useState(section05);
  const [section06Src, setSection06Src] = useState(section06);
  const [section07Src, setSection07Src] = useState(section07);
  const [ourStrengthSrc, setOurstrengthSrc] = useState(ourStrength);
  const [faqImageSrc, setFaqimageSrc] = useState(faqImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('shopify');
        
        const heroMobileImageSaved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-0');
        if (heroMobileImageSaved?.value) setHeromobileimageSrc(heroMobileImageSaved.value);
        const platformsSectionSaved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-1');
        if (platformsSectionSaved?.value) setPlatformssectionSrc(platformsSectionSaved.value);
        const section01Saved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-2');
        if (section01Saved?.value) setSection01Src(section01Saved.value);
        const section02Saved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-3');
        if (section02Saved?.value) setSection02Src(section02Saved.value);
        const section03Saved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-4');
        if (section03Saved?.value) setSection03Src(section03Saved.value);
        const section04Saved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-5');
        if (section04Saved?.value) setSection04Src(section04Saved.value);
        const section05Saved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-6');
        if (section05Saved?.value) setSection05Src(section05Saved.value);
        const section06Saved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-7');
        if (section06Saved?.value) setSection06Src(section06Saved.value);
        const section07Saved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-8');
        if (section07Saved?.value) setSection07Src(section07Saved.value);
        const ourStrengthSaved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-9');
        if (ourStrengthSaved?.value) setOurstrengthSrc(ourStrengthSaved.value);
        const faqImageSaved = content.find((c: any) => c.section === 'shopify-mobile-page' && c.key === 'image-10');
        if (faqImageSaved?.value) setFaqimageSrc(faqImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

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
          <EditableImage
          src={heroMobileImageSrc}
          alt="Shopify Services"
          className="w-full h-auto block m-0 p-0 leading-none"
          imageKey="image-0"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setHeromobileimageSrc}
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
        <EditableImage
          src={platformsSectionSrc}
          alt="Platforms & Tools We Use"
          className="w-full block"
          imageKey="image-1"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setPlatformssectionSrc}
        />
        
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
        
        <EditableImage
          src={section01Src}
          alt="Section 01"
          className="w-full block"
          imageKey="image-2"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setSection01Src}
        />
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
        
        <EditableImage
          src={section02Src}
          alt="Section 02"
          className="w-full block"
          imageKey="image-3"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setSection02Src}
        />
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
        
        <EditableImage
          src={section03Src}
          alt="Section 03"
          className="w-full block"
          imageKey="image-4"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setSection03Src}
        />
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
        
        <EditableImage
          src={section04Src}
          alt="Section 04"
          className="w-full block"
          imageKey="image-5"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setSection04Src}
        />
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
        
        <EditableImage
          src={section05Src}
          alt="Section 05"
          className="w-full block"
          imageKey="image-6"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setSection05Src}
        />
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
        
        <EditableImage
          src={section06Src}
          alt="Section 06"
          className="w-full block"
          imageKey="image-7"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setSection06Src}
        />
      </section>

      {/* Our Strength Section */}
      <section className="relative bg-white">
        <EditableImage
          src={ourStrengthSrc}
          alt="Our Strength In Shopify Development"
          className="w-full block"
          imageKey="image-9"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setOurstrengthSrc}
        />
        
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
        <EditableImage
          src={section07Src}
          alt="Ready to Launch"
          className="w-full block"
          imageKey="image-8"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setSection07Src}
        />
        
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
        <EditableImage
          src={faqImageSrc}
          alt="Shopify FAQ"
          className="w-full block"
          imageKey="image-10"
          page="shopify"
          section="shopify-mobile-page"
          onImageChange={setFaqimageSrc}
        />
        
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
    </div>
  );
}
