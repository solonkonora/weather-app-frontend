"use client"

import { WeatherContextProvider } from "@/src/context/WeatherContext";
import React from "react";

export default function WeatherLayout({ children }: { children: React.ReactNode; }) {
    return (
        <WeatherContextProvider>
            {children}
        </ WeatherContextProvider>
    );
};
