import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type AnimationProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
};

// Animation de fondu avec montée
export const FadeInUp: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  className = '',
  once = true,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animation de fondu avec zoom
export const FadeInScale: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  className = '',
  once = true,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once }}
    transition={{
      duration: 0.6,
      delay,
      ease: "easeOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animation de fondu latéral
export const FadeInSide: React.FC<AnimationProps & { direction?: 'left' | 'right' }> = ({
  children,
  delay = 0,
  className = '',
  direction = 'left',
  once = true,
}) => {
  const x = direction === 'left' ? -40 : 40;
  
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animation de fondu avec rotation
export const FadeInRotate: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  className = '',
  once = true,
}) => (
  <motion.div
    initial={{ opacity: 0, rotate: -5 }}
    whileInView={{ opacity: 1, rotate: 0 }}
    viewport={{ once }}
    transition={{
      duration: 0.6,
      delay,
      ease: "easeOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Composant de parallaxe
export const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}: { 
  children: ReactNode; 
  speed?: number; 
  className?: string 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.section 
      ref={ref} 
      style={{ y }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Composant pour la grille de galerie
export const GridGallery = ({ 
  items,
  className = ''
}: { 
  items: Array<{ id: string | number; image: string; title: string; description: string }>;
  className?: string;
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="relative rounded-xl overflow-hidden group h-64"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          whileHover={{ 
            y: -10,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
            <div>
              <h3 className="text-white text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-200 mt-1">{item.description}</p>
            </div>
          </div>
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
      ))}
    </div>
  );
};

// Composant pour la timeline
export const Timeline = ({ 
  items,
  className = ''
}: { 
  items: Array<{ id: string | number; year: string; title: string; description: string }>;
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Ligne de la timeline */}
      <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600 transform -translate-x-1/2" />
      
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="relative mb-16"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="w-1/2 px-6">
              <div className={`p-6 bg-white rounded-lg shadow-lg ${
                index % 2 === 0 ? 'text-right' : 'text-left'
              }`}>
                <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-2">
                  {item.year}
                </span>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white shadow-lg" />
            </div>
            <div className="w-1/2"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Animation d'apparition séquentielle
export const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        }
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
