import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import './LayoutEditor.css';

const basePath = import.meta.env.BASE_URL || '/';

const images = [
  { id: 'background', src: `${basePath}HKbedroom.jpg`, alt: 'Background', isBackground: true },
  { id: 'KittyAi', src: `${basePath}KittyAi.png`, alt: 'Kitty AI' },
  { id: 'calendar', src: `${basePath}calendar.png`, alt: 'Calendar' },
  { id: 'puzzle', src: `${basePath}puzzle.png`, alt: 'Puzzle' },
  { id: 'album', src: `${basePath}album.png`, alt: 'Album' },
];

const LayoutEditor = () => {
  const [items, setItems] = useState(
    images.map(img => ({
      ...img,
      x: img.isBackground ? 0 : 100,
      y: img.isBackground ? 0 : 100,
      width: img.isBackground ? 800 : 150,
      height: img.isBackground ? 450 : 150,
    }))
  );

  const onDragResize = (id, data) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, x: data.x, y: data.y, width: data.width, height: data.height }
          : item
      )
    );
  };

  const exportLayout = () => {
    const json = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(json)
      .then(() => alert('Layout copied to clipboard!'))
      .catch(() => alert('Failed to copy layout.'));
  };

  return (
    <div className="layout-editor-wrapper">
      <button onClick={exportLayout} className="export-button">Export Layout</button>
      <div className="layout-editor">
        {items.map(({ id, src, alt, x, y, width, height, isBackground }) => (
          <Rnd
            key={id}
            size={{ width, height }}
            position={{ x, y }}
            onDragStop={(e, d) => onDragResize(id, { x: d.x, y: d.y, width, height })}
            onResizeStop={(e, direction, ref, delta, position) =>
              onDragResize(id, {
                x: position.x,
                y: position.y,
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              })
            }
            bounds="parent"
            enableResizing={true}
            disableDragging={false}
            className={isBackground ? 'background-image' : 'movable-image'}
          >
            <img
              src={src}
              alt={alt}
              style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
              draggable={false}
            />
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default LayoutEditor;
