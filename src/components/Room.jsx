import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Room.css';

const items = [
  {
    id: 'KittyAi',
    src: '/minaroom/KittyAi.png',
    alt: 'Kitty AI',
    x: 0,
    y: 219,
    width: 333,
    height: 338,
    link: '/kittyai',
  },
  {
    id: 'calendar',
    src: '/minaroom/calendar.png',
    alt: 'Calendar',
    x: 127,
    y: 106,
    width: 90,
    height: 56,
    link: '/calendar',
  },
  {
    id: 'puzzle',
    src: '/minaroom/puzzle.png',
    alt: 'Puzzle',
    x: 781,
    y: 79,
    width: 112,
    height: 99,
    link: '/puzzle',
  },
  {
    id: 'album',
    src: '/minaroom/album.png',
    alt: 'Album',
    x: 1024,
    y: 100,
    width: 183,
    height: 86,
    link: '/album',
  },
];

const background = {
  src: '/minaroom/HKbedroom.jpg',
  x: -1.666671633720398,
  y: -1.6666686534881592,
  width: 1283,
  height: 562,
};

const Room = () => {
  const navigate = useNavigate();

  return (
    <div className="room-container">
      <img
        src={background.src}
        alt="Background"
        className="background-image"
        style={{
          top: background.y,
          left: background.x,
          width: background.width,
          height: background.height,
        }}
        draggable={false}
      />
      {items.map(({ id, src, alt, x, y, width, height, link }) => (
        <img
          key={id}
          src={src}
          alt={alt}
          className="clickable-item"
          style={{ top: y, left: x, width, height }}
          onClick={() => navigate(link)}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter') navigate(link);
          }}
          role="button"
          aria-label={`Go to ${alt}`}
          draggable={false}
        />
      ))}
    </div>
  );
};

export default Room;
