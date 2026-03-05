import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import readyToGrowImageDesktop from '@/assets/home/growDesktop.png';
import readyToGrowImageMobile from '@/assets/home/grow-mobile.png';

export function ReadyToGrowSection() {
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
      <img 
        src={readyToGrowImageDesktop} 
        alt="Ready To Grow? Talk To Our Experts" 
        className="hidden md:block w-full h-auto" 
      />
      
      {/* Mobile Image */}
      <img 
        src={readyToGrowImageMobile} 
        alt="Ready To Grow? Talk To Our Experts" 
        className="block md:hidden w-full h-auto" 
      />
      
      {/* Button Overlay - Centered at bottom - Desktop only */}
      <div className="hidden md:flex absolute inset-0 items-end justify-center pb-12 md:pb-16 lg:pb-20">
        <button 
          onClick={handleButtonClick}
          className="bg-[#4A5FD9] hover:bg-[#3A4FC9] text-white font-semibold px-8 py-3 rounded-lg text-base md:text-lg transition-colors shadow-lg"
        >
          {buttonText}
        </button>
      </div>
      
      {/* Button for Mobile - positioned according to design */}
      <div className="flex md:hidden absolute inset-0 items-center justify-center pt-32">
        <button 
          onClick={handleButtonClick}
          className="bg-[#4A5FD9] hover:bg-[#3A4FC9] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-lg"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}