import whatWeHelpImage from '@/assets/services/content-marketing/content-marketing-002-channels.png';

export function WhatWeHelp() {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <img 
        src={whatWeHelpImage} 
        alt="What We Help You Achieve" 
        className="w-full h-auto block"
      />
      
      {/* Text Overlay - Positioned center-right, upper area */}
      <div className="absolute inset-0 flex items-start justify-center pt-16 md:pt-20 lg:pt-24">
        <div className="w-full max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="ml-auto mr-0 lg:mr-32" style={{ maxWidth: '500px' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              What We Help You Achieve
            </h2>
            
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-sm md:text-base">Clear brand identity that customers remember</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-sm md:text-base">Consistent brand voice across all platforms</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-sm md:text-base">Strong public image that builds trust</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-sm md:text-base">Media presence that adds authority</p>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <p className="text-gray-900 text-sm md:text-base">Professional positioning in your market</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}