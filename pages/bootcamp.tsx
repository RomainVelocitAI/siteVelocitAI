import Head from 'next/head';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Composant Floating Particles pour ambiance IA
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{
            y: [-20, -window.innerHeight * 0.1],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Hook pour effet typewriter
const useTypewriter = (text: string, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

// Hook pour counter animé
const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
        setIsAnimating(false);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
  };

  return { count, startAnimation };
};

// Hook pour countdown timer dynamique
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// Composant Countdown Timer avec animations
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const TimeUnit = ({ value, label, color = "text-red-400" }: { value: number; label: string; color?: string }) => (
    <motion.div 
      className="text-center"
      animate={{ 
        scale: value === 0 ? [1, 1.1, 1] : [1, 1.05, 1],
      }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      <motion.div 
        className={`text-4xl md:text-5xl font-black ${color} mb-2`}
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div className="text-sm text-gray-400 uppercase tracking-wide">{label}</div>
    </motion.div>
  );

  return (
    <motion.div 
      className="flex justify-center items-center space-x-8 bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <TimeUnit value={days} label="JOURS" color="text-red-400" />
      <motion.div 
        className="text-2xl text-red-400"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        :
      </motion.div>
      <TimeUnit value={hours} label="HEURES" color="text-orange-400" />
      <motion.div 
        className="text-2xl text-orange-400"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      >
        :
      </motion.div>
      <TimeUnit value={minutes} label="MINUTES" color="text-yellow-400" />
      <motion.div 
        className="text-2xl text-yellow-400"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 1 }}
      >
        :
      </motion.div>
      <TimeUnit value={seconds} label="SECONDES" color="text-green-400" />
    </motion.div>
  );
};

// Composant FAQ avec smooth expand
const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"
        animate={{
          opacity: isOpen ? [0.1, 0.3, 0.1] : 0.1,
          scale: isOpen ? [1, 1.02, 1] : 1,
        }}
        transition={{ duration: 2, repeat: isOpen ? Infinity : 0 }}
      />
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
        <motion.button
          className="w-full p-6 text-left focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-yellow-400 font-bold text-lg pr-4">{question}</h4>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-yellow-400 text-2xl"
            >
              ▼
            </motion.div>
          </div>
        </motion.button>
        
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6">
            <motion.p
              className="text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
              transition={{ duration: 0.3, delay: isOpen ? 0.1 : 0 }}
            >
              {answer}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Composant StatsCard avec animation de compteur
const StatsCard = ({ targetValue, suffix, title, subtitle, color, delay }: {
  targetValue: number;
  suffix: string;
  title: string;
  subtitle: string;
  color: 'blue' | 'green' | 'orange';
  delay: number;
}) => {
  const { count, startAnimation } = useCountUp(targetValue, 2000);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      setTimeout(() => {
        startAnimation();
      }, delay * 1000);
    }
  }, [isInView, isVisible, startAnimation, delay]);

  const colorClasses = {
    blue: {
      gradient: 'from-blue-500/20 to-purple-500/20',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/50'
    },
    green: {
      gradient: 'from-green-500/20 to-yellow-500/20',
      text: 'text-green-400',
      glow: 'shadow-green-500/50'
    },
    orange: {
      gradient: 'from-orange-500/20 to-red-500/20',
      text: 'text-orange-400',
      glow: 'shadow-orange-500/50'
    }
  };

  const colorClass = colorClasses[color];
  const formatNumber = (num: number) => {
    if (targetValue >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + ' K';
    }
    return num.toString();
  };

  return (
    <motion.div 
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${colorClass.gradient} rounded-2xl blur-lg`}
          animate={{ 
            opacity: isVisible ? [0.5, 1, 0.5] : 0.5,
            scale: isVisible ? [1, 1.05, 1] : 1 
          }}
          transition={{ 
            duration: 2, 
            repeat: isVisible ? Infinity : 0,
            delay: delay + 0.5 
          }}
        />
        <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
          <motion.div 
            className={`text-4xl font-black ${colorClass.text} mb-2`}
            animate={{ 
              textShadow: isVisible ? [
                '0 0 0px currentColor',
                '0 0 20px currentColor',
                '0 0 0px currentColor'
              ] : '0 0 0px currentColor'
            }}
            transition={{ 
              duration: 1.5, 
              repeat: isVisible ? Infinity : 0,
              delay: delay + 1
            }}
          >
            {targetValue >= 1000 ? formatNumber(count) : count}{suffix}
          </motion.div>
          <p className="text-white font-semibold">{title}</p>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Composant CTA Magnétique
const MagneticCTA = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;
    setMousePosition({ x, y });
  };

  return (
    <motion.button
      className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-700 rounded-2xl text-white font-bold text-xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 1.05 : 1,
      }}
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.5)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <span className="relative z-10">JE VEUX MES AGENTS IA</span>
      
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovering ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Particles sur hover */}
      {isHovering && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * 200,
                y: Math.random() * 80,
                opacity: 0 
              }}
              animate={{
                x: Math.random() * 300,
                y: Math.random() * 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
};

export default function BootcampPage() {
  const titleText = useTypewriter("CRÉE TES", 80);
  
  return (
    <>
      <Head>
        <title>Bootcamp Agents IA - La Réunion | VelocitAI</title>
        <meta 
          name="description" 
          content="Crée tes 3 agents IA en 1 weekend : Prospection, Administratif, Community Manager. 15 places max. Formation pratique à La Réunion." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section avec animations premium */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Floating Particles Background */}
        <FloatingParticles />
        
        {/* Background Effects Animés */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Urgence Badge Pulsant */}
            <motion.div 
              className="mb-6 inline-flex items-center px-6 py-3 rounded-full bg-red-600/20 backdrop-blur-sm border border-red-400/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                className="text-red-300 font-semibold"
                animate={{ 
                  textShadow: [
                    "0 0 0px #ef4444",
                    "0 0 8px #ef4444", 
                    "0 0 0px #ef4444"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥 DERNIÈRES PLACES - Prochaine session dans 3 semaines
              </motion.span>
            </motion.div>

            {/* Main Headline avec Staggered Animation */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="block bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {titleText}
              </motion.span>
              
              <motion.span 
                className="block text-yellow-400 mb-2"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                AGENTS IA
              </motion.span>
              
              <motion.span 
                className="block text-3xl md:text-4xl lg:text-5xl text-gray-300"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                en 1 weekend
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div 
              className="text-2xl md:text-3xl text-gray-300 mb-12 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <p>Construis tes <span className="text-green-400 font-bold">assistants virtuels</span> personnalisés</p>
              <p className="text-yellow-400 font-bold">15 places • La Réunion • 100% Pratique</p>
            </motion.div>

            {/* Pain Point avec Scroll Trigger */}
            <motion.div 
              className="max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  >
                    Tu aimerais avoir des employés qui...
                  </motion.h2>
                  
                  <div className="text-xl md:text-2xl text-gray-300 space-y-4">
                    {[
                      'Travaillent 24h/24, 7j/7 sans jamais se plaindre,',
                      'Ne prennent jamais de congés ni d\'arrêt maladie,',
                      'Et ne te coûtent que quelques euros par mois ?',
                      'Ces employés existent. Ce sont des agents IA.'
                    ].map((text, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.5 + (index * 0.3) }}
                        className={index === 3 ? "text-orange-400 font-semibold text-2xl" : ""}
                      >
                        {index === 0 && <>Travaillent <span className="text-green-400 font-bold">24h/24, 7j/7</span> sans jamais se plaindre,</>}
                        {index === 1 && <>Ne prennent <span className="text-blue-400 font-bold">jamais de congés</span> ni d'arrêt maladie,</>}
                        {index === 2 && <>Et ne te coûtent <span className="text-yellow-400 font-bold">que quelques euros par mois</span> ?</>}
                        {index === 3 && text}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Principal Magnétique */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 3.8 }}
            >
              <MagneticCTA />
              <motion.p 
                className="text-gray-400"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👇 Découvre quels agents tu vas créer ce weekend
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator animé */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Section 2: Nouvelle Réalité avec animations scroll-trigger */}
      <div className="relative bg-slate-900 overflow-hidden">
        {/* Diagonal separator */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-purple-900 to-slate-900 transform -skew-y-2 origin-top-left"></div>
        
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header avec reveal */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-black text-white mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                Le monde a basculé.
                <motion.span 
                  className="block text-red-400 mt-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Silencieusement.
                </motion.span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Pendant que tu lis ça, la révolution industrielle 4.0 redéfinit les règles du jeu économique
              </motion.p>
            </motion.div>

            {/* Transformation Timeline avec contraste dramatique */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              {/* HIER - Animation slide from left */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20">
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-4xl font-black text-red-400">HIER</span>
                  </motion.div>
                  <div className="space-y-6">
                    {['Plus d\'employés = Plus de résultats', 'Travail manuel obligatoire', 'Scaling = Embaucher', 'Temps de réponse en heures'].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (index * 0.2), duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-3 h-3 bg-red-400 rounded-full mr-4 flex-shrink-0"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 1 + (index * 0.2), duration: 0.3 }}
                          viewport={{ once: true }}
                        />
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* AUJOURD'HUI - Animation slide from right */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20">
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-4xl font-black text-green-400">AUJOURD&apos;HUI</span>
                  </motion.div>
                  <div className="space-y-6">
                    {['Plus d\'IA = Plus de résultats', 'Automatisation intelligente', 'Scaling = Optimiser l\'IA', 'Temps de réponse en secondes'].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + (index * 0.2), duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-3 h-3 bg-green-400 rounded-full mr-4 flex-shrink-0"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 1.2 + (index * 0.2), duration: 0.3 }}
                          viewport={{ once: true }}
                        />
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Exemples d'agents avec reveal */}
            <motion.div 
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">Exemples d&apos;agents que tu VAS créer</h3>
              <p className="text-xl text-gray-300">Selon TES besoins spécifiques et TON secteur</p>
            </motion.div>

            {/* Cards avec staggered animation */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                { 
                  icon: '📞', 
                  title: 'Agent Prospection', 
                  desc: 'Si tu as besoin de plus de clients',
                  features: ['Recherche de prospects', 'Messages d\'approche', 'Qualification des leads'] 
                },
                { 
                  icon: '📋', 
                  title: 'Agent Administratif', 
                  desc: 'Si tu croules sous la paperasse',
                  features: ['Gestion documents', 'Suivi client automatique', 'Relances et rappels'] 
                },
                { 
                  icon: '📱', 
                  title: 'Agent Communication', 
                  desc: 'Si tu n\'as pas le temps pour les réseaux',
                  features: ['Contenu sur mesure', 'Réponses aux messages', 'Planning publications'] 
                }
              ].map((agent, index) => (
                <motion.div 
                  key={index} 
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl"
                      whileHover={{ scale: 1.05, opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-white/10 group-hover:border-purple-400/30 transition-all duration-300">
                      <motion.div 
                        className="text-5xl mb-4 text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + (index * 0.2), duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        {agent.icon}
                      </motion.div>
                      <h3 className="text-white font-bold text-lg mb-3 text-center">{agent.title}</h3>
                      <p className="text-yellow-400 text-sm mb-4 text-center font-semibold">{agent.desc}</p>
                      <div className="space-y-2">
                        {agent.features.map((feature, idx) => (
                          <motion.p 
                            key={idx} 
                            className="text-blue-300 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (index * 0.2) + (idx * 0.1), duration: 0.3 }}
                            viewport={{ once: true }}
                          >
                            ✓ {feature}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ce que tu vas vraiment apprendre */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative max-w-4xl mx-auto">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <motion.h3 
                    className="text-3xl text-yellow-400 font-bold mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    En 2 jours, tu repartiras avec la capacité de :
                  </motion.h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3">
                      {[
                        { emoji: '🧠', text: 'Créer des agents IA', desc: 'sur mesure pour TON business' },
                        { emoji: '🔧', text: 'Maîtriser les outils', desc: 'et plateformes no-code' },
                        { emoji: '📋', text: 'Connecter tes systèmes', desc: 'existants aux agents' }
                      ].map((item, index) => (
                        <motion.p 
                          key={index}
                          className="text-lg text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + (index * 0.2), duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <motion.span
                            className="inline-block mr-2"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.emoji}
                          </motion.span>
                          <span className="text-white font-semibold">{item.text}</span> {item.desc}
                        </motion.p>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {[
                        { emoji: '🎯', text: 'Identifier quelles tâches', desc: 'automatiser en priorité' },
                        { emoji: '💬', text: 'Améliorer et optimiser', desc: 'tes agents dans le temps' },
                        { emoji: '🔧', text: 'Résoudre les problèmes', desc: 'techniques de base' }
                      ].map((item, index) => (
                        <motion.p 
                          key={index}
                          className="text-lg text-gray-300"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (index * 0.2), duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <motion.span
                            className="inline-block mr-2"
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.emoji}
                          </motion.span>
                          <span className="text-white font-semibold">{item.text}</span> {item.desc}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                  
                  <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-xl text-orange-400 font-bold">+ Suivi personnalisé pendant 1 mois pour que ça marche vraiment</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: Qui suis-je avec animations trust-building */}
      <div className="relative bg-gradient-to-br from-slate-800 to-purple-900 overflow-hidden">
        {/* Diagonal separator */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-slate-900 transform skew-y-2 origin-top-right"></div>
        
        {/* Background effects animés */}
        <motion.div 
          className="absolute top-32 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header avec empathie */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-black text-white mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Qui suis-je ?
              </motion.h2>
              <motion.p 
                className="text-2xl text-purple-400 font-bold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Tu as le droit de savoir à qui tu fais confiance...
              </motion.p>
            </motion.div>

            {/* Profile section avec révélations progressives */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              {/* Photo/Avatar side avec glow effect */}
              <motion.div 
                className="lg:order-1 text-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative inline-block">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-orange-500/30 rounded-full blur-2xl scale-110"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1.1, 1.2, 1.1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div 
                    className="relative w-64 h-64 mx-auto rounded-full border-4 border-purple-400/30 overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src="/images/profil_romain.png" 
                      alt="Romain CANO - Expert Automatisation IA"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl font-bold text-white mb-2">Romain CANO</h3>
                  <p className="text-xl text-purple-400 font-semibold">Architecte en Solutions d&apos;Automatisation</p>
                  <p className="text-lg text-gray-300 mt-2">La Réunion 🇷🇪</p>
                </motion.div>
              </motion.div>

              {/* Story side avec highlighting progressif */}
              <motion.div 
                className="lg:order-2"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-3xl blur-xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Mon histoire
                    </motion.h3>
                    <div className="space-y-4 text-gray-300">
                      <motion.p 
                        className="text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        Il y a <span className="text-yellow-400 font-semibold">10 ans</span>, j&apos;étais simple pizzaiolo <span className="text-blue-400 font-semibold">sans diplôme</span>. J&apos;ai réussi à ouvrir plusieurs points de vente, mais avec <span className="text-green-400 font-semibold">40 employés</span>... je passais ma vie à gérer l&apos;<span className="text-red-400 font-semibold">administratif, la comptabilité et le SAV</span>. J&apos;étais prisonnier de mon succès.
                      </motion.p>
                      <motion.p 
                        className="text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        Puis j&apos;ai découvert le pouvoir de l&apos;automatisation et j&apos;ai <span className="text-green-400 font-semibold">100% automatisé</span> toutes les tâches de mes pizzerias.
                      </motion.p>
                      <motion.p 
                        className="text-lg leading-relaxed text-purple-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        Depuis 2020, j&apos;accompagne les entreprises qui veulent <span className="text-orange-400 font-bold">briser leur plafond de verre</span> en mettant en place des écosystèmes IA qui boostent productivité et rentabilité.
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats/Credentials avec animations de compteurs */}
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <StatsCard
                targetValue={5}
                suffix=" ans"
                title="D'expérience terrain"
                subtitle="Depuis 2020, j'automatise"
                color="blue"
                delay={0.2}
              />
              
              <StatsCard
                targetValue={48}
                suffix=""
                title="Entreprises accompagnées"
                subtitle="Résultats concrets mesurés"
                color="green"
                delay={0.4}
              />
              
              <StatsCard
                targetValue={12000}
                suffix="h"
                title="Heures économisées"
                subtitle="Pour mes clients au total"
                color="orange"
                delay={0.6}
              />
            </motion.div>

            {/* Why me section */}
            <div className="text-center">
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    🤖 Pourquoi des agents IA ?
                  </h3>
                  <div className="space-y-4 text-xl text-gray-300">
                    <p>
                      <span className="text-purple-400 font-bold">Prospection</span> - Tu n&apos;as pas le temps de chercher des clients
                    </p>
                    <p>
                      <span className="text-blue-400 font-bold">Administratif</span> - Devis, factures, relances... ça te bouffe la vie
                    </p>
                    <p>
                      <span className="text-green-400 font-bold">Communication</span> - Réseaux sociaux, newsletters... toujours en retard
                    </p>
                    <p>
                      <span className="text-orange-400 font-bold">Suivi client</span> - Tu perds le fil avec tes prospects
                    </p>
                    <p>
                      <span className="text-yellow-400 font-bold">Répétitif</span> - Mêmes questions, mêmes réponses, encore et encore
                    </p>
                  </div>
                  <div className="mt-8 text-2xl font-bold text-white">
                    Tes agents IA vont s&apos;occuper de tout ça.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3.5: Pourquoi ce bootcamp ? - Design transparent */}
      <div className="relative bg-gradient-to-br from-gray-900 to-slate-800 overflow-hidden">
        {/* Diagonal separator */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-purple-900 transform -skew-y-2 origin-top-left"></div>
        
        {/* Background effects */}
        <div className="absolute top-32 right-32 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Tu dois te demander...
              </h2>
              <p className="text-2xl text-yellow-400 font-bold">
                "Attends... Si t'es si fort en automatisation, pourquoi tu partages tes secrets ?"
              </p>
            </div>

            {/* Réponse honnête en une seule section fluide */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                <h3 className="text-3xl font-bold text-center text-white mb-8">Excellente question. Voici la vraie raison :</h3>
                
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    Oui, j&apos;automatise des <span className="text-green-400 font-semibold">grosses boîtes</span> pour 5000€+ parce qu&apos;elles ont des besoins complexes qui justifient ce tarif. Mais tu sais quoi ? <span className="text-yellow-400 font-semibold">90% de mes contacts</span> sont des artisans, indépendants, petites entreprises comme toi.
                  </p>
                  
                  <p>
                    Ils m&apos;appellent, ils savent que l&apos;IA c&apos;est <span className="text-blue-400 font-semibold">l&apos;avenir</span>, mais ils n&apos;ont pas besoin d&apos;une automatisation à 5K€. Ils ont juste besoin de <span className="text-orange-400 font-semibold">gagner du temps sur leur quotidien</span> : prospects, admin, communication...
                  </p>
                  
                  <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20">
                    <p className="text-red-300 font-semibold text-xl mb-4">
                      Et moi, je sais ce que c&apos;est :
                    </p>
                    <p>
                      <span className="text-white font-bold">Bosser 7j/7, ne jamais pouvoir partir en vacances</span>, être prisonnier de son business. J&apos;ai vécu ça avec mes pizzerias. Cette prison, je ne la souhaite à personne.
                    </p>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                    <p className="text-green-300 font-semibold text-xl mb-4">
                      Alors j&apos;ai trouvé une solution :
                    </p>
                    <p>
                      Ce weekend, tout le monde y trouve son compte. <span className="text-white font-bold">Toi, tu apprends à créer tes agents IA pour 497€ au lieu de payer 5000€</span>. Moi, je partage cette passion incroyable qu&apos;est l&apos;automatisation avec des gens qui en ont vraiment besoin.
                    </p>
                  </div>
                  
                  <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
                    <p className="text-purple-300 font-semibold text-xl mb-4">
                      Parce que franchement ?
                    </p>
                    <p>
                      Même si je crache pas sur des contrats à 5000€ pour des boîtes dont le patron change de X6 chaque année et pour qui leur seul changement sera <span className="text-gray-400">une option en plus sur sa nouvelle bagnole</span>...
                    </p>
                    <p className="mt-4">
                      <span className="text-white font-bold">Je préfère boire une bière avec un mec qui me dit qu&apos;il passe 5h de plus avec ses gosses chaque semaine</span> et qu&apos;il a emmené sa femme en weekend <span className="text-green-400 font-bold">sans être vissé à son téléphone</span>.
                    </p>
                  </div>
                </div>
                
                <div className="mt-10 text-center">
                  <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                    <h4 className="text-2xl font-bold text-white mb-4">🔥 Pourquoi je fais ça vraiment</h4>
                    <p className="text-xl text-blue-300">
                      L&apos;IA et l&apos;automatisation, <span className="text-orange-400 font-bold">c&apos;est devenu ma passion</span> quand j&apos;ai compris le pouvoir que ça avait. <br />
                      Et cette passion, j&apos;adore la partager avec des gens qui vont vraiment s&apos;en servir pour vivre mieux.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Honnêteté - Design fluide avec animations */}
      <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
        {/* Background effects animés */}
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Header avec animation */}
            <motion.h2 
              className="text-5xl md:text-6xl font-black text-white mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Parlons franchement.
            </motion.h2>
            <motion.p 
              className="text-2xl text-blue-400 font-bold mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Voici exactement ce que tu peux attendre...
            </motion.p>

            {/* Attentes réalistes avec révélations staggerées */}
            <div className="space-y-8 mb-20">
              <motion.div 
                className="text-2xl text-red-400 font-bold"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 0px #f87171",
                      "0 0 10px #f87171",
                      "0 0 0px #f87171"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  NON, tu ne vas pas devenir expert en IA en un weekend.
                </motion.span>
              </motion.div>
              <motion.div 
                className="text-2xl text-red-400 font-bold"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 0px #f87171",
                      "0 0 10px #f87171",
                      "0 0 0px #f87171"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  NON, tes premiers agents ne seront pas parfaits dès le départ.
                </motion.span>
              </motion.div>
              <motion.div 
                className="text-2xl text-yellow-400 font-bold"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 0px #fbbf24",
                      "0 0 15px #fbbf24",
                      "0 0 0px #fbbf24"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
                >
                  Mais OUI, tu auras toutes les compétences pour créer et améliorer tes agents IA.
                </motion.span>
              </motion.div>
            </div>

            {/* CE QUE TU MAÎTRISERAS avec animations */}
            <motion.div 
              className="relative mb-20"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                <motion.h3 
                  className="text-4xl font-black text-white mb-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  CE QUE TU MAÎTRISERAS
                </motion.h3>
                
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-6">
                    {[
                      {
                        title: "Méthode de création d'agents IA",
                        desc: "Adaptable à n'importe quel besoin business",
                        color: "purple"
                      },
                      {
                        title: "Outils et plateformes no-code",
                        desc: "Pour créer sans programmer",
                        color: "purple"
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-purple-400 rounded-full mr-4 mt-3"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: 1 + (index * 0.5) 
                          }}
                        />
                        <div>
                          <p className="text-white font-semibold text-lg">{item.title}</p>
                          <p className="text-gray-400">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Connexion avec tes outils existants",
                        desc: "CRM, site web, réseaux sociaux, emails...",
                        color: "blue"
                      },
                      {
                        title: "Maintenance et optimisation",
                        desc: "Comment améliorer tes agents en continu",
                        color: "blue"
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-blue-400 rounded-full mr-4 mt-3"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: 1.5 + (index * 0.5) 
                          }}
                        />
                        <div>
                          <p className="text-white font-semibold text-lg">{item.title}</p>
                          <p className="text-gray-400">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transition vers le choix avec animation */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.p 
                className="text-2xl text-white font-bold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Avec ces compétences, tu vas pouvoir rejoindre l'un de ces 2 groupes...
              </motion.p>
              <motion.p 
                className="text-xl text-orange-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                À toi de choisir dans lequel tu veux être dans 6 mois :
              </motion.p>
            </motion.div>

            {/* Choix binaire horizontal avec split reveal */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              {/* Type 1 - Animation d'entrée depuis la gauche */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -100, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 h-full">
                  <motion.h4 
                    className="text-green-400 font-bold text-2xl mb-6 text-center"
                    animate={{
                      textShadow: [
                        "0 0 0px #4ade80",
                        "0 0 20px #4ade80",
                        "0 0 0px #4ade80"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    ✅ TYPE 1 : Les Adaptés
                  </motion.h4>
                  <div className="space-y-4">
                    {[
                      "→ Travaillent avec l'IA comme partenaire",
                      "→ Produisent 10x plus avec le même effort",
                      "→ Dominent leur marché local",
                      "→ Vivent la vie qu'ils voulaient"
                    ].map((text, index) => (
                      <motion.p 
                        key={index}
                        className="text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                        viewport={{ once: true }}
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Type 2 - Animation d'entrée depuis la droite */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 100, rotateY: 10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotateY: -2 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30 h-full">
                  <motion.h4 
                    className="text-red-400 font-bold text-2xl mb-6 text-center"
                    animate={{
                      textShadow: [
                        "0 0 0px #f87171",
                        "0 0 20px #f87171",
                        "0 0 0px #f87171"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    ❌ TYPE 2 : Les Oubliés
                  </motion.h4>
                  <div className="space-y-4">
                    {[
                      "→ Travaillent contre l'IA par ignorance",
                      "→ S'épuisent pour des résultats décroissants",
                      "→ Regardent leurs concurrents les dépasser",
                      "→ Regrettent de ne pas avoir agi"
                    ].map((text, index) => (
                      <motion.p 
                        key={index}
                        className="text-gray-300"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                        viewport={{ once: true }}
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="text-3xl font-bold text-white mb-20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 0px #ffffff",
                    "0 0 30px #ffffff",
                    "0 0 0px #ffffff"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              >
                Tu choisis quel camp ?
              </motion.span>
            </motion.div>

            {/* Proposition */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                <div className="text-center mb-12">
                  <h3 className="text-4xl font-black text-white mb-6">
                    Tu as le choix maintenant :
                  </h3>
                  <div className="text-2xl text-orange-400 font-bold mb-8">
                    Rester spectateur... ou devenir acteur de la révolution IA.
                  </div>
                </div>

                {/* Transformation promise */}
                <div className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-3xl p-10 mb-12 border border-purple-400/30">
                  <div className="text-center mb-8">
                    <h4 className="text-3xl font-bold text-white mb-4">
                      En 48h, tu passeras de zéro à opérationnel
                    </h4>
                    <p className="text-xl text-gray-300">
                      Samedi tu arrives les mains vides. Dimanche tu repars avec tes premiers agents IA qui tournent.
                    </p>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="bg-slate-800/50 rounded-2xl p-6 text-center">
                      <div className="text-5xl mb-4">💡</div>
                      <h5 className="text-white font-bold text-lg mb-3">SAMEDI MATIN</h5>
                      <p className="text-gray-300">Tu découvres comment le monde fonctionne vraiment</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-2xl p-6 text-center">
                      <div className="text-5xl mb-4">🔧</div>
                      <h5 className="text-white font-bold text-lg mb-3">SAMEDI SOIR</h5>
                      <p className="text-gray-300">Tu maîtrises les outils que les pros utilisent</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-2xl p-6 text-center">
                      <div className="text-5xl mb-4">🚀</div>
                      <h5 className="text-white font-bold text-lg mb-3">DIMANCHE SOIR</h5>
                      <p className="text-gray-300">Tu repars avec TES agents IA opérationnels</p>
                    </div>
                  </div>
                </div>

                {/* Pourquoi ce sera différent */}
                <div className="mb-12">
                  <h4 className="text-2xl font-bold text-center text-white mb-8">
                    Pourquoi tu vas réussir là où d'autres échouent :
                  </h4>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-500/30">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">👥</div>
                        <div>
                          <h5 className="text-green-400 font-bold text-lg mb-2">Tu ne seras pas un numéro</h5>
                          <p className="text-gray-300">15 entrepreneurs max. Pas 200 comme dans les formations bidons. Je connais ton prénom, ton business, tes blocages.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">🎯</div>
                        <div>
                          <h5 className="text-blue-400 font-bold text-lg mb-2">Du concret, pas du blabla</h5>
                          <p className="text-gray-300">On ne fait pas de PowerPoint. On construit tes agents en direct. Tu repars avec du qui marche, pas des promesses.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">🇷🇪</div>
                        <div>
                          <h5 className="text-orange-400 font-bold text-lg mb-2">Dans ta région, pas en ligne</h5>
                          <p className="text-gray-300">Face à face à La Réunion. Pas de distraction, pas de déconnexion. Focus total sur TES résultats.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">💰</div>
                        <div>
                          <h5 className="text-yellow-400 font-bold text-lg mb-2">Prix transparent, sans surprise</h5>
                          <p className="text-gray-300">497€ + ~30€ d'outils. Point. Pas de upsell caché, pas de modules "premium" à 2000€ en plus.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl p-8 border border-red-500/30">
                  <h4 className="text-3xl font-bold text-white mb-4">
                    Pendant que tes concurrents regardent des tutos YouTube...
                  </h4>
                  <h5 className="text-2xl font-bold text-orange-400 mb-6">
                    Toi, tu auras déjà tes agents IA qui bossent pour toi.
                  </h5>
                  <p className="text-xl text-gray-300">
                    Dans 6 mois, qui aura pris de l'avance ? Celui qui "apprendra plus tard" ou celui qui agit maintenant ?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: CTA Final - Design dramatique avec animations */}
      <div className="relative bg-gradient-to-br from-red-900 via-slate-900 to-black overflow-hidden">
        {/* Background effects dramatiques animés */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 to-transparent"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-20 left-20 w-64 h-64 bg-orange-500/15 rounded-full blur-2xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Urgence finale avec animations dramatiques */}
            <div className="text-center mb-20">
              <motion.div 
                className="inline-flex items-center px-8 py-4 bg-red-600 rounded-full mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0px rgba(220, 38, 38, 0.5)",
                    "0 0 30px rgba(220, 38, 38, 0.8)",
                    "0 0 0px rgba(220, 38, 38, 0.5)"
                  ],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                <span className="text-white font-bold text-xl">🚨 ALERTE ROUGE 🚨</span>
              </motion.div>
              
              <motion.h2 
                className="text-5xl md:text-7xl font-black text-white mb-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Le train part.
                <motion.span 
                  className="block text-red-400 mt-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  animate={{
                    textShadow: [
                      "0 0 0px #f87171",
                      "0 0 40px #f87171",
                      "0 0 0px #f87171"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  Avec ou sans toi.
                </motion.span>
              </motion.h2>
              
              {/* Countdown Timer */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl text-white font-bold mb-6">
                  ⏰ Temps restant pour rejoindre la prochaine session :
                </h3>
                <CountdownTimer targetDate={new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)} />
              </motion.div>
              
              {/* Message d'urgence */}
              <motion.div 
                className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-xl text-red-300 font-semibold">
                  15 places maximum • 8 déjà réservées • Plus que 7 places disponibles
                </p>
              </motion.div>
            </div>

            {/* Programme en ligne avec animations */}
            <motion.div 
              className="grid lg:grid-cols-2 gap-16 mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* JOUR 1 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <motion.h3 
                    className="text-2xl font-bold text-blue-400 mb-6 text-center"
                    animate={{
                      textShadow: [
                        "0 0 0px #60a5fa",
                        "0 0 20px #60a5fa",
                        "0 0 0px #60a5fa"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    🧠 JOUR 1 : Prise de conscience et outils
                  </motion.h3>
                  <div className="space-y-6">
                    {[
                      { time: "9h-10h30 : Réveil brutal", desc: "Comprendre ce qui se passe vraiment dans le monde des affaires" },
                      { time: "11h-12h30 : Découverte des outils leaders", desc: "Tour d'horizon des meilleures plateformes no-code" },
                      { time: "14h-17h : Bonnes pratiques et méthodologie", desc: "Comment bien concevoir et structurer un agent IA" },
                      { time: "17h-18h : Setup et préparation", desc: "Installation des outils pour le lendemain" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                        viewport={{ once: true }}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                        className="p-2 rounded-lg transition-all duration-300"
                      >
                        <div className="text-white font-bold">{item.time}</div>
                        <div className="text-gray-400 text-sm">{item.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* JOUR 2 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                />
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <motion.h3 
                    className="text-2xl font-bold text-green-400 mb-6 text-center"
                    animate={{
                      textShadow: [
                        "0 0 0px #4ade80",
                        "0 0 20px #4ade80",
                        "0 0 0px #4ade80"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    🎯 JOUR 2 : 100% création pratique
                  </motion.h3>
                  <div className="space-y-6">
                    {[
                      { time: "9h-12h : Création agents en groupe", desc: "Chacun crée ses agents selon ses besoins spécifiques" },
                      { time: "14h-17h : Finalisation et tests", desc: "Supervision et aide personnalisée pour que ça marche" },
                      { time: "17h-18h : Plan de maintenance", desc: "Comment améliorer et faire évoluer tes agents" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                        viewport={{ once: true }}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                        className="p-2 rounded-lg transition-all duration-300"
                      >
                        <div className="text-white font-bold">{item.time}</div>
                        <div className="text-gray-400 text-sm">{item.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    className="mt-8 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(234, 179, 8, 0.3)",
                        "0 0 20px rgba(234, 179, 8, 0.5)",
                        "0 0 0px rgba(234, 179, 8, 0.3)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    <p className="text-yellow-300 font-semibold text-center">Tu repartiras avec TES agents qui fonctionnent</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ pour lever les objections avec accordion */}
            <div className="mb-20">
              <motion.h3 
                className="text-4xl font-bold text-white text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                ❓ Questions fréquentes
              </motion.h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  {
                    q: "Je n'y connais rien en informatique, c'est pour moi ?",
                    r: "OUI ! J'étais pizzaiolo sans diplôme. Si j'y arrive, toi aussi. Tout est expliqué simplement, sans jargon technique."
                  },
                  {
                    q: "Combien de temps pour créer mes premiers agents ?",
                    r: "Tu créeras tes premiers agents le 2ème jour. Ils seront simples mais fonctionnels. Ensuite, tu les améliores selon tes besoins réels."
                  },
                  {
                    q: "Et si je n'arrive pas à créer des agents pour mon secteur ?",
                    r: "J'ai formé des entrepreneurs de 48 secteurs différents. Si tu n'arrives pas à créer des agents adaptés, remboursement intégral."
                  },
                  {
                    q: "C'est pas trop cher pour une TPE ?",
                    r: "497€ + ~30€ d'outils pour maîtriser la création d'agents IA + formation + support 1 mois. Une compétence que tu gardes à vie."
                  },
                  {
                    q: "Pourquoi seulement 15 places ?",
                    r: "Pour pouvoir t'accompagner personnellement. Avec 15 entrepreneurs max, je peux connaître ton business et t'aider à créer des agents parfaitement adaptés."
                  },
                  {
                    q: "Qu'est-ce qui est inclus dans le support 1 mois ?",
                    r: "Accès à un groupe privé, réponses à tes questions, aide pour optimiser tes agents, et 2 calls collectifs pour résoudre les problèmes ensemble."
                  }
                ].map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.q}
                    answer={faq.r}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Pricing simple et direct */}
            <div className="text-center mb-20">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                  <div className="line-through text-gray-500 text-2xl mb-4">Valeur réelle : 1497€</div>
                  <div className="bg-red-600 text-white px-6 py-2 rounded-full inline-block mb-6">
                    EARLY BIRD - 5 premières places
                  </div>
                  <div className="text-6xl font-black text-green-400 mb-4">497€</div>
                  <p className="text-xl text-gray-300 mb-4">Soit 24,85€ par heure de formation</p>
                  <p className="text-yellow-400 font-bold text-xl mb-4">= Compétences pour créer tes agents + formation + support 1 mois</p>
                  <div className="text-sm text-orange-300 bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <p>⚠️ À prévoir en plus : ~30€ d'abonnements aux outils IA pour le weekend</p>
                    <p className="text-xs text-gray-400 mt-1">(Nécessaires pour la pratique, tu pourras les résilier après si tu veux)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Infos pratiques en ligne */}
            <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
              <div>
                <div className="text-3xl mb-2">📅</div>
                <div className="text-white font-bold">1-2 Août 2025</div>
                <div className="text-gray-400 text-sm">Weekend intensif</div>
              </div>
              <div>
                <div className="text-3xl mb-2">📍</div>
                <div className="text-white font-bold">Saint-Denis</div>
                <div className="text-gray-400 text-sm">Espace coworking</div>
              </div>
              <div>
                <div className="text-3xl mb-2">👥</div>
                <div className="text-white font-bold">15 places max</div>
                <div className="text-gray-400 text-sm">Entrepreneurs</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <div className="text-white font-bold">Garantie</div>
                <div className="text-gray-400 text-sm">Résultats ou remboursé</div>
              </div>
            </div>

            {/* CTA Final avec animations magnétiques */}
            <div className="text-center">
              <motion.div 
                className="bg-red-600 text-white px-6 py-3 rounded-full inline-block mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0px rgba(220, 38, 38, 0.5)",
                    "0 0 30px rgba(220, 38, 38, 0.8)",
                    "0 0 0px rgba(220, 38, 38, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⏰ Plus que 3 semaines pour réserver
              </motion.div>
              
              <motion.h3 
                className="text-4xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                animate={{
                  textShadow: [
                    "0 0 0px #ffffff",
                    "0 0 40px #ffffff",
                    "0 0 0px #ffffff"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                DERNIÈRE CHANCE
              </motion.h3>
              
              <motion.div 
                className="space-y-8 mb-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-xl text-gray-300">Si tu rates ça :</p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  {[
                    "Tes concurrents auront 2 ans d'avance",
                    "L'IA sera devenue obligatoire", 
                    "Tu seras en mode survie"
                  ].map((text, index) => (
                    <motion.p 
                      key={index}
                      className="text-red-400 font-semibold"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
                      viewport={{ once: true }}
                      animate={{
                        textShadow: [
                          "0 0 0px #f87171",
                          "0 0 15px #f87171",
                          "0 0 0px #f87171"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2 + (index * 0.5) }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button Magnétique Amélioré */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <MagneticCTA />
              </motion.div>

              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center items-center space-x-8 text-yellow-400">
                  {[
                    { icon: "⚡", text: "Confirmation immédiate" },
                    { icon: "🔒", text: "Remboursement garanti" },
                    { icon: "📱", text: "Support inclus" }
                  ].map((item, index) => (
                    <motion.span
                      key={index}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 + (index * 0.1) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* P.S. final avec animation */}
              <motion.div 
                className="mt-16 relative max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <motion.p 
                    className="text-2xl font-bold text-white mb-4"
                    animate={{
                      textShadow: [
                        "0 0 0px #ffffff",
                        "0 0 20px #ffffff",
                        "0 0 0px #ffffff"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                  >
                    P.S. : À toi de voir.
                  </motion.p>
                  <p className="text-xl text-gray-300">
                    Dans 6 mois, tu seras soit celui qui a eu le courage d'y aller,<br />
                    soit celui qui regrette de ne pas l'avoir fait.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}