import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import { EditableSection } from '@/components/EditableSection';
import readyToTurnImage from '@/assets/services/social-media/social-media-006-ready-to-turn.png';

export function ReadyToTurnSection() {
  const [readyToTurnImageSrc, setReadytoturnimageSrc] = useState(readyToTurnImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('social-media');
        
        const readyToTurnImageSaved = content.find((c: any) => c.section === 'ready-to-turn-section' && c.key === 'image');
        if (readyToTurnImageSaved?.value) setReadytoturnimageSrc(readyToTurnImageSaved.value);
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
        const content = await contentAPI.getPageContent('social-media');
        const btn = content.find((c: any) => c.section === 'ready-to-turn' && c.key === 'buttonText');
        if (btn) setButtonText(btn.value);
      } catch (error) {
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <section className="relative w-full h-96 flex items-center justify-center"><div className="text-gray-600">Loading...</div></section>;
  }

  return (
    <EditableSection
      sectionId="ready-to-turn"
      sectionName="Ready To Turn CTA"
      page="social-media"
      fields={[
        { key: 'buttonText', label: 'Button Text', type: 'text', value: buttonText }
      ]}
      onSave={(data) => setButtonText(data.buttonText)}
    >
      <section className="relative w-full">
        <EditableImage
          src={readyToTurnImageSrc}
          alt="Ready To Turn Social Media Into A Growth Channel?"
          className="w-full h-auto block"
          imageKey="image"
          page="social-media"
          section="ready-to-turn-section"
          onImageChange={setReadytoturnimageSrc}
        />
        
        {/* Button Overlay - Centered at bottom */}
        <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-16 lg:pb-20">
          <button 
            onClick={handleButtonClick}
            className="bg-[#4A5FD9] hover:bg-[#3A4FC9] text-white font-semibold px-8 py-3 rounded-lg text-base md:text-lg transition-colors shadow-lg"
          >
            {buttonText}
          </button>
        </div>
      </section>
    </EditableSection>
  );
}
