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
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Escribí una ciudad"
      />
    </form>
  );
}
const Input = styled.input`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
`;
