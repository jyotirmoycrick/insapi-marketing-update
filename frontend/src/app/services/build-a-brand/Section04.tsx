import sectionImage from '@/assets/services/build-a-brand/section-04.png';
import { Check } from 'lucide-react';

export function Section04() {
  return (
    <section className="bg-white">
      {/* White Background Text Section */}
      <div className="bg-white px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Strength In Branding & PR</h2>
        
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Strategy first, not random design or publicity
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Clear messaging that speaks to your audience
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Consistent brand across all touchpoints
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Long-term trust, not short-term hype
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Honest, practical approach for real businesses
            </p>
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="w-full">
        <img src={sectionImage} alt="Our Strength In Branding & PR" className="w-full block" />
      </div>
    </section>
  );
}
