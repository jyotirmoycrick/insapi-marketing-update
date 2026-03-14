import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import { EditableSection } from '@/components/EditableSection';
import readyToGrowImageDesktop from '@/assets/home/growDesktop.webp';
import readyToGrowImageMobile from '@/assets/home/grow-mobile.png';

export function ReadyToGrowSection() {
  const [readyToGrowImageDesktopSrc, setReadytogrowimagedesktopSrc] = useState(readyToGrowImageDesktop);
  const [readyToGrowImageMobileSrc, setReadytogrowimagemobileSrc] = useState(readyToGrowImageMobile);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        
        const readyToGrowImageDesktopSaved = content.find((c: any) => c.section === 'ready-to-grow-section' && c.key === 'image-0');
        if (readyToGrowImageDesktopSaved?.value) setReadytogrowimagedesktopSrc(readyToGrowImageDesktopSaved.value);
        const readyToGrowImageMobileSaved = content.find((c: any) => c.section === 'ready-to-grow-section' && c.key === 'image-1');
        if (readyToGrowImageMobileSaved?.value) setReadytogrowimagemobileSrc(readyToGrowImageMobileSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  const [buttonText, setButtonText] = useState('Contact Us');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        const btn = content.find((c: any) => c.section === 'ready-to-grow' && c.key === 'buttonText');
        if (btn) setButtonText(btn.value);
      } catch (error) {
        // Silently use default content
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full">
      {/* Desktop Image */}
      <EditableImage
          src={readyToGrowImageDesktopSrc}
          alt="Ready To Grow? Talk To Our Experts"
          className="hidden md:block w-full h-auto"
          imageKey="image-0"
          page="home"
          section="ready-to-grow-section"
          onImageChange={setReadytogrowimagedesktopSrc}
        />
      
      {/* Mobile Image */}
      <EditableImage
          src={readyToGrowImageMobileSrc}
          alt="Ready To Grow? Talk To Our Experts"
          className="block md:hidden w-full h-auto"
          imageKey="image-1"
          page="home"
          section="ready-to-grow-section"
          onImageChange={setReadytogrowimagemobileSrc}
        />
      
      {/* Button Overlay - Centered at bottom - Desktop only */}
      <div className="hidden md:flex absolute inset-0 items-end justify-center pb-12 md:pb-16 lg:pb-20">
        <button 
          onClick={handleButtonClick}
          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-600 text-gray-900 font-semibold px-8 py-3 rounded-lg text-base md:text-lg transition-colors shadow-lg"
        >
          {buttonText}
        </button>
      </div>
      
      {/* Button for Mobile - positioned according to design */}
      <div className="flex md:hidden absolute inset-0 items-center justify-center pt-32">
        <button 
          onClick={handleButtonClick}
          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-600 text-gray-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-lg"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}
