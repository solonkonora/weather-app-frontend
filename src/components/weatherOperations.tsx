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
  const [city, setCity] = useState<string>(''); // Default to empty string
  const [weather, setWeather] = useState<Weather | null>(null); // Initialize as null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather data
  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      setWeather(null); // Clear previous weather data

      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Correct way to access env variable
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
    <div
    className="bg-cover bg-center min-h-screen w-full flex justify-center items-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1650&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    }}
/* <div
  className="bg-cover bg-center min-h-screen w-full flex justify-center items-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    or try this
    "url('https://images.unsplash.com/photo-1687393581999-cd26923b8aba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg4fHx8ZW58MHx8fHx8')",
    "url('https://images.unsplash.com/photo-1623684003870-fca853da2d21?q=80&w=1534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }} */
>
  <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg w-2/3 h-2/3 flex flex-col justify-center">
    <h2 className="text-2xl font-semibold text-white mb-6 text-center">
      Search Weather by City
    </h2>
    <form onSubmit={handleSearch} className="flex gap-2 justify-center mb-6">
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

    {/* Loading state */}
    {loading && <div className="text-gray-500 text-center">Loading...</div>}

    {/* Error state */}
    {error && <div className="text-red-500 text-center">Error: {error}</div>}

    {/* Render WeatherData only after a successful search */}
    {weather && (
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 text-center">
          Weather in {city}
        </h3>
        <WeatherData weather={weather} />
      </div>
    )}
  </div>
</div>

  );
};

export default WeatherOperations;
