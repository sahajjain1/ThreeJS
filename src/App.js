import React, { useState } from 'react';
import ThreeScene from './ThreeScene';
import './App.css';

const App = () => {
  const [objectVisibility, setObjectVisibility] = useState({ sphere: true, cube: true, torus: true });
  const [rotationSpeeds, setRotationSpeeds] = useState({ sphere: 0.01, cube: 0.01, torus: 0.01 });

  const handleVisibilityToggle = (object) => {
    setObjectVisibility({ ...objectVisibility, [object]: !objectVisibility[object] });
  };

  const handleSpeedChange = (object, value) => {
    const speed = parseFloat(value);
    if (!isNaN(speed) && speed >= 0) {
      setRotationSpeeds({ ...rotationSpeeds, [object]: speed });
    }
  };

  return (
    <div className="App">
      <ThreeScene objectVisibility={objectVisibility} rotationSpeeds={rotationSpeeds} />
      <div className="controls">
        {Object.keys(objectVisibility).map((object) => (
          <div key={object} className="control-group">
            <button onClick={() => handleVisibilityToggle(object)}>
              Toggle {object}
            </button>
            <div className="slider-group">
              <input
                type="range"
                min="0"
                max="0.1"
                step="0.001"
                value={rotationSpeeds[object]}
                onChange={(e) => handleSpeedChange(object, e.target.value)}
              />
              <input
                type="number"
                value={rotationSpeeds[object]}
                min="0"
                step="0.001"
                onChange={(e) => handleSpeedChange(object, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
