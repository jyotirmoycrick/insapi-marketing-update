import designImage from '@/assets/shared/shared-001-branding-desk.png';

export function DesignShowcase() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        
        {/* Left Side - Image (No padding, touches left edge) */}
        <div className="w-full">
          <img 
            src={designImage} 
            alt="Our Branding Services" 
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Content (With padding) */}
        <div className="px-6 md:px-12 lg:px-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Branding Services
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg mb-6">
            We create brands that look professional and feel reliable.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Brand strategy & positioning</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Logo & visual identity direction</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Brand guidelines (colors, fonts, tone)</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Website & social brand alignment</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Rebranding for growing businesses</p>
            </div>
          </div>
          
          <p className="text-gray-700 text-base mt-6">
            <span className="font-semibold">Result:</span> A brand that feels serious, confident, and established.
          </p>
        </div>
        
      </div>
    </section>
  );
}