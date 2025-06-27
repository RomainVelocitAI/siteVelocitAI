import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  lines?: number;
}

const SkeletonLoader = ({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  variant = 'rectangular',
  lines = 1
}: SkeletonLoaderProps) => {
  const shimmer = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear' as const
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded-md';
      default:
        return 'rounded-lg';
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`bg-gray-200 h-4 ${getVariantStyles()} overflow-hidden relative`}
            style={{
              width: index === lines - 1 ? '75%' : '100%'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
              {...shimmer}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-200 ${getVariantStyles()} overflow-hidden relative ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
        {...shimmer}
      />
    </div>
  );
};

export default SkeletonLoader;