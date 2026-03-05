import React, { useState, useEffect, useRef, CSSProperties } from 'react';

interface ProgressBarWidgetProps {
  content: {
    percentage: number;
    label: string;
    showPercentage: boolean;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function ProgressBarWidget({ content, styles, settings, isPreview }: ProgressBarWidgetProps) {
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const targetPercentage = content.percentage || 75;
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = targetPercentage / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(Math.round(increment * currentStep), targetPercentage));
      if (currentStep >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasStarted, content.percentage]);

  const containerStyles: CSSProperties = {
    ...styles,
  };

  return (
    <div ref={ref} style={containerStyles} className="widget-progress-bar">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-700">{content.label || 'Skill Name'}</span>
        {content.showPercentage && (
          <span className="font-bold text-blue-600">{progress}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
