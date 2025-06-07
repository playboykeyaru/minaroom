import React, { useEffect, useRef } from 'react';

const MusicPlayer = ({ play }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/minaroom/cute-waiting-room-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.preload = 'auto';
    }
    if (play) {
      audioRef.current.play().catch(() => {
        // silence failed play errors
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [play]);

  return null; // no UI
};

export default MusicPlayer;
