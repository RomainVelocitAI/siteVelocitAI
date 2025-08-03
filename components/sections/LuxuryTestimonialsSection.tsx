import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import { 
  PlayCircleIcon,
  StarIcon,
  SparklesIcon,
  CheckCircleIcon,
  TrophyIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/solid';
import { 
  XMarkIcon,
  ArrowLongRightIcon,
  ArrowLongLeftIcon
} from '@heroicons/react/24/outline';

interface LuxuryTestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  logo?: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
  highlight: string;
  results: {
    metric: string;
    value: string;
    detail: string;
  }[];
  tags: string[];
  date: string;
}

const testimonials: LuxuryTestimonial[] = [
  {
    id: 1,
    name: 'Romain Caillot',
    role: 'Gérant',
    company: 'Caillot Immobilier',
    thumbnail: '/images/romain_miniature.png',
    videoUrl: 'videos/romain_temoignage.mp4',
    quote: "VelocitAI a révolutionné notre approche du marché immobilier. L'automatisation nous a permis de traiter 3 fois plus de dossiers tout en améliorant la qualité de notre service client.",
    highlight: "3x plus de dossiers traités",
    results: [
      { metric: 'Productivité', value: '+75%', detail: 'gain de temps sur les tâches répétitives' },
      { metric: 'ROI', value: '420%', detail: 'retour sur investissement en 6 mois' },
      { metric: 'Satisfaction', value: '98%', detail: 'taux de satisfaction client' }
    ],
    tags: ['Immobilier', 'Automatisation', 'IA'],
    date: 'Décembre 2023'
  },
  {
    id: 2,
    name: 'Julien Etoke',
    role: 'Fondateur & CEO',
    company: 'Scaleable Agency',
    thumbnail: '/images/julien_miniature.png',
    videoUrl: 'videos/julien_temoignage.mp4',
    quote: "L'expertise de VelocitAI en automatisation nous a permis de scaler notre agence sans augmenter nos coûts. Un partenaire stratégique incontournable.",
    highlight: "Croissance x2 sans coûts supplémentaires",
    results: [
      { metric: 'Efficacité', value: '+90%', detail: 'automatisation des campagnes' },
      { metric: 'Clients', value: '+150%', detail: 'acquisition de nouveaux clients' },
      { metric: 'Marge', value: '+45%', detail: 'amélioration de la rentabilité' }
    ],
    tags: ['Marketing', 'Growth', 'SaaS'],
    date: 'Novembre 2023'
  },
  {
    id: 3,
    name: 'Anna Grieux',
    role: 'Fondatrice',
    company: 'Douceur Passion',
    thumbnail: '/images/anna_miniature.png',
    videoUrl: 'videos/anna_temoignage.mp4',
    quote: "Grâce à VelocitAI, je peux enfin me concentrer sur ce qui compte vraiment : accompagner mes clients. L'automatisation a transformé mon quotidien.",
    highlight: "20h/semaine économisées",
    results: [
      { metric: 'Temps', value: '20h/sem', detail: 'économisées sur l\'administratif' },
      { metric: 'Revenus', value: '+150%', detail: 'croissance du CA annuel' },
      { metric: 'Impact', value: 'x3', detail: 'plus de clients accompagnés' }
    ],
    tags: ['Coaching', 'Formation', 'B2B'],
    date: 'Octobre 2023'
  }
];

