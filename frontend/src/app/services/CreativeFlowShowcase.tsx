import creativeFlowImage from '@/assets/services/build-a-brand/build-a-brand-004-strength-creative-flow.png';

export function CreativeFlowShowcase() {
  const strengths = [
    "Industry-specific expertise",
    "Results-driven approach",
    "Collaborative process",
    "Measurable outcomes"
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Image */}
          <div>
            <img src={creativeFlowImage} alt="Our Strength in Branding & PR" className="w-full max-w-lg mx-auto rounded-lg shadow-lg" />
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Strength in Branding & PR
            </h2>
            <div className="space-y-4">
              {strengths.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#4CAF50" />
                      <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base md:text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}