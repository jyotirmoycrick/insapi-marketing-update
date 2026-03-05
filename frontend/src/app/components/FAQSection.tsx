import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import faqImageDesktop from '@/assets/shared/shared-002-faq.png';
import faqImageMobile from '@/assets/home/home-010-faq-mobile.png';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [heading, setHeading] = useState('FAQs');
  const [subheading, setSubheading] = useState('Find answers to common questions');
  const [q1, setQ1] = useState('How Do You Decide The Right Strategy For My Business?');
  const [a1, setA1] = useState('We study your business, audience, and goals, then create a plan built for your market—so nothing is wasted');
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
      <section className="relative w-full">
        {/* Desktop Image with Interactive FAQ */}
        <div className="hidden md:block relative">
          <img src={faqImageDesktop} alt="FAQ" className="w-full h-auto block" />
          
          <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 lg:pr-24">
            <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">{heading}</h2>
              <p className="text-black mb-8 md:mb-8 text-xs sm:text-sm md:text-base">{subheading}</p>
              
              <div className="space-y-2 md:space-y-3 lg:space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-300">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full py-3 md:py-6 flex justify-between items-center text-left hover:text-gray-700 transition-colors"
                    >
                      <span className="font-semibold pr-4 text-xs sm:text-sm md:text-base text-black">{faq.question}</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-light text-black flex-shrink-0">
                        {openIndex === index ? '−' : '+'}
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="pb-3 md:pb-6 text-black text-xs sm:text-sm md:text-base">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Image with Text Overlay */}
        <div className="block md:hidden relative">
          <img src={faqImageMobile} alt="FAQ" className="w-full h-auto" />
          
          {/* FAQ Text Overlay for Mobile - Positioned in lower half */}
          <div className="absolute left-0 right-0 px-6" style={{ top: '42%' }}>
            <h2 className="text-2xl font-bold mb-10 text-gray-900">FAQS</h2>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="border-b border-gray-300 pb-8">
                <button
                  onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
                  className="w-full flex justify-between items-start text-left"
                >
                  <span className="font-semibold text-base text-gray-800 pr-4 leading-snug">
                    {q1}
                  </span>
                  <span className="text-2xl text-gray-600 flex-shrink-0">
                    {openIndex === 0 ? '−' : '∨'}
                  </span>
                </button>
                {openIndex === 0 && (
                  <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {a1}
                  </div>
                )}
              </div>
              
              {/* Question 2 */}
              <div className="border-b border-gray-300 pb-8">
                <button
                  onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
                  className="w-full flex justify-between items-start text-left"
                >
                  <span className="font-semibold text-base text-gray-800 pr-4 leading-snug">
                    {q2}
                  </span>
                  <span className="text-2xl text-gray-600 flex-shrink-0">
                    {openIndex === 1 ? '−' : '∨'}
                  </span>
                </button>
                {openIndex === 1 && (
                  <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {a2}
                  </div>
                )}
              </div>
              
              {/* Question 3 */}
              <div className="border-b border-gray-300 pb-8">
                <button
                  onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
                  className="w-full flex justify-between items-start text-left"
                >
                  <span className="font-semibold text-base text-gray-800 pr-4 leading-snug">
                    {q3}
                  </span>
                  <span className="text-2xl text-gray-600 flex-shrink-0">
                    {openIndex === 2 ? '−' : '∨'}
                  </span>
                </button>
                {openIndex === 2 && (
                  <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {a3}
                  </div>
                )}
              </div>
              
              {/* Question 4 */}
              <div className="border-b border-gray-300 pb-8">
                <button
                  onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
                  className="w-full flex justify-between items-start text-left"
                >
                  <span className="font-semibold text-base text-gray-800 pr-4 leading-snug">
                    {q4}
                  </span>
                  <span className="text-2xl text-gray-600 flex-shrink-0">
                    {openIndex === 3 ? '−' : '∨'}
                  </span>
                </button>
                {openIndex === 3 && (
                  <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {a4}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

