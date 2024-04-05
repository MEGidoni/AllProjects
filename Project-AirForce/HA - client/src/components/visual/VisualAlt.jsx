import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";


const VisualAlt = ({ Altitue }) => {

    const [showAltitue, setShowAltitue] = useState(false);

    const arrowMarginTop = (320 / 3000) * Altitue - ((320 / 3000) * Altitue) / 10;
    return (
        <>
            <div
                className='flex'>
                <div
                    onMouseEnter={() => setShowAltitue(true)}
                    onMouseLeave={() => setShowAltitue(false)}
                    className='border-4 border-black w-28 h-80 relative'>
                    <div className="h-full w-full flex justify-center items-center text-center relative">
                        <div className="h-full w-1  absolute left-1/2 transform -translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                        </div>
                        <div className="absolute top-0 w-full flex flex-col items-center">
                            <div className="text-xs text-red-700 mt-2 font-bold">3000</div>
                            <div className="text-xs text-red-700 mt-20 font-bold">2000</div>
                            <div className="text-xs text-red-700 mt-20 font-bold">1000</div>
                            <div className="text-xs text-red-700 mt-20 font-bold">0</div>
                        </div>
                    </div>
                </div>
                <div
                    onMouseEnter={() => setShowAltitue(true)}
                    onMouseLeave={() => setShowAltitue(false)}
                    className='w-10 h-80 relative'>
                    <FaArrowLeft size={30} style={{ bottom: `${arrowMarginTop}px`, position: "absolute", left: "10%", zIndex: 10 }} />
                </div>
            </div>
            {showAltitue && <div className='text-3xl text-red-600'>{Altitue}&deg;</div>}

        </>
    );
}

export default VisualAlt