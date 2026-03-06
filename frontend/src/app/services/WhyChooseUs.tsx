import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import whyChooseImage from '@/assets/services/build-a-brand/build-a-brand-003-why-choose-us.png';

export function WhyChooseUs() {
  const [whyChooseImageSrc, setWhychooseimageSrc] = useState(whyChooseImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('services');
        
        const whyChooseImageSaved = content.find((c: any) => c.section === 'why-choose-us' && c.key === 'image');
        if (whyChooseImageSaved?.value) setWhychooseimageSrc(whyChooseImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  const reasons = [
    "Business-Focused Branding, Not Just Creative Work",
    "Clear Communication And Realistic Promises",
    "Experience Across Multiple Industries",
    "Focus On Trust, Not Trends"
  ];

  return (
    <section className="bg-[#0A2540] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Why Businesses Choose
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDB813]">
            Digital Advento
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Image */}
          <div>
            <EditableImage
          src={whyChooseImageSrc}
          alt="Why Choose Digital Advento"
          className="w-full max-w-lg mx-auto"
          imageKey="image"
          page="services"
          section="why-choose-us"
          onImageChange={setWhychooseimageSrc}
        />
          </div>

          {/* Right Side - Reasons */}
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FDB813] text-[#0A2540] rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-white text-base md:text-lg font-medium pt-1">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}