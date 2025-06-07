import React, { useState } from 'react';

const guideTexts = [
  "Hey Mina! Welcome to your Hello Kitty room! I'm here to show you around.",
  "This is the Calendar. Click it to check your special days and letters!",
  "Here's the Puzzle toy. Have fun solving it!",
  "And finally, the Album where all your memories are stored.",
  "That's it! Enjoy exploring your room. You can click me anytime to chat!",
];

const HelloKittyGuide = ({ kittyAiPosition, setHighlightId, onFinish }) => {
  const [step, setStep] = useState(0);

  // Map guide step to which item to highlight (null means no highlight)
  const highlightMap = [null, 'calendar', 'puzzle', 'album', null];

  const nextStep = () => {
    if (step < guideTexts.length - 1) {
      setStep(step + 1);
      setHighlightId(highlightMap[step + 1]);
    } else {
      setHighlightId(null);
      onFinish();
    }
  };

  const skipGuide = () => {
    setHighlightId(null);
    onFinish();
  };

  return (
    <div
      className="hello-kitty-guide"
      style={{
        position: 'absolute',
        top: kittyAiPosition.y,
        left: kittyAiPosition.x,
        width: kittyAiPosition.width,
        height: kittyAiPosition.height,
        pointerEvents: 'none', // prevent blocking clicks on the kitty image itself
      }}
    >
      {/* Invisible clickable overlay on KittyAi to go to chat */}
      <button
        onClick={() => {
          // Navigate to kitty AI chat page on click
          window.location.href = '/kittyai';
        }}
        aria-label="Go to Kitty AI chat"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          pointerEvents: 'auto', // enable button clicks
        }}
      />

      {/* Speech bubble */}
      <div
        className="speech-bubble"
        style={{
          position: 'absolute',
          top: '20%',
          left: kittyAiPosition.width + 15,
          maxWidth: 300,
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '15px 20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          fontSize: '16px',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <p>{guideTexts[step]}</p>
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={skipGuide}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#f06292',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Skip
          </button>
          <button
            onClick={nextStep}
            style={{
              backgroundColor: '#f06292',
              border: 'none',
              color: 'white',
              borderRadius: '5px',
              padding: '5px 15px',
              cursor: 'pointer',
            }}
          >
            {step === guideTexts.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelloKittyGuide;
