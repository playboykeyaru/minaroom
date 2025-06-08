import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Album.css';

const totalPics = 47; // you said pic01.jpg to pic47.jpg
const picsPerPage = 6;

const Album = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  // Generate array of pic URLs for the current page
  const picsThisPage = [];
  for (let i = 1 + page * picsPerPage; i <= Math.min(totalPics, (page + 1) * picsPerPage); i++) {
    const padded = i.toString().padStart(2, '0');
    picsThisPage.push(`/minaroom/pic${padded}.jpg`);
  }

  const canGoPrev = page > 0;
  const canGoNext = (page + 1) * picsPerPage < totalPics;

  return (
    <div className="album-container">
      <button className="home-button" onClick={() => navigate('/room')} title="Back to Room">
        🏠
      </button>

      <h2 className="album-title">📸 Our Memory Album</h2>

      <div className="album-grid">
        {picsThisPage.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Memory ${page * picsPerPage + idx + 1}`}
            className="album-photo"
            draggable={false}
          />
        ))}
      </div>

      <div className="pagination-buttons">
        <button disabled={!canGoPrev} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>
        <button disabled={!canGoNext} onClick={() => setPage(page + 1)}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default Album;
