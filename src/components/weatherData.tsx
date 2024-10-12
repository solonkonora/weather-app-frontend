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
      <div className='flex flex-row items-center justify-between text-white py-3'>
        <img src={weather.icon} alt={weather.description} className="w-52 h-52" />
        <p className="text-white font-bold text-5xl">{weather.temperature}°C</p>
        <div className='flex flex-col space-y-2'>

          <div className='flex flex-light text-sm items-center justify-center'>
            <p className="text-lg text-white flex items-center gap-2">
              <img
                src="/assets/images/mist.png"
                alt="Humidity Icon"
                className="w-6 h-6"
              />
              Description: {weather.description}
            </p>
          </div>

          <div className='flex flex-light text-sm items-center justify-center'>
            <p className="text-lg text-white flex items-center gap-2">
              <img
                src="/assets/images/humidity.png"
                alt="Humidity Icon"
                className="w-6 h-6 font-semibold"
              />
              Humidity: {weather.humidity}%
            </p>
          </div>
          <div className='flex flex-light text-sm items-center justify-center'>
            <p className="text-lg text-white flex items-center gap-2">
              <img
                src="/assets/images/wind.png"
                alt="Humidity Icon"
                className="w-6 h-6"
              />
              Wind Speed: {weather.windSpeed}%
            </p>
          </div>
        </div>
      </div>

      {/* <img src={weather.icon} alt={weather.description} className="mx-auto my-4 w-52 h-52" />
      <p className="text-lg text-yellow-400">Temperature: {weather.temperature}°C</p>
      <p className="text-lg text-yellow-400">Description: {weather.description}</p>
      <p className="text-lg text-yellow-400">Humidity: {weather.humidity}%</p>
      <p className="text-lg text-yellow-400">Wind Speed: {weather.windSpeed} m/s</p> */}
    </div>
  );
};

export default WeatherData;
