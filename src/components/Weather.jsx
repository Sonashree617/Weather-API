import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

      if (response.data.cod !== 200) {
        throw new Error("Invalid city");
      }

      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found. Please enter a valid city name.");
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="desc">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
