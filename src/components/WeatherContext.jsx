import { createContext, useState } from "react"

export const WeatherContext = createContext();

export const WeatherProvider = ({ children}) => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("bariloche");

    return (
        <WeatherContext.Provider value={{ weather, setWeather, city, setCity}}>
            {children}
        </WeatherContext.Provider>
    );
};