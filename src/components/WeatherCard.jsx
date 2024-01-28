import { useRef, useState } from 'react';
import './styles/weather-card.css';

export const WeatherCard = ({ weather, temp, setInputSearch, hasError }) => {
    const [isCelsius, setisCelsius] = useState(true);

    let unit = !isCelsius ? '°C' : '°F';
    const weatherIcon = weather?.weather[0]?.icon;
    const weatherUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    const handleChange = () => {
        setisCelsius(!isCelsius);
    };

    const city = useRef();

    const search = event => {
        event.preventDefault();

        setInputSearch(city.current.value.toLowerCase().trim());
    };

    return (
        <section className='weather'>
            <h1 className='weather-title'>Weather App</h1>

            <form className='weather-form' onSubmit={search}>
                <input type="text" ref={city} />

                <button>Search</button>
            </form>

            {
                hasError
                    ? <div className='weather-error'>
                        <h2>That city was not found.</h2>
                        <h3>Please, try again.</h3>
                    </div>
                    : <>
                        <h2 className='weather-city'>
                            {weather?.name}, {weather?.sys.country}
                        </h2>

                        <article className='weather-container1'>
                            <figure className='weather-figure'>
                                <img
                                    className='weather-img'
                                    src={weatherUrl}
                                    alt="weather"
                                />
                            </figure>

                            <div>
                                <h3 className='weather-clouds'>
                                    {weather?.weather[0].description}
                                </h3>

                                <ul className='weather-info'>
                                    <li>
                                        <span>Wind Speed: </span><span>{weather?.wind.speed} m/s</span>
                                    </li>
                                    <li>
                                        <span>Clouds: </span><span>{weather?.clouds.all}%</span>
                                    </li>
                                    <li>
                                        <span>Humidity: </span><span>{weather?.main.humidity}%</span>
                                    </li>
                                    <li>
                                        <span>Pressure: </span><span>{weather?.main.pressure} hPa</span>
                                    </li>
                                </ul>

                                <div className='weather-container2'>
                                    <h3 className='wather-temp'>
                                        {isCelsius
                                            ? temp?.celsius + ' °C'
                                            : temp?.fahrenheit + ' °F'
                                        }
                                    </h3>

                                    <button
                                        className='weather-btn'
                                        onClick={handleChange}
                                    >
                                        Change to {unit}
                                    </button>
                                </div>
                            </div>
                        </article>
                    </>
            }
        </section>
    );
}
