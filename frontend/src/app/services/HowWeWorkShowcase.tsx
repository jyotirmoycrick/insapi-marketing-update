import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import howWeWorkImage from '@/assets/services/build-a-brand/build-a-brand-003-how-we-work.png';

export function HowWeWorkShowcase() {
  const [howWeWorkImageSrc, setHowweworkimageSrc] = useState(howWeWorkImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('services');
        
        const howWeWorkImageSaved = content.find((c: any) => c.section === 'how-we-work-showcase' && c.key === 'image');
        if (howWeWorkImageSaved?.value) setHowweworkimageSrc(howWeWorkImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="w-full block m-0 p-0 leading-none">
      <EditableImage
          src={howWeWorkImageSrc}
          alt="How We Work"
          className="w-full h-auto block m-0 p-0 leading-none align-bottom"
          imageKey="image"
          page="services"
          section="how-we-work-showcase"
          onImageChange={setHowweworkimageSrc}
        />
    </section>
  );
}
