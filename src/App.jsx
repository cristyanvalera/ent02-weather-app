import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { WeatherCard } from './components/WeatherCard';

function App() {
    const [coords, setCoords] = useState();
    const [weather, setWeather] = useState();
    const [temp, setTemp] = useState();

    const success = position => {
        const obj = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        };

        setCoords(obj);
    };

    useEffect(() => {
        if (coords) {
            const API_KEY = '5c8a34f9dc23c58876756ce1bfef8337';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

            axios.get(url)
                .then(res => {
                    let celsius = res.data.main.temp - 273.15;
                    const obj = {
                        celsius: celsius.toFixed(2),
                        fahrenheit: (celsius * (9 / 5) + 32).toFixed(2),
                    };

                    setTemp(obj);
                    setWeather(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [coords])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    return (
        <div>
            <WeatherCard weather={weather} temp={temp} />
        </div>
    );
}

export default App
