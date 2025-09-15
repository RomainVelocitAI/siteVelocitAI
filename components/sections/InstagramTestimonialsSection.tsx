import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Bookmark, Send } from 'lucide-react'
import Image from 'next/image'
import { SimpleFormattedTestimonial } from '@/lib/airtable-simple'

interface InstagramTestimonialsProps {
  testimonials: SimpleFormattedTestimonial[]
}

const InstagramTestimonialsSection = ({ testimonials }: InstagramTestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [animatedLikes, setAnimatedLikes] = useState<{ [key: string]: number }>({})  
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  // Transformer les témoignages Airtable en format Instagram-like
  const instagramData = testimonials.map(testimonial => ({
    id: testimonial.id,
    username: `@${testimonial.company.toLowerCase().replace(/\s+/g, '_')}`,
    content: testimonial.quote,
    videoUrl: testimonial.videoUrl,
    thumbnail: testimonial.thumbnail,
    likes: Math.floor(Math.random() * 300) + 150, // Pour la démo
    comments: Math.floor(Math.random() * 50) + 10,
    isVideo: !!testimonial.videoUrl,
    publishedAt: testimonial.date,
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    highlight: testimonial.highlight,
    metrics: testimonial.metrics
  }))

  useEffect(() => {
    // Initialiser les likes animés
    const initialLikes: { [key: string]: number } = {}
    instagramData.forEach(testimonial => {
      initialLikes[testimonial.id] = testimonial.likes
    })
    setAnimatedLikes(initialLikes)
  }, [testimonials])

  const handleLike = (id: string) => {
    const newLikedPosts = new Set(likedPosts)
    if (likedPosts.has(id)) {
      newLikedPosts.delete(id)
      setAnimatedLikes(prev => ({
        ...prev,
        [id]: prev[id] - 1
      }))
    } else {
      newLikedPosts.add(id)
      setAnimatedLikes(prev => ({
        ...prev,
        [id]: prev[id] + 1
      }))
    }
    setLikedPosts(newLikedPosts)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % instagramData.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + instagramData.length) % instagramData.length)
  }

  // Auto-play seulement si plus de 3 témoignages
  useEffect(() => {
    if (instagramData.length > 3) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % instagramData.length)
      }, 6000)
      return () => clearInterval(timer)
    }
  }, [instagramData.length])

  // Fonction pour obtenir les cartes visibles
  const getVisibleCards = () => {
    if (instagramData.length === 0) return []
    
    // Si on a 3 témoignages ou moins, on les affiche tous
    if (instagramData.length <= 3) {
      return instagramData
    }
    
    // Si on a plus de 3 témoignages, on fait défiler par groupe de 3
    const cards = []
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % instagramData.length
      cards.push(instagramData[index])
    }
    return cards
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20 overflow-hidden">
      {/* Effet de fond animé */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/3 to-blue-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">Rejoignez des dizaines d'entrepreneurs </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Réunionnais</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez leurs témoignages et leurs résultats exceptionnels
          </p>
        </motion.div>

        {/* Carousel de témoignages */}
        <div className="relative">
          <div className="flex justify-center items-center gap-8">
            {/* Bouton précédent - n'afficher que si plus de 3 témoignages */}
            {instagramData.length > 3 && (
              <motion.button
                onClick={handlePrev}
                className="hidden md:flex w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg items-center justify-center hover:shadow-xl hover:shadow-purple-500/20 border border-purple-100 dark:border-purple-900 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}

            {/* Cartes de témoignages */}
            <div className={`flex gap-6 overflow-hidden ${
              instagramData.length === 1 ? 'justify-center' : 
              instagramData.length === 2 ? 'justify-center' : ''
            }`}>
              <AnimatePresence mode="popLayout">
                {getVisibleCards().map((testimonial, cardIndex) => {
                  // Créer une clé unique pour chaque position de carte
                  const uniqueKey = `card-${cardIndex}-${testimonial.id}`;
                  const isCenter = instagramData.length === 1 ? true : 
                                  instagramData.length === 2 ? false :
                                  cardIndex === 1;
                  const shouldHide = instagramData.length >= 3 && cardIndex !== 1;
                  
                  return (
                  <motion.div
                    key={uniqueKey}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: isCenter || instagramData.length <= 2 ? 1 : 0.7,
                      scale: isCenter || instagramData.length <= 2 ? 1 : 0.9,
                      x: 0
                    }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className={`relative ${
                      isCenter ? 'z-20' : 'z-10'
                    } ${
                      shouldHide ? 'hidden lg:block' : ''
                    }`}
                  >
                    {/* Carte Instagram */}
                    <div className="w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-purple-100 dark:border-purple-900 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300">
                      {/* Header Instagram */}
                      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {testimonial.company[0].toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-sm dark:text-white">{testimonial.username}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">La Réunion</p>
                          </div>
                        </div>
                        <button className="text-gray-700 dark:text-gray-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>

                      {/* Contenu vidéo/image */}
                      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        {/* Image de fond avec thumbnail */}
                        {testimonial.thumbnail && (
                          <div className="absolute inset-0">
                            <Image 
                              src={testimonial.thumbnail} 
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              sizes="320px"
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10" />
                        
                        {/* Overlay avec infos */}
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6">
                          <div className="text-white">
                            <p className="font-bold text-lg">{testimonial.name}</p>
                            <p className="text-sm opacity-90">{testimonial.role} - {testimonial.company}</p>
                            {testimonial.highlight && testimonial.highlight !== '' && (
                              <p className="text-yellow-300 font-semibold mt-2">{testimonial.highlight}</p>
                            )}
                          </div>
                        </div>
                        
                        {testimonial.isVideo && playingVideo !== uniqueKey && (
                          <button
                            onClick={() => setPlayingVideo(uniqueKey)}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                          >
                            <motion.div
                              className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <svg className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </motion.div>
                          </button>
                        )}
                        
                        {/* Lecteur vidéo */}
                        {testimonial.isVideo && playingVideo === uniqueKey && (
                          <div className="absolute inset-0 bg-black">
                            <video
                              src={testimonial.videoUrl}
                              controls
                              autoPlay
                              className="w-full h-full object-contain"
                              onEnded={() => setPlayingVideo(null)}
                            />
                            <button
                              onClick={() => setPlayingVideo(null)}
                              className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Actions Instagram */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <motion.button
                              onClick={() => handleLike(testimonial.id)}
                              whileTap={{ scale: 0.8 }}
                              className="transition-colors"
                            >
                              <Heart 
                                className={`w-6 h-6 ${likedPosts.has(testimonial.id) ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-300'}`} 
                              />
                            </motion.button>
                            <button>
                              <MessageCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </button>
                            <button>
                              <Send className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </button>
                          </div>
                          <button>
                            <Bookmark className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                          </button>
                        </div>

                        {/* Likes et description */}
                        <div className="space-y-2">
                          <motion.p 
                            className="font-semibold text-sm dark:text-white"
                            key={animatedLikes[testimonial.id]}
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.3 }}
                          >
                            {animatedLikes[testimonial.id]?.toLocaleString()} J'aime
                          </motion.p>
                          <p className="text-sm dark:text-gray-200">
                            <span className="font-semibold">velocitai</span> "{testimonial.content}"
                          </p>
                          {testimonial.metrics && testimonial.metrics.length > 0 && (
                            <div className="flex gap-4 mt-2">
                              {testimonial.metrics.slice(0, 2).map((metric, idx) => (
                                <div key={idx} className="text-xs">
                                  <span className="text-purple-600 dark:text-purple-400 font-bold">{metric.value}</span>
                                  <span className="text-gray-500 dark:text-gray-400 ml-1">{metric.label}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400">Voir les {testimonial.comments} commentaires</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase">{testimonial.publishedAt}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Bouton suivant - n'afficher que si plus de 3 témoignages */}
            {instagramData.length > 3 && (
              <motion.button
                onClick={handleNext}
                className="hidden md:flex w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg items-center justify-center hover:shadow-xl hover:shadow-purple-500/20 border border-purple-100 dark:border-purple-900 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-8">
            {instagramData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-gradient-to-r from-purple-600 to-blue-600' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105"
          >
            Rejoindre nos clients satisfaits
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default InstagramTestimonialsSection