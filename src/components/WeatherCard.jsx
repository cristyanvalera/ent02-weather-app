import { useState } from 'react';
import './styles/weather-card.css';

export const WeatherCard = ({ weather, temp }) => {
    const [isCelsius, setisCelsius] = useState(true);

    const changeToAnotherUnit = () => {
        setisCelsius(!isCelsius);
    };

    let unit = !isCelsius ? '°C' : '°F';
    const weatherIcon = weather?.weather[0]?.icon;
    const weatherUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    return (
        <section className='weather'>
            <h1 className='weather-title'>Weather App</h1>

            <h2 className='weather-city'>
                {weather?.name}, {weather?.sys.country}
            </h2>

            <article className='weather-container'>
                <figure className='weather-figure'>
                    <img
                        className='weather-img'
                        src={weatherUrl}
                        alt="weather"
                    />
                </figure>

                <div className='weather'>
                    <h3 className='weather-clouds'>{weather?.weather[0].description}</h3>

                    <ul className='weather-info'>
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

                    <div className='weather-container2'>
                        <h3 className='weather-temp'>
                            {isCelsius
                                ? temp?.celsius + ' °C'
                                : temp?.fahrenheit + ' °F'
                            }
                        </h3>

                        <button
                            className='weather-btn'
                            onClick={changeToAnotherUnit}
                        >
                            Change to {unit}
                        </button>
                    </div>
                </div>
            </article>
        </section>
    );
}
