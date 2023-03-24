import React, { useState, createContext, useContext, useEffect } from 'react';

const initialData = {
  id: '',
};
export const FilmsContext = createContext(initialData);

export const FilmProvider = ({ children }) => {
  // let initialFilmData;
  // if (localStorage.getItem('filmData')) {
  //   initialFilmData = JSON.parse(localStorage.getItem('filmData'));
  // } else {
  //   initialFilmData = [];
  // }
  const [filmId, setFilmId] = useState(initialData.id);
  const [FilmReview, setFilmReview] = useState('');
  const [page, setPage] = useState(1);
  const [year, setYear] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filmMap, setFilmMap] = useState([]);

  useEffect(() => {
    let initialYear;
    if (localStorage.getItem('filmYear')) {
      initialYear = JSON.parse(localStorage.getItem('filmYear'));
    } else {
      initialYear = 2022;
    }

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
