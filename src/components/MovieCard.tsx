import { PlayCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const MovieCard = ({ movie, onClick, onTrailerClick, showTrailerButton }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'; // Good placeholder!

  return (
    <motion.div // Use motion.div for animation capabilities
      onClick={() => onClick(movie)}
      className="bg-netflix-grayDark rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer group relative"
      // Add Framer Motion props for smoother appearance/disappearance in lists
      layout // Enables smooth layout transitions when elements are added/removed/reordered
      initial={{ opacity: 0, scale: 0.95 }} // Initial state when component mounts
      animate={{ opacity: 1, scale: 1 }}   // Animation state when component is visible
      exit={{ opacity: 0, scale: 0.95 }}    // Animation state when component is unmounted
      transition={{ duration: 0.3 }} // Duration of the transitions
    >
      {/* Aspect Ratio Container for Image */}
      {/* This is the most crucial part for preventing layout shift/flickering */}
      <div className="aspect-w-2 aspect-h-3 w-full bg-netflix-grayDark flex items-center justify-center">
        <img
          src={imageUrl}
          alt={movie.title}
          // The 'object-cover' and 'w-full h-full' ensure the image fills the aspect-ratio container
          className="w-full h-full object-cover"
          loading="lazy" // Optimize image loading by deferring off-screen images
          // Consider adding an `onLoad` prop if you want to fade in the image,
          // but the aspect ratio container already handles the layout shift.
        />
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-white text-sm font-semibold line-clamp-2">{movie.title}</h3>
        <p className="text-netflix-grayLight text-xs line-clamp-2">
          {movie.overview || 'No description available.'}
        </p>

        <div className="flex items-center justify-between text-xs text-netflix-grayLight mt-2">
          <span>{movie.release_date?.split('-')[0]}</span>
          <span>{movie.vote_average?.toFixed(1)} ⭐</span>
        </div>

        {/* You can also add a subtle overlay and show trailer button on hover for a Netflix-like feel */}
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {showTrailerButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent movie click when clicking trailer button
                  onTrailerClick(movie);
                }}
                className="flex items-center gap-2 text-netflix-red hover:text-white text-sm px-4 py-2 rounded-full border border-netflix-red hover:border-white transition-colors"
              >
                <PlayCircle size={20} /> Trailer
              </button>
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent movie click when clicking info button
                    onClick(movie); // Still open side panel on info click
                }}
                className="absolute bottom-3 right-3 flex items-center gap-1 text-white hover:text-netflix-red text-sm transition-colors"
            >
                <Info size={18} /> Info
            </button>
        </div>

      </div>
    </motion.div>
  );
};

export default MovieCard;