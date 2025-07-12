import { motion, AnimatePresence } from 'framer-motion';

const SideMovieDetail = ({ movie, onClose }) => {
  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  const sideVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }, // smooth slide out
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7 },
    exit: { opacity: 0 }, // fade out
  };

  const transitionConfig = {
    type: 'spring',
    stiffness: 250,
    damping: 25,
    duration: 0.4, // smoothens both enter and exit
  };

  return (
    <AnimatePresence mode="wait">
      {movie && (
        <>
          {/* Overlay */}
          <motion.div
            key={`overlay-${movie.id}`}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={onClose}
            style={{ pointerEvents: 'auto' }}
          />

          {/* Side panel */}
          <motion.div
            key={`panel-${movie.id}`}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-netflix-black text-white z-50 flex flex-col overflow-y-auto"
            variants={sideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transitionConfig}
            style={{ pointerEvents: 'auto' }}
          >
            {/* Backdrop image + Close button */}
            <div
              className="h-56 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${backdrop})`, pointerEvents: 'auto' }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 bg-netflix-red rounded-full px-3 py-1 text-white font-semibold hover:bg-red-700 transition"
                style={{ cursor: 'pointer', pointerEvents: 'auto', zIndex: 1000 }}
                aria-label="Close side panel"
              >
                Close
              </button>

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"
                style={{ pointerEvents: 'none' }}
              />
            </div>

            {/* Movie info */}
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p className="text-sm text-netflix-grayLight">{movie.overview}</p>

              <div className="flex flex-wrap gap-2 text-xs">
                {movie.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="bg-netflix-red px-3 py-1 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm text-netflix-grayLight">
                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                <span>{movie.release_date?.split('-')[0]}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMovieDetail;
