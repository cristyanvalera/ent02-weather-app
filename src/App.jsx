import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { WeatherCard } from './components/WeatherCard';

function App() {
    const API_KEY = '5c8a34f9dc23c58876756ce1bfef8337';

    const [coords, setCoords] = useState();
    const [weather, setWeather] = useState();
    const [temp, setTemp] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [inputSearch, setInputSearch] = useState('');
    const [finder, setFinder] = useState();
    const [hasError, setHasError] = useState(false);

    const success = position => {
        const obj = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        };

        setCoords(obj);
    };

    const tempUnits = (res) => {
        let celsius = res.data.main.temp - 273.15;
        const obj = {
            celsius: celsius.toFixed(2),
            fahrenheit: (celsius * (9 / 5) + 32).toFixed(2),
        };

        setTemp(obj);
    };

    useEffect(() => {
        if (coords) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

            axios.get(url)
                .then(res => {
                    tempUnits(res);
                    setHasError(false);
                    setWeather(res.data);
                })
                .catch(err => {
                    setHasError(true);
                    console.log(err);
                })
                .finally(() => setIsLoading(false));
        }
    }, [coords])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    useEffect(() => {
        if (inputSearch) {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=${API_KEY}`;

            axios.get(url)
                .then(res => {
                    tempUnits(res);
                    setHasError(false);
                    setFinder(res.data);
                })
                .catch(err => {
                    setHasError(true);
                    console.log(err);
                });
        }
    }, [inputSearch]);

    return (
        <div className='app'>
            {isLoading
                ? <img
                    src="https://i.gifer.com/ZKZg.gif"
                    alt="loading"
                />
                : inputSearch
                    ? <WeatherCard
                        weather={finder}
                        temp={temp}
                        setInputSearch={setInputSearch}
                        hasError={hasError}
                    />
                    : <WeatherCard
                        weather={weather}
                        temp={temp}
                        setInputSearch={setInputSearch}
                        hasError={hasError}
                    />
            }
        </div>
    );
}

export default App
