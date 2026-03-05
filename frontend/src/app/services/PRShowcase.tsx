import prImage from '@/assets/services/marketing/marketing-001-pr-showcase.png';

export function PRShowcase() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        
        {/* Left Side - Content (With padding) */}
        <div className="px-6 md:px-12 lg:pl-48 lg:pr-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our PR Services
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg mb-6">
            We help your business get noticed and trusted.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Online PR & brand mentions</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Media outreach & press releases</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Founder & brand storytelling</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Reputation building & brand authority</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-gray-700 text-base">Digital PR for search and visibility</p>
            </div>
          </div>
        </div>

        {/* Right Side - Image (No padding, touches right edge) */}
        <div className="w-full lg:-ml-8">
          <img 
            src={prImage} 
            alt="Our PR Services" 
            className="w-full h-auto"
          />
        </div>
        
      </div>
    </section>
  );
}
