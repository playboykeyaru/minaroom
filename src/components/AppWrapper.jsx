import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Room from './Room';
import KittyAi from './KittyAI'; // keep spelling consistent
import Album from './Album';     // <-- added
import Puzzle from './Puzzle';   // <-- added
import MusicPlayer from './MusicPlayer';
import Calendar from './Calendar'; // assuming you have a Calendar component

const AppWrapper = () => {
  const location = useLocation();
  const showButton = location.pathname === '/room';

  return (
    <>
      <MusicPlayer isVisible={showButton} />

      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/room" element={<Room />} />
        <Route path="/kittyai" element={<KittyAi />} />
        <Route path="/album" element={<Album />} />       {/* new */}
        <Route path="/puzzle" element={<Puzzle />} />     {/* new */}
        <Route path="/calendar" element={<Calendar />} /> {/* new */}
      </Routes>
    </>
  );
};

const LoginWrapper = () => {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
};

export default AppWrapper;
