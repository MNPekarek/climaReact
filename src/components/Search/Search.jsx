import { useContext, useState } from "react";
import { useEffect } from "react";
import { WeatherContext } from "../WeatherContext";
import styled from "styled-components";

export default function Search() {
  const { setWeather, city, setCity } = useContext(WeatherContext);

  const [search, setSearch] = useState("");

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
    <form onSubmit={handleSearch}>
      <SearchInput
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Escribí una ciudad"
      />
    </form>
  );
}
const SearchInput = styled.input`
  margin-top: 1rem;
  border-radius: 999px;
  padding: 10px 20px;
  border: none;
  background: #ffffff22;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  color: white;
  margin-bottom: 1rem;  
  font-size: 1rem;
  text-align: center;
  
  ::placeholder {
    color: white;
    opacity: 1;
  }

  /* soporte para navegadores especificos */
  &::-webkit-input-placeholder {
    color: white;
    opacity: 0.5
    
  }
  &:-ms-input-placeholder {
    color: white;
  }
  &::-moz-placeholder {
    color: white;
    opacity: 1;
  }
`;
