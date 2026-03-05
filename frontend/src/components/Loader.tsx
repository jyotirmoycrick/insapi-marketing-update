import { useEffect, useState } from 'react';
import logo from '@/assets/shared/logo.png';

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Faster progress for better UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setFadeOut(true), 200);
    }
  }, [progress]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#1E3A5F] via-[#2D5A87] to-[#1E3A5F] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Logo container with animation */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated ring around logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 w-40 h-40 -m-6 rounded-full border-4 border-transparent border-t-yellow-400 border-r-orange-500 animate-spin"></div>
          <div className="absolute inset-0 w-40 h-40 -m-6 rounded-full border-4 border-transparent border-b-blue-400 border-l-blue-300 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Logo with pulse effect */}
          <div className="relative w-28 h-28 flex items-center justify-center bg-white rounded-2xl shadow-2xl animate-pulse">
            <img 
              src={logo} 
              alt="InsAPI Marketing" 
              className="w-24 h-auto object-contain"
            />
          </div>
        </div>

        {/* Brand name with gradient */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
          InsAPI Marketing
        </h1>

        {/* Loading text */}
        <p className="text-white/80 text-sm md:text-base mb-6 tracking-wider">
          Loading your experience...
        </p>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress percentage */}
        <span className="mt-3 text-white/60 text-sm font-mono">
          {progress}%
        </span>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
