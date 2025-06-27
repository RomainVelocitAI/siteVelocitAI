import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

interface LoadingScreenProps {
  loading: boolean;
  message?: string;
  logo?: boolean;
}

const LoadingScreen = ({ loading, message = 'Chargement...', logo = true }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-center"
          >
            {logo && (
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="mb-6"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">V</span>
                </div>
              </motion.div>
            )}
            
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-600 font-medium"
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;