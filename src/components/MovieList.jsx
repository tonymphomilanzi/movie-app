import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence

const MovieList = ({ movies = [], loading, onMovieClick, onTrailerClick, trailerCache }) => {
  return (
    // We remove the initial/animate/transition from the parent motion.div
    // to let AnimatePresence and individual MovieCards handle the animations.
    // However, if you want a subtle fade-in for the *entire grid* on tab change,
    // you can keep them, but it might override individual card animations.
    // For smoother *content updates*, it's often better to let children animate.
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
      {loading && movies.length === 0 ? (
        // Show skeletons if loading and no movies yet
        Array.from({ length: 10 }).map((_, idx) => (
          <MovieCardSkeleton key={idx} />
        ))
      ) : (
        // Use AnimatePresence to handle exit animations for items that are removed
        // (e.g., when filtering or changing tabs)
        <AnimatePresence mode="popLayout"> {/* 'popLayout' ensures removed items animate out */}
          {movies.map((movie) => (
            // Key is absolutely critical for React and Framer Motion to track items
            <MovieCard
              key={movie.id} // Ensure a stable and unique key
              movie={movie}
              onClick={onMovieClick} // Pass the function directly
              onTrailerClick={onTrailerClick} // Pass the function directly
              showTrailerButton={!!trailerCache[movie.id]}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default MovieList; 