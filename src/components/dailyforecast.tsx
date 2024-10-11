"use client";

import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../context/WeatherContext";

interface DailyForecast {
  dt: number; // Timestamp for the forecast day
  temp: {
    day: number;
  };
  weather: { icon: string; description: string }[];
}

const DailyForecast: React.FC = () => {
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { city } = useWeatherContext();

  const fetchDailyWeatherData = async (city: string) => {
    try {
      setLoading(true); // Start loading state
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

      if (!apiKey) {
        throw new Error("API key is missing");
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=5&appid=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", response.status, errorText);
        throw new Error(`Failed to fetch daily weather data: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.list) {
        setDailyForecast(data.list); // Set daily forecast data (7 days)
      } else {
        throw new Error("Invalid data structure.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    if (city) {
      fetchDailyWeatherData(city);
    }
  }, [city]);

  return (
    <div>
      <div className="flex items-center justify-start my-6">
        <p className="text-3xl uppercase font-bold ml-11">5-Days Forecast for {city}</p>
      </div>
      <hr className="my-2" />

      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4 ml-11 mr-11">
          {dailyForecast.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-4 transition-transform duration-300 hover:scale-105"
            >
              <p className="font-light text-xl">
                {new Date(day.dt * 1000).toLocaleDateString([], {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-16 my-1"
              />
              <p className="font-medium text-xl">{Math.round(day.temp.day)}°C</p>
              <p className="text-sm capitalize">{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
