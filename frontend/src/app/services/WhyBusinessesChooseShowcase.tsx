import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import whyBusinessesChooseImage from '@/assets/services/build-a-brand/build-a-brand-005-why-businesses-choose-new.png';

export function WhyBusinessesChooseShowcase() {
  const [whyBusinessesChooseImageSrc, setWhybusinesseschooseimageSrc] = useState(whyBusinessesChooseImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('services');
        
        const whyBusinessesChooseImageSaved = content.find((c: any) => c.section === 'why-businesses-choose-showcase' && c.key === 'image');
        if (whyBusinessesChooseImageSaved?.value) setWhybusinesseschooseimageSrc(whyBusinessesChooseImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="w-full block m-0 p-0 leading-none">
      <EditableImage
          src={whyBusinessesChooseImageSrc}
          alt="Why Businesses Choose"
          className="w-full h-auto block m-0 p-0 leading-none align-bottom"
          imageKey="image"
          page="services"
          section="why-businesses-choose-showcase"
          onImageChange={setWhybusinesseschooseimageSrc}
        />
    </section>
  );
}
