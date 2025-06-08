import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Room.css';
import './HelloKittyGuide.css';

const nextSoundUrl = '/minaroom/sounds/next-click.mp3';
const doneSoundUrl = '/minaroom/sounds/done-chime.mp3';

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

const guideSteps = [
  { text: "Hewwo Mina! I'm Kitty! Let me show you how your room works ✨", highlight: null },
  { text: "This is your calendar! Each day has a love letter for you 💌", highlight: 'calendar' },
  { text: "This is ! Click ia puzzle that you can do during your free time 🎮", highlight: 'puzzle' },
  { text: "This is your awbum... full of memories 📸", highlight: 'album' },
  { text: "And if you ever need to talk to me... click on me! i will be your friend! 💬", highlight: 'KittyAi' },
];

const Room = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isGuideActive, setIsGuideActive] = useState(() => {
    return sessionStorage.getItem('guideSeen') !== 'true';
  });
  const [isBouncing, setIsBouncing] = useState(false);
  const nextSound = useRef(new Audio(nextSoundUrl));
  const doneSound = useRef(new Audio(doneSoundUrl));

  useEffect(() => {
    if (!isGuideActive) return;

    if (step > 0 && step < guideSteps.length) {
      setIsBouncing(true);
      nextSound.current.play().catch(() => {});
      const bounceTimeout = setTimeout(() => setIsBouncing(false), 600);
      return () => clearTimeout(bounceTimeout);
    }
  }, [step, isGuideActive]);

  const handleNext = () => {
    if (step < guideSteps.length - 1) {
      setStep(step + 1);
    } else {
      doneSound.current.play().catch(() => {});
      sessionStorage.setItem('guideSeen', 'true');
      setIsGuideActive(false);
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem('guideSeen', 'true');
    setIsGuideActive(false);
  };

  const currentHighlight = isGuideActive ? guideSteps[step].highlight : null;

  const handleNavigate = (link, itemId) => {
    if (!isGuideActive || itemId === 'KittyAi') {
      navigate(link);
    }
  };

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
          key={link}
          src={src}
          alt={alt}
          className={`clickable-item ${
            isGuideActive && currentHighlight !== id && !(step === 0 && id === 'KittyAi') ? 'dimmed' : ''
          } ${currentHighlight === id ? 'highlighted-item' : ''}`}
          style={{ top: y, left: x, width, height }}
          onClick={() => handleNavigate(link, id)}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter') handleNavigate(link, id);
          }}
          role="button"
          aria-label={`Go to ${alt}`}
          draggable={false}
        />
      ))}

      {isGuideActive && (
        <div className="hello-kitty-guide" style={{ zIndex: 50 }}>
          <div className={`speech-bubble ${isBouncing ? 'bounce' : ''}`}>
            <p>{guideSteps[step].text}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="next-button" onClick={handleNext}>
                {step < guideSteps.length - 1 ? 'Next' : 'Done'}
              </button>
              <button className="next-button" onClick={handleSkip}>
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
