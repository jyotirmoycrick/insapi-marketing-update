import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import processImage from '@/assets/services/social-media/social-media-003-process.png';

export function ProcessSection() {
  const [heading, setHeading] = useState('Our Social Media Process');
  const [point1, setPoint1] = useState('Social Media Strategy');
  const [point2, setPoint2] = useState('Content Planning & Calendars');
  const [point3, setPoint3] = useState('Creative Design (Posts, Reels, Carousels)');
  const [point4, setPoint4] = useState('Community Management');
  const [point5, setPoint5] = useState('Paid Social Ads (Meta & LinkedIn)');
  const [point6, setPoint6] = useState('Tracking & Reporting');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('social-media');
        const h = content.find((c: any) => c.section === 'process' && c.key === 'heading');
        const p1 = content.find((c: any) => c.section === 'process' && c.key === 'point1');
        const p2 = content.find((c: any) => c.section === 'process' && c.key === 'point2');
        const p3 = content.find((c: any) => c.section === 'process' && c.key === 'point3');
        const p4 = content.find((c: any) => c.section === 'process' && c.key === 'point4');
        const p5 = content.find((c: any) => c.section === 'process' && c.key === 'point5');
        const p6 = content.find((c: any) => c.section === 'process' && c.key === 'point6');
        
        if (h) setHeading(h.value);
        if (p1) setPoint1(p1.value);
        if (p2) setPoint2(p2.value);
        if (p3) setPoint3(p3.value);
        if (p4) setPoint4(p4.value);
        if (p5) setPoint5(p5.value);
        if (p6) setPoint6(p6.value);
      } catch (error) {
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  if (isLoading) {
    return <section className="bg-white py-12 h-96 flex items-center justify-center"><div className="text-gray-600">Loading...</div></section>;
  }

  return (
    <EditableSection
      sectionId="process"
      sectionName="Our Social Media Process"
      page="social-media"
      fields={[
        { key: 'heading', label: 'Heading', type: 'text', value: heading },
        { key: 'point1', label: 'Point 1', type: 'text', value: point1 },
        { key: 'point2', label: 'Point 2', type: 'text', value: point2 },
        { key: 'point3', label: 'Point 3', type: 'text', value: point3 },
        { key: 'point4', label: 'Point 4', type: 'text', value: point4 },
        { key: 'point5', label: 'Point 5', type: 'text', value: point5 },
        { key: 'point6', label: 'Point 6', type: 'text', value: point6 }
      ]}
      onSave={(data) => {
        setHeading(data.heading);
        setPoint1(data.point1);
        setPoint2(data.point2);
        setPoint3(data.point3);
        setPoint4(data.point4);
        setPoint5(data.point5);
        setPoint6(data.point6);
      }}
    >
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          
          {/* Image LEFT */}
          <div className="w-full">
            <img 
              src={processImage} 
              alt="Our Social Media Process" 
              className="w-[85%] h-auto"
            />
          </div>

          {/* Text RIGHT */}
          <div className="pl-2 pr-6 md:pl-3 md:pr-8 lg:pl-[100px] lg:pr-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              {heading}
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm">{point1}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm">{point2}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm">{point3}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm">{point4}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm">{point5}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm">{point6}</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </EditableSection>
  );
}
