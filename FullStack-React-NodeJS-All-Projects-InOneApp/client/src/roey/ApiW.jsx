import React, { useState, useEffect } from 'react';
import styles from '../css/w.module.css';

const ApiW = ({ x, y, loc }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        const currentDate = new Date()
        let dayOfMonth = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hour = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        setTime({ hour: hour, minutes: minutes, seconds: seconds, dayOfMonth: dayOfMonth, month: month, year: year })
        const fetchData = async () => {
            const formattedTime = currentDate.toISOString().slice(0, 19).replace(' ', 'T');
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${x},${y}/today?unitGroup=metric&key=U8DS6TXWGK6TH54GND9KF7Y2Q&contentType=json`;
            try {
                const response = await fetch(url)

                const data = await response.json();

                // console.log(data);

                setWeatherData(data);

            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, [x,y,loc]);



    return (
        <>
            <h1 className='text-3xl'>Weather Forecast</h1>
            <br/>
            <br/>
            <div>
                {
                    weatherData &&
                    <div className={styles.weatherInfo}>
                        <p className={styles.location}>Location: {loc}</p>
                        <p className={styles.date}>
                            Date: {`${weatherData.currentConditions.datetime} , ${time.dayOfMonth}/${time.month}/${time.year}`}
                        </p>
                        <p className={styles.temperature}>Temperature: {weatherData.currentConditions.feelslike}°C</p>
                        <p className={styles.conditions}>Conditions: {weatherData.currentConditions.conditions}</p>
                    </div>
                }
            </div>
        </>
    );
};

export default ApiW;
