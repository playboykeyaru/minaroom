// src/MusicPlayer.jsx

import React, { useRef, useState, useEffect } from 'react';

const playlist = [
  '/minaroom/sounds/song1.mp3',
  '/minaroom/sounds/song2.mp3',
  '/minaroom/sounds/song3.mp3',
  '/minaroom/sounds/song4.mp3',
];

const MusicPlayer = ({ isVisible }) => {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * playlist.length));
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = playlist[currentIndex];
    audio.load();
    audio.play().catch(() => setIsPlaying(false));
  }, [currentIndex]);

  const handleEnded = () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        preload="auto"
        autoPlay
      />

      {isVisible && (
        <div
          onClick={togglePlay}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: 'rgba(255, 105, 180, 0.95)',
            borderRadius: 30,
            padding: '12px 24px',
            boxShadow: '0 0 15px rgba(255, 20, 147, 0.8)',
            cursor: 'pointer',
            userSelect: 'none',
            zIndex: 1000,
            fontWeight: 'bold',
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '1.1rem',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isPlaying ? '🔊 Pause' : '🔈 Play'}
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
