import { useState, useEffect } from 'react';
import { EditableSection } from './EditableSection';
import { contentAPI } from '../services/api';

interface UniversalContentSectionProps {
  page: string;
  sectionId: string;
  sectionName: string;
  imageSrc: string;
  imageAlt: string;
  defaultHeading: string;
  defaultPoints: string[];
  imagePosition?: 'left' | 'right';
}

export function UniversalContentSection({
  page,
  sectionId,
  sectionName,
  imageSrc,
  imageAlt,
  defaultHeading,
  defaultPoints,
  imagePosition = 'left'
}: UniversalContentSectionProps) {
  const [heading, setHeading] = useState(defaultHeading);
  const [point1, setPoint1] = useState(defaultPoints[0] || '');
  const [point2, setPoint2] = useState(defaultPoints[1] || '');
  const [point3, setPoint3] = useState(defaultPoints[2] || '');
  const [point4, setPoint4] = useState(defaultPoints[3] || '');
  const [point5, setPoint5] = useState(defaultPoints[4] || '');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent(page);
        const h = content.find((c: any) => c.section === sectionId && c.key === 'heading');
        const p1 = content.find((c: any) => c.section === sectionId && c.key === 'point1');
        const p2 = content.find((c: any) => c.section === sectionId && c.key === 'point2');
        const p3 = content.find((c: any) => c.section === sectionId && c.key === 'point3');
        const p4 = content.find((c: any) => c.section === sectionId && c.key === 'point4');
        const p5 = content.find((c: any) => c.section === sectionId && c.key === 'point5');
        
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
  }, [page, sectionId]);

  const points = [point1, point2, point3, point4, point5].filter(p => p);

  if (isLoading) {
    return <section className="bg-white py-12 h-96 flex items-center justify-center"><div className="text-gray-600">Loading...</div></section>;
  }

  const fields = [
    { key: 'heading', label: 'Heading', type: 'text' as const, value: heading },
    point1 && { key: 'point1', label: 'Point 1', type: 'text' as const, value: point1 },
    point2 && { key: 'point2', label: 'Point 2', type: 'text' as const, value: point2 },
    point3 && { key: 'point3', label: 'Point 3', type: 'text' as const, value: point3 },
    point4 && { key: 'point4', label: 'Point 4', type: 'text' as const, value: point4 },
    point5 && { key: 'point5', label: 'Point 5', type: 'text' as const, value: point5 }
  ].filter(Boolean) as Array<{ key: string; label: string; type: 'text'; value: string }>;

  return (
    <EditableSection
      sectionId={sectionId}
      sectionName={sectionName}
      page={page}
      fields={fields}
      onSave={(data) => {
        setHeading(data.heading);
        if (data.point1) setPoint1(data.point1);
        if (data.point2) setPoint2(data.point2);
        if (data.point3) setPoint3(data.point3);
        if (data.point4) setPoint4(data.point4);
        if (data.point5) setPoint5(data.point5);
      }}
    >
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {imagePosition === 'left' && (
            <div className="w-full">
              <img src={imageSrc} alt={imageAlt} className="w-full h-auto" />
            </div>
          )}

          <div className="pl-2 pr-6 md:pl-3 md:pr-8 lg:pl-[100px] lg:pr-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              {heading}
            </h2>
            
            <div className="space-y-3">
              {points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                  <p className="text-gray-700 text-xs md:text-sm">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {imagePosition === 'right' && (
            <div className="w-full">
              <img src={imageSrc} alt={imageAlt} className="w-full h-auto" />
            </div>
          )}
        </div>
      </section>
    </EditableSection>
  );
}
