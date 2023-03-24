import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './index.css';
const ViedoPlayer = ({ embedId, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <HighlightOffIcon />
        </button>
        <div className="modal-content">
          <div className="video-responsive">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViedoPlayer;
