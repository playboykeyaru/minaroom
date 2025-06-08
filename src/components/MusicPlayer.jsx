import React, { useState, useEffect, useRef } from 'react';

const songs = [
  "/minaroom/sounds/song1.mp3",
  "/minaroom/sounds/song2.mp3",
  "/minaroom/sounds/song3.mp3",
  "/minaroom/sounds/song4.mp3",
];

const MusicPlayer = ({ isVisible }) => {
  const musicRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(() => Math.floor(Math.random() * songs.length));

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.src = songs[currentSongIndex];
    }
  }, []);

  const handleSongEnd = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    if (musicRef.current) {
      musicRef.current.src = songs[nextIndex];
      musicRef.current.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    if (!musicRef.current) return;
    if (isPlaying) {
      musicRef.current.pause();
      setIsPlaying(false);
    } else {
      musicRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={musicRef} preload="auto" onEnded={handleSongEnd} />
      {isVisible && (
        <button
          className="music-button"
          onClick={togglePlay}
          title="Play one of the 4 songs I picked for you 🎵"
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            backgroundColor: '#ff69b4',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            zIndex: 1000,
          }}
        >
          {isPlaying ? '🔈 Pause' : '🔊 Play'}
        </button>
      )}
    </>
  );
};

export default MusicPlayer;
