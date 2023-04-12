import { useEffect } from 'react';
import FilmLibrary from './pages/film-library';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import NotFound from './pages/not-found';
import FilmDetail, { FilmDetailEmpty } from './pages/film-detail';
import { useFilm } from './context/film-context';
import useFilmLoader from './hooks/load-movies';

function App() {
  const { loadMovies } = useFilmLoader();
  const { films, year, setFilms, setIsLoading } = useFilm();
  useEffect(() => {
    const fechMovies = async () => {
      const response = await loadMovies();

      setFilms(response);

      setIsLoading(false);
    };
    fechMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="films" element={<FilmLibrary />}>
        <Route index element={<FilmDetailEmpty />} />
        {films?.map((item) => (
          <Route
            key={item.id}
            path={`${item.id}`}
            element={<FilmDetail {...item} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
