import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import ContactSectionComparison from '@/components/sections/ContactSectionComparison';

export default function AnimationDemo() {
  const [selectedAnimation, setSelectedAnimation] = useState<'both' | 'envelope' | 'sphere'>('both');

  return (
    <>
      <Head>
        <title>Démo Animations - VelocitAI</title>
        <meta name="description" content="Comparaison des animations de formulaire de contact VelocitAI" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        {/* Header de la page de démo */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                🎨 Démonstration des Animations
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Comparez deux animations ultra-classe pour le formulaire de contact VelocitAI. 
                Testez les deux pour choisir celle qui correspond le mieux à votre vision.
              </p>

              {/* Sélecteur d'affichage */}
              <div className="flex justify-center gap-4 mb-8">
                <motion.button
                  onClick={() => setSelectedAnimation('both')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedAnimation === 'both'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  👥 Comparaison côte à côte
                </motion.button>
                <motion.button
                  onClick={() => setSelectedAnimation('envelope')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedAnimation === 'envelope'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📮 Enveloppe seule
                </motion.button>
                <motion.button
                  onClick={() => setSelectedAnimation('sphere')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedAnimation === 'sphere'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⚡ Sphère seule
                </motion.button>
              </div>

              {/* Statistiques/métriques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">3.5s</div>
                  <div className="text-sm text-blue-800">Durée Enveloppe</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">3.2s</div>
                  <div className="text-sm text-purple-800">Durée Sphère</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-green-800">Phases Animation</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">24</div>
                  <div className="text-sm text-yellow-800">Particules Max</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="py-8">
          {selectedAnimation === 'both' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Comparaison côte à côte */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    🆚 Comparaison des Animations
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Testez les deux animations et choisissez celle qui convient le mieux à l'image premium de VelocitAI.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Animation Enveloppe */}
                  <motion.div
                    className="bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white text-center">
                      <h3 className="text-xl font-bold">📮 Animation Enveloppe Postale</h3>
                      <p className="text-sm opacity-90">Pliage 3D → Cachetage → Envol</p>
                    </div>
                    <ContactSectionComparison
                      animationType="envelope"
                      title="Test Animation Enveloppe"
                      description="Le formulaire se plie pour former une enveloppe, reçoit un timbre et s'envole vers une boîte aux lettres."
                    />
                  </motion.div>

                  {/* Animation Sphère */}
                  <motion.div
                    className="bg-white rounded-2xl shadow-xl border border-purple-200 overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white text-center">
                      <h3 className="text-xl font-bold">⚡ Animation Sphère Énergétique</h3>
                      <p className="text-sm opacity-90">Compression → Pulsation → Explosion</p>
                    </div>
                    <ContactSectionComparison
                      animationType="sphere"
                      title="Test Animation Sphère"
                      description="Le formulaire se compresse en sphère d'énergie qui pulse puis explose en particules dorées."
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedAnimation === 'envelope' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ContactSectionComparison
                animationType="envelope"
                title="Animation Enveloppe Postale"
                description="Une animation élégante qui transforme votre formulaire en enveloppe postale. Le formulaire se plie sur lui-même, reçoit un timbre français et s'envole vers une boîte aux lettres."
              />
            </motion.div>
          )}

          {selectedAnimation === 'sphere' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ContactSectionComparison
                animationType="sphere"
                title="Animation Sphère Énergétique"
                description="Une animation spectaculaire qui compresse le formulaire en sphère d'énergie lumineuse. Après plusieurs pulsations, elle explose en particules dorées pour révéler le message de confirmation."
              />
            </motion.div>
          )}
        </div>

        {/* Footer de la démo */}
        <div className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎯 Critères de Comparaison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">⏱️</div>
                <h4 className="font-semibold text-gray-900">Performance</h4>
                <p className="text-sm text-gray-600">Fluidité et optimisation GPU</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-semibold text-gray-900">Impact Visuel</h4>
                <p className="text-sm text-gray-600">Mémorabilité et wow effect</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🏢</div>
                <h4 className="font-semibold text-gray-900">Image de Marque</h4>
                <p className="text-sm text-gray-600">Cohérence avec VelocitAI</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note :</strong> Cette page de démonstration est uniquement accessible en interne. 
                Les deux animations utilisent la même logique métier et envoient vers le même webhook N8N.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}