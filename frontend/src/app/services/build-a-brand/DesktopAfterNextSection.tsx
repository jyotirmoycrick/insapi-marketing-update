import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import afterNextSectionImage from '@/assets/services/build-a-brand/after-next-section.png';

export function DesktopAfterNextSection() {
  const [afterNextSectionImageSrc, setAfternextsectionimageSrc] = useState(afterNextSectionImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('build-a-brand');
        
        const afterNextSectionImageSaved = content.find((c: any) => c.section === 'desktop-after-next-section' && c.key === 'image');
        if (afterNextSectionImageSaved?.value) setAfternextsectionimageSrc(afterNextSectionImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="relative w-full">
      <EditableImage
          src={afterNextSectionImageSrc}
          alt="After Next Section"
          className="w-full h-auto"
          imageKey="image"
          page="build-a-brand"
          section="desktop-after-next-section"
          onImageChange={setAfternextsectionimageSrc}
        />
    </section>
  );
}
