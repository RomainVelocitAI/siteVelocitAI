import { useEffect, useRef, useState } from 'react';

interface TimeWasteGaugeProps {
  timeWasted: number; // en heures
  label: string;
  maxTime?: number;
  color?: string;
}

export function TimeWasteGauge({ timeWasted, label, maxTime = 40, color = 'bg-red-500' }: TimeWasteGaugeProps) {
  const [displayedTime, setDisplayedTime] = useState(0);
  const animationRef = useRef<number>();
  const percentage = Math.min((displayedTime / maxTime) * 100, 100);

  useEffect(() => {
    let startTime: number;
    const duration = 2000; // Animation de 2 secondes
    const startValue = 0;
    const endValue = timeWasted;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Animation d'accélération puis ralentissement
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayedTime(startValue + (endValue - startValue) * easeOutQuart);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [timeWasted]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {displayedTime.toFixed(1)}h / {maxTime}h
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ 
            width: `${percentage}%`,
            transition: 'width 0.5s ease-out',
          }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent to-white/30"></div>
        </div>
      </div>
      {percentage >= 90 && (
        <p className="mt-2 text-sm text-red-600 font-medium text-center">
          ⏱️ Vous perdez trop de temps !
        </p>
      )}
    </div>
  );
}
