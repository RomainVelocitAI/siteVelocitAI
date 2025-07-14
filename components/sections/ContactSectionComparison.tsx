import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useCalculator } from '@/contexts/CalculatorContext';
import { useFormAnimation, AnimationType } from '@/hooks/useFormAnimation';
import EnvelopeAnimation from '@/components/animations/EnvelopeAnimation';
import SphereAnimation from '@/components/animations/SphereAnimation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactSectionComparisonProps {
  animationType: AnimationType;
  title: string;
  description: string;
}

export default function ContactSectionComparison({ 
  animationType, 
  title, 
  description 
}: ContactSectionComparisonProps) {
  const { generateFormMessage, tasks } = useCalculator();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  
  const {
    isSubmitting,
    isAnimating,
    showSuccess,
    startSubmission,
    completeAnimation,
    resetAnimation,
  } = useFormAnimation(animationType);

  // Mettre à jour le message avec les données du calculateur uniquement si des tâches existent
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setFormData(prev => ({
        ...prev,
        message: generateFormMessage()
      }));
    }
  }, [generateFormMessage, tasks]);

  // Reset après succès
  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        resetAnimation();
        setSubmitStatus(null);
      }, 3000);
    }
  }, [showSuccess, resetAnimation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startSubmission();
    
    try {
      // Simulation d'envoi (remplacez par votre logique réelle)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
          source: `VelocitAI Website Contact Form - ${animationType} animation`,
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
        resetAnimation();
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setSubmitStatus({
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.'
      });
      resetAnimation();
    }
  };

  const handleAnimationComplete = () => {
    completeAnimation();
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
    <>
      {/* Animations d'overlay */}
      {animationType === 'envelope' && (
        <EnvelopeAnimation 
          isSubmitting={isAnimating} 
          onAnimationComplete={handleAnimationComplete}
        />
      )}
      
      {animationType === 'sphere' && (
        <SphereAnimation 
          isSubmitting={isAnimating} 
          onAnimationComplete={handleAnimationComplete}
        />
      )}

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header personnalisé */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>

            {/* Badge de l'animation */}
            <motion.div
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full border border-purple-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="text-2xl">
                {animationType === 'envelope' ? '📮' : '⚡'}
              </span>
              <span className="text-sm font-semibold text-purple-700">
                Animation {animationType === 'envelope' ? 'Enveloppe Postale' : 'Sphère Énergétique'}
              </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <motion.div 
              className={`bg-white p-8 rounded-xl shadow-lg border-l-4 ${
                animationType === 'envelope' ? 'border-blue-500' : 'border-purple-500'
              } relative`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">
                  {animationType === 'envelope' ? '📮' : '⚡'}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Audit Stratégique Personnalisé
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`${
                      animationType === 'envelope' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    } text-xs font-semibold px-2 py-1 rounded-full`}>
                      TEST {animationType.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              {submitStatus && !isAnimating && (
                <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor={`name-${animationType}`} className="block text-sm font-medium text-gray-700">
                    Votre nom <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id={`name-${animationType}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className={`block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-${
                        animationType === 'envelope' ? 'blue' : 'purple'
                      }-500 focus:border-${
                        animationType === 'envelope' ? 'blue' : 'purple'
                      }-500 disabled:opacity-50`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`email-${animationType}`} className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id={`email-${animationType}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className={`block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-${
                        animationType === 'envelope' ? 'blue' : 'purple'
                      }-500 focus:border-${
                        animationType === 'envelope' ? 'blue' : 'purple'
                      }-500 disabled:opacity-50`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`phone-${animationType}`} className="block text-sm font-medium text-gray-700">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      id={`phone-${animationType}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className={`block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-${
                        animationType === 'envelope' ? 'blue' : 'purple'
                      }-500 focus:border-${
                        animationType === 'envelope' ? 'blue' : 'purple'
                      }-500 disabled:opacity-50`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`message-${animationType}`} className="block text-sm font-medium text-gray-700">
                    Votre message <span className="text-gray-400 text-xs">(optionnel)</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id={`message-${animationType}`}
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-${
                        animationType === 'envelope' ? 'blue' : 'purple'
                      }-500 focus:border-${
                        animationType === 'envelope' ? 'blue' : 'purple'
                      }-500 font-mono text-sm disabled:opacity-50`}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${
                      animationType === 'envelope' ? 'blue' : 'purple'
                    }-600 hover:bg-${
                      animationType === 'envelope' ? 'blue' : 'purple'
                    }-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
                      animationType === 'envelope' ? 'blue' : 'purple'
                    }-500 transition-colors disabled:opacity-70 relative overflow-hidden`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-50' : 'opacity-100'}`}>
                      {animationType === 'envelope' ? '📮' : '⚡'} Tester l'animation {animationType === 'envelope' ? 'Enveloppe' : 'Sphère'}
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
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
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}