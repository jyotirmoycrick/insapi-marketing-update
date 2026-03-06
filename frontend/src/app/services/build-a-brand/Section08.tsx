import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import sectionImage from '@/assets/services/build-a-brand/section-08.png';

export function Section08() {
  const [sectionImageSrc, setSectionimageSrc] = useState(sectionImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('build-a-brand');
        
        const sectionImageSaved = content.find((c: any) => c.section === 'section08' && c.key === 'image');
        if (sectionImageSaved?.value) setSectionimageSrc(sectionImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white">
      <EditableImage
          src={sectionImageSrc}
          alt="Build a Brand Section"
          className="w-full block"
          imageKey="image"
          page="build-a-brand"
          section="section08"
          onImageChange={setSectionimageSrc}
        />
      
      {/* Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pt-40">
        <button
          onClick={handleButtonClick}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors flex items-center gap-2"
        >
          BOOK A FREE BRANDING & PR CONSULTATION
          <span className="text-lg">→</span>
        </button>
      </div>
    </section>
  );
}
