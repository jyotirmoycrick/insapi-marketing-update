import { useEffect, useMemo, useState } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import whyChooseImage from '@/assets/services/social-media/social-media-004-why-choose-new.png';

const SECTION_ID = 'why-choose-section';
const DEFAULT_REASONS = [
  'Platform-first growth planning',
  'Content built for reach and leads',
  'Creative + media buying in one team',
  'Weekly optimization and reporting',
  'Fast execution without template strategies',
  'Clear focus on measurable business outcomes',
];

const ChatBubble = ({ text, className = '' }: { text: string; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-lg px-4 py-2.5 ${className}`}>
    <span className="text-gray-800 font-semibold text-sm whitespace-nowrap">{text}</span>
  </div>
);

function normalizeReasons(raw: string[] | undefined): string[] {
  const filtered = (raw || []).map((item) => item.trim()).filter(Boolean);
  return filtered.length ? filtered : DEFAULT_REASONS;
}

function parseReasons(value: unknown): string[] {
  if (Array.isArray(value)) {
    return normalizeReasons(value.map((item) => String(item)));
  }

  if (typeof value !== 'string') {
    return DEFAULT_REASONS;
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return normalizeReasons(parsed.map((item) => String(item)));
    }
  } catch {
    // Fall through to newline parser.
  }

  return normalizeReasons(value.split('\n'));
}

export function WhyChooseSection() {
  const [whyChooseImageSrc, setWhychooseimageSrc] = useState(whyChooseImage);
  const [activeIndex, setActiveIndex] = useState(0);

  const [headingLine1, setHeadingLine1] = useState('Why Brands Choose');
  const [headingLine2, setHeadingLine2] = useState('Insapi Marketing');
  const [bubbleText1, setBubbleText1] = useState('Hello');
  const [bubbleText2, setBubbleText2] = useState('Can we grow faster on social media?');
  const [reasons, setReasons] = useState<string[]>(DEFAULT_REASONS);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('social-media');
        const getValue = (key: string) =>
          content.find((c: any) => c.section === SECTION_ID && c.key === key)?.value;

        const reasonsValue = getValue('reasons');
        const legacyReasons = [
          getValue('reason1'),
          getValue('reason2'),
          getValue('reason3'),
          getValue('reason4'),
          getValue('reason5'),
          getValue('reason6'),
        ].filter(Boolean) as string[];

        setWhychooseimageSrc(getValue('image') || whyChooseImage);
        setHeadingLine1(getValue('headingLine1') || 'Why Brands Choose');
        setHeadingLine2(getValue('headingLine2') || 'Insapi Marketing');
        setBubbleText1(getValue('bubbleText1') || 'Hello');
        setBubbleText2(getValue('bubbleText2') || 'Can we grow faster on social media?');
        setReasons(reasonsValue ? parseReasons(reasonsValue) : normalizeReasons(legacyReasons));
      } catch {
        // Use defaults
      }
    };
    loadContent();
  }, []);

  useEffect(() => {
    if (!reasons.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reasons.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [reasons.length]);

  useEffect(() => {
    if (activeIndex >= reasons.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, reasons.length]);

  const reasonsText = useMemo(() => reasons.join('\n'), [reasons]);

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
          { key: 'reasons', label: 'Features (one per line)', type: 'textarea', value: reasonsText },
        ]}
        onSave={(data) => {
          setHeadingLine1(data.headingLine1);
          setHeadingLine2(data.headingLine2);
          setBubbleText1(data.bubbleText1);
          setBubbleText2(data.bubbleText2);
          setReasons(parseReasons(data.reasons));
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
                {reasons.map((reason, index) => (
                  <div key={`${reason}-${index}`} className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`font-bold transition-all duration-500 min-w-[40px] text-center text-3xl md:text-4xl lg:text-5xl ${
                        activeIndex === index ? 'text-yellow-500 scale-125 animate-pulse-glow' : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div
                      className={`w-0.5 h-8 md:h-9 lg:h-10 transition-all duration-500 ${
                        activeIndex === index ? 'bg-yellow-500 shadow-glow' : 'bg-gray-600'
                      }`}
                    />

                    <span
                      className={`font-semibold transition-all duration-500 text-base md:text-lg lg:text-xl ${
                        activeIndex === index ? 'text-yellow-500 animate-color-shift' : 'text-gray-300'
                      }`}
                    >
                      {reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="block md:hidden relative px-5 py-10">
            <div className="text-center mb-7">
              <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">{headingLine1}</h2>
              <h2 className="text-yellow-500 text-2xl font-bold leading-tight">{headingLine2}</h2>
            </div>

            <div className="relative mx-auto w-[260px] sm:w-[290px] mb-10">
              <EditableImage
                src={whyChooseImageSrc}
                alt={`${headingLine1} ${headingLine2}`}
                className="relative z-10 w-full object-cover rounded-2xl"
                imageKey="image"
                page="social-media"
                section={SECTION_ID}
                onImageChange={setWhychooseimageSrc}
              />

              <div className="absolute z-20 right-[-6px] bottom-[14%] flex flex-col gap-1.5">
                <div className="bg-white rounded-xl shadow-lg px-3 py-1.5 max-w-[190px]">
                  <span className="text-gray-800 font-semibold text-xs whitespace-nowrap">{bubbleText1}</span>
                </div>
                <div className="bg-white rounded-xl shadow-lg px-3 py-1.5 max-w-[230px]">
                  <span className="text-gray-800 font-semibold text-xs whitespace-nowrap">{bubbleText2}</span>
                </div>
              </div>
            </div>

            <div className="px-1 space-y-5">
              {reasons.map((reason, index) => (
                <div key={`mobile-${reason}-${index}`} className="flex items-center gap-4">
                  <span
                    className={`font-bold transition-all duration-500 min-w-[34px] text-center text-5xl ${
                      activeIndex === index ? 'text-yellow-500 scale-125 animate-pulse-glow' : 'text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div
                    className={`w-0.5 h-9 transition-all duration-500 ${
                      activeIndex === index ? 'bg-yellow-500 shadow-glow' : 'bg-gray-600'
                    }`}
                  />
                  <span
                    className={`font-semibold transition-all duration-500 text-xl ${
                      activeIndex === index ? 'text-yellow-500 animate-color-shift' : 'text-gray-300'
                    }`}
                  >
                    {reason}
                  </span>
                </div>
              ))}
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
