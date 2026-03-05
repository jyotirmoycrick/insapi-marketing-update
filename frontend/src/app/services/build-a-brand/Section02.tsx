import sectionImage from '@/assets/services/build-a-brand/section-02.png';
import { Check } from 'lucide-react';

export function Section02() {
  return (
    <section className="bg-white">
      {/* White Background Text Section */}
      <div className="bg-white px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Branding Services</h2>
        <p className="text-gray-700 text-sm mb-8 text-center leading-relaxed">
          We create brands that look professional and feel reliable.
        </p>
        
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Brand strategy & positioning
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Logo & visual identity direction
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Brand guidelines (colors, fonts, tone)
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Website & social brand alignment
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Rebranding for growing businesses
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mt-8 text-center leading-relaxed">
          <span className="font-semibold text-gray-900">Result:</span> A brand that looks serious, confident, and established.
        </p>
      </div>
      
      {/* Image Section */}
      <div className="w-full">
        <img src={sectionImage} alt="Branding Services" className="w-full block" />
      </div>
    </section>
  );
}
