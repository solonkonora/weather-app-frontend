"use client";

import {
    type Dispatch,
    type SetStateAction,
    createContext,
    useContext,
    useState
} from "react";

interface WeatherContextType {
    city: string;
    setCity: Dispatch<SetStateAction<string>>;
};

const WeatherContext = createContext<WeatherContextType>({} as WeatherContextType);

function WeatherContextProvider({ children }: { children: React.ReactNode; }) {
    const [city, setCity] = useState<string>("");

    return (
        <WeatherContext.Provider value={{ city, setCity }}>
            {children}
        </WeatherContext.Provider>
    );
}

const useWeatherContext = () => useContext(WeatherContext);

export {
    WeatherContextProvider,
    useWeatherContext,
}