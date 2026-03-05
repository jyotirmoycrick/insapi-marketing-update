import sectionImage from '@/assets/services/build-a-brand/section-03.png';
import { Check } from 'lucide-react';

export function Section03() {
  return (
    <section className="bg-white">
      {/* White Background Text Section */}
      <div className="bg-white px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our PR Services</h2>
        <p className="text-gray-700 text-sm mb-8 text-center leading-relaxed">
          We help your business get noticed and trusted.
        </p>
        
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Online PR & brand mentions
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Media outreach & press releases
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Founder & brand storytelling
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Reputation building & brand authority
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
            </div>
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              Digital PR for search and visibility
            </p>
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="w-full">
        <img src={sectionImage} alt="PR Services" className="w-full block" />
      </div>
    </section>
  );
}
