import { Check } from 'lucide-react';
import brandingImage from '@/assets/services/build-a-brand/branding-services.png';
import prImage from '@/assets/services/build-a-brand/pr-services.png';
import strengthImage from '@/assets/services/build-a-brand/strength-branding-pr.png';

export function DesktopZigZagSections() {
  return (
    <div className="bg-white">
      {/* Section 1: Image Left (touching left edge), Text Right */}
      <section className="flex items-center py-16">
        <div className="w-5/12">
          <img src={brandingImage} alt="Our Branding Services" className="w-full h-auto" />
        </div>
        <div className="w-7/12 px-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Branding Services</h2>
          <p className="text-gray-700 text-lg mb-8">
            We create brands that look professional and feel reliable.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Brand strategy & positioning</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Logo & visual identity direction</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Brand guidelines (colors, fonts, tone)</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Website & social brand alignment</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Rebranding for growing businesses</span>
            </div>
          </div>
          
          <p className="text-gray-700 text-base mt-8">
            <span className="font-semibold text-gray-900">Result:</span> A brand that looks serious, confident, and established.
          </p>
        </div>
      </section>

      {/* Section 2: Text Left, Image Right (touching right edge) */}
      <section className="flex items-center py-16">
        <div className="w-7/12 px-16 pl-64">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our PR Services</h2>
          <p className="text-gray-700 text-lg mb-8">
            We get your business seen in the right places.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Press release writing & distribution</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Media outreach & relationship building</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Industry publication features</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Thought leadership positioning</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">Crisis communication support</span>
            </div>
          </div>
          
          <p className="text-gray-700 text-base mt-8">
            <span className="font-semibold text-gray-900">Result:</span> Your business gets noticed, trusted, and talked about.
          </p>
        </div>
        <div className="w-5/12">
          <img src={prImage} alt="Our PR Services" className="w-full h-auto" />
        </div>
      </section>

      {/* Section 3: Image Left (touching left edge), Text Right */}
      <section className="flex items-center py-16">
        <div className="w-5/12">
          <img src={strengthImage} alt="Our Strength In Branding & PR" className="w-full h-auto" />
        </div>
        <div className="w-7/12 px-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Strength In Branding & PR</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">We don't just design—we build brands that mean something</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">We connect you with real media, not just press release sites</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">We make sure your brand and message stay consistent everywhere</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <span className="text-base text-gray-900">We work with businesses that want to grow, not just look good</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
