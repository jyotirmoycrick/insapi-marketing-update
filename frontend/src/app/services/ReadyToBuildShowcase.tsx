import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import readyToBuildImage from '@/assets/shared/shared-003-ready-to-grow.png';

export function ReadyToBuildShowcase() {
  const [readyToBuildImageSrc, setReadytobuildimageSrc] = useState(readyToBuildImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('services');
        
        const readyToBuildImageSaved = content.find((c: any) => c.section === 'ready-to-build-showcase' && c.key === 'image');
        if (readyToBuildImageSaved?.value) setReadytobuildimageSrc(readyToBuildImageSaved.value);
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
    <section className="relative w-full">
      {/* Background Image */}
      <EditableImage
          src={readyToBuildImageSrc}
          alt="Ready to Build a Strong Brand"
          className="w-full h-auto block"
          imageKey="image"
          page="services"
          section="ready-to-build-showcase"
          onImageChange={setReadytobuildimageSrc}
        />
      
      {/* Button Overlay - Centered at bottom */}
      <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-16 lg:pb-20">
        <button 
          onClick={handleButtonClick}
          className="bg-[#4A5FD9] hover:bg-[#3A4FC9] text-white font-semibold px-8 py-3 rounded-lg text-base md:text-lg transition-colors shadow-lg"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
