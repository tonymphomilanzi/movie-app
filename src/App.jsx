import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import Spinner from './components/Spinner';

import MovieList from './components/MovieList';
import TrailerModal from './components/TrailerModal';
import SideMovieDetail from './components/SideMovieDetail';
import { fetchMovies, fetchMovieDetails, fetchGenres } from './services/movieApi';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const uniqueById = (array) => {
  const seen = new Set();
  return array.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

//Genre Filter Component
const GenreFilter = ({ genres = [], selectedGenres, onToggle }) => {
  if (!genres.length) return null; // Nothing to render

  return (
    <div className="flex overflow-x-auto gap-3 py-4 scrollbar-hide">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onToggle(genre.id)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
            selectedGenres.includes(genre.id)
              ? 'bg-netflix-red text-white'
              : 'bg-netflix-grayDark text-netflix-grayLight'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};


function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const trailerCache = useRef({});
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0 });

  const loadMovies = useCallback(
    async (pageToLoad = 1, replace = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const data = await fetchMovies(activeTab, pageToLoad);
        setTotalPages(data.total_pages);

        setMovies(prev => {
          const combined = replace ? data.results : [...prev, ...data.results];
          return uniqueById(combined);
        });
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    },
    [activeTab]
  );

  useEffect(() => {
    setMovies([]);
    setPage(1);
    loadMovies(1, true);
    setSelectedMovie(null);
  }, [activeTab, loadMovies]);

  useEffect(() => {
    if (inView && !loading && page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [inView, loading, page, totalPages]);

  useEffect(() => {
    if (page === 1) return;
    loadMovies(page);
  }, [page, loadMovies]);

  //Fetch Genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  //Apply Search and Genre Filters
  useEffect(() => {
    let filtered = movies;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(m => m.title.toLowerCase().includes(q));
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter(m =>
        m.genre_ids?.some(id => selectedGenres.includes(id))
      );
    }

    setFilteredMovies(filtered);
  }, [searchQuery, movies, selectedGenres]);

  const toggleGenre = (genreId) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleTrailerClick = async (movie) => {
    if (!trailerCache.current[movie.id]) {
      const details = await fetchMovieDetails(movie.id);
      const trailers = details.videos?.results?.filter(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (!trailers.length) return;
      trailerCache.current[movie.id] = trailers[0].key;
    }
    setTrailerKey(trailerCache.current[movie.id]);
    setShowTrailer(true);
  };

  const handleMovieClick = async (movie) => {
    const details = await fetchMovieDetails(movie.id);
    setSelectedMovie(details);
  };

  const closeSidePanel = () => setSelectedMovie(null);

  const heroMovie = movies[0];

  return (

    <motion.div
      className="bg-netflix-black min-h-screen text-white font-sans"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
         <Navbar />
      <Hero heroMovie={heroMovie} onSearch={setSearchQuery} />

      <div className="px-4 max-w-7xl mx-auto">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <h2 className="text-lg font-semibold text-white mt-8 mb-2 px-1">
  Genres
</h2>


        {/* Genre Filter Bar */}
        <GenreFilter
          genres={genres}
          selectedGenres={selectedGenres}
          onToggle={toggleGenre}
        />

        <MovieList
          movies={filteredMovies}
          loading={loading}
          onMovieClick={handleMovieClick}
          onTrailerClick={handleTrailerClick}
          trailerCache={trailerCache.current}
        />

        {loading && movies.length > 0 && page < totalPages && (
          <div className="text-center py-6 text-netflix-grayLight">
             <Spinner />
          </div>
        )}

        {!loading && page >= totalPages && movies.length > 0 && (
          <div className="text-center py-6 text-netflix-grayLight">
            No more movies to load.
          </div>
        )}

        <div ref={loadMoreRef} className="h-1" />
      </div>

      <TrailerModal
        show={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerKey={trailerKey}
      />

      <  SideMovieDetail movie={selectedMovie} onClose={closeSidePanel} />
    </motion.div>
  );
}

export default App;
