import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useCalculator } from '@/contexts/CalculatorContext';

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
    setIsFlying(true);
    
    try {
      // Envoi vers le webhook N8N
      const response = await fetch('https://n8n.srv765302.hstgr.cloud/webhook/b1446757-4f66-427c-b3da-73de23392de8', {
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
      // Réinitialiser l'animation après la durée complète de l'animation (2.5s)
      setTimeout(() => setIsFlying(false), 2500);
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Prêt à automatiser votre entreprise ?
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discutons de votre projet et trouvons ensemble comment l'automatisation peut vous faire gagner du temps et de l'argent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Contactez-nous
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe vous répond sous 24h ouvrés.
            </p>
            
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
                  <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                    Envoyer le message
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
          </div>

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
