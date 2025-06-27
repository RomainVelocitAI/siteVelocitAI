import React, { useCallback, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const { isDark } = useTheme();

  const createParticle = useCallback((x?: number, y?: number): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    return {
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 300 + 200,
    };
  }, []);

  const initParticles = useCallback(() => {
    particlesRef.current = Array.from({ length: 50 }, () => createParticle());
  }, [createParticle]);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = particlesRef.current.map(particle => {
      // Mise à jour position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Rebond sur les bords
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      // Fade out en fin de vie
      if (particle.life > particle.maxLife * 0.8) {
        particle.opacity = Math.max(0, particle.opacity - 0.01);
      }

      return particle;
    }).filter(particle => particle.life < particle.maxLife);

    // Ajouter de nouvelles particules
    while (particlesRef.current.length < 50) {
      particlesRef.current.push(createParticle());
    }
  }, [createParticle]);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les particules
    particlesRef.current.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      
      // Couleur selon le thème
      const baseColor = isDark ? '147, 197, 253' : '139, 92, 246'; // blue-300 ou purple-500
      ctx.fillStyle = `rgba(${baseColor}, ${particle.opacity})`;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Effet de lueur
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${baseColor}, 0.5)`;
      ctx.fill();
      
      ctx.restore();
    });

    // Dessiner les connexions entre particules proches
    particlesRef.current.forEach((particle, i) => {
      particlesRef.current.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.save();
          const opacity = Math.max(0, (100 - distance) / 100 * 0.1);
          ctx.globalAlpha = opacity;
          
          const lineColor = isDark ? '147, 197, 253' : '139, 92, 246';
          ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
          ctx.lineWidth = 0.5;
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    });
  }, [isDark]);

  const animate = useCallback(() => {
    updateParticles();
    drawParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [resizeCanvas, initParticles, animate]);

  // Redessiner quand le thème change
  useEffect(() => {
    drawParticles();
  }, [isDark, drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};