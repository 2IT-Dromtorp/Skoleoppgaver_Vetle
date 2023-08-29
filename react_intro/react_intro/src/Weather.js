import React, { useState, useEffect } from 'react';

function fetchWeatherData() {
    return fetch("https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.93&lon=10.72")
        .then(response => response.json())
        .then(data => {
            return data.properties.timeseries[0].data.instant.details.air_temperature;
        })
}

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchWeatherData()
            .then(temp => {
                setWeatherData(temp);
            });
    }, []);

    return (
        <div>
            {weatherData && <p>{weatherData}</p>}
        </div>
    );
}
