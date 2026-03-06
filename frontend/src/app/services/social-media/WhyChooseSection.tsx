import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import whyChooseImage from '@/assets/services/social-media/social-media-004-why-choose-new.png';

export function WhyChooseSection() {
  const [whyChooseImageSrc, setWhychooseimageSrc] = useState(whyChooseImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('social-media');
        
        const whyChooseImageSaved = content.find((c: any) => c.section === 'why-choose-section' && c.key === 'image');
        if (whyChooseImageSaved?.value) setWhychooseimageSrc(whyChooseImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="relative w-full">
      <EditableImage
          src={whyChooseImageSrc}
          alt="Why Choose Our Social Media Marketing Service"
          className="w-full h-auto block"
          imageKey="image"
          page="social-media"
          section="why-choose-section"
          onImageChange={setWhychooseimageSrc}
        />
    </section>
  );
}
