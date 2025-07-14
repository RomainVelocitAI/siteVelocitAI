import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import ContactSectionWithInlineAnimation from '@/components/sections/ContactSectionWithInlineAnimation';

export default function TestInlineAnimation() {
  const [selectedAnimation, setSelectedAnimation] = useState<'envelope' | 'sphere'>('envelope');

  return (
    <>
      <Head>
        <title>Test Animation Inline - VelocitAI</title>
        <meta name="description" content="Test des animations inline pour la section de contact" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        {/* Header de contrôle */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🎨 Test Animation Inline
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                La section entière se transforme directement (pas de popup)
              </p>

              {/* Sélecteur d'animation */}
              <div className="flex justify-center gap-4 mb-6">
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
                  📮 Animation Enveloppe
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
                  ⚡ Animation Sphère
                </motion.button>
              </div>

              <div className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-2xl mx-auto">
                💡 <strong>Nouveau comportement :</strong> Toute la section de contact se transforme 
                directement en {selectedAnimation === 'envelope' ? 'enveloppe' : 'sphère d\'énergie'} 
                au lieu d'afficher un popup par-dessus.
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section de contact avec animation inline */}
        <ContactSectionWithInlineAnimation 
          key={selectedAnimation} // Force re-render quand on change d'animation
          animationType={selectedAnimation} 
        />

        {/* Footer explicatif */}
        <div className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ✨ Différences avec l'ancienne version
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-2xl mb-2">❌</div>
                <h4 className="font-semibold text-red-800">Avant (popup)</h4>
                <p className="text-sm text-red-700">
                  Un popup apparaissait par-dessus la page avec l'animation
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-semibold text-green-800">Maintenant (inline)</h4>
                <p className="text-sm text-green-700">
                  La section de contact elle-même se transforme directement
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>🎯 Résultat :</strong> Animation beaucoup plus fluide et naturelle, 
                plus impressionnante visuellement car c'est l'interface elle-même qui se transforme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}