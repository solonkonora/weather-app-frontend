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
  {/* Use flex-col for mobile and flex-row for medium screens and above */}
  <div className="flex flex-col md:flex-row items-center justify-between text-white py-3 space-y-4 md:space-y-0">
    <img src={weather.icon} alt={weather.description} className="w-32 h-32 md:w-52 md:h-52" />
    
    {/* Center the temperature for mobile and keep it aligned for larger screens */}
    <p className="text-white font-bold text-4xl md:text-5xl">{weather.temperature}°C</p>
    
    <div className="flex flex-col space-y-2">
      <div className="flex text-sm items-center justify-center">
        <p className="text-lg text-white flex items-center gap-2">
          <img
            src="/assets/images/mist.png"
            alt="Mist Icon"
            className="w-6 h-6"
          />
          Description: {weather.description}
        </p>
      </div>

      <div className="flex text-sm items-center justify-center">
        <p className="text-lg text-white flex items-center gap-2">
          <img
            src="/assets/images/humidity.png"
            alt="Humidity Icon"
            className="w-6 h-6"
          />
          Humidity: {weather.humidity}%
        </p>
      </div>

      <div className="flex text-sm items-center justify-center">
        <p className="text-lg text-white flex items-center gap-2">
          <img
            src="/assets/images/wind.png"
            alt="Wind Icon"
            className="w-6 h-6"
          />
          Wind Speed: {weather.windSpeed} km/h
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default WeatherData;

      {/* <img src={weather.icon} alt={weather.description} className="mx-auto my-4 w-52 h-52" />
      <p className="text-lg text-yellow-400">Temperature: {weather.temperature}°C</p>
      <p className="text-lg text-yellow-400">Description: {weather.description}</p>
      <p className="text-lg text-yellow-400">Humidity: {weather.humidity}%</p>
      <p className="text-lg text-yellow-400">Wind Speed: {weather.windSpeed} m/s</p> */}