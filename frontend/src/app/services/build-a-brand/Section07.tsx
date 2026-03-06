import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import sectionImage from '@/assets/services/build-a-brand/section-07.png';

export function Section07() {
  const [sectionImageSrc, setSectionimageSrc] = useState(sectionImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('build-a-brand');
        
        const sectionImageSaved = content.find((c: any) => c.section === 'section07' && c.key === 'image');
        if (sectionImageSaved?.value) setSectionimageSrc(sectionImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="relative bg-white">
      <EditableImage
          src={sectionImageSrc}
          alt="Build a Brand Section"
          className="w-full block"
          imageKey="image"
          page="build-a-brand"
          section="section07"
          onImageChange={setSectionimageSrc}
        />
    </section>
  );
}
