import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
    const [coords, setCoords] = useState();
    const [weather, setWeather] = useState();

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
                .then(res => setWeather(res.data))
                .catch(err => console.log(err));
        }
    }, [coords])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    return (
        <div>
            <h1>Weather app</h1>
        </div>
    );
}

export default App
