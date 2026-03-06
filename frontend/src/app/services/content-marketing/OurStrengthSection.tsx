import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import strengthImage from '@/assets/services/content-marketing/content-marketing-010-our-strength.png';

export function OurStrengthSection() {
  const [strengthImageSrc, setStrengthimageSrc] = useState(strengthImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('content-marketing');
        
        const strengthImageSaved = content.find((c: any) => c.section === 'our-strength-section' && c.key === 'image');
        if (strengthImageSaved?.value) setStrengthimageSrc(strengthImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="relative w-full">
      <EditableImage
          src={strengthImageSrc}
          alt="Our Strength in Content Marketing"
          className="w-full h-auto block"
          imageKey="image"
          page="content-marketing"
          section="our-strength-section"
          onImageChange={setStrengthimageSrc}
        />
    </section>
  );
}
