import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useCalculator } from '@/contexts/CalculatorContext';
import { TargetIcon, LightBulbIcon, ChartIcon, SecurityIcon, PlaneIcon, MailBoxIcon } from '@/components/ui/Icons';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactSection() {
  const { generateFormMessage, tasks } = useCalculator();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'collect' | 'fold' | 'stamp' | 'fly' | 'complete'>('idle');

  // Mettre à jour le message avec les données du calculateur uniquement si des tâches existent
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setFormData(prev => ({
        ...prev,
        message: generateFormMessage()
      }));
    }
  }, [generateFormMessage, tasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Démarrer l'animation enveloppe
    setAnimationPhase('collect');
    setTimeout(() => setAnimationPhase('fold'), 800);
    setTimeout(() => setAnimationPhase('stamp'), 1600);
    setTimeout(() => setAnimationPhase('fly'), 2200);
    setTimeout(() => setAnimationPhase('complete'), 2800);
    
    try {
      // Envoi vers le webhook N8N
      const response = await fetch('https://n8n.srv765302.hstgr.cloud/webhook/fdb164d0-3445-4199-a30f-c91d97bafc8b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: 'VelocitAI Website Contact Form',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Votre message a bien été envoyé ! Nous vous recontacterons rapidement.'
        });
        
        // Réinitialiser le formulaire
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.'
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setSubmitStatus({
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
      // Réinitialiser l'animation après la durée complète
      setTimeout(() => {
        setIsFlying(false);
        setAnimationPhase('idle');
      }, 3500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactMethods = [
    {
      icon: <EnvelopeIcon className="h-6 w-6 text-indigo-600" />,
      title: 'Email',
      value: 'contact@velocit-ai.fr',
      href: 'mailto:contact@velocit-ai.fr',
      description: 'Réponse sous 24h ouvrés',
    },
    {
      icon: <MapPinIcon className="h-6 w-6 text-indigo-600" />,
      title: 'Localisation',
      value: 'Le Tampon, La Réunion',
      href: 'https://maps.google.com/?q=Le+Tampon,+La+Réunion',
      description: 'Interventions sur toute l\'île',
    },
  ];

  return (
    <section id="contact" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bannière d'opportunité professionnelle */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white text-center py-6 px-6 rounded-2xl mb-12 border border-blue-300 shadow-lg"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <TargetIcon className="w-8 h-8 text-white" />
              <span className="font-bold text-lg">AUDIT STRATÉGIQUE PERSONNALISÉ</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>Évaluation experte de vos <strong className="text-blue-200">processus prioritaires</strong> en 30 minutes</span>
              <span className="hidden md:inline">•</span>
              <span>Support premium avec équipe dédiée</span>
            </div>
          </div>
        </motion.div>

        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Transformez Votre Entreprise avec 
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent block md:inline md:ml-3">
              l'Intelligence Artificielle
            </span>
          </motion.h2>
          
          <motion.div 
            className="bg-blue-50 border-l-4 border-blue-400 p-6 max-w-4xl mx-auto rounded-r-xl shadow-sm mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <LightBulbIcon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-lg text-blue-800 font-semibold">
                  L'excellence opérationnelle par l'IA : une opportunité stratégique
                </p>
                <p className="text-blue-700 mt-1">
                  ROI mesurable dès le premier mois : libération de 25h/semaine par équipe et réduction de 40% des coûts opérationnels.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <strong className="text-gray-900">Audit stratégique personnalisé de 30 minutes</strong> pour identifier 
            vos processus à fort impact business. Nos experts vous présentent un plan d'action sur-mesure 
            avec calcul précis du ROI potentiel et roadmap de déploiement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact avec animation */}
          <AnimatePresence mode="wait">
            {animationPhase === 'idle' || animationPhase === 'collect' || animationPhase === 'fold' ? (
              <motion.div 
                key="form"
                className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500 relative overflow-hidden"
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
                initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
                animate={
                  animationPhase === 'collect' ? {
                    scale: 0.95,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  } : {}
                }
                exit={{
                  scale: 0.7,
                  rotateX: [0, 15, 0],
                  rotateY: [0, 5, 0],
                  transition: { duration: 1.2, ease: "easeInOut" }
                }}
              >
            <div className="flex items-center gap-3 mb-4">
              <TargetIcon className="w-12 h-12 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Audit Stratégique Personnalisé
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    CONSULTATION EXPERTE
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                    ÉVALUATION SUR-MESURE
                  </span>
                </div>
              </div>
            </div>
            
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Votre nom <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Votre message <span className="text-gray-400 text-xs">(optionnel)</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 relative">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-70 relative overflow-hidden"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  animate={isSubmitting ? {
                    scaleX: [1, 0.8, 0.6, 0.4, 0.2, 0],
                    scaleY: [1, 0.9, 0.7, 0.5, 0.3, 0],
                    opacity: [1, 1, 1, 0.8, 0.5, 0]
                  } : {
                    scaleX: 1,
                    scaleY: 1,
                    opacity: 1
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'} flex items-center gap-2`}>
                    <ChartIcon className="w-5 h-5" />
                    Planifier l'audit stratégique
                  </span>
                </motion.button>

                {/* Avion en papier violet qui émerge et vole */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0, 
                    y: 0, 
                    rotate: 0 
                  }}
                  animate={isFlying ? {
                    opacity: [0, 0, 1, 1, 1, 0],
                    scale: [0, 0, 1, 1.2, 1.5, 1.8],
                    x: [0, 0, 50, 150, 300, 500],
                    y: [0, 0, -20, -60, -100, -150],
                    rotate: [0, 0, 15, 25, 35, 45]
                  } : {
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                    rotate: 0
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeOut",
                    times: [0, 0.3, 0.4, 0.6, 0.8, 1]
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-purple-600"
                  >
                    <path
                      d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </svg>
                  
                  {/* Traînée de l'avion */}
                  <motion.div
                    className="absolute top-1/2 right-full transform -translate-y-1/2"
                    animate={isFlying ? {
                      opacity: [0, 0, 0.6, 0.8, 0.6, 0],
                      scaleX: [0, 0, 1, 1.5, 2, 0],
                      scaleY: [0, 0, 0.5, 0.3, 0.2, 0]
                    } : {
                      opacity: 0,
                      scaleX: 0,
                      scaleY: 0
                    }}
                    transition={{
                      duration: 2.5,
                      ease: "easeOut",
                      times: [0, 0.4, 0.5, 0.7, 0.9, 1]
                    }}
                  >
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-transparent rounded-full opacity-60"></div>
                  </motion.div>
                </motion.div>

                {/* Message de succès qui apparaît après l'envol */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isSubmitting ? {
                    opacity: [0, 0, 0, 0, 1],
                    scale: [0, 0, 0, 0, 1]
                  } : {
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.6, 0.8, 0.9, 1]
                  }}
                >
                  <span className="text-purple-600 font-medium text-sm whitespace-nowrap">
                    Message envoyé !
                  </span>
                </motion.div>
              </div>
            </form>
            
            {/* Section expertise post-formulaire */}
            <motion.div 
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                  <TargetIcon className="w-4 h-4 text-purple-600" />
                  <span><strong>Expertise :</strong> Certification ISO 27001 et conformité RGPD native</span>
                </p>
                <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <SecurityIcon className="w-4 h-4 text-blue-600" />
                    Support premium 99.9% de disponibilité
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ChartIcon className="w-4 h-4 text-green-600" />
                    ROI garanti contractuellement
                  </span>
                </div>
              </div>
            </motion.div>
                
                {/* Coins qui se plient pour l'animation enveloppe */}
                {/* Top Left */}
                <motion.div
                  className="absolute top-0 left-0 w-16 h-16 bg-white border-r border-b border-gray-300"
                  style={{ 
                    transformOrigin: 'bottom right',
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                  }}
                  animate={animationPhase === 'fold' ? {
                    rotateZ: 135,
                    transition: { duration: 0.3, delay: 0.2, ease: "easeOut" }
                  } : {}}
                />
                
                {/* Top Right */}
                <motion.div
                  className="absolute top-0 right-0 w-16 h-16 bg-white border-l border-b border-gray-300"
                  style={{ 
                    transformOrigin: 'bottom left',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                  }}
                  animate={animationPhase === 'fold' ? {
                    rotateZ: -135,
                    transition: { duration: 0.3, delay: 0.4, ease: "easeOut" }
                  } : {}}
                />
                
                {/* Bottom Left */}
                <motion.div
                  className="absolute bottom-0 left-0 w-16 h-16 bg-white border-r border-t border-gray-300"
                  style={{ 
                    transformOrigin: 'top right',
                    clipPath: 'polygon(0 0, 0 100%, 100% 100%)'
                  }}
                  animate={animationPhase === 'fold' ? {
                    rotateZ: -135,
                    transition: { duration: 0.3, delay: 0.6, ease: "easeOut" }
                  } : {}}
                />
                
                {/* Bottom Right */}
                <motion.div
                  className="absolute bottom-0 right-0 w-16 h-16 bg-white border-l border-t border-gray-300"
                  style={{ 
                    transformOrigin: 'top left',
                    clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
                  }}
                  animate={animationPhase === 'fold' ? {
                    rotateZ: 135,
                    transition: { duration: 0.3, delay: 0.8, ease: "easeOut" }
                  } : {}}
                />
              </motion.div>
            ) : animationPhase === 'stamp' || animationPhase === 'fly' ? (
              // Animation enveloppe - Timbre et envol
              <motion.div
                key="envelope"
                className="relative w-full h-[600px] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Enveloppe */}
                <motion.div
                  className="relative w-80 h-48 bg-white rounded-lg shadow-xl border border-gray-300"
                  animate={animationPhase === 'fly' ? {
                    scale: 0.3,
                    x: 400,
                    y: -200,
                    rotateZ: 25,
                    transition: { duration: 0.6, ease: "easeOut" }
                  } : {}}
                >
                  {/* Timbre */}
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-16 bg-gradient-to-b from-blue-500 to-blue-700 rounded-sm shadow-lg border-2 border-white"
                    initial={{ opacity: 0, scale: 0, rotateZ: -10 }}
                    animate={animationPhase === 'stamp' ? {
                      opacity: 1,
                      scale: 1,
                      rotateZ: -10,
                      transition: { duration: 0.3, ease: "backOut" }
                    } : {}}
                  >
                    <div className="p-1 text-white text-xs text-center">
                      <div className="text-[6px] font-bold">FRANCE</div>
                      <PlaneIcon className="w-3 h-3 mx-auto text-white" />
                      <div className="text-[6px] mt-1">LETTRE</div>
                    </div>
                    <div className="absolute inset-0 border border-white border-dashed opacity-50 rounded-sm"></div>
                  </motion.div>

                  {/* Cachet postal */}
                  <motion.div
                    className="absolute top-8 left-4 w-16 h-16 rounded-full border-2 border-red-600 bg-red-50/80 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={animationPhase === 'stamp' ? {
                      opacity: [0, 1, 0.8],
                      scale: [0, 1.2, 1],
                      transition: { duration: 0.4, delay: 0.2, ease: "backOut" }
                    } : {}}
                  >
                    <div className="text-center text-red-600 text-xs font-bold">
                      <div>LA RÉUNION</div>
                      <div className="text-[8px]">ENVOYÉ</div>
                      <div className="text-[8px]">{new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Boîte aux lettres de destination */}
                <motion.div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-32"
                  initial={{ opacity: 0, x: 100 }}
                  animate={animationPhase === 'fly' ? {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4, ease: "easeOut" }
                  } : {}}
                >
                  <svg width="80" height="100" viewBox="0 0 80 100" fill="none" className="text-blue-600">
                    <rect x="35" y="60" width="10" height="35" fill="currentColor" />
                    <rect x="10" y="20" width="60" height="45" rx="8" fill="currentColor" />
                    <motion.rect
                      x="15" y="30" width="50" height="25" rx="4" 
                      fill="white" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      animate={animationPhase === 'fly' ? {
                        rotateX: [-10, 0],
                        transition: { duration: 0.2, delay: 0.2 }
                      } : {}}
                      style={{ transformOrigin: 'top center' }}
                    />
                    <rect x="20" y="25" width="40" height="2" fill="currentColor" />
                    <motion.rect
                      x="70" y="35" width="8" height="6" 
                      fill="red"
                      animate={animationPhase === 'fly' ? {
                        rotateZ: [0, 20, 0],
                        transition: { duration: 0.3, delay: 0.3 }
                      } : {}}
                      style={{ transformOrigin: 'left center' }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
            ) : animationPhase === 'complete' ? (
              // Message de confirmation final
              <motion.div
                key="success"
                className="flex items-center justify-center h-[600px]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "backOut" }}
              >
                <div className="bg-white px-8 py-12 rounded-lg shadow-2xl border border-gray-200 text-center relative overflow-hidden max-w-md">
                  {/* Effet de brillance */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-green-600 mb-4">
                      <MailBoxIcon className="w-8 h-8 text-green-600 inline-block mr-2" />
                      Votre demande est envoyée !
                    </div>
                    <div className="text-gray-600">
                      Nous vous recontacterons rapidement
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Informations de contact */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Nos coordonnées
            </h3>
                        <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {method.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
                      <a 
                        href={method.href} 
                        className="text-indigo-600 hover:text-indigo-500 font-medium text-lg block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {method.value}
                      </a>
                      {method.description && (
                        <p className="text-gray-500 text-sm mt-1">{method.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            <div className="mt-10">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Heures d'ouverture
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Lundi - Vendredi: 9h - 18h</p>
                <p className="text-sm text-gray-600">Samedi: 9h - 12h</p>
                <p className="text-sm text-gray-600">Dimanche: Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
