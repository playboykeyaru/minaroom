// src/AppWrapper.jsx

import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Room from './Room';
import MusicPlayer from './MusicPlayer';

const AppWrapper = () => {
  const location = useLocation();
  const showButton = location.pathname === '/room';

  return (
    <>
      <MusicPlayer isVisible={showButton} />
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </>
  );
};

const LoginWrapper = () => {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
};

export default AppWrapper;
