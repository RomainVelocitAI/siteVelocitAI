import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from './Icons';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  icon?: keyof typeof Icons;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button'
}) => {
  const IconComponent = icon ? Icons[icon] : null;
  
  const baseClasses = `
    relative overflow-hidden font-heading font-semibold
    transition-all duration-300 transform-gpu
    flex items-center justify-center gap-3
    ${fullWidth ? 'w-full' : 'inline-flex'}
    ${disabled || loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
  `;
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl'
  };
  
  const variantClasses = {
    primary: `
      bg-gradient-premium text-white shadow-lg
      hover:shadow-premium hover:-translate-y-0.5
      active:translate-y-0 active:scale-[0.98]
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-white/20 before:to-transparent
      before:-translate-x-full before:transition-transform before:duration-700
      hover:before:translate-x-full
    `,
    secondary: `
      bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg
      hover:shadow-xl hover:-translate-y-0.5
      active:translate-y-0 active:scale-[0.98]
    `,
    outline: `
      bg-transparent border-2 border-primary-500 text-primary-500
      hover:bg-primary-500 hover:text-white hover:shadow-lg
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-primary-500
      hover:bg-primary-500/10 hover:text-primary-600
      active:scale-[0.98]
    `
  };
  
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;
  
  const content = (
    <>
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </motion.div>
      )}
      
      <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : ''}`}>
        {icon && iconPosition === 'left' && IconComponent && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <IconComponent size={size === 'sm' ? 16 : size === 'xl' ? 24 : 20} />
          </motion.div>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && IconComponent && (
          <motion.div
            initial={{ x: -5 }}
            animate={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <IconComponent size={size === 'sm' ? 16 : size === 'xl' ? 24 : 20} />
          </motion.div>
        )}
      </span>
    </>
  );
  
  const MotionComponent = motion[href ? 'a' : 'button'];
  
  return (
    <MotionComponent
      className={combinedClasses}
      href={href}
      onClick={onClick}
      disabled={disabled || loading}
      type={!href ? type : undefined}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </MotionComponent>
  );
};

export default Button;