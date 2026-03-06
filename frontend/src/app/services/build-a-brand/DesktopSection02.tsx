import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import sectionImage from '@/assets/services/build-a-brand/build-a-brand-002-who-this-is-for.png';

export function DesktopSection02() {
  const [sectionImageSrc, setSectionimageSrc] = useState(sectionImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('build-a-brand');
        
        const sectionImageSaved = content.find((c: any) => c.section === 'desktop-section02' && c.key === 'image');
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
          alt="Who This Is For"
          className="w-full block"
          imageKey="image"
          page="build-a-brand"
          section="desktop-section02"
          onImageChange={setSectionimageSrc}
        />
    </section>
  );
}
