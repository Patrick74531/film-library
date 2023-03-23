import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { FilmProvider } from './context/film-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FilmProvider>
        <App />
      </FilmProvider>
    </BrowserRouter>
  </React.StrictMode>
)
