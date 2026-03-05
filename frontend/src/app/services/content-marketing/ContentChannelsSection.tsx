import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import channelsImage from '@/assets/services/content-marketing/content-marketing-002-channels.png';

export function ContentChannelsSection() {
  const [heading, setHeading] = useState('Content Channels We Work With');
  const [intro, setIntro] = useState('We create content across formats that support both visibility and conversions:');
  const [channel1, setChannel1] = useState('Website Content');
  const [channel2, setChannel2] = useState('Blogs & Long-Form Articles');
  const [channel3, setChannel3] = useState('SEO Content');
  const [channel4, setChannel4] = useState('Social Media Content');
  const [channel5, setChannel5] = useState('Scripts (Video, Reels, Ads)');
  const [channel6, setChannel6] = useState('Guides, PDFs, & Lead Magnets');
  const [outro, setOutro] = useState('Each format serves a clear purpose in your funnel.');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('content-marketing');
        const h = content.find((c: any) => c.section === 'content-channels' && c.key === 'heading');
        const i = content.find((c: any) => c.section === 'content-channels' && c.key === 'intro');
        const c1 = content.find((c: any) => c.section === 'content-channels' && c.key === 'channel1');
        const c2 = content.find((c: any) => c.section === 'content-channels' && c.key === 'channel2');
        const c3 = content.find((c: any) => c.section === 'content-channels' && c.key === 'channel3');
        const c4 = content.find((c: any) => c.section === 'content-channels' && c.key === 'channel4');
        const c5 = content.find((c: any) => c.section === 'content-channels' && c.key === 'channel5');
        const c6 = content.find((c: any) => c.section === 'content-channels' && c.key === 'channel6');
        const o = content.find((c: any) => c.section === 'content-channels' && c.key === 'outro');
        
        if (h) setHeading(h.value);
        if (i) setIntro(i.value);
        if (c1) setChannel1(c1.value);
        if (c2) setChannel2(c2.value);
        if (c3) setChannel3(c3.value);
        if (c4) setChannel4(c4.value);
        if (c5) setChannel5(c5.value);
        if (c6) setChannel6(c6.value);
        if (o) setOutro(o.value);
      } catch (error) {
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  if (isLoading) {
    return <section className="relative w-full h-96 flex items-center justify-center"><div className="text-gray-600">Loading...</div></section>;
  }

  return (
    <EditableSection
      sectionId="content-channels"
      sectionName="Content Channels"
      page="content-marketing"
      fields={[
        { key: 'heading', label: 'Heading', type: 'text', value: heading },
        { key: 'intro', label: 'Intro Text', type: 'text', value: intro },
        { key: 'channel1', label: 'Channel 1', type: 'text', value: channel1 },
        { key: 'channel2', label: 'Channel 2', type: 'text', value: channel2 },
        { key: 'channel3', label: 'Channel 3', type: 'text', value: channel3 },
        { key: 'channel4', label: 'Channel 4', type: 'text', value: channel4 },
        { key: 'channel5', label: 'Channel 5', type: 'text', value: channel5 },
        { key: 'channel6', label: 'Channel 6', type: 'text', value: channel6 },
        { key: 'outro', label: 'Outro Text', type: 'text', value: outro }
      ]}
      onSave={(data) => {
        setHeading(data.heading);
        setIntro(data.intro);
        setChannel1(data.channel1);
        setChannel2(data.channel2);
        setChannel3(data.channel3);
        setChannel4(data.channel4);
        setChannel5(data.channel5);
        setChannel6(data.channel6);
        setOutro(data.outro);
      }}
    >
      <section className="relative w-full">
        {/* Background Image */}
        <img 
          src={channelsImage} 
          alt="Content Channels We Work With" 
          className="w-full h-auto block"
        />
        
        {/* Text Overlay - Positioned center, upper area */}
        <div className="absolute inset-0 flex items-start justify-center pt-12 md:pt-16 lg:pt-20 px-6 md:px-12 lg:px-20" style={{ paddingTop: 'calc(3rem + 110px)', marginLeft: '125px' }}>
          <div className="w-full max-w-lg">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {heading}
            </h2>
            
            <p className="text-gray-700 text-xs md:text-sm mb-4 md:mb-6">
              {intro}
            </p>
            
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-xs md:text-sm">{channel1}</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-xs md:text-sm">{channel2}</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-xs md:text-sm">{channel3}</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-xs md:text-sm">{channel4}</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-xs md:text-sm">{channel5}</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-xs md:text-sm">{channel6}</p>
              </div>
            </div>
            
            <p className="text-gray-700 text-xs md:text-sm mt-4 md:mt-6">
              {outro}
            </p>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
