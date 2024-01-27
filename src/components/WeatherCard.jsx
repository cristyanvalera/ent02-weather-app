import { useState } from 'react'

export const WeatherCard = ({ weather, temp }) => {
    const [isCelsius, setisCelsius] = useState(true);

    const changeToFahrenheit = () => {
        setisCelsius(!isCelsius);
    };

    let unit = !isCelsius ? '°C' : '°F';
    let weatherIcon = weather?.weather[0]?.icon;
    let weatherUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    return (
        <section>
            <h1>Weather App</h1>

            <h2>{weather?.name}, {weather?.sys.country}</h2>

            <article>
                <figure>
                    <img src={weatherUrl} alt="weather" />
                </figure>

                <div>
                    <h3>{weather?.weather[0].description}</h3>

                    <ul>
                        <li>
                            <span>Wind Speed: {weather?.wind.speed} m/s</span>
                        </li>
                        <li>
                            <span>Clouds: {weather?.clouds.all}%</span>
                        </li>
                        <li>
                            <span>Humidity: {weather?.main.humidity}%</span>
                        </li>
                        <li>
                            <span>Pressure: {weather?.main.pressure} hPa</span>
                        </li>
                    </ul>

                    <div>
                        <h3>
                            {isCelsius
                                ? temp?.celsius + ' °C'
                                : temp?.fahrenheit + ' °F'
                            }
                        </h3>

                        <button onClick={changeToFahrenheit}>
                            Change to {unit}
                        </button>
                    </div>
                </div>
            </article>
        </section>
    );
}
