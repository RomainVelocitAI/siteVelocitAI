import React from 'react';

// Interface commune pour toutes les icônes
interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Icône Rocket pour remplacer 🚀
export const RocketIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M9.5 14.5L4.5 19.5M14.5 9.5L19.5 4.5M4.5 19.5L3 21L3 18L4.5 19.5ZM19.5 4.5L21 3L18 3L19.5 4.5Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M15 9C15 9 13.5 3 7.5 3C7.5 3 7.5 7.5 9 10.5L10.5 12L12 13.5C15 15 19.5 15 19.5 15C19.5 9 15 9 15 9Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="10.5" cy="10.5" r="1.5" stroke={color} strokeWidth="2"/>
  </svg>
);

// Icône Performance (graphique ascendant)
export const PerformanceIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 12L7 8L11 10L15 4L21 10" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 4H21V9" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 20H21" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Icône Automation (engrenages)
export const AutomationIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path 
      d="M12 1V6M12 18V23M4.22 4.22L7.76 7.76M16.24 16.24L19.78 19.78M1 12H6M18 12H23M4.22 19.78L7.76 16.24M16.24 7.76L19.78 4.22" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Icône AI (circuit neural)
export const AIIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="12" r="2" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="5" r="2" stroke={color} strokeWidth="2"/>
    <circle cx="19" cy="12" r="2" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="19" r="2" stroke={color} strokeWidth="2"/>
    <path 
      d="M6.7 10.3L10.3 6.7M13.7 6.7L17.3 10.3M17.3 13.7L13.7 17.3M10.3 17.3L6.7 13.7" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Icône Growth (courbe exponentielle)
export const GrowthIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 20C3 20 6 16 9 16C12 16 13 18 16 18C19 18 21 14 21 14V4" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M15 4H21V10" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Security (bouclier)
export const SecurityIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L4 7V12C4 16.5 7 20.3 12 21C17 20.3 20 16.5 20 12V7L12 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 11L11 13L15 9" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Innovation (ampoule géométrique)
export const InnovationIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2C15.31 2 18 4.69 18 8C18 10.1 16.98 11.94 15.42 13.06C15.15 13.26 15 13.57 15 13.89V15C15 15.55 14.55 16 14 16H10C9.45 16 9 15.55 9 15V13.89C9 13.57 8.85 13.26 8.58 13.06C7.02 11.94 6 10.1 6 8C6 4.69 8.69 2 12 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 20H15M10 16V18M14 16V18M12 2V4" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Icône Arrow Right
export const ArrowRightIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 12H19M19 12L13 6M19 12L13 18" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Check élégante
export const CheckIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 13L9 17L19 7" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Star (pour ratings)
export const StarIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor", filled = false }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? color : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Analytics
export const AnalyticsIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="12" width="4" height="9" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <rect x="10" y="5" width="4" height="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <rect x="17" y="8" width="4" height="13" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône Clock
export const ClockIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
    <path 
      d="M12 6V12L16 14" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Icône Target
export const TargetIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
  </svg>
);

// Icône Chart (graphique)
export const ChartIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 3V21H21" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18 9L14 13L10 9L6 13" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Lightning (éclair)
export const LightningIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Settings (engrenage)
export const SettingsIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path 
      d="M12 1V3M12 21V23M4.2 4.2L5.6 5.6M18.4 18.4L19.8 19.8M1 12H3M21 12H23M4.2 19.8L5.6 18.4M18.4 5.6L19.8 4.2" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Icône Robot (robot)
export const RobotIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="8" width="16" height="12" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="8" y="12" width="2" height="2" fill={color}/>
    <rect x="14" y="12" width="2" height="2" fill={color}/>
    <path d="M8 17H16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 8V5M12 5C13.1046 5 14 4.10457 14 3C14 1.89543 13.1046 1 12 1C10.8954 1 10 1.89543 10 3C10 4.10457 10.8954 5 12 5Z" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M1 12H4M20 12H23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône Money (argent)
export const MoneyIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path d="M6 5V19M18 5V19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône Home (maison)
export const HomeIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Phone (téléphone)
export const PhoneIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09501 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Calculator (calculatrice)
export const CalculatorIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="8" y="6" width="8" height="4" stroke={color} strokeWidth="2"/>
    <circle cx="8" cy="14" r="1" fill={color}/>
    <circle cx="12" cy="14" r="1" fill={color}/>
    <circle cx="16" cy="14" r="1" fill={color}/>
    <circle cx="8" cy="18" r="1" fill={color}/>
    <circle cx="12" cy="18" r="1" fill={color}/>
    <circle cx="16" cy="18" r="1" fill={color}/>
  </svg>
);

// Icône LightBulb (ampoule)
export const LightBulbIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2C15.866 2 19 5.134 19 9C19 11.419 17.813 13.573 16 14.868V17C16 17.552 15.552 18 15 18H9C8.448 18 8 17.552 8 17V14.868C6.187 13.573 5 11.419 5 9C5 5.134 8.134 2 12 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M9 21H15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 18V21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 18V21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône Plane (avion)
export const PlaneIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M21 16V8C21 6.895 20.105 6 19 6L14 6L12 2L10 6L5 6C3.895 6 3 6.895 3 8V16L8 13.5V19L6 20.5V22L12 20L18 22V20.5L16 19V13.5L21 16Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Sparkle (étoile brillante)
export const SparkleIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L13.09 8.26L19 7L15.45 11.82L19 16.64L13.09 15.38L12 22L10.91 15.38L5 16.64L8.55 11.82L5 7L10.91 8.26L12 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Calendar (calendrier)
export const CalendarIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 10H21" stroke={color} strokeWidth="2"/>
    <path d="M8 14H16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 18H12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône Users (utilisateurs)
