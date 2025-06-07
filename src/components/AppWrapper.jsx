// in AppWrapper.jsx
import React, { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Room from './Room';

const AppWrapper = () => {
  const musicRef = useRef(new Audio('/minaroom/cute-waiting-music.mp3'));

  useEffect(() => {
    musicRef.current.loop = true;
  }, []);

  return (
    <BrowserRouter basename="/minaroom">
      <Routes>
        <Route path="/" element={<Login musicRef={musicRef} />} />
        <Route path="/room" element={<Room musicRef={musicRef} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppWrapper;
