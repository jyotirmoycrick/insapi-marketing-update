import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import googleAdsImage from '@/assets/services/google-ads/google-ads-002-section.png';
import { Check } from 'lucide-react';

export function GoogleAdsSection() {
  const [heading, setHeading] = useState('Google Ads Platforms We Manage');
  const [point1, setPoint1] = useState('Search Ads');
  const [point2, setPoint2] = useState('Display Ads');
  const [point3, setPoint3] = useState('Shopping Ads');
  const [point4, setPoint4] = useState('Video Ads');
  const [point5, setPoint5] = useState('App Ads');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('google-ads');
        const h = content.find((c: any) => c.section === 'platforms' && c.key === 'heading');
        const p1 = content.find((c: any) => c.section === 'platforms' && c.key === 'point1');
        const p2 = content.find((c: any) => c.section === 'platforms' && c.key === 'point2');
        const p3 = content.find((c: any) => c.section === 'platforms' && c.key === 'point3');
        const p4 = content.find((c: any) => c.section === 'platforms' && c.key === 'point4');
        const p5 = content.find((c: any) => c.section === 'platforms' && c.key === 'point5');
        
        if (h) setHeading(h.value);
        if (p1) setPoint1(p1.value);
        if (p2) setPoint2(p2.value);
        if (p3) setPoint3(p3.value);
        if (p4) setPoint4(p4.value);
        if (p5) setPoint5(p5.value);
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
      sectionId="platforms"
      sectionName="Google Ads Platforms"
      page="google-ads"
      fields={[
        { key: 'heading', label: 'Heading', type: 'text', value: heading },
        { key: 'point1', label: 'Point 1', type: 'text', value: point1 },
        { key: 'point2', label: 'Point 2', type: 'text', value: point2 },
        { key: 'point3', label: 'Point 3', type: 'text', value: point3 },
        { key: 'point4', label: 'Point 4', type: 'text', value: point4 },
        { key: 'point5', label: 'Point 5', type: 'text', value: point5 }
      ]}
      onSave={(data) => {
        setHeading(data.heading);
        setPoint1(data.point1);
        setPoint2(data.point2);
        setPoint3(data.point3);
        setPoint4(data.point4);
        setPoint5(data.point5);
      }}
    >
      <section className="relative w-full">
        {/* Full-width background image */}
        <img 
          src={googleAdsImage} 
          alt="Google Ads Platforms We Manage" 
          className="w-full h-auto block"
        />
        
        {/* Text Overlay - positioned 400px from right */}
        <div className="absolute top-1/2 right-[400px] transform -translate-y-1/2 w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px] px-4 md:px-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            {heading}
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-xs md:text-sm">{point1}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-xs md:text-sm">{point2}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-xs md:text-sm">{point3}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-xs md:text-sm">{point4}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-xs md:text-sm">{point5}</p>
            </div>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
