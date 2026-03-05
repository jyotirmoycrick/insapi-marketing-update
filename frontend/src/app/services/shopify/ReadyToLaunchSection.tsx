import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import readyToLaunchImage from '@/assets/services/shopify/shopify-010-ready-to-launch.png';

export function ReadyToLaunchSection() {
  const [buttonText, setButtonText] = useState('Contact Us');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('shopify');
        const btn = content.find((c: any) => c.section === 'ready-to-launch' && c.key === 'buttonText');
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
      sectionId="ready-to-launch"
      sectionName="Ready To Launch CTA"
      page="shopify"
      fields={[
        { key: 'buttonText', label: 'Button Text', type: 'text', value: buttonText }
      ]}
      onSave={(data) => setButtonText(data.buttonText)}
    >
      <section className="relative w-full">
        <img 
          src={readyToLaunchImage} 
          alt="Ready To Launch Or Upgrade Your Shopify Store?" 
          className="w-full h-auto block" 
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
