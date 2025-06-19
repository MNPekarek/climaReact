import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import WeatherDetails from "../components/wheaterMain/WeatherDetails";


export default function AppRoutes({ darkMode, setDarkMode }) {
    return(
        <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}>
               {/* <Route path="/weather-details/:city" element={<WeatherDetails />} /> */}
            </Route>
            
        </Routes>
    )
}