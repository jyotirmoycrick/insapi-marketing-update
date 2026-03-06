import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import sectionImage from '@/assets/services/build-a-brand/build-a-brand-005-why-businesses-choose-new.png';

export function DesktopSection05() {
  const [sectionImageSrc, setSectionimageSrc] = useState(sectionImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('build-a-brand');
        
        const sectionImageSaved = content.find((c: any) => c.section === 'desktop-section05' && c.key === 'image');
        if (sectionImageSaved?.value) setSectionimageSrc(sectionImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="bg-white">
      <EditableImage
          src={sectionImageSrc}
          alt="Why Businesses Choose Us"
          className="w-full block"
          imageKey="image"
          page="build-a-brand"
          section="desktop-section05"
          onImageChange={setSectionimageSrc}
        />
    </section>
  );
}
