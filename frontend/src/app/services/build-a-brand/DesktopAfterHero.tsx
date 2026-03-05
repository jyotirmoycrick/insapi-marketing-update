import sectionImage from '@/assets/services/build-a-brand/after-hero-section.png';
import { Check } from 'lucide-react';

export function DesktopAfterHero() {
  return (
    <section className="relative bg-white">
      <img src={sectionImage} alt="What We Help You Achieve" className="w-full block" />
      
      {/* Text Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What We Help You Achieve
          </h2>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Clear brand identity that customers remember</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Consistent brand voice across all platforms</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Strong public image that builds trust</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Media presence that adds authority</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900 font-medium">Professional positioning in your market</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
