import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-description">
        Oops! We can't find the page you're looking for.
      </p>
      <button className="not-found-button" onClick={() => navigate('/')}>
        GO BACK HOME
      </button>
    </div>
  )
}

export default NotFound
