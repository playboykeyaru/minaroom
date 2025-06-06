import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Room from './components/Room'; // this will be the main room

function App() {
  return (
    <BrowserRouter basename="/minaroom">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
