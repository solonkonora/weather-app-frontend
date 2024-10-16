// "use client";
// import {
//     type Dispatch,
//     type SetStateAction,
//     createContext,
//     useContext,
//     useState
// } from "react";

// interface WeatherContextType {
//     city: string;
//     setCity: Dispatch<SetStateAction<string>>;
// };

// const WeatherContext = createContext<WeatherContextType>({} as WeatherContextType);

// function WeatherContextProvider({ children }: { children: React.ReactNode; }) {
//     const [city, setCity] = useState<string>("");

//     return (
//         <WeatherContext.Provider value={{ city, setCity }}>
//             {children}
//         </WeatherContext.Provider>
//     );
// }

// const useWeatherContext = () => useContext(WeatherContext);

// export {
//     WeatherContextProvider,
//     useWeatherContext,
// }


"use client";

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// Define a DailyForecast type (adjust as needed based on the API response)
interface DailyForecast {
  day: string;
  minTemp: number;
  maxTemp: number;
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

interface WeatherContextType {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  dailyForecast: DailyForecast[]; // Add daily forecast state
  setDailyForecast: Dispatch<SetStateAction<DailyForecast[]>>;
}

const WeatherContext = createContext<WeatherContextType>({} as WeatherContextType);

function WeatherContextProvider({ children }: { children: React.ReactNode }) {
  const [city, setCity] = useState<string>("");
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]); // Initialize daily forecast state

  return (
    <WeatherContext.Provider value={{ city, setCity, dailyForecast, setDailyForecast }}>
      {children}
    </WeatherContext.Provider>
  );
}

// Custom hook to use the weather context
const useWeatherContext = () => useContext(WeatherContext);

export { WeatherContextProvider, useWeatherContext };
