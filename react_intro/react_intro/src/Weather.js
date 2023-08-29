let weatherJSON;

function FetchAPI(){
    fetch("https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.93&lon=10.72")
    .then((Response) => Response.json())
    .then((data) => {weatherJSON = data})
    .then(() => console.log(weatherJSON))
    return(
        <p>{weatherJSON.properties.timeseries[0].data.instant.details.air_temperature}</p>
    )
}

export default function weather(){
    return(
        <FetchAPI />
    );
};