import React, { useContext } from 'react';
import VisualAlt from './VisualAlt';
import VisualHSI from './VisualHSI';
import VisualADI from './VisualADI';
import NavBar from '../../pages/NavBar';
import INFOCONTEXT from '../../hooks/infoContext';

const AllVisuals = () => {
    const {info} = useContext(INFOCONTEXT);

    return (
        <>
            <NavBar />
            <div className='container mx-auto px-4 py-8'>
                <div className='flex flex-col md:flex-row md:justify-between gap-8'>
                    <div className='text-center flex flex-col items-center'>
                        <span className='mb-5 text-3xl'>Altitue</span>
                        <VisualAlt Altitue={info.Altitude} />
                    </div>
                    <div className='text-center flex flex-col items-center'>
                        <span className='mb-5 text-3xl'>HIS</span>
                        <VisualHSI HSI={info.HIS} />
                    </div>
                    <div className='text-center flex flex-col items-center'>
                        <span className='mb-5 text-3xl'>ADI</span>
                        <VisualADI ADI={info.ADI} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllVisuals;
