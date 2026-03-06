import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import laptopImage from '@/assets/services/shopify/shopify-001-laptop-showcase.png';

export function LaptopShowcase() {
  const [laptopImageSrc, setLaptopimageSrc] = useState(laptopImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('services');
        
        const laptopImageSaved = content.find((c: any) => c.section === 'laptop-showcase' && c.key === 'image');
        if (laptopImageSaved?.value) setLaptopimageSrc(laptopImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="w-full block m-0 p-0 leading-none">
      <EditableImage
          src={laptopImageSrc}
          alt="Our PR Services"
          className="w-full h-auto block m-0 p-0 leading-none"
          imageKey="image"
          page="services"
          section="laptop-showcase"
          onImageChange={setLaptopimageSrc}
        />
    </section>
  );
}