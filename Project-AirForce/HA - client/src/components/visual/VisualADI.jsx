import React, { useState } from 'react';

const VisualADI = ({ ADI }) => {
  const [showADI, setShowADI] = useState(false);

  const circleStyle = {
    position: 'relative',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'green',
    overflow: 'hidden',
  };

  const fillStyle = {
    width: '100%',
    height: `${ADI}%`,
    background: 'blue',
  };

  return (
    <>
      <div
        className='border-4 border-black'
        onMouseEnter={() => setShowADI(true)}
        onMouseLeave={() => setShowADI(false)}
        style={circleStyle}
      >
        <div style={fillStyle}></div>
      </div>
      {showADI && <div className='text-3xl text-red-600'>{ADI}&deg;</div>}
    </>
  );
};

export default VisualADI;
