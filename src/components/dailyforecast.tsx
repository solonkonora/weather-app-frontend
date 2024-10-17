http://api.openweathermap.org/data/2.5/forecast?units=metric&&lat=${lat}&lon=${lon}&appid=${apiKey}

"use client";

import { useEffect, useState } from 'react';
import { useWeatherContext } from '../context/WeatherContext';

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
    day: string;
    temperature: number;
}

const DailyForecast = () => {
    const { city, dailyForecast = [], setDailyForecast } = useWeatherContext(); // Default to an empty array
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Function to fetch coordinates based on city name
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

    // Function to fetch daily forecast based on coordinates
    const fetchForecast = async (lat: number, lon: number): Promise<DailyForecast[]> => {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch forecast');
        }

        const data = await response.json();

        // Log the entire data response to check its structure
        console.log("API response:", data);

        // Group forecast by date
        const forecastByDay: Record<string, DailyForecast> = {};

        data.list.forEach((entry: any) => {
            const date = new Date(entry.dt * 1000);
            const dateString = date.toLocaleDateString();
            const dayName = date.toLocaleDateString(undefined, { weekday: 'long' }); // Get day name
            const temp = entry.main.temp;
            const minTemp = entry.main.temp_min;
            const maxTemp = entry.main.temp_max;
            const icon = entry.weather[0].icon;
            const description = entry.weather[0].description;

            // Check if we already have data for this date
            if (!forecastByDay[dateString]) {
                forecastByDay[dateString] = {
                    date: dateString,
                    minTemp,
                    maxTemp,
                    icon,
                    description,
                    day: dayName, // Assign day name
                    temperature: (minTemp + maxTemp) / 2, // Compute average temperature
                };
            } else {
                // Update min/max temperatures
                // Update min/max temperatures if we already have an entry for this date
                forecastByDay[dateString].minTemp = Math.min(forecastByDay[dateString].minTemp, minTemp);
                forecastByDay[dateString].maxTemp = Math.max(forecastByDay[dateString].maxTemp, maxTemp);
                forecastByDay[dateString].temperature = (forecastByDay[dateString].minTemp + forecastByDay[dateString].maxTemp) / 2;

            }
        });

        return Object.values(forecastByDay); // Convert the object back into an array
    };

    // Function to fetch weather data based on the city or current location
    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            setError(''); // Reset error state

            if (!city) {
                console.log("No city provided, fetching current location.");
                fetchCurrentLocationWeather(); // Fetch current location if no city is provided
                return;
            }

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

    // Function to fetch weather data for current location using geolocation
    const fetchCurrentLocationWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const forecastData = await fetchForecast(latitude, longitude);
                        setDailyForecast(forecastData);
                    } catch (error: any) {
                        setError(error.message); // Set error message for UI
                        setDailyForecast([]); // Reset forecast data on error
                    }
                },
                (error) => {
                    setError("Failed to retrieve location.");
                    console.error("Geolocation error:", error);
                    fetchWeatherData(); // Attempt to fetch using city if geolocation fails
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            fetchWeatherData(); // Attempt to fetch using city if geolocation is not supported
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [city, setDailyForecast]);

    return (
        <div>
            <div className="flex items-center justify-start my-6">
                <p className="text-3xl uppercase font-bold ml-2 sm:ml-11 sm:text-lg">
                    5-Day Forecast for {city || "current location"}
                </p>
            </div>
            <hr className="my-2" />
    
            {loading ? (
                <p>Loading forecast data...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p> // Display error message
            ) : dailyForecast.length > 0 ? (  // Fix: Remove the extra curly braces here
                <div className="space-y-4">
                    {dailyForecast.map((day, index) => {
                        const iconUrl = `http://openweathermap.org/img/wn/${day.icon}@2x.png`;
    
                        return (
                            <div key={index} className="flex items-center bg-white rounded-lg shadow-md p-4 space-x-6">
                                <div className="flex flex-col items-start">
                                    <p className="text-lg font-semibold text-gray-700">{day.day}</p> {/* Display Day Name */}
                                    <p className="text-gray-500">{day.date}</p> {/* Display Date */}
                                </div>
                                <img className="w-12 h-12" src={iconUrl} alt={`Weather icon for ${day.date}`} /> {/* Weather Icon */}
                                <div className="flex flex-col">
                                    <p className="text-blue-600 font-bold">Min: {day.minTemp}°C</p>
                                    <p className="text-red-600 font-bold">Max: {day.maxTemp}°C</p>
                                </div>
                                <p className="italic text-gray-600">{day.description}</p> {/* Weather Description */}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No forecast data available.</p>
            )}
        </div>
    );
} 

export default DailyForecast;
