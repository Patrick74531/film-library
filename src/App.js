import FilmLibrary from './pages/film-library'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/homepage'
import NotFound from './pages/not-found'
import FilmDetail, { FilmDetailEmpty } from './pages/film-detail'
import { useFilm } from './context/film-context'

function App() {
  const { filmMap } = useFilm()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="films" element={<FilmLibrary />}>
        <Route index element={<FilmDetailEmpty />} />
        {filmMap.map((item) => (
          <Route
            key={item.id}
            path={`${item.id}`}
            element={<FilmDetail {...item} />}
          />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
