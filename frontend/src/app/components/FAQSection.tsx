import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import { EditableSection } from '@/components/EditableSection';
import faqImageDesktop from '@/assets/shared/shared-002-faq.png';
import faqImageMobile from '@/assets/home/home-010-faq-mobile.png';

export function FAQSection() {
  const [faqImageDesktopSrc, setFaqimagedesktopSrc] = useState(faqImageDesktop);
  const [faqImageMobileSrc, setFaqimagemobileSrc] = useState(faqImageMobile);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('home');

        const faqImageDesktopSaved = content.find((c: any) => c.section === 'faq-section' && c.key === 'image-0');
        if (faqImageDesktopSaved?.value) setFaqimagedesktopSrc(faqImageDesktopSaved.value);
        const faqImageMobileSaved = content.find((c: any) => c.section === 'faq-section' && c.key === 'image-1');
        if (faqImageMobileSaved?.value) setFaqimagemobileSrc(faqImageMobileSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [heading, setHeading] = useState('FAQs');
  const [subheading, setSubheading] = useState('Find answers to common questions');
  const [q1, setQ1] = useState('How Do You Decide The Right Strategy For My Business?');
  const [a1, setA1] = useState('We study your business, audience, and goals, then create a plan built for your market-so nothing is wasted');
  const [q2, setQ2] = useState('Do You Provide Social Media Marketing And Meta Ads Together?');
  const [a2, setA2] = useState('Yes, we offer integrated social media marketing and Meta Ads campaigns that work together to maximize your reach and conversions.');
  const [q3, setQ3] = useState('How Much Budget Do I Need For Meta Ads?');
  const [a3, setA3] = useState('Budget requirements vary based on your goals and industry. We can work with different budget levels and recommend the optimal spend for your specific objectives.');
  const [q4, setQ4] = useState('Why Should I Choose A Digital Marketing Agency Instead Of Doing It Myself?');
  const [a4, setA4] = useState('Agencies bring expertise, tools, and proven strategies that save you time and money. We stay updated with platform changes and best practices so you can focus on running your business.');
  const [q5, setQ5] = useState('Do you provide reporting and analytics?');
  const [a5, setA5] = useState('Absolutely! We provide detailed monthly reports with key metrics, insights, and recommendations. You\'ll always know how your campaigns are performing and what we\'re doing to improve results.');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        const h = content.find((c: any) => c.section === 'faq' && c.key === 'heading');
        const sh = content.find((c: any) => c.section === 'faq' && c.key === 'subheading');
        const fq1 = content.find((c: any) => c.section === 'faq' && c.key === 'question1');
        const fa1 = content.find((c: any) => c.section === 'faq' && c.key === 'answer1');
        const fq2 = content.find((c: any) => c.section === 'faq' && c.key === 'question2');
        const fa2 = content.find((c: any) => c.section === 'faq' && c.key === 'answer2');
        const fq3 = content.find((c: any) => c.section === 'faq' && c.key === 'question3');
        const fa3 = content.find((c: any) => c.section === 'faq' && c.key === 'answer3');
        const fq4 = content.find((c: any) => c.section === 'faq' && c.key === 'question4');
        const fa4 = content.find((c: any) => c.section === 'faq' && c.key === 'answer4');
        const fq5 = content.find((c: any) => c.section === 'faq' && c.key === 'question5');
        const fa5 = content.find((c: any) => c.section === 'faq' && c.key === 'answer5');

        if (h) setHeading(h.value);
        if (sh) setSubheading(sh.value);
        if (fq1) setQ1(fq1.value);
        if (fa1) setA1(fa1.value);
        if (fq2) setQ2(fq2.value);
        if (fa2) setA2(fa2.value);
        if (fq3) setQ3(fq3.value);
        if (fa3) setA3(fa3.value);
        if (fq4) setQ4(fq4.value);
        if (fa4) setA4(fa4.value);
        if (fq5) setQ5(fq5.value);
        if (fa5) setA5(fa5.value);
      } catch (error) {
        // Silently use default content
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const faqs = [
    { question: q1, answer: a1 },
    { question: q2, answer: a2 },
    { question: q3, answer: a3 },
    { question: q4, answer: a4 },
    { question: q5, answer: a5 }
  ];

  if (isLoading) {
    return null;
  }

  return (
    <EditableSection
      sectionId="faq"
      sectionName="FAQ Section"
      page="home"
      fields={[
        { key: 'heading', label: 'Heading', type: 'text', value: heading },
        { key: 'subheading', label: 'Subheading', type: 'text', value: subheading },
        { key: 'question1', label: 'Question 1', type: 'text', value: q1 },
        { key: 'answer1', label: 'Answer 1', type: 'textarea', value: a1 },
        { key: 'question2', label: 'Question 2', type: 'text', value: q2 },
        { key: 'answer2', label: 'Answer 2', type: 'textarea', value: a2 },
        { key: 'question3', label: 'Question 3', type: 'text', value: q3 },
        { key: 'answer3', label: 'Answer 3', type: 'textarea', value: a3 },
        { key: 'question4', label: 'Question 4', type: 'text', value: q4 },
        { key: 'answer4', label: 'Answer 4', type: 'textarea', value: a4 },
        { key: 'question5', label: 'Question 5', type: 'text', value: q5 },
        { key: 'answer5', label: 'Answer 5', type: 'textarea', value: a5 }
      ]}
      onSave={(data) => {
        setHeading(data.heading);
        setSubheading(data.subheading);
        setQ1(data.question1);
        setA1(data.answer1);
        setQ2(data.question2);
        setA2(data.answer2);
        setQ3(data.question3);
        setA3(data.answer3);
        setQ4(data.question4);
        setA4(data.answer4);
        setQ5(data.question5);
        setA5(data.answer5);
      }}
    >
      <section className="relative w-full overflow-hidden bg-[#c2c0df]">
        {/* Desktop Image with Interactive FAQ */}
        <div className="hidden md:block relative">
          <EditableImage
            src={faqImageDesktopSrc}
            alt="FAQ"
            className="w-full h-auto block"
            imageKey="image-0"
            page="home"
            section="faq-section"
            onImageChange={setFaqimagedesktopSrc}
          />

          <div className="absolute inset-0 flex items-center justify-end px-6 md:px-10 lg:px-16">
            <div className="w-full max-w-6xl flex justify-end">
              <div className="w-full md:w-1/2 lg:w-2/5 p-4 md:p-6 lg:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">{heading}</h2>
              <p className="text-black mb-4 md:mb-5 text-xs sm:text-sm md:text-base">{subheading}</p>

              <div className="space-y-1 md:space-y-1.5">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b-2 border-black/45">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full py-2 md:py-2.5 flex justify-between items-center text-left hover:text-gray-700 transition-colors"
                    >
                      <span className="font-semibold pr-3 text-[11px] sm:text-xs md:text-sm lg:text-base text-black leading-snug break-words">
                        {faq.question}
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl font-light text-black flex-shrink-0">
                        {openIndex === index ? '-' : '+'}
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="pb-2 md:pb-3 text-black text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed break-words">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Mobile Image with FAQ Content */}
        <div className="block md:hidden bg-[#cfcfeb]">
          <div className="w-full px-4 pt-2 pb-10 bg-[#cfcfeb]">
            <EditableImage
            src={faqImageMobileSrc}
            alt="FAQ"
            className="w-full h-[260px] sm:h-[300px] object-cover object-top"
            imageKey="image-1"
            page="home"
            section="faq-section"
            onImageChange={setFaqimagemobileSrc}
          />

            <div className="pt-4 px-3 sm:px-4 bg-[#cfcfeb]">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-[#1f2a4a]">{heading}</h2>
            <p className="text-[#3f4b6b] mb-4 text-xs sm:text-sm">{subheading}</p>

            <div className="space-y-1">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#8f95ad]">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-2.5 flex justify-between items-start text-left overflow-hidden"
                  >
                    <span className="font-medium text-[16px] sm:text-[17px] text-[#1f2a4a] pr-3 leading-snug break-words min-w-0">
                      {faq.question}
                    </span>
                    <span className="text-2xl text-[#3f4b6b] flex-shrink-0 leading-none">
                      {openIndex === index ? '⌃' : '⌄'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="pb-2 text-[16px] sm:text-[17px] text-[#3f4b6b] leading-relaxed break-words">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
