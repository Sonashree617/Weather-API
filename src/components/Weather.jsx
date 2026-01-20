import { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "39350928b586adddb189772bd9c57562";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }

    try {
      setError("");
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch {
      setWeather(null);
      setError("City not found. Please enter a valid city.");
    }
  };

  return (
    <section className="weather-card">
      <h1 className="title">🌦️ Weather Report</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError("");
          }}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>
            📍 {weather.name}, {weather.sys.country}
          </h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="desc">{weather.weather[0].description}</p>

          <div className="extra-info">
            <div>
              💧
              <span>Humidity</span>
              <p>{weather.main.humidity}%</p>
            </div>
            <div>
              🌬️
              <span>Wind</span>
              <p>{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Weather;
