import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Custom500() {
  useEffect(() => {
    // Log l'erreur pour monitoring (vous pouvez ajouter Sentry ici)
    console.error('500 error page loaded');
    
    // Tentative de récupération automatique après 3 secondes
    const timer = setTimeout(() => {
      // Vérifier si le site est de nouveau accessible
      fetch('/api/health')
        .then(res => {
          if (res.ok) {
            // Si le site répond, proposer de rafraîchir
            const shouldRefresh = window.confirm(
              'Le site semble de nouveau accessible. Voulez-vous rafraîchir la page ?'
            );
            if (shouldRefresh) {
              window.location.reload();
            }
          }
        })
        .catch(() => {
          // Ignore silencieusement si toujours en erreur
        });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Icône d'erreur animée */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Erreur Serveur (500)
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Notre serveur rencontre temporairement des difficultés. 
            Cela peut arriver après une période d'inactivité. 
            Veuillez rafraîchir la page pour continuer.
          </p>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRefresh}
              className="w-full sm:w-auto inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Rafraîchir la page
            </motion.button>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block border border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  Retour à l'accueil
                </motion.a>
              </Link>
              
              <Link href="/contact">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Nous contacter
                </motion.a>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Astuce :</strong> Si le problème persiste, essayez de vider votre cache 
              navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
            </p>
          </div>
        </div>

        {/* Information technique pour le SEO */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Code d'erreur : 500 | Internal Server Error</p>
          <p>Si ce problème persiste, contactez-nous à support@velocit-ai.fr</p>
        </div>
      </motion.div>
    </div>
  );
}