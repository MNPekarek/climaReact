import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import WheaterDay from "./components/WheaterDay/WheaterDay.jsx";
import UnsplashImage from "./components/background/UnsplashImage.jsx";
import BackgroundImage from "./components/background/BackgroundImage.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-family: sans-serif;
    transition: all 0.3s ease;
  }
`;

const lightTheme = {
  bg: "#f0f0f0",
  text: "#111",
  card: "#fff",
};

const darkTheme = {
  bg: "#111",
  text: "#f0f0f0",
  card: "#1f1f1f",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const WeatherCard = styled.div`
  /* background: ${({ theme }) => theme.card}; */
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 0 10px #00000033;
  width: 300px;
  transition: background 0.3s ease;
  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const ToggleButton = styled.button`
  margin-top: 1rem;
  padding: 0.4rem 1rem;
  border: none;
  background: #666;
  color: #fff;
  border-radius: 1rem;
  cursor: pointer;
`;

export default function App() {
  const [city, setCity] = useState("madrid");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [imageUrl, setImageUrl] =useState("");


  function getWindDirection(deg) {
  if (deg >= 337.5 || deg < 22.5) return "N";
  if (deg >= 22.5 && deg < 67.5) return "NE";
  if (deg >= 67.5 && deg < 112.5) return "E";
  if (deg >= 112.5 && deg < 157.5) return "SE";
  if (deg >= 157.5 && deg < 202.5) return "S";
  if (deg >= 202.5 && deg < 247.5) return "SO";
  if (deg >= 247.5 && deg < 292.5) return "O";
  if (deg >= 292.5 && deg < 337.5) return "NO";
}

function kmh(speed) {
  return Math.round(speed * 3.6);
}


const fechaCompleta = weather?.dt
? new Date(weather.dt * 1000).toLocaleTimeString("es-Ar", {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})
: "Hora no disponible";


  const API_KEY = "3a1b423599ea3cad866d45c1baa18347"; 
  // <-- poné tu API key

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) setWeather(data);
        else setWeather(null);
      });
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search.trim());
      setSearch("");
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <UnsplashImage city={city} setImageUrl={setImageUrl}/>            
        <BackgroundImage imageUrl={imageUrl}/>
        <h1>Clima Actual</h1>
        <form onSubmit={handleSearch}>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Escribí una ciudad"
          />
        </form>

        {weather ? (
          
          <WeatherCard>            
            <h2>{weather.name}</h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="icono clima"
            />
            <p>{weather.weather[0].description}</p>
            <h3>{Math.round(weather.main.temp)}°C</h3>
            <h4>{Math.round(weather.main.temp_min)}°C</h4>
            <h4>{Math.round(weather.main.temp_max)}°C</h4>
            <p>Sensación térmica: {Math.round(weather.main.feels_like)}°C</p>
            <p>Viento: {kmh(weather.wind.speed)} km/h desde el {getWindDirection(weather.wind.deg)}</p>
            <h4>Humedad: {weather.main.humidity}%</h4>
            <h4>Preción atmosferica: {weather.main.pressure} hPa</h4>
            <p>Última actualización: {fechaCompleta}</p>

            
          </WeatherCard>
        ) : (
          <p>Ciudad no encontrada</p>
        )}

        <ToggleButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </ToggleButton>
        <WheaterDay city={city}/>
      </Container>
    </ThemeProvider>
  );
}