import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useFilm } from '../../context/film-context'
import FilmRow from '../film-row'
import YearDropdown from '../../components/year-dropdown'
import './index.css'

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY
function FilmLibrary() {
  const { filmMap, setFilmMap } = useFilm()
  const [isFave, setIsFave] = useState(false)
  const [page, setPage] = useState(1)
  const [year, setYear] = useState(2022)

  const loadMovies = () => {
    setPage(page + 1)
  }

  const handleIsFave = () => {
    setIsFave(true)
  }
  const handleIsAll = () => {
    setIsFave(false)
  }
  const handleAddFave = (e) => {
    let faveList = [...filmMap]
    const updatedFilms = faveList.map((item) => {
      if (item.id === e.id) {
        return { ...item, isFave: true }
      }
      return item
    })
    setFilmMap(updatedFilms)
  }
  const handleRemoveFave = (e) => {
    let faveList = [...filmMap]
    const updatedFilms = faveList.map((item) => {
      if (item.id === e.id) {
        return { ...item, isFave: false }
      }
      return item
    })
    setFilmMap(updatedFilms)
  }
  const handleChangeYear = (e) => {
    setFilmMap([])
    setYear(e)
  }

  useEffect(() => {
    const loadMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&primary_release_year=${year}`
      )
        .then((data) => data.json())
        .then((data) => data.results)
        .then((data) => data.map((item) => ({ ...item, isFave: false })))
        .catch((err) => console.log(err))

      setFilmMap([...filmMap, ...response])
    }
    loadMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, year])

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>

        <YearDropdown handleChangeYear={handleChangeYear} />
        <div className="film-list-filters">
          <button
            onClick={handleIsAll}
            className={`film-list-filter ${!isFave && 'is-active'}`}
          >
            ALL
            <span className="section-count">{filmMap.length}</span>
          </button>
          <button
            onClick={handleIsFave}
            className={`film-list-filter ${isFave && 'is-active'}`}
          >
            FAVES
            <span className="section-count">
              {filmMap.filter((item) => item.isFave === true).length}
            </span>
          </button>
        </div>

        {!isFave &&
          filmMap.map((item) => (
            <FilmRow
              key={item.id}
              handleAddFave={handleAddFave}
              handleRemoveFave={handleRemoveFave}
              {...item}
            />
          ))}
        {isFave &&
          filmMap
            .filter((item) => item.isFave === true)
            .map((item) => (
              <FilmRow
                key={item.id}
                handleAddFave={handleAddFave}
                handleRemoveFave={handleRemoveFave}
                {...item}
              />
            ))}
        <button className="load-more" onClick={loadMovies}>
          loadMoreMovies
        </button>
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default FilmLibrary
