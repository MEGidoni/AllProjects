import React, { useContext } from 'react';
import DetailedAltitue from './DetailedAltitue';
import DetailedHSI from './DetailedHSI';
import DetailedADI from './DetailedADI';
import styles from '../../assets/Detailes.module.css'
import NavBar from '../../pages/NavBar';
import INFOCONTEXT from '../../hooks/infoContext';

const AllDetailed = () => {
    const {info} = useContext(INFOCONTEXT);
    return (
        <>
            <NavBar />
            <div className='container mx-auto h-full flex justify-center items-center pt-10'>
                <div className='flex flex-col gap-8'>
                    <div className={styles.detailedBox}>
                        <h2 className={styles.detailedTitle}>Altitude</h2>
                        <div className={styles.detailedContent}>
                            <DetailedAltitue Altitue={info.Altitude} />
                        </div>
                    </div>
                    <div className={styles.detailedBox}>
                        <h2 className={styles.detailedTitle}>HIS</h2>
                        <div className={styles.detailedContent}>
                            <DetailedHSI HSI={info.HIS} />
                        </div>
                    </div>
                    <div className={styles.detailedBox}>
                        <h2 className={styles.detailedTitle}>ADI</h2>
                        <div className={styles.detailedContent}>
                            <DetailedADI ADI={info.ADI} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllDetailed;
