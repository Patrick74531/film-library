import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
const videoID = '_Z3QKkl1WyM';
const HomePage = () => {
  return (
    <div className="App">
      <div className="video-overlay"></div>
      <div className="fullscreen-video-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&loop=1&playlist=${videoID}&controls=0&disablekb=1&cc_load_policy=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className="content">
        <Link to="/films" className="cool-button">
          GO TO MY FILM LIBRARY
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
