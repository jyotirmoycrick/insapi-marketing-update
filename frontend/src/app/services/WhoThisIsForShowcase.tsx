import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import whoThisIsForImage from '@/assets/services/build-a-brand/build-a-brand-002-who-this-is-for.png';

export function WhoThisIsForShowcase() {
  const [whoThisIsForImageSrc, setWhothisisforimageSrc] = useState(whoThisIsForImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('services');
        
        const whoThisIsForImageSaved = content.find((c: any) => c.section === 'who-this-is-for-showcase' && c.key === 'image');
        if (whoThisIsForImageSaved?.value) setWhothisisforimageSrc(whoThisIsForImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="w-full block m-0 p-0 leading-none">
      <EditableImage
          src={whoThisIsForImageSrc}
          alt="Who This Is For"
          className="w-full h-auto block m-0 p-0 leading-none align-bottom"
          imageKey="image"
          page="services"
          section="who-this-is-for-showcase"
          onImageChange={setWhothisisforimageSrc}
        />
    </section>
  );
}
