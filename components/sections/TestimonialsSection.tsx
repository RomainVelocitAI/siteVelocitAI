import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Chargement dynamique des icônes pour éviter les problèmes de SSR
const PlayCircleIcon = dynamic(
  () => import('@heroicons/react/24/solid').then((mod) => mod.PlayCircleIcon),
  { ssr: false }
);

const XMarkIcon = dynamic(
  () => import('@heroicons/react/24/outline').then((mod) => mod.XMarkIcon),
  { ssr: false }
);

interface VideoTestimonial {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

// Définition du type pour les témoignages
const useTestimonials = () => {
  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      title: 'Romain Caillot',
      description: 'Gérant - Entreprise BTP Caillot Immobilier',
      thumbnail: '/images/romain_miniature.png',
      videoUrl: 'videos/romain_temoignage.mp4',
    },
    {
      id: 2,
      title: 'Julien Etoke',
      description: 'Gérant - Scaleable Agence d\'acquisition',
      thumbnail: '/images/julien_miniature.png',
      videoUrl: 'videos/julien_temoignage.mp4',
    },
    {
      id: 3,
      title: 'Anna Grieux',
      description: 'Coach en entreprise - Douceur Passion',
      thumbnail: '/images/anna_miniature.png',
      videoUrl: 'videos/anna_temoignage.mp4',
    },
  ];

  return { testimonials };
};

const TestimonialsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { testimonials } = useTestimonials();

  const openVideo = (testimonial: VideoTestimonial) => {
    console.log('Ouverture de la vidéo:', testimonial.videoUrl);
    setSelectedVideo(testimonial);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  // Vérifier que le composant est monté côté client
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Gestion de la touche Échap pour fermer la modale
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
              <div key={i} className="h-64 bg-gray-200 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse"></div>
                <div className="p-6 h-full flex flex-col justify-end">
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ce que disent nos clients
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-purple-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez les retours de nos clients satisfaits par nos solutions d'automatisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="group cursor-pointer"
              onClick={() => openVideo(testimonial)}
            >
              <div className="relative w-full h-64 rounded-xl overflow-hidden">
                <div className="bb absolute inset-0">
                  <div className="video-thumbnail w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img 
                      src={testimonial.thumbnail} 
                      alt={testimonial.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-white font-semibold text-lg">{testimonial.title}</h3>
                      <p className="text-gray-200 text-sm mt-1 line-clamp-2">{testimonial.description}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                      <div className="bg-white/90 p-3 rounded-full">
                        <PlayCircleIcon className="h-12 w-12 text-violet-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de lecture vidéo amélioré */}
      {showModal && selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-violet-400 transition-colors z-10 p-2"
              aria-label="Fermer la vidéo"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <div className="absolute inset-0">
                <video 
                  key={selectedVideo.videoUrl}
                  src={`/${selectedVideo.videoUrl}`}
                  controls 
                  autoPlay 
                  playsInline
                  className="w-full h-full object-cover"
                  onEnded={closeModal}
                  onError={(e) => {
                    console.error('Erreur de chargement de la vidéo:', selectedVideo.videoUrl, e);
                  }}
                  onCanPlay={() => console.log('Vidéo prête à être lue:', selectedVideo.videoUrl)}
                >
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            </div>
            <div className="p-4 bg-black/70 backdrop-blur-sm">
              <h3 className="text-white text-xl font-semibold">{selectedVideo.title}</h3>
              <p className="text-gray-300">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
