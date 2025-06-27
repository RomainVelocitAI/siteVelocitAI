import { NextPageContext } from 'next'
import { motion } from 'framer-motion'
import Head from 'next/head'

interface ErrorProps {
  statusCode?: number
  hasGetInitialPropsRun?: boolean
  err?: Error
}

function Error({ statusCode, hasGetInitialPropsRun, err }: ErrorProps) {
  const getErrorMessage = (code?: number) => {
    switch (code) {
      case 404:
        return {
          title: 'Page non trouvée',
          description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
          emoji: '🔍'
        }
      case 500:
        return {
          title: 'Erreur serveur',
          description: 'Une erreur s\'est produite sur nos serveurs. Veuillez réessayer plus tard.',
          emoji: '⚙️'
        }
      default:
        return {
          title: 'Une erreur s\'est produite',
          description: 'Quelque chose s\'est mal passé. Veuillez réessayer plus tard.',
          emoji: '⚠️'
        }
    }
  }

  const errorInfo = getErrorMessage(statusCode)

  return (
    <>
      <Head>
        <title>{statusCode ? `Erreur ${statusCode}` : 'Erreur'} - Velocit.AI</title>
        <meta name="description" content={errorInfo.description} />
        <meta name="robots" content="noindex" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-6xl mb-6">{errorInfo.emoji}</div>
            
            {statusCode && (
              <div className="text-4xl font-bold text-purple-600 mb-4">
                {statusCode}
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {errorInfo.title}
            </h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {errorInfo.description}
            </p>
            
            {process.env.NODE_ENV === 'development' && err && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Détails de l'erreur (développement)
                </summary>
                <pre className="p-3 bg-gray-100 rounded text-xs overflow-auto text-left">
                  {err.message}
                  {'\n'}
                  {err.stack}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.history.back()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Retour
              </motion.button>
              
              <motion.a
                href="/"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Accueil
              </motion.a>
            </div>
            
            {statusCode === 404 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-4 bg-purple-50 rounded-lg"
              >
                <p className="text-sm text-purple-700">
                  💡 Astuce : Vérifiez l'URL ou utilisez notre menu de navigation
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error