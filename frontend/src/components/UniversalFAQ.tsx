import { useState, useEffect } from 'react';
import { EditableSection } from './EditableSection';
import { contentAPI } from '../services/api';
import faqImage from '@/assets/shared/shared-002-faq.png';

interface UniversalFAQProps {
  page: string;
  defaultHeading?: string;
  defaultSubheading?: string;
  defaultFAQs?: Array<{ question: string; answer: string }>;
}

export function UniversalFAQ({ 
  page,
  defaultHeading = 'FAQs',
  defaultSubheading = 'Find answers to common questions',
  defaultFAQs = []
}: UniversalFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [heading, setHeading] = useState(defaultHeading);
  const [subheading, setSubheading] = useState(defaultSubheading);
  const [q1, setQ1] = useState(defaultFAQs[0]?.question || '');
  const [a1, setA1] = useState(defaultFAQs[0]?.answer || '');
  const [q2, setQ2] = useState(defaultFAQs[1]?.question || '');
  const [a2, setA2] = useState(defaultFAQs[1]?.answer || '');
  const [q3, setQ3] = useState(defaultFAQs[2]?.question || '');
  const [a3, setA3] = useState(defaultFAQs[2]?.answer || '');
  const [q4, setQ4] = useState(defaultFAQs[3]?.question || '');
  const [a4, setA4] = useState(defaultFAQs[3]?.answer || '');
  const [q5, setQ5] = useState(defaultFAQs[4]?.question || '');
  const [a5, setA5] = useState(defaultFAQs[4]?.answer || '');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent(page);
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
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, [page]);

  const faqs = [
    { question: q1, answer: a1 },
    { question: q2, answer: a2 },
    { question: q3, answer: a3 },
    { question: q4, answer: a4 },
    { question: q5, answer: a5 }
  ];

  if (isLoading) {
    return <section className="relative w-full h-96 flex items-center justify-center bg-gray-100"><div className="text-gray-600">Loading...</div></section>;
  }

  return (
    <EditableSection
      sectionId="faq"
      sectionName="FAQ Section"
      page={page}
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
        <img src={faqImage} alt="FAQ" className="w-full h-auto block" />
        
        <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 lg:pr-24">
          <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">{heading}</h2>
            <p className="text-black mb-6 md:mb-8 text-xs sm:text-sm md:text-base">{subheading}</p>
            
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-300">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-3 md:py-4 flex justify-between items-center text-left hover:text-gray-700 transition-colors"
                  >
                    <span className="font-semibold pr-4 text-xs sm:text-sm md:text-base text-black">{faq.question}</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-light text-black flex-shrink-0">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="pb-3 md:pb-4 text-black text-xs sm:text-sm md:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
