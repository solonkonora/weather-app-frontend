import React, { useState, useEffect } from 'react';
import WeatherData from './weatherData';
import { useWeatherContext } from '../context/WeatherContext';

interface Weather {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const WeatherOperations: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null); // Initialize as null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('/assets/images/house3.jpg'); // Set default image initially, State to store background image URL

  const { city, setCity } = useWeatherContext();

  // Function to map weather conditions to background images
  const getBackgroundImage = (description: string) => {
    switch (description.toLowerCase()) {
      case 'rain':
        return '/assets/images/rain.png';
      case 'heavy intensity rain':
        return '/assets/images/rain.png';
      case 'very heavy rain':
        return '/assets/images/rain.png';
      case 'light rain':
        return '/assets/images/drizzle.png';
      case 'moderate rain':
        return '/assets/images/drizzle.png';
      case 'drizzle':
        return '/assets/images/drizzle.png';
      case 'clear sky':
        return '/assets/images/sunny.jpg';
      case 'few clouds':
        return '/assets/images/clear.png';
      case 'overcast clouds':
        return '/assets/images/clouds.png';
      case 'broken clouds':
        return '/assets/images/clouds.png';
      case 'snow':
        return '/assets/images/snow.jpg';
      case 'light snow':
        return '/assets/images/snow.jpg';
      default:
        return '/assets/images/house3.jpg';
    }
  };

  // Function to fetch weather data
  const fetchWeather = async (location: string | { lat: number, lon: number }) => {
    try {
      setLoading(true);
      setError(null);
      setWeather(null); // Clear previous weather data

      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      let url;

      if (typeof location === 'string') {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
      } else {
        const { lat, lon } = location;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();

      const weatherData = {
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };

      setWeather(weatherData);
      setLoading(false);

      // Change background image based on the weather condition
      setBackgroundImage(getBackgroundImage(weatherData.description));
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
      setWeather(null); // Clear weather data on error
    }
  };

  // Fetch current location weather on component mount
  useEffect(() => {
    if (!city) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          fetchWeather('New York'); // Default to New York if location access fails
        }
      );
    } else {
      fetchWeather(city.trim());
    }
  }, [city]);
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError("City cannot be empty");
      return;
    }
    fetchWeather(city.trim());
  };

  return (
    <div
      className="bg-cover bg-center min-h-[calc(100vh-4rem)] w-full flex justify-center items-center pt-16"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Dynamically set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
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
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Search
          </button>
        </form>

        {/* Loading state */}
        {loading && <div className="text-gray-500 text-center">Loading...</div>}

        {/* Error state */}
        {error && <div className="text-red-500 text-center">Error: {error}</div>}

        {/* Render WeatherData only after a successful search or geolocation fetch */}
        {weather && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Weather in {city || "current location"}
            </h3>
            <WeatherData weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherOperations;


