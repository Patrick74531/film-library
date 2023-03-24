import { useFilm } from '../../context/film-context';

const useFilmLoader = () => {
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const { page, year, setIsLoading } = useFilm();
  const loadMovies = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&primary_release_year=${year}`
    )
      .then((data) => data.json())
      .then((data) => data.results)
      .then((data) => data.map((item) => ({ ...item, isFave: false })))
      .catch((err) => console.log(err));
    return response;
  };
  return { loadMovies };
};

export default useFilmLoader;
