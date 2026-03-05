import strengthImage from '@/assets/services/build-a-brand/build-a-brand-004-strength-creative-flow.png';

export function StrengthShowcase() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        
        {/* Left Side - Image (No padding, touches left edge) */}
        <div className="w-full">
          <img 
            src={strengthImage} 
            alt="Our Strength in Branding & PR" 
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Content (With padding) */}
        <div className="px-6 md:px-12 lg:px-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Strength in Branding & PR
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Strategy first, not random design or publicity</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Clear messaging that speaks to your audience</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Consistent brand across all touchpoints</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Long-term trust, not short-term hype</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Honest, practical approach for real businesses</p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
