import heroMobileImage from '@/assets/services/social-media/hero-mobile.png';
import platformsMobile from '@/assets/services/social-media/platforms-mobile.png';
import processMobile from '@/assets/services/social-media/process-mobile.png';
import section01 from '@/assets/services/social-media/section-01.png';
import section02 from '@/assets/services/social-media/section-02.png';
import resultsSection from '@/assets/services/social-media/results-section.png';
import faqImage from '@/assets/services/social-media/faq-mobile.png';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import { Facebook, Instagram, Youtube, Linkedin, CheckCircle2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';

export function SocialMediaMobilePage() {
  const [heroMobileImageSrc, setHeromobileimageSrc] = useState(heroMobileImage);
  const [platformsMobileSrc, setPlatformsmobileSrc] = useState(platformsMobile);
  const [processMobileSrc, setProcessmobileSrc] = useState(processMobile);
  const [section01Src, setSection01Src] = useState(section01);
  const [section02Src, setSection02Src] = useState(section02);
  const [resultsSectionSrc, setResultssectionSrc] = useState(resultsSection);
  const [faqImageSrc, setFaqimageSrc] = useState(faqImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('social-media');
        
        const heroMobileImageSaved = content.find((c: any) => c.section === 'social-media-mobile-page' && c.key === 'image-0');
        if (heroMobileImageSaved?.value) setHeromobileimageSrc(heroMobileImageSaved.value);
        const platformsMobileSaved = content.find((c: any) => c.section === 'social-media-mobile-page' && c.key === 'image-1');
        if (platformsMobileSaved?.value) setPlatformsmobileSrc(platformsMobileSaved.value);
        const processMobileSaved = content.find((c: any) => c.section === 'social-media-mobile-page' && c.key === 'image-2');
        if (processMobileSaved?.value) setProcessmobileSrc(processMobileSaved.value);
        const section01Saved = content.find((c: any) => c.section === 'social-media-mobile-page' && c.key === 'image-3');
        if (section01Saved?.value) setSection01Src(section01Saved.value);
        const section02Saved = content.find((c: any) => c.section === 'social-media-mobile-page' && c.key === 'image-4');
        if (section02Saved?.value) setSection02Src(section02Saved.value);
        const resultsSectionSaved = content.find((c: any) => c.section === 'social-media-mobile-page' && c.key === 'image-5');
        if (resultsSectionSaved?.value) setResultssectionSrc(resultsSectionSaved.value);
        const faqImageSaved = content.find((c: any) => c.section === 'social-media-mobile-page' && c.key === 'image-6');
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
      question: "When Can I Expect Results?",
      answer: "Organic growth builds over time. Paid campaigns can generate leads within weeks."
    },
    {
      question: "Do You Handle Content And Creatives?",
      answer: ""
    },
    {
      question: "Is Paid Advertising Mandatory?",
      answer: ""
    },
    {
      question: "How Do You Measure Success?",
      answer: ""
    },
    {
      question: "Can We Review Content Before Posting?",
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
          alt="Social Media Marketing Services"
          className="w-full h-auto block m-0 p-0 leading-none"
          imageKey="image-0"
          page="social-media"
          section="social-media-mobile-page"
          onImageChange={setHeromobileimageSrc}
        />
        </div>
        
        {/* Form Overlay */}
        <div className="flex absolute top-0 left-0 w-full h-full items-start justify-center pt-2 px-2 pointer-events-none">
          <div className="w-full max-w-[380px] pointer-events-auto">
            <UniversalFormMobile 
              formHeading="Talk To Our Expert"
              buttonText="GET STARTED NOW"
              pageId="social-media"
            />
          </div>
        </div>
      </section>

      {/* Platforms We Work With Section */}
      <section className="relative bg-white">
        <EditableImage
          src={platformsMobileSrc}
          alt="Platforms We Work With"
          className="w-full block"
          imageKey="image-1"
          page="social-media"
          section="social-media-mobile-page"
          onImageChange={setPlatformsmobileSrc}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Platforms We Work With
          </h2>
          <p className="text-sm text-gray-700 text-center mb-6 max-w-[340px]">
            We manage and grow brands across the platforms that matter most for business:
          </p>
          
          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Facebook className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <Youtube className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
              <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Our Social Media Process Section */}
      <section className="bg-white">
        {/* Text Above Image */}
        <div className="flex flex-col px-6 py-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-left mb-8">
            Our Social Media Process
          </h2>
          
          <div className="space-y-6">
            {/* Item 1 */}
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Social Media Strategy</h3>
                <p className="text-sm text-gray-700">Platform-wise plans aligned with your business goals.</p>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Content Planning & Calendars</h3>
                <p className="text-sm text-gray-700">Clear monthly content plans with purpose and direction.</p>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Creative Design (Posts, Reels, Carousels)</h3>
                <p className="text-sm text-gray-700">Clean visuals built to grab attention and communicate fast.</p>
              </div>
            </div>
            
            {/* Item 4 */}
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Community Management</h3>
                <p className="text-sm text-gray-700">Managing comments and DMs to build trust and response.</p>
              </div>
            </div>
            
            {/* Item 5 */}
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Paid Social Ads (Meta & LinkedIn)</h3>
                <p className="text-sm text-gray-700">Ad campaigns focused on leads, inquiries, and sales.</p>
              </div>
            </div>
            
            {/* Item 6 */}
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Tracking & Reporting</h3>
                <p className="text-sm text-gray-700">Simple reports showing real performance, not noise.</p>
              </div>
            </div>
          </div>
        </div>
        
        <EditableImage
          src={processMobileSrc}
          alt="Our Social Media Process"
          className="w-full block"
          imageKey="image-2"
          page="social-media"
          section="social-media-mobile-page"
          onImageChange={setProcessmobileSrc}
        />
      </section>

      {/* Section 01 */}
      <section className="bg-white">
        <EditableImage
          src={section01Src}
          alt="Section 01"
          className="w-full block"
          imageKey="image-3"
          page="social-media"
          section="social-media-mobile-page"
          onImageChange={setSection01Src}
        />
      </section>

      {/* What Results We Focus On Section */}
      <section className="relative bg-white">
        <EditableImage
          src={resultsSectionSrc}
          alt="What Results We Focus On"
          className="w-full block"
          imageKey="image-5"
          page="social-media"
          section="social-media-mobile-page"
          onImageChange={setResultssectionSrc}
        />
        
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center px-6 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            What Results We Focus On
          </h2>
          <p className="text-sm text-gray-700 text-center mb-6 max-w-[340px]">
            We don't create content for volume. We create content that works.
          </p>
          
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Qualified leads & inquiries</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Sales-focused campaigns</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Strong brand presence & trust</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Consistent, measurable growth</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Real engagement from real users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 with Button */}
      <section className="relative bg-white">
        <EditableImage
          src={section02Src}
          alt="Ready to Grow"
          className="w-full block"
          imageKey="image-4"
          page="social-media"
          section="social-media-mobile-page"
          onImageChange={setSection02Src}
        />
        
        {/* Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pt-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            BOOK A FREE SOCIAL MEDIA CONSULTATION
            <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-white">
        <EditableImage
          src={faqImageSrc}
          alt="Social Media FAQ"
          className="w-full block"
          imageKey="image-6"
          page="social-media"
          section="social-media-mobile-page"
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
