import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import nextSectionImage from '@/assets/services/build-a-brand/next-section.png';

export function DesktopNextSection() {
  const [nextSectionImageSrc, setNextsectionimageSrc] = useState(nextSectionImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('build-a-brand');
        
        const nextSectionImageSaved = content.find((c: any) => c.section === 'desktop-next-section' && c.key === 'image');
        if (nextSectionImageSaved?.value) setNextsectionimageSrc(nextSectionImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="relative w-full">
      <EditableImage
          src={nextSectionImageSrc}
          alt="Next Section"
          className="w-full h-auto"
          imageKey="image"
          page="build-a-brand"
          section="desktop-next-section"
          onImageChange={setNextsectionimageSrc}
        />
    </section>
  );
}
