import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { useSafeScroll } from '@/hooks/useSafeScroll';
import { 
  PlayCircleIcon as PlayCircleSolid,
  StarIcon,
  SparklesIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/solid';
import { 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  QuoteIcon
} from '@heroicons/react/24/outline';

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
  metrics: {
    label: string;
    value: string;
    icon: any;
  }[];
  rating: number;
  featured?: boolean;
}

const testimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: 'Romain Caillot',
    role: 'Gérant',
    company: 'Caillot Immobilier',
    thumbnail: '/images/romain_miniature.png',
    videoUrl: 'videos/romain_temoignage.mp4',
    quote: "VelocitAI a transformé notre façon de travailler. Les résultats dépassent toutes nos attentes.",
    metrics: [
      { label: 'Gain de temps', value: '+75%', icon: ChartBarIcon },
      { label: 'ROI', value: '420%', icon: ArrowTrendingUpIcon },
    ],
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: 'Julien Etoke',
    role: 'Gérant',
    company: 'Scaleable Agency',
    thumbnail: '/images/julien_miniature.png',
    videoUrl: 'videos/julien_temoignage.mp4',
    quote: "Une expertise technique exceptionnelle doublée d'une compréhension profonde des enjeux business.",
    metrics: [
      { label: 'Productivité', value: '+90%', icon: SparklesIcon },
      { label: 'Clients satisfaits', value: '100%', icon: CheckBadgeIcon },
    ],
    rating: 5
  },
  {
    id: 3,
    name: 'Anna Grieux',
    role: 'Coach en entreprise',
    company: 'Douceur Passion',
    thumbnail: '/images/anna_miniature.png',
    videoUrl: 'videos/anna_temoignage.mp4',
    quote: "L'automatisation m'a permis de me concentrer sur l'essentiel : accompagner mes clients.",
    metrics: [
      { label: 'Temps économisé', value: '20h/sem', icon: ChartBarIcon },
      { label: 'Croissance', value: '+150%', icon: ArrowTrendingUpIcon },
    ],
    rating: 5
  }
];

const PremiumTestimonialsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!showModal) return;
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showModal]);

  const openVideo = (testimonial: VideoTestimonial) => {
    setSelectedVideo(testimonial);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!mounted) {
    return (
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  const featuredTestimonial = testimonials.find(t => t.featured) || testimonials[0];
  const otherTestimonials = testimonials.filter(t => !t.featured);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full mb-6">
              <SparklesIcon className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-semibold text-violet-600">Témoignages Premium</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Des résultats qui
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                parlent d'eux-mêmes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment nos clients leaders ont transformé leur entreprise grâce à l'automatisation intelligente
            </p>
          </motion.div>
        </div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="relative group">
            {/* Glassmorphism card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50"></div>
              
              <div className="relative grid lg:grid-cols-2 gap-0">
                {/* Video Section */}
                <div 
                  className="relative h-96 lg:h-auto cursor-pointer overflow-hidden"
                  onClick={() => openVideo(featuredTestimonial)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                  <Image
                    src={featuredTestimonial.thumbnail}
                    alt={featuredTestimonial.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Play button */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-2xl group-hover:bg-white transition-all duration-300">
                      <PlayCircleSolid className="w-16 h-16 text-violet-600" />
                    </div>
                  </motion.div>

                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                      <CheckBadgeIcon className="w-5 h-5 text-violet-600" />
                      <span className="text-sm font-semibold text-gray-900">Client Premium</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-12 flex flex-col justify-center">
                  {/* Quote */}
                  <div className="mb-8">
                    <QuoteIcon className="w-10 h-10 text-violet-200 mb-4" />
                    <p className="text-2xl font-light text-gray-700 italic leading-relaxed">
                      "{featuredTestimonial.quote}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">{featuredTestimonial.name}</h3>
                    <p className="text-lg text-gray-600">
                      {featuredTestimonial.role} • {featuredTestimonial.company}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {featuredTestimonial.metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-2xl"
                      >
                        <metric.icon className="w-6 h-6 text-violet-600 mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Testimonials Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Plus de témoignages</h3>
            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {otherTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-6">
                      {/* Thumbnail */}
                      <div 
                        className="relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
                        onClick={() => openVideo(testimonial)}
                      >
                        <Image
                          src={testimonial.thumbnail}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <PlayCircleSolid className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role} • {testimonial.company}</p>
                        </div>
                        
                        {/* Mini metrics */}
                        <div className="flex gap-4 mt-4">
                          {testimonial.metrics.slice(0, 2).map((metric, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <metric.icon className="w-4 h-4 text-violet-600" />
                              <span className="text-sm font-semibold text-gray-700">{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {otherTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-violet-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 mb-6">
            Rejoignez des dizaines d'entreprises qui ont déjà transformé leur activité
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Commencer votre transformation
          </motion.button>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showModal && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute -top-16 right-0 text-white hover:text-violet-400 transition-colors p-2"
              >
                <XMarkIcon className="w-10 h-10" />
              </button>

              {/* Video container */}
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
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

                {/* Video info */}
                <div className="p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.name}</h3>
                  <p className="text-gray-300">{selectedVideo.role} • {selectedVideo.company}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PremiumTestimonialsSection;