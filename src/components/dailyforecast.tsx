// "use client";

// import { useEffect } from 'react';
// import { useWeatherContext } from '../context/WeatherContext'; // Adjust the path based on your structure

// const DailyForecast = () => {
//   const { city, dailyForecast, setDailyForecast } = useWeatherContext(); // Get city and forecast from context

//   useEffect(() => {
//     const fetchForecast = async () => {
//       if (city) {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/3.0/onecall?q=${city}&exclude=hourly,minutely,current&appid=YOUR_API_KEY&units=metric`
//         );
//         const data = await response.json();

//         // Check if 'daily' exists in the API response
//         if (data.daily) {
//           const forecastData = data.daily.map((day: any) => ({
//             date: new Date(day.dt * 1000).toLocaleDateString(), // Format date
//             minTemp: day.temp.min,
//             maxTemp: day.temp.max,
//             description: day.weather[0].description,
//             icon: day.weather[0].icon,
//           }));
//           setDailyForecast(forecastData); // Store in context
//         } else {
//           setDailyForecast([]); // If no daily forecast, set an empty array
//         }
//       }
//     };

//     fetchForecast();
//   }, [city, setDailyForecast]); // Refetch when city changes

//   // Ensure dailyForecast is always an array
//   const forecastData = dailyForecast || [];

//   return (
//     <div>
//       <div className="flex items-center justify-start my-6">
//         <p className="text-3xl uppercase font-bold ml-11">
//           5-Days Forecast for {city}
//         </p>
//       </div>
//       <hr className="my-2" />

//       {forecastData.length > 0 ? (
//         forecastData.map((day, index) => {
//           const iconUrl = `http://openweathermap.org/img/wn/${day.icon}@2x.png`;

//           return (
//             <div key={index} className="flex flex-col items-center">
//               <p>{day.date}</p>
//               <img src={iconUrl} alt={day.description} />
//               <p>Min: {day.minTemp}°C</p>
//               <p>Max: {day.maxTemp}°C</p>
//             </div>
//           );
//         })
//       ) : (
//         <p>Loading forecast data...</p>
//       )}
//     </div>
//   );
// };

// export default DailyForecast;



"use client";

"use client";

import { useEffect, useState } from 'react';
import { useWeatherContext } from '../context/WeatherContext';

// Define types
interface Coordinates {
    lat: number;
    lon: number;
}

interface DailyForecast {
    date: string; 
    minTemp: number;
    maxTemp: number;
    icon: string; 
    description: string; 
    temperature: number;
    day: string;
}

const DailyForecast = () => {
  const { city, dailyForecast, setDailyForecast } = useWeatherContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCoordinates = async (city: string): Promise<Coordinates> => {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      return {
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
    };

    const fetchForecast = async (lat: number, lon: number): Promise<DailyForecast[]> => {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch forecast');
      }

      const data = await response.json();
      return data.daily.map((day: any) => ({
        date: new Date(day.dt * 1000).toLocaleDateString(),
        minTemp: day.temp.min,
        maxTemp: day.temp.max,
        icon: day.weather[0].icon,
        description: day.weather[0].description,
      }));
    };

    const fetchWeatherData = async () => {
      if (!city) {
        console.log("No city provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(''); // Reset error state
        const { lat, lon } = await fetchCoordinates(city);
        const forecastData = await fetchForecast(lat, lon);
        setDailyForecast(forecastData);
        console.log("Forecast data set in context:", forecastData);
      } catch (error: any) {
        console.error("Error fetching weather data:", error);
        setError(error.message); // Set error message for UI
        setDailyForecast([]); // Reset forecast data on error
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, setDailyForecast]);

  const forecastData = dailyForecast || [];

  return (
    <div>
      <div className="flex items-center justify-start my-6">
        <p className="text-3xl uppercase font-bold ml-2 sm:ml-11 sm:text-lg">
          5-Day Forecast for {city}
        </p>
      </div>
      <hr className="my-2" />

      {loading ? (
        <p>Loading forecast data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message
      ) : (
        forecastData.length > 0 ? (
          forecastData.map((day, index) => {
            const iconUrl = `http://openweathermap.org/img/wn/${day.icon}@2x.png`;

            return (
              <div key={index} className="flex flex-col items-center">
                <p>{day.date}</p>
                <img src={iconUrl} alt={`Weather icon for ${day.date}`} />
                <p>Min: {day.minTemp}°C</p>
                <p>Max: {day.maxTemp}°C</p>
                <p>{day.description}</p> {/* Display description */}
              </div>
            );
          })
        ) : (
          <p>No forecast data available.</p>
        )
      )}
    </div>
  );
};

export default DailyForecast;