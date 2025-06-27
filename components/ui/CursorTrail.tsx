import React, { useEffect, useRef } from 'react';

interface CursorTrailProps {
  className?: string;
  trailLength?: number;
  particleSize?: number;
  glowIntensity?: number;
  color?: string;
}

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  opacity: number;
  size: number;
}

export default function CursorTrail({
  className = '',
  trailLength = 35,
  particleSize = 6,
  glowIntensity = 1.5,
  color = '#8B5CF6'
}: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const lastMoveTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isMoving: true
      };
      lastMoveTimeRef.current = now;

      // Add new trail point
      trailRef.current.unshift({
        x: e.clientX,
        y: e.clientY,
        timestamp: now,
        opacity: 1,
        size: particleSize
      });

      // Limit trail length
      if (trailRef.current.length > trailLength) {
        trailRef.current = trailRef.current.slice(0, trailLength);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTimeRef.current;
      
      // Fade out trail when mouse stops moving
      if (timeSinceLastMove > 100) {
        mouseRef.current.isMoving = false;
      }

      // Update and draw trail
      trailRef.current = trailRef.current.filter((point, index) => {
        const age = now - point.timestamp;
        const maxAge = 1000; // 1 second
        
        if (age > maxAge) return false;

        // Calculate opacity based on position in trail and age
        const positionFactor = 1 - (index / trailLength);
        const ageFactor = 1 - (age / maxAge);
        point.opacity = positionFactor * ageFactor * 0.8;
        
        // Calculate size with slight variation
        point.size = particleSize * (0.5 + positionFactor * 0.5);

        // Draw particle with glow effect
        if (point.opacity > 0.01) {
          ctx.save();
          
          // Create gradient for glow
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, point.size * 3 * glowIntensity
          );
          
          // Use purple hue to match VelocitAI brand
          const hue = 270; // Purple hue
          
          gradient.addColorStop(0, `hsla(${hue % 360}, 70%, 60%, ${point.opacity})`);
          gradient.addColorStop(0.5, `hsla(${hue % 360}, 70%, 50%, ${point.opacity * 0.6})`);
          gradient.addColorStop(1, `hsla(${hue % 360}, 70%, 40%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.globalCompositeOperation = 'screen';
          
          // Draw main particle
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw intense center
          ctx.globalAlpha = point.opacity;
          ctx.fillStyle = `hsl(${hue % 360}, 80%, 70%)`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }

        return true;
      });

      // Draw connections between trail points
      if (trailRef.current.length > 1) {
        for (let i = 0; i < trailRef.current.length - 1; i++) {
          const current = trailRef.current[i];
          const next = trailRef.current[i + 1];
          const distance = Math.sqrt(
            Math.pow(current.x - next.x, 2) + Math.pow(current.y - next.y, 2)
          );
          
          if (distance < 50) { // Only connect close points
            ctx.save();
            ctx.globalAlpha = Math.min(current.opacity, next.opacity) * 0.4;
            ctx.strokeStyle = '#8B5CF6';
            ctx.lineWidth = 1;
            ctx.globalCompositeOperation = 'screen';
            
            ctx.beginPath();
            ctx.moveTo(current.x, current.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
            
            ctx.restore();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trailLength, particleSize, glowIntensity, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{ 
        mixBlendMode: 'screen',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
}