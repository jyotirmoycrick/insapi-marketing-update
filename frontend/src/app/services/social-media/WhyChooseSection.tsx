import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import whyChooseImage from '@/assets/services/social-media/social-media-004-why-choose-new.png';

const SECTION_ID = 'why-choose-section';

const ChatBubble = ({ text, className = '' }: { text: string; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-lg px-4 py-2.5 ${className}`}>
    <span className="text-gray-800 font-semibold text-sm whitespace-nowrap">{text}</span>
  </div>
);

export function WhyChooseSection() {
  const [whyChooseImageSrc, setWhychooseimageSrc] = useState(whyChooseImage);
  const [activeNumber, setActiveNumber] = useState(1);

  const [headingLine1, setHeadingLine1] = useState('Why Brands Choose');
  const [headingLine2, setHeadingLine2] = useState('Insapi Marketing');
  const [bubbleText1, setBubbleText1] = useState('Hello');
  const [bubbleText2, setBubbleText2] = useState('Can we grow faster on social media?');
  const [reason1, setReason1] = useState('Platform-first growth planning');
  const [reason2, setReason2] = useState('Content built for reach and leads');
  const [reason3, setReason3] = useState('Creative + media buying in one team');
  const [reason4, setReason4] = useState('Weekly optimization and reporting');
  const [reason5, setReason5] = useState('Fast execution without template strategies');
  const [reason6, setReason6] = useState('Clear focus on measurable business outcomes');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('social-media');
        const getValue = (key: string) =>
          content.find((c: any) => c.section === SECTION_ID && c.key === key)?.value;

        setWhychooseimageSrc(getValue('image') || whyChooseImage);
        setHeadingLine1(getValue('headingLine1') || 'Why Brands Choose');
        setHeadingLine2(getValue('headingLine2') || 'Insapi Marketing');
        setBubbleText1(getValue('bubbleText1') || 'Hello');
        setBubbleText2(getValue('bubbleText2') || 'Can we grow faster on social media?');
        setReason1(getValue('reason1') || 'Platform-first growth planning');
        setReason2(getValue('reason2') || 'Content built for reach and leads');
        setReason3(getValue('reason3') || 'Creative + media buying in one team');
        setReason4(getValue('reason4') || 'Weekly optimization and reporting');
        setReason5(getValue('reason5') || 'Fast execution without template strategies');
        setReason6(getValue('reason6') || 'Clear focus on measurable business outcomes');
      } catch {
        // Use defaults
      }
    };
    loadContent();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNumber((prev) => (prev === 6 ? 1 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const reasons = [
    { number: 1, text: reason1 },
    { number: 2, text: reason2 },
    { number: 3, text: reason3 },
    { number: 4, text: reason4 },
    { number: 5, text: reason5 },
    { number: 6, text: reason6 },
  ];

  return (
    <>
      <EditableSection
        sectionId={SECTION_ID}
        sectionName="Why Choose Section"
        page="social-media"
        fields={[
          { key: 'headingLine1', label: 'Heading Line 1', type: 'text', value: headingLine1 },
          { key: 'headingLine2', label: 'Heading Line 2', type: 'text', value: headingLine2 },
          { key: 'bubbleText1', label: 'Chat Bubble 1', type: 'text', value: bubbleText1 },
          { key: 'bubbleText2', label: 'Chat Bubble 2', type: 'text', value: bubbleText2 },
          { key: 'reason1', label: 'Reason 1', type: 'text', value: reason1 },
          { key: 'reason2', label: 'Reason 2', type: 'text', value: reason2 },
          { key: 'reason3', label: 'Reason 3', type: 'text', value: reason3 },
          { key: 'reason4', label: 'Reason 4', type: 'text', value: reason4 },
          { key: 'reason5', label: 'Reason 5', type: 'text', value: reason5 },
          { key: 'reason6', label: 'Reason 6', type: 'text', value: reason6 },
        ]}
        onSave={(data) => {
          setHeadingLine1(data.headingLine1);
          setHeadingLine2(data.headingLine2);
          setBubbleText1(data.bubbleText1);
          setBubbleText2(data.bubbleText2);
          setReason1(data.reason1);
          setReason2(data.reason2);
          setReason3(data.reason3);
          setReason4(data.reason4);
          setReason5(data.reason5);
          setReason6(data.reason6);
        }}
      >
        <section className="relative overflow-hidden bg-[#0d1b2e]" style={{ fontFamily: "'Barlow', sans-serif" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 55% 60%, rgba(20, 80, 60, 0.35) 0%, transparent 70%)',
            }}
          />

          <div className="hidden md:block relative px-8 lg:px-16 xl:px-24 py-16 lg:py-20">
            <div className="text-center mb-12 lg:mb-14">
              <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                {headingLine1}
              </h2>
              <h2 className="text-yellow-500 text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                {headingLine2}
              </h2>
            </div>

            <div className="flex items-center justify-center gap-12 lg:gap-16 xl:gap-20 max-w-6xl mx-auto">
              <div className="relative flex-shrink-0 w-[280px] lg:w-[320px] xl:w-[360px]">
                <EditableImage
                  src={whyChooseImageSrc}
                  alt={`${headingLine1} ${headingLine2}`}
                  className="relative z-10 w-full object-cover rounded-2xl"
                  imageKey="image"
                  page="social-media"
                  section={SECTION_ID}
                  onImageChange={setWhychooseimageSrc}
                />

                <div className="absolute z-20 right-[-16px] bottom-[28%] flex flex-col gap-2">
                  <ChatBubble text={bubbleText1} />
                  <ChatBubble text={bubbleText2} />
                </div>
              </div>

              <div className="w-[52%] xl:w-[50%] space-y-4">
                {reasons.map((reason) => (
                  <div key={reason.number} className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`font-bold transition-all duration-500 min-w-[40px] text-center text-3xl md:text-4xl lg:text-5xl ${
                        activeNumber === reason.number ? 'text-yellow-500 scale-125 animate-pulse-glow' : 'text-gray-500'
                      }`}
                    >
                      {reason.number}
                    </span>

                    <div
                      className={`w-0.5 h-8 md:h-9 lg:h-10 transition-all duration-500 ${
                        activeNumber === reason.number ? 'bg-yellow-500 shadow-glow' : 'bg-gray-600'
                      }`}
                    />

                    <span
                      className={`font-semibold transition-all duration-500 text-base md:text-lg lg:text-xl ${
                        activeNumber === reason.number ? 'text-yellow-500 animate-color-shift' : 'text-gray-300'
                      }`}
                    >
                      {reason.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&display=swap');

            @keyframes pulse-glow {
              0%, 100% { text-shadow: 0 0 10px rgba(234,179,8,0.8), 0 0 20px rgba(234,179,8,0.6), 0 0 30px rgba(234,179,8,0.4); }
              50%      { text-shadow: 0 0 20px rgba(234,179,8,1),   0 0 30px rgba(234,179,8,0.8), 0 0 40px rgba(234,179,8,0.6); }
            }
            @keyframes color-shift {
              0%, 100% { color: #eab308; text-shadow: 0 0 10px rgba(234,179,8,0.5); }
              25%      { color: #f59e0b; text-shadow: 0 0 15px rgba(245,158,11,0.6); }
              50%      { color: #d97706; text-shadow: 0 0 20px rgba(217,119,6,0.7); }
              75%      { color: #f59e0b; text-shadow: 0 0 15px rgba(245,158,11,0.6); }
            }
            .animate-pulse-glow { animation: pulse-glow 1s ease-in-out infinite; }
            .animate-color-shift { animation: color-shift 1s ease-in-out infinite; }
            .shadow-glow { box-shadow: 0 0 10px rgba(234,179,8,0.8), 0 0 20px rgba(234,179,8,0.6); }
          `,
        }}
      />
    </>
  );
}
