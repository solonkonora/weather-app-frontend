// app/components/WeatherOperations.tsx
import React, { useState } from 'react';
import WeatherData from './weatherData'; // Import WeatherData component

interface Weather {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const WeatherOperations: React.FC = () => {
  const [city, setCity] = useState<string>('New York'); // Default city
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather data
  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Search Weather by City</h2>
      <form onSubmit={handleSearch} className="flex gap-2 justify-center mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="p-2 border rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Error or Loading */}
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      {/* Pass weather data to WeatherData component */}
      {weather && <WeatherData weather={weather} />}
    </div>
  );
};

export default WeatherOperations;
