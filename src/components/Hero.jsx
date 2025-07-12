import { useState } from 'react';
import { X } from 'lucide-react'; // Optional: lightweight icon, or replace with text/icon

const Hero = ({ heroMovie, onSearch }) => {
  const [query, setQuery] = useState('');

  const bgImage = heroMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
    : '';

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="pt-12">
      <div
        className="relative h-[100vh] w-full flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

        <div className="relative z-10 max-w-4xl text-center px-4">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            {heroMovie?.title}
          </h1>
          <p className="text-lg max-w-3xl mx-auto mb-8 line-clamp-3 text-netflix-grayLight">
            {heroMovie?.overview}
          </p>

          {/* Input Wrapper */}
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={handleInputChange}
              className="w-full px-5 py-3 pr-10 rounded-full text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />

            {/* Clear Button */}
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-netflix-grayDark hover:text-netflix-red"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
