import { Check } from 'lucide-react';
import whoThisIsForImage from '@/assets/services/build-a-brand/who-this-is-for.png';

export function DesktopWhoThisIsFor() {
  return (
    <section className="relative w-full">
      <img src={whoThisIsForImage} alt="Who This Is For" className="w-full h-auto" />
      
      <div className="absolute inset-0 flex items-center justify-center pl-32">
        <div className="max-w-2xl px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Who This Is For</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Growing businesses</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Founders building authority</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Brands preparing to scale</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Companies struggling with brand clarity</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Businesses that want to look more credible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
