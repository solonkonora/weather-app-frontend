"use client";

import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../context/WeatherContext";

interface HourlyForecast {
  dt: number; // Timestamp for the forecast
  main: {
    temp: number;
  };
  weather: { icon: string }[];
}

const Forecast: React.FC = () => {
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { city } = useWeatherContext(); // Get city from context

  // Fetch weather data based on location (city name or lat/lon)
  const fetchWeatherData = async (location: string | { lat: number; lon: number }) => {
    try {
      setLoading(true); // Start loading state
      setError(null);   // Clear previous errors

      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing");
      }

      let apiUrl = "";

      if (typeof location === "string" && location.trim() !== "") {
        // Fetch using city name
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
      } else if (typeof location === "object") {
        // Fetch using latitude and longitude
        const { lat, lon } = location;
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      } else {
        throw new Error("Invalid location data");
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch weather data: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (data && data.list) {
        setHourlyForecast(data.list.slice(0, 5)); // Get the first 5 hours of forecast
      } else {
        throw new Error("Invalid data structure.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Fetch current location weather on component mount
  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData({ lat: latitude, lon: longitude }); // Fetch weather data using latitude and longitude
        },
        (error) => {
          setError("Failed to retrieve location.");
          console.error("Geolocation error:", error);
          // Optional: fallback to a default city (e.g., New York) if geolocation fails
          fetchWeatherData("New York");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      // Optional: fallback to a default city (e.g., New York) if geolocation is not supported
      fetchWeatherData("New York");
    }
  };

  // Handle both city search and current location forecast
  useEffect(() => {
    if (city && city.trim() !== "") {
      fetchWeatherData(city); // Fetch for searched city
    } else {
      fetchCurrentLocationWeather(); // Fetch for current location if no city is provided
    }
  }, [city]); // Trigger whenever the `city` state changes

  return (
    <div className="p-4">
      <div className="flex items-center justify-start my-6">
        <p className="text-lg uppercase font-bold ml-2 sm:ml-11 sm:text-2xl md:text-3xl">
          Hourly forecast for {city || "current location"}
        </p>
      </div>
      <hr className="my-2 border-gray-300" />
  
      {error ? (
        <p className="text-red-500 font-semibold">Error: {error}</p>
      ) : loading ? (
        <p className="text-gray-600 font-semibold">Loading...</p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-start sm:justify-between flex-wrap gap-4 mt-4 mx-2 sm:mx-11">
          {hourlyForecast.map((hour, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 bg-opacity-30 rounded-lg shadow-lg p-6 w-32 sm:w-48 mb-4 sm:mb-0 sm:mr-4"
            >
              <p className="font-light text-lg sm:text-xl text-gray-700">
                {new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="w-12 sm:w-16 my-2"
              />
              <p className="font-medium text-xl text-gray-800">
                {Math.round(hour.main.temp)}°C
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default Forecast;
