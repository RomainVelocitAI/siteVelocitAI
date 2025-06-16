import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Chargement dynamique de l'icône pour éviter les problèmes de SSR
const PlayCircleIcon = dynamic(
  () => import('@heroicons/react/24/solid').then((mod) => mod.PlayCircleIcon),
  { ssr: false }
);

interface VideoTestimonial {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string; // Pour les vidéos auto-hébergées
  isEmbed?: boolean; // Si c'est une vidéo intégrée (YouTube/Vimeo)
}

// Définition du type pour les témoignages
const useTestimonials = (): VideoTestimonial[] => {
  return [
    {
      id: 1,
      title: 'Témoignage de Romain',
      description: 'Découvrez le retour d\'expérience de Romain sur notre solution d\'automatisation.',
      videoUrl: '/videos/romain_temoignage.mp4',
      thumbnail: '/images/romain_miniature.png',
      isEmbed: false
    },
    {
      id: 2,
      title: 'Témoignage de Julien',
      description: 'Julien partage son expérience avec nos services d\'automatisation.',
      videoUrl: '/videos/julien_temoignage.mp4',
      thumbnail: '/images/julien_miniature.png',
      isEmbed: false
    },
    {
      id: 3,
      title: 'Témoignage d\'Anna',
      description: 'Anna explique comment notre solution a transformé son entreprise.',
      videoUrl: '/videos/anna_temoignage.mp4',
      thumbnail: '/images/anna_miniature.png',
      isEmbed: false
    }
  ];
};

const TestimonialsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [showModal, setShowModal] = useState(false);
  const testimonials = useTestimonials();

  // Vérifier que le composant est monté côté client
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Ils nous font confiance
            </h2>
            <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const openVideo = (testimonial: VideoTestimonial) => {
    setSelectedVideo(testimonial);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Ils nous font confiance
          </h2>
          <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que nos clients disent de notre travail et de notre approche.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className="relative cursor-pointer group aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4"
                onClick={() => openVideo(testimonial)}
              >
                <img 
                  src={testimonial.thumbnail} 
                  alt={testimonial.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircleIcon className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {testimonial.title}
                </h3>
                <p className="text-gray-600">
                  {testimonial.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal pour la lecture des vidéos */}
      {showModal && selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 z-10 hover:bg-opacity-75 transition-colors"
            >
              <span className="sr-only">Fermer</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <video 
                src={selectedVideo.videoUrl} 
                className="w-full h-full" 
                controls
                autoPlay
                playsInline
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-600">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
