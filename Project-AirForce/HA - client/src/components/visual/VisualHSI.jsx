import React, { useState } from 'react';
import { FaRegCircle } from "react-icons/fa6";
import { BsArrowUp } from "react-icons/bs";
import styles from '../../assets/circle.module.css'


const VisualHSI = ({ HSI }) => {

  const [showHSI, setShowHSI] = useState(false);

  const rotationAngle = HSI % 360;

  const deg = {
    transform: `rotate(${-rotationAngle}deg)`
  };

  const arrowRotation = {
    transform: `rotate(${rotationAngle}deg)`
  };

  const numbers = [];

  for (let i = 0; i <= 360; i += 90) {
    const transformStyle = {
      transform: `rotate(${i}deg) translate(0, -140px)`
    };
    let text = i === 0 || i === 360 ? '0' : i;
    numbers.push(
      <span key={i} className={styles.number} style={transformStyle}>{text}</span>
    );
  }

  return (
    <>
      <div
        onMouseEnter={() => setShowHSI(true)}
        onMouseLeave={() => setShowHSI(false)}
        className={styles.circle} style={deg}>
        {numbers}
        <div style={arrowRotation}>
          <BsArrowUp size={75} />
        </div>
      </div>

      {showHSI && <div className='text-3xl text-red-600'>{HSI}&deg;</div>}

    </>
  );


};

export default VisualHSI;
