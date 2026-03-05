import sectionImage from '@/assets/services/build-a-brand/section-01.png';
import { Check } from 'lucide-react';

export function Section01() {
  return (
    <section className="relative bg-white">
      <img src={sectionImage} alt="Build a Brand Section" className="w-full block" />
      
      {/* Text Overlay */}
      <div className="absolute top-0 left-0 w-full px-6 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">What We Help You Achieve</h2>
        
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Clear brand identity that customers remember
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Consistent brand voice across all platforms
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Strong public image that builds trust
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Media presence that adds authority
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Professional positioning in your market
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
