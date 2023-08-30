import React, { useState, useEffect } from 'react';

function FetchWeatherData() {
    const [AirTemperatur, setAirTemperature] = useState(null);
    const [RainAmount, setRainAmount] = useState(null);

    useEffect(() => {
        fetch("https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.93&lon=10.72")
            .then(response => response.json())
            .then(data => {
                setAirTemperature(data.properties.timeseries[0].data.instant.details.air_temperature);
                setRainAmount(data.properties.timeseries[0].data.next_1_hours.details.precipitation_amount);
            })
    });

    return (
        <div>
            <p>{AirTemperatur}</p>
            <p>{RainAmount}</p>
        </div>
    );
}

export default function Weather() {
    return (
        <div>
            <FetchWeatherData />
        </div>
    );
}
