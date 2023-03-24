import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import { useFilm } from '../../context/film-context';
import './index.css';

function NotFound() {
  const navigate = useNavigate();
  const { isLoading } = useFilm();
  console.log(isLoading);
  return (
    <div className="not-found-container">
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className="not-found-title">404</h1>
          <p className="not-found-description">
            Oops! We can't find the page you're looking for.
          </p>
          <button className="not-found-button" onClick={() => navigate('/')}>
            GO BACK HOME
          </button>
        </Fragment>
      )}
    </div>
  );
}

export default NotFound;