export const UsersIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M17 21V19C17 17.895 16.105 17 15 17H9C7.895 17 7 17.895 7 19V21" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="12" cy="11" r="3" stroke={color} strokeWidth="2"/>
    <path 
      d="M21 21V19C21 17.636 20.185 16.463 19 15.874" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M16 7.874C17.185 8.463 18 9.636 18 11C18 12.364 17.185 13.537 16 14.126" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M3 21V19C3 17.636 3.815 16.463 5 15.874" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M8 7.874C6.815 8.463 6 9.636 6 11C6 12.364 6.815 13.537 8 14.126" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Icône Palette (palette de couleurs)
export const PaletteIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C12.55 22 13 21.55 13 21C13 20.72 12.89 20.47 12.71 20.29C12.53 20.11 12.28 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 13.04 19.79 14.04 19.4 14.96C19.21 15.4 18.71 15.64 18.24 15.48C17.78 15.32 17.52 14.82 17.68 14.36C17.89 13.75 18 13.1 18 12.45C18 12.2 17.8 12 17.55 12H17C16.45 12 16 12.45 16 13C16 14.1 15.1 15 14 15C12.9 15 12 14.1 12 13C12 11.9 12.9 11 14 11H17.55C18.9 11 20 12.1 20 13.45C20 13.81 19.94 14.17 19.83 14.5C19.46 15.66 18.44 16.5 17.24 16.5C16.59 16.5 15.98 16.3 15.48 15.96C14.84 17.16 13.55 18 12 18C10.34 18 9 16.66 9 15C9 13.34 10.34 12 12 12" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="6.5" cy="12" r="1.5" fill={color}/>
    <circle cx="9.5" cy="7" r="1.5" fill={color}/>
    <circle cx="14.5" cy="7" r="1.5" fill={color}/>
    <circle cx="17.5" cy="12" r="1.5" fill={color}/>
  </svg>
);

// Icône Celebration (célébration)
export const CelebrationIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M2 22L8 16L6 10L12 4L11 11L17 17L10 16L4 22" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M14 2L14.5 4.5L17 4L16.5 6.5L19 7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 8L19.5 10.5L22 11L21.5 13.5L24 14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 18L7.5 20.5L10 21L9.5 23.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône TrendingUp (tendance croissante)
export const TrendingUpIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M23 6L13.5 15.5L8.5 10.5L1 18" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M17 6H23V12" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône MailBox (boîte aux lettres)
export const MailBoxIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 8H19C20.6569 8 22 9.34315 22 11V16C22 17.6569 20.6569 19 19 19H5C3.34315 19 2 17.6569 2 16V11C2 9.34315 3.34315 8 5 8Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M22 12L13.5 16L5 12" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M11 19V22M13 19V22" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M16 8V5C16 4.44772 15.5523 4 15 4H9C8.44772 4 8 4.44772 8 5V8" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Icône Package (paquet)
export const PackageIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M16.5 9.4L7.5 4.21" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M21 16V8C20.9996 7.6493 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.6493 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3.27 6.96L12 12.01L20.73 6.96" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 22.08V12" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône Document (document)
export const DocumentIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M14 2V8H20" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M16 13H8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 17H8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 9H9H8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône Alert (alerte)
export const AlertIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55102 19.3437 1.64152 19.6871 1.81442 19.9905C1.98733 20.2939 2.23673 20.5467 2.53772 20.7238C2.83871 20.901 3.1808 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7238C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M12 9V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="17" r="1" fill={color}/>
  </svg>
);

// Icône Chat (conversation)
export const ChatIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 16H12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône MoneyFlying (argent qui s'envole)
export const MoneyFlyingIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="8" width="20" height="10" rx="2" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="13" r="2" stroke={color} strokeWidth="2"/>
    <path d="M6 8V6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6V8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 5V3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 18L19 20M19 20L21 18M19 20V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 18L5 20M5 20L3 18M5 20V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Export groupé pour faciliter l'import
export const Icons = {
  Rocket: RocketIcon,
  Performance: PerformanceIcon,
  Automation: AutomationIcon,
  AI: AIIcon,
  Growth: GrowthIcon,
  Security: SecurityIcon,
  Innovation: InnovationIcon,
  ArrowRight: ArrowRightIcon,
  Check: CheckIcon,
  Star: StarIcon,
  Analytics: AnalyticsIcon,
  Clock: ClockIcon,
  Target: TargetIcon,
  Chart: ChartIcon,
  Lightning: LightningIcon,
  Settings: SettingsIcon,
  Robot: RobotIcon,
  Money: MoneyIcon,
  Home: HomeIcon,
  Phone: PhoneIcon,
  Calculator: CalculatorIcon,
  LightBulb: LightBulbIcon,
  Plane: PlaneIcon,
  Sparkle: SparkleIcon,
  Calendar: CalendarIcon,
  Users: UsersIcon,
  Palette: PaletteIcon,
  Celebration: CelebrationIcon,
  TrendingUp: TrendingUpIcon,
  MailBox: MailBoxIcon,
  Package: PackageIcon,
  Document: DocumentIcon,
  Alert: AlertIcon,
  Chat: ChatIcon,
  MoneyFlying: MoneyFlyingIcon
};