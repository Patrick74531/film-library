import { useNavigate } from 'react-router-dom'
import { useFilm } from '../../context/film-context'
import './index.css'

const FilmRow = (props) => {
  const {
    id,
    title,
    poster_path,
    release_date,
    handleAddFave,
    handleRemoveFave,
    isFave,
  } = props
  const { setFilmReview } = useFilm()
  const navigate = useNavigate()
  const handleNavigate = () => {
    setFilmReview('')
    navigate(`/films/${id}`)
  }
  return (
    <div className="FilmRow">
      <img
        src={`https://image.tmdb.org/t/p/w780${poster_path}`}
        alt={`${title}film poster`}
      />
      <div className="film-summary">
        <h3>{title}</h3>
        <p>{release_date.substring(0, 4)}</p>
        <div className="actions">
          {isFave ? (
            <button className="action" onClick={() => handleRemoveFave(props)}>
              <span className="material-icons">remove_from_queue</span>
            </button>
          ) : (
            <button className="action" onClick={() => handleAddFave(props)}>
              <span className="material-icons">add_to_queue</span>
            </button>
          )}

          <button className="action" onClick={handleNavigate}>
            <span className="material-icons">read_more</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilmRow
