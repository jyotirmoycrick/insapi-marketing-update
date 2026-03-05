import React, { useState, useEffect, useRef, CSSProperties } from 'react';

interface CounterWidgetProps {
  content: {
    endValue: number;
    duration: number;
    prefix: string;
    suffix: string;
    label: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function CounterWidget({ content, styles, settings, isPreview }: CounterWidgetProps) {
  const [count, setCount] = useState(0);
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

    const endValue = content.endValue || 100;
    const duration = content.duration || 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = endValue / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.round(increment * currentStep), endValue));
      if (currentStep >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasStarted, content.endValue, content.duration]);

  const containerStyles: CSSProperties = {
    textAlign: 'center',
    ...styles,
  };

  return (
    <div ref={ref} style={containerStyles} className="widget-counter">
      <div className="text-5xl font-bold text-blue-600 mb-2">
        {content.prefix || ''}
        {count}
        {content.suffix || ''}
      </div>
      <div className="text-lg text-gray-600">{content.label || 'Label'}</div>
    </div>
  );
}
