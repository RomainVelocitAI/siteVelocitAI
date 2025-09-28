import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    preferences: false,
  })

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Afficher la bannière après un court délai
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    } else {
      // Charger les préférences existantes
      try {
        const savedPreferences = JSON.parse(consent)
        setPreferences(savedPreferences)
        applyPreferences(savedPreferences)
      } catch (e) {
        console.error('Erreur lors du chargement des préférences cookies:', e)
      }
    }
  }, [])

  const applyPreferences = (prefs: typeof preferences) => {
    // Appliquer les préférences (Google Analytics, etc.)
    if (prefs.analytics && typeof window !== 'undefined') {
      // Activer Google Analytics
      window.gtag?.('consent', 'update', {
        'analytics_storage': 'granted'
      })
    } else if (typeof window !== 'undefined') {
      // Désactiver Google Analytics
      window.gtag?.('consent', 'update', {
        'analytics_storage': 'denied'
      })
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      preferences: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
    applyPreferences(allAccepted)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      preferences: false,
    }
    setPreferences(onlyEssential)
    localStorage.setItem('cookieConsent', JSON.stringify(onlyEssential))
    applyPreferences(onlyEssential)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    applyPreferences(preferences)
    setShowBanner(false)
    setShowDetails(false)
  }

  const togglePreference = (key: 'analytics' | 'preferences') => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
            onClick={() => setShowDetails(false)}
          />

          {/* Bannière principale */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8">
                  {/* En-tête */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Préférences de cookies</h3>
                        <p className="text-sm text-gray-500">Nous respectons votre vie privée</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowBanner(false)}
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Message principal */}
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Nous utilisons des cookies pour améliorer votre expérience sur notre site, analyser le trafic et personnaliser le contenu.
                      En cliquant sur "Accepter tout", vous consentez à l'utilisation de tous les cookies.
                      Vous pouvez également personnaliser vos préférences.
                    </p>
                  </div>

                  {/* Section détaillée (collapsible) */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                          {/* Cookies essentiels */}
                          <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">Cookies essentiels</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.
                              </p>
                            </div>
                            <div className="ml-4">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={preferences.essential}
                                  disabled
                                  className="sr-only"
                                />
                                <div className="w-14 h-8 bg-purple-600 rounded-full cursor-not-allowed opacity-75"></div>
                                <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-6"></div>
                              </div>
                            </div>
                          </div>

                          {/* Cookies analytiques */}
                          <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">Cookies analytiques</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Nous aident à comprendre comment les visiteurs utilisent notre site (Google Analytics).
                              </p>
                            </div>
                            <div className="ml-4">
                              <button
                                onClick={() => togglePreference('analytics')}
                                className="relative"
                              >
                                <input
                                  type="checkbox"
                                  checked={preferences.analytics}
                                  readOnly
                                  className="sr-only"
                                />
                                <div className={`w-14 h-8 rounded-full transition-colors ${preferences.analytics ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${preferences.analytics ? 'translate-x-6' : ''}`}></div>
                              </button>
                            </div>
                          </div>

                          {/* Cookies de préférences */}
                          <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">Cookies de préférences</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Permettent de mémoriser vos choix et personnaliser votre expérience.
                              </p>
                            </div>
                            <div className="ml-4">
                              <button
                                onClick={() => togglePreference('preferences')}
                                className="relative"
                              >
                                <input
                                  type="checkbox"
                                  checked={preferences.preferences}
                                  readOnly
                                  className="sr-only"
                                />
                                <div className={`w-14 h-8 rounded-full transition-colors ${preferences.preferences ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${preferences.preferences ? 'translate-x-6' : ''}`}></div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Boutons d'action */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                      Refuser tout
                    </button>

                    {!showDetails ? (
                      <button
                        onClick={() => setShowDetails(true)}
                        className="px-6 py-3 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg font-medium transition-colors"
                      >
                        Personnaliser
                      </button>
                    ) : (
                      <button
                        onClick={handleSavePreferences}
                        className="px-6 py-3 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg font-medium transition-colors"
                      >
                        Sauvegarder mes préférences
                      </button>
                    )}

                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-all transform hover:scale-105"
                    >
                      Accepter tout
                    </button>
                  </div>

                  {/* Liens vers les pages légales */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      En savoir plus sur notre utilisation des cookies :{' '}
                      <a href="/politique-confidentialite" className="text-purple-600 hover:text-purple-700 underline">
                        Politique de confidentialité
                      </a>{' '}
                      |{' '}
                      <a href="/mentions-legales" className="text-purple-600 hover:text-purple-700 underline">
                        Mentions légales
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner