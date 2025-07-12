import { motion, AnimatePresence } from 'framer-motion';

const TrailerModal = ({ show, onClose, trailerKey }) => {
  if (!show) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl bg-black rounded-lg shadow-lg overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="relative pb-[56.25%]">
              {trailerKey ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                  <p>No trailer available</p>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-netflix-red px-4 py-1 rounded-full text-white text-sm hover:bg-red-700 transition"
            >
              Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TrailerModal;
