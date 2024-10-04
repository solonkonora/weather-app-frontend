// app/components/WeatherData.tsx
import React from 'react';

interface WeatherProps {
  weather: {
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  };
}

const WeatherData: React.FC<WeatherProps> = ({ weather }) => {
  return (
    <div className="text-center mt-6">
      <h3 className="text-2xl font-bold">Weather in Your City</h3>
      <img src={weather.icon} alt={weather.description} className="mx-auto my-4" />
      <p className="text-lg">Temperature: {weather.temperature}°C</p>
      <p className="text-lg">Description: {weather.description}</p>
      <p className="text-lg">Humidity: {weather.humidity}%</p>
      <p className="text-lg">Wind Speed: {weather.windSpeed} m/s</p>
    </div>
  );
};

export default WeatherData;
