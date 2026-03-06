import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import { Check } from 'lucide-react';
import heroImage from '@/assets/services/content-marketing/hero-mobile.png';
import afterHero from '@/assets/services/content-marketing/after-hero-section.png';
import section01 from '@/assets/services/content-marketing/section-01.png';
import section02 from '@/assets/services/content-marketing/section-02.png';
import section03 from '@/assets/services/content-marketing/section-03.png';
import section04 from '@/assets/services/content-marketing/section-04.png';
import section05 from '@/assets/services/content-marketing/section-05.png';
import section06 from '@/assets/services/content-marketing/section-06.png';
import section07 from '@/assets/services/content-marketing/section-07.png';
import section08 from '@/assets/services/content-marketing/section-08.png';
import faqImage from '@/assets/services/content-marketing/faq-mobile.png';
import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';

export function ContentMarketingMobilePage() {
  const [heroImageSrc, setHeroimageSrc] = useState(heroImage);
  const [afterHeroSrc, setAfterheroSrc] = useState(afterHero);
  const [section01Src, setSection01Src] = useState(section01);
  const [section02Src, setSection02Src] = useState(section02);
  const [section03Src, setSection03Src] = useState(section03);
  const [section04Src, setSection04Src] = useState(section04);
  const [section05Src, setSection05Src] = useState(section05);
  const [section06Src, setSection06Src] = useState(section06);
  const [section07Src, setSection07Src] = useState(section07);
  const [section08Src, setSection08Src] = useState(section08);
  const [faqImageSrc, setFaqimageSrc] = useState(faqImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('content-marketing');
        
        const heroImageSaved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-0');
        if (heroImageSaved?.value) setHeroimageSrc(heroImageSaved.value);
        const afterHeroSaved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-1');
        if (afterHeroSaved?.value) setAfterheroSrc(afterHeroSaved.value);
        const section01Saved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-2');
        if (section01Saved?.value) setSection01Src(section01Saved.value);
        const section02Saved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-3');
        if (section02Saved?.value) setSection02Src(section02Saved.value);
        const section03Saved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-4');
        if (section03Saved?.value) setSection03Src(section03Saved.value);
        const section04Saved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-5');
        if (section04Saved?.value) setSection04Src(section04Saved.value);
        const section05Saved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-6');
        if (section05Saved?.value) setSection05Src(section05Saved.value);
        const section06Saved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-7');
        if (section06Saved?.value) setSection06Src(section06Saved.value);
        const section07Saved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-8');
        if (section07Saved?.value) setSection07Src(section07Saved.value);
        const section08Saved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-9');
        if (section08Saved?.value) setSection08Src(section08Saved.value);
        const faqImageSaved = content.find((c: any) => c.section === 'content-marketing-mobile-page' && c.key === 'image-10');
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
      {/* Hero Section */}
      <section className="relative w-full block m-0 p-0 leading-none">
        <div className="w-full block m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <EditableImage
          src={heroImageSrc}
          alt="Content Marketing Services"
          className="w-full h-auto block m-0 p-0 leading-none"
          imageKey="image-0"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setHeroimageSrc}
        />
        </div>
        
        {/* Form Overlay */}
        <div className="flex absolute top-0 left-0 w-full h-full items-start justify-center pt-2 px-2 pointer-events-none">
          <div className="w-full max-w-[380px] pointer-events-auto">
            <UniversalFormMobile 
              formHeading="Talk To Our Expert"
              buttonText="GET STARTED NOW"
              pageId="content-marketing"
            />
          </div>
        </div>
      </section>

      {/* After Hero Section */}
      <section className="relative bg-white">
        <EditableImage
          src={afterHeroSrc}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-1"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setAfterheroSrc}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-5">
            Content Channels We Work With
          </h2>
          
          <p className="text-base text-gray-700 text-center mb-7 leading-relaxed">
            We create content across formats that support both visibility and conversions:
          </p>
          
          <div className="w-full max-w-[340px] space-y-4 mb-7">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-800 font-medium">Website Content</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-800 font-medium">Blogs & Long-Form Articles</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-800 font-medium">SEO Content</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-800 font-medium">Social Media Content</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-800 font-medium">Scripts (Video, Reels, Ads)</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-800 font-medium">Guides, PDFs & Lead Magnets</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Each format serves a clear purpose in your funnel.
          </p>
        </div>
      </section>

      {/* Section 01 */}
      <section className="relative bg-white">
        <EditableImage
          src={section01Src}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-2"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setSection01Src}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-2">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-7">
            Content Strategy & Planning
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Content mapped to business goals</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Topics planned around audience intent</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 */}
      <section className="relative bg-white">
        <EditableImage
          src={section02Src}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-3"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setSection02Src}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-7">
            SEO Content Creation
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Search-focused, Google-safe writing</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Optimized structure and readability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03 */}
      <section className="relative bg-white">
        <EditableImage
          src={section03Src}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-4"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setSection03Src}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-2">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-7">
            Website & Landing Page Content
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clear messaging and value positioning</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Content designed to convert visitors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04 */}
      <section className="relative bg-white">
        <EditableImage
          src={section04Src}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-5"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setSection04Src}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-1">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Blog & Thought Leadership
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Authority-building long-form content</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Consistent publishing for growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05 */}
      <section className="relative bg-white">
        <EditableImage
          src={section05Src}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-6"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setSection05Src}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Content Optimization & Refresh
          </h2>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Improve existing content performance</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Update content to stay relevant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 06 */}
      <section className="relative bg-white">
        <EditableImage
          src={section06Src}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-7"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setSection06Src}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            What We Focus On
          </h2>
          
          <p className="text-sm text-gray-700 text-center mb-6 leading-relaxed max-w-[340px]">
            We don't create content for volume. We create content that works.
          </p>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Audience relevance</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Search visibility</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Brand trust & authority</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Lead support & conversion</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Long-term performance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 07 */}
      <section className="bg-white">
        <EditableImage
          src={section07Src}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-8"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setSection07Src}
        />
      </section>

      {/* Section 08 with Button */}
      <section className="relative bg-white">
        <EditableImage
          src={section08Src}
          alt="Content Marketing Section"
          className="w-full block"
          imageKey="image-9"
          page="content-marketing"
          section="content-marketing-mobile-page"
          onImageChange={setSection08Src}
        />
        
        {/* Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pt-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            BOOK A FREE CONTENT MARKETING CONSULTATION
            <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-white">
        <EditableImage
          src={faqImageSrc}
          alt="Content Marketing FAQ"
          className="w-full block"
          imageKey="image-10"
          page="content-marketing"
          section="content-marketing-mobile-page"
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
