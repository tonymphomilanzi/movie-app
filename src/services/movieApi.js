const API_KEY = import.meta.env.API_KEY; // replace this with your actual TMDb key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (category = 'trending', page = 1) => {
  let url = '';

  switch (category) {
    case 'popular':
      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
      break;
    case 'latest':
      url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`;
      break;
    case 'trending':
    default:
      url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`;
      break;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return await response.json();
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return await response.json();
};



export const fetchGenres = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};