// Composant interne qui gère les animations de scroll
const LuxuryTestimonialsInner = React.forwardRef<HTMLElement, {
  selectedVideo: LuxuryTestimonial | null;
  showModal: boolean;
  activeIndex: number;
  setSelectedVideo: (video: LuxuryTestimonial | null) => void;
  setShowModal: (show: boolean) => void;
  setActiveIndex: (index: number) => void;
}>(({ selectedVideo, showModal, activeIndex, setSelectedVideo, setShowModal, setActiveIndex }, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const openVideo = (testimonial: LuxuryTestimonial) => {
    setSelectedVideo(testimonial);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent"></div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            transform: 'translateX(-50%)',
          }}
          animate={{
            transform: ['translateX(-50%)', 'translateX(50%)'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      </div>

      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity, scale }}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-sm rounded-full mb-8 border border-violet-500/30">
              <TrophyIcon className="w-5 h-5 text-violet-400" />
              <span className="text-sm font-medium text-violet-300 uppercase tracking-wider">Success Stories</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Des résultats
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                exceptionnels
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Découvrez comment les leaders de leur industrie transforment leur business avec VelocitAI
            </p>
          </motion.div>
        </div>

        {/* Main testimonial showcase */}
        <div className="relative mb-20">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Video side */}
            <div className="relative group">
              <div 
                className="relative aspect-[16/9] rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => openVideo(activeTestimonial)}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                
                {/* Thumbnail */}
                <Image
                  src={activeTestimonial.thumbnail}
                  alt={activeTestimonial.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Play button */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center z-20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white blur-xl opacity-50"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-full border border-white/20">
                      <PlayCircleIcon className="w-20 h-20 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Company badge */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="flex items-center gap-3 bg-black/70 backdrop-blur-sm px-5 py-3 rounded-full border border-white/10">
                    <BuildingOfficeIcon className="w-5 h-5 text-violet-400" />
                    <span className="text-white font-medium">{activeTestimonial.company}</span>
                  </div>
                </div>
              </div>

              {/* Video controls */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handlePrev}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <ArrowLongLeftIcon className="w-6 h-6 text-white" />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === activeIndex 
                          ? 'w-12 bg-gradient-to-r from-violet-400 to-purple-400' 
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <ArrowLongRightIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content side */}
            <div className="space-y-8">
              {/* Quote */}
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-2xl lg:text-3xl font-light text-white leading-relaxed mb-6">
                  "{activeTestimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{activeTestimonial.name}</h3>
                    <p className="text-gray-400">{activeTestimonial.role} • {activeTestimonial.company}</p>
                  </div>
                </div>
              </div>

              {/* Highlight */}
              <div className="p-6 bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-violet-500/30">
                <SparklesIcon className="w-8 h-8 text-violet-400 mb-3" />
                <p className="text-2xl font-bold text-white">{activeTestimonial.highlight}</p>
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-3 gap-4">
                {activeTestimonial.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                      {result.value}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{result.metric}</p>
                  </motion.div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {activeTestimonial.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
                <span className="px-4 py-2 text-sm text-gray-500">
                  {activeTestimonial.date}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
              <span className="text-gray-300">100% clients satisfaits</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <TrophyIcon className="w-6 h-6 text-yellow-400" />
              <span className="text-gray-300">ROI moyen 350%+</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <SparklesIcon className="w-6 h-6 text-violet-400" />
              <span className="text-gray-300">Leader en automatisation</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-400 mb-8">
            Prêt à rejoindre ces entreprises leaders ?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-5 font-semibold text-black rounded-full overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Démarrer votre transformation</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-6xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-16 right-0 text-white hover:text-violet-400 transition-colors p-2 z-50"
            >
              <XMarkIcon className="w-12 h-12" />
            </button>

            <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <video
                  key={selectedVideo.videoUrl}
                  src={`/${selectedVideo.videoUrl}`}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full"
                  onEnded={closeModal}
                >
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
});

LuxuryTestimonialsInner.displayName = 'LuxuryTestimonialsInner';

const LuxuryTestimonialsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<LuxuryTestimonial | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!showModal) return;
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedVideo(null);
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showModal]);

  if (!mounted) {
    return (
      <section className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-800 rounded-lg w-1/3 mx-auto mb-8"></div>
            <div className="h-96 bg-gray-800 rounded-3xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <LuxuryTestimonialsInner
      ref={containerRef}
      selectedVideo={selectedVideo}
      showModal={showModal}
      activeIndex={activeIndex}
      setSelectedVideo={setSelectedVideo}
      setShowModal={setShowModal}
      setActiveIndex={setActiveIndex}
    />
  );
};

export default LuxuryTestimonialsSection;