import React, { useState, createContext, useContext } from 'react'

const initialData = {
  id: '',
}
export const FilmsContext = createContext(initialData)

export const FilmProvider = ({ children }) => {
  const [filmId, setFilmId] = useState(initialData.id)
  const [filmMap, setFilmMap] = useState([])
  const [FilmReview, setFilmReview] = useState('')
  return (
    <FilmsContext.Provider
      value={{
        filmId,
        setFilmId,
        filmMap,
        setFilmMap,
        FilmReview,
        setFilmReview,
      }}
    >
      {children}
    </FilmsContext.Provider>
  )
}

export const useFilm = () => useContext(FilmsContext)
