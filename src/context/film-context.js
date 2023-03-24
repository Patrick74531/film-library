import React, { useState, createContext, useContext, useEffect } from 'react';

const initialData = {
  id: '',
};
export const FilmsContext = createContext(initialData);

export const FilmProvider = ({ children }) => {
  const [filmId, setFilmId] = useState(initialData.id);
  const [filmMap, setFilmMap] = useState([]);
  const [FilmReview, setFilmReview] = useState('');
  const [page, setPage] = useState(1);
  const [year, setYear] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const initialFilmData = JSON.parse(localStorage.getItem('filmData'));
    const initialYear = JSON.parse(localStorage.getItem('filmYear'));
    // if (initialFilmData) {
    //   setFilmMap(initialFilmData);
    // }
    if (initialYear) {
      setYear(initialYear);
    }
  }, []);

  return (
    <FilmsContext.Provider
      value={{
        filmId,
        setFilmId,
        filmMap,
        setFilmMap,
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
