import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import WheaterDay from "./components/WheaterDay/WheaterDay.jsx";
import UnsplashImage from "./components/background/UnsplashImage.jsx";
import BackgroundImage from "./components/background/BackgroundImage.jsx";
import WheaterInfo from "./components/wheaterMain/wheaterInfo.jsx";



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
          
          <WheaterInfo weather={weather}/>
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