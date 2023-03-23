import { useState } from 'react'
import ViedoPlayer from '../../components/vedio-player'
import YouTubeIcon from '@mui/icons-material/YouTube'
import './index.css'
import FilmReview from '../../components/film-review'

const API_KEY = process.env.REACT_APP_YTB_API_KEY

function FilmDetail(props) {
  const { backdrop_path, poster_path, title, overview, tagline } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ytbFilmId, setYtbFilmId] = useState('')

  const fechFlilmClipId = () => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${title}&type=video&videoDefinition=high&maxResults=1&key=${API_KEY}`
    )
      .then((data) => data.json())
      .then((data) => setYtbFilmId(data.items[0].id.videoId))
      .catch((err) => console.log(err))
  }
  const handleModalToggle = () => {
    fechFlilmClipId()
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
          alt={`${title} backdrop`}
        />

        <h1 className="film-title">{title}</h1>
        <span className="film-play-button" onClick={handleModalToggle}>
          <YouTubeIcon />
        </span>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={`https://image.tmdb.org/t/p/w780/${poster_path}`}
            className="film-detail-poster"
            alt={`${title} poster`}
          />

          <b className="film-detail-tagline">{tagline}</b>
          {overview}
        </p>
      </div>
      <div>
        <FilmReview title={title} />
      </div>
      <ViedoPlayer
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        embedId={ytbFilmId}
      />
    </div>
  )
}

export function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  )
}

export default FilmDetail
