import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useFilm } from '../../context/film-context';
import FilmRow from '../film-row';
import YearDropdown from '../../components/year-dropdown';
import useFilmLoader from '../../hooks/load-movies';
import './index.css';

function FilmLibrary() {
  const { films, setFilms, page, setPage, setYear, setIsLoading } = useFilm();
  const [isFave, setIsFave] = useState(false);
  const { loadMovies } = useFilmLoader();
  const navigate = useNavigate();

  useEffect(() => {
    const fechMovies = async () => {
      const response = await loadMovies();

      setFilms([...films, ...response]);
      localStorage.setItem('filmData', JSON.stringify([...films, ...response]));
      setIsLoading(false);
    };
    if (page > 1) {
      fechMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMoreMovies = () => {
    setPage(() => page + 1);
  };

  const handleIsFave = () => {
    setIsFave(true);
  };
  const handleIsAll = () => {
    setIsFave(false);
  };
  const handleAddFave = (film) => {
    const faveList = [...films];
    const updatedFilms = faveList.map((item) => {
      if (item.id === film.id) {
        return { ...item, isFave: true };
      }
      return item;
    });
    setFilms(updatedFilms);
  };
  const handleRemoveFave = (film) => {
    const faveList = [...films];
    const updatedFilms = faveList.map((item) => {
      if (item.id === film.id) {
        return { ...item, isFave: false };
      }
      return item;
    });
    setFilms(updatedFilms);
  };
  const handleChangeYear = (year) => {
    // setFilms([]);
    setYear(year);
    localStorage.setItem('filmYear', JSON.stringify(year));
    navigate('/films');
  };

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>

        <YearDropdown handleChangeYear={handleChangeYear} />
        <div className="film-list-filters">
          <button
            onClick={handleIsAll}
            className={`film-list-filter ${isFave ? '' : 'is-active'}`}
          >
            ALL
            <span className="section-count">{films.length}</span>
          </button>
          <button
            onClick={handleIsFave}
            className={`film-list-filter ${isFave ? '' : 'is-active'}`}
          >
            FAVES
            <span className="section-count">
              {films.filter((item) => item.isFave).length}
            </span>
          </button>
        </div>
        {(isFave ? films.filter((item) => item.isFave) : films).map((item) => (
          <FilmRow
            key={item.id}
            handleAddFave={handleAddFave}
            handleRemoveFave={handleRemoveFave}
            {...item}
          />
        ))}

        <button className="load-more" onClick={loadMoreMovies}>
          loadMoreMovies
        </button>
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>

        <Outlet />
      </div>
    </div>
  );
}

export default FilmLibrary;
