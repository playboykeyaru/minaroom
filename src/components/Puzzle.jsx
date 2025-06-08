import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ROWS = 4;
const COLS = 4;
const totalPics = 47;

const generatePicUrl = (index) => {
  const padded = index.toString().padStart(2, '0');
  return `/minaroom/pic${padded}.jpg`;
};

const shuffleArray = (array) => {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Puzzle = () => {
  const navigate = useNavigate();
  const [pic, setPic] = useState(null);
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  useEffect(() => {
    // Pick a random index from 1 to 47
    const randomIndex = Math.floor(Math.random() * totalPics) + 1;
    const url = generatePicUrl(randomIndex);

    const img = new Image();
    img.src = url;
    img.onload = () => setPic(url);
    img.onerror = () => {
      console.warn(`Failed to load ${url}`);
      setPic(null); // fail silently
    };

    const pieces = Array.from({ length: ROWS * COLS }, (_, i) => i);
    setShuffledPieces(shuffleArray(pieces));
  }, []);

  const swapPieces = (index) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const newPieces = shuffledPieces.slice();
      [newPieces[selectedPiece], newPieces[index]] = [newPieces[index], newPieces[selectedPiece]];
      setShuffledPieces(newPieces);
      setSelectedPiece(null);
    }
  };

  const isSolved = shuffledPieces.every((val, idx) => val === idx);

  if (!pic) return <p style={{ textAlign: 'center' }}>Loading your memory puzzle... refresh page if it doesnt work💞</p>;

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '20px auto',
        padding: 20,
        backgroundColor: '#ffe4f0',
        borderRadius: 20,
        boxShadow: '0 0 15px rgba(255,105,180,0.4)',
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        color: '#d6336c',
        textAlign: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <button
        onClick={() => navigate('/room')}
        title="Back to Room"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: '#ff69b4',
          border: 'none',
          borderRadius: 10,
          padding: '5px 10px',
          color: 'white',
          fontSize: 20,
          cursor: 'pointer',
          boxShadow: '0 3px 8px rgba(255,105,180,0.5)',
        }}
      >
        🏠
      </button>

      <h2 style={{ marginBottom: 10 }}>🧩 Puzzle Time!</h2>
      {isSolved && <p style={{ fontWeight: 'bold', fontSize: 18 }}>🎉 You solved it! Congrats! 🥳</p>}

      <div
        style={{
          width: 400,
          height: 400,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: 4,
          borderRadius: 15,
          border: '4px solid #d6336c',
          margin: '0 auto',
          cursor: 'pointer',
          boxShadow: '0 0 10px #d6336c88 inset',
          backgroundColor: 'white',
        }}
      >
        {shuffledPieces.map((pieceIndex, i) => {
          const row = Math.floor(pieceIndex / COLS);
          const col = pieceIndex % COLS;

          return (
            <div
              key={i}
              onClick={() => swapPieces(i)}
              style={{
                backgroundImage: `url(${pic})`,
                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                backgroundPosition: `${(col * 100) / (COLS - 1)}% ${(row * 100) / (ROWS - 1)}%`,
                backgroundRepeat: 'no-repeat',
                border: selectedPiece === i ? '3px solid #ff69b4' : '1px solid #f8bbd0',
                borderRadius: 8,
                width: '100%',
                height: '100%',
                boxShadow: '0 1px 3px rgba(255,105,180,0.4)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Puzzle;
