import { useState, createContext, useContext, useEffect } from 'react';

const initialData = {
  id: '',
};
export const FilmsContext = createContext(initialData);

export const FilmProvider = ({ children }) => {
  const [filmId, setFilmId] = useState(initialData.id);
  const [FilmReview, setFilmReview] = useState('');
  const [page, setPage] = useState(1);
  const [year, setYear] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    let initialYear;

    if (localStorage.getItem('filmYear')) {
      initialYear = JSON.parse(localStorage.getItem('filmYear'));
    } else {
      initialYear = 2022;
    }

    if (initialYear) {
      setYear(initialYear);
    }
  }, []);

  return (
    <FilmsContext.Provider
      value={{
        filmId,
        setFilmId,
        films,
        setFilms,
        FilmReview,
        setFilmReview,
        page,
        setPage,
        year,
        setYear,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
};

export const useFilm = () => useContext(FilmsContext);
