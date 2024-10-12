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

    const { city } = useWeatherContext();

    const fetchWeatherData = async (city: string) => {
        try {
            setLoading(true); // Start loading state
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

            if (!apiKey) {
                throw new Error("API key is missing");
            }

            // Log the API URL to ensure it's correct
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                // Log the response status and text for debugging
                const errorText = await response.text();
                console.error("Error response:", response.status, errorText);
                throw new Error(`Failed to fetch weather data: ${response.status}`);
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


    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    return (
        // <div>
        //     <div className="flex items-center justify-start my-6">
        //         <p className="text-3xl uppercase font-bold ml-11">Hourly forecast for {city}</p>
        //     </div>
        //     <hr className="my-2 " />

        //     {error ? (
        //         <p>Error: {error}</p>
        //     ) : loading ? (
        //         <p>Loading...</p>
        //     ) : (
        //         <div className="flex flex-row items-center justify-between mt-4 ml-11 mr-11">
        //             {hourlyForecast.map((hour, index) => (
        //                 <div
        //                     key={index}
        //                     className="flex flex-col items-center justify-center bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-4 transition-transform duration-300 hover:scale-105"
        //                 >
        //                     <p className="font-light text-xl">
        //                         {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        //                     </p>
        //                     <img
        //                         src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
        //                         alt="Weather Icon"
        //                         className="w-16 my-1" // Increased icon size for better visibility
        //                     />
        //                     <p className="font-medium text-xl">{Math.round(hour.main.temp)}°C</p>
        //                 </div>
        //             ))}
        //         </div>

        //     )}
        // </div>

        <div>
  <div className="flex items-center justify-start my-6">
    <p className="text-3xl uppercase font-bold ml-2 sm:ml-11 sm:text-lg">Hourly forecast for {city}</p>
  </div>
  <hr className="my-2" />

  {error ? (
    <p>Error: {error}</p>
  ) : loading ? (
    <p>Loading...</p>
  ) : (
    <div className="flex flex-col sm:flex-row items-center justify-start sm:justify-between mt-4 mx-2 sm:mx-11">
      {hourlyForecast.map((hour, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-4 transition-transform duration-300 hover:scale-105 mb-4 sm:mb-0 sm:mr-4"
        >
          <p className="font-light text-xl">
            {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="w-16 my-1" // Increased icon size for better visibility
          />
          <p className="font-medium text-xl">{Math.round(hour.main.temp)}°C</p>
        </div>
      ))}
    </div>
  )}
</div>

    );
};

export default Forecast;
