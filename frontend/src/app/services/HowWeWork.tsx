import howWeWorkImage from '@/assets/services/build-a-brand/build-a-brand-003-how-we-work.png';

export function HowWeWork() {
  const steps = [
    { title: "Understand Your Business & Goals" },
    { title: "Define Your Brand Message & Positioning" },
    { title: "Create Consistent Brand Assets" },
    { title: "Execute PR With Clear Purpose" },
    { title: "Track Impact And Refine" }
  ];

  return (
    <section className="bg-[#E3F2FD] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How We Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-10 h-10 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                {index + 1}
              </div>
              <p className="text-gray-800 font-semibold text-sm">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}