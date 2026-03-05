import { useState, useEffect } from 'react';
import girlImage from "@/assets/home/girl.png";

// --- Decorative SVGs ---
const CurlSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M70 15 C70 15, 55 10, 45 25 C35 40, 50 55, 40 65 C30 75, 15 70, 15 70"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7"
    />
    <circle cx="14" cy="70" r="4" fill="white" opacity="0.7" />
  </svg>
);


const ChatBubble = ({ text, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg px-4 py-2.5 ${className}`}>
    <span className="text-gray-800 font-semibold text-sm whitespace-nowrap">{text}</span>
  </div>
);

export function WhyChooseSection() {
  const [activeNumber, setActiveNumber] = useState(1);
  const [reason1, setReason1] = useState('Meta Partner Certified');
  const [reason2, setReason2] = useState('10+ Years Of Proven Experience');
  const [reason3, setReason3] = useState('Revenue-Focused Marketing');
  const [reason4, setReason4] = useState('Custom Strategies, No Templates');
  const [reason5, setReason5] = useState('Expert-Led Campaign Execution');
  const [reason6, setReason6] = useState('Results In Competitive Markets');

  const reasons = [
    { number: 1, text: reason1 },
    { number: 2, text: reason2 },
    { number: 3, text: reason3 },
    { number: 4, text: reason4 },
    { number: 5, text: reason5 },
    { number: 6, text: reason6 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNumber((prev) => (prev === 6 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const ReasonsList = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'space-y-5' : 'space-y-4'}`}>
      {reasons.map((reason) => (
        <div key={reason.number} className="flex items-center gap-4 md:gap-5">
          <span
            className={`font-bold transition-all duration-500 min-w-[28px] text-center
              ${isMobile ? 'text-3xl' : 'text-2xl md:text-3xl lg:text-4xl'}
              ${activeNumber === reason.number ? 'text-yellow-500 scale-125 animate-pulse-glow' : 'text-gray-500'}`}
          >
            {reason.number}
          </span>

          <div
            className={`w-0.5 transition-all duration-500
              ${isMobile ? 'h-9' : 'h-8 md:h-9 lg:h-10'}
              ${activeNumber === reason.number ? 'bg-yellow-500 shadow-glow' : 'bg-gray-600'}`}
          />

          <span
            className={`font-semibold transition-all duration-500
              ${isMobile ? 'text-sm' : 'text-sm md:text-sm lg:text-base'}
              ${activeNumber === reason.number ? 'text-yellow-500 animate-color-shift' : 'text-gray-300'}`}
          >
            {reason.text}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section
        className="relative overflow-hidden bg-[#0d1b2e]"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 55% 60%, rgba(20, 80, 60, 0.35) 0%, transparent 70%)',
          }}
        />

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:block relative px-8 lg:px-16 xl:px-24 py-16 lg:py-20">

          {/* Curl – top right */}
          <div className="absolute top-6 right-8 lg:right-14 opacity-70">
            <CurlSVG />
          </div>

          {/* Heading – centered */}
          <div className="text-center mb-12 lg:mb-14">
            <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Why Choose Us?</p>
            <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              Why Businesses Choose
            </h2>
            <h2 className="text-yellow-500 text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              Insapi Marketing
            </h2>
          </div>

          {/* ✅ DESKTOP: justify-between — image left, reasons right */}
          <div className="flex items-center justify-between max-w-6xl mx-auto">

            {/* LEFT – Girl image with decorations */}
            <div className="relative flex-shrink-0 w-[280px] lg:w-[320px] xl:w-[360px]">
             

              {/* Girl photo */}
              <img
                src={girlImage}
                alt="Why Businesses Choose Insapi Marketing"
                className="relative z-10 w-full object-cover rounded-2xl"
                style={{ maxHeight: '370px', objectPosition: 'top' }}
              />

              {/* Chat bubbles */}
              <div className="absolute z-20 right-[-16px] bottom-[28%] flex flex-col gap-2">
                <ChatBubble text="Hello 👋" />
                <ChatBubble text="Can i try the project first?" />
              </div>
            </div>

            {/* RIGHT – Reasons list */}
            <div className="w-[55%] xl:w-[52%]">
              <ReasonsList />
            </div>
          </div>
        </div>

        {/* ===== MOBILE LAYOUT ===== */}
        {/* ✅ MOBILE: stacked — heading → girl image → reasons list below */}
        <div className="block md:hidden relative px-5 py-10">

          {/* Curl – top right */}
          <div className="absolute top-4 right-4 opacity-70 scale-75">
            <CurlSVG />
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Why Choose Us?</p>
            <h2 className="text-white text-2xl font-bold leading-tight">
              Why Businesses Choose
            </h2>
            <h2 className="text-yellow-500 text-2xl font-bold leading-tight">
              Insapi Marketing
            </h2>
          </div>

          {/* Girl image — centered, full width-ish */}
          <div className="relative mx-auto w-[200px] mb-10">
            

            

            {/* Girl photo */}
            <img
              src={girlImage}
              alt="Why Businesses Choose Insapi Marketing"
              className="relative z-10 w-full object-cover rounded-2xl"
              style={{ maxHeight: '260px', objectPosition: 'top' }}
            />

            {/* Chat bubbles — bottom right of image */}
            <div className="absolute z-20 right-[-28px] bottom-[18%] flex flex-col gap-1.5">
              <div className="bg-white rounded-xl shadow-lg px-3 py-1.5">
                <span className="text-gray-800 font-semibold text-xs whitespace-nowrap">Hello 👋</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg px-3 py-1.5">
                <span className="text-gray-800 font-semibold text-xs whitespace-nowrap">Can i try the project first?</span>
              </div>
            </div>
          </div>

          {/* ✅ Reasons list BELOW image */}
          <div className="px-1">
            <ReasonsList isMobile={true} />
          </div>
        </div>
      </section>

      {/* Animations — unchanged */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&display=swap');

          @keyframes pulse-glow {
            0%, 100% { text-shadow: 0 0 10px rgba(234,179,8,0.8), 0 0 20px rgba(234,179,8,0.6), 0 0 30px rgba(234,179,8,0.4); }
            50%       { text-shadow: 0 0 20px rgba(234,179,8,1),   0 0 30px rgba(234,179,8,0.8), 0 0 40px rgba(234,179,8,0.6); }
          }
          @keyframes color-shift {
            0%, 100% { color: #eab308; text-shadow: 0 0 10px rgba(234,179,8,0.5); }
            25%       { color: #f59e0b; text-shadow: 0 0 15px rgba(245,158,11,0.6); }
            50%       { color: #d97706; text-shadow: 0 0 20px rgba(217,119,6,0.7); }
            75%       { color: #f59e0b; text-shadow: 0 0 15px rgba(245,158,11,0.6); }
          }
          .animate-pulse-glow  { animation: pulse-glow  2s ease-in-out infinite; }
          .animate-color-shift { animation: color-shift 2s ease-in-out infinite; }
          .shadow-glow { box-shadow: 0 0 10px rgba(234,179,8,0.8), 0 0 20px rgba(234,179,8,0.6); }
        `
      }} />
    </>
  );
}