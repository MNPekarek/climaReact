// import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { WeatherContext } from "../WeatherContext";
import { AnimatePresence, motion } from "framer-motion";
import { StyledButton } from "./WeatherDetails.jsx";

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
    min-height: 350px;
  }
`;


const MotionCard = motion.create(WeatherCard);

const WheaterInfo = ({ weather, setDetailsOpen }) => {
  // const {city} = useContext(WeatherContext);

  const fechaCompleta = weather?.dt
    ? new Date(weather.dt * 1000).toLocaleTimeString("es-Ar", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Hora no disponible";

  return (
    <>
      <AnimatePresence mode="wait">
        {weather && (
          <MotionCard
            // key={weather.id}
            // initial={{ opacity: 0, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: -30 }}
            // transition={{ duration: 0.4 }}
          >
            <h2>{weather.name}</h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="icono clima"
            />
            <p>{weather.weather[0].description}</p>
            <div className="temp">
              <h3>{Math.round(weather.main.temp)}°C</h3>
            </div>
            <p>Sensación térmica: {Math.round(weather.main.feels_like)}°C</p>
            <p>Última actualización: {fechaCompleta}</p>

            <StyledButton
            onClick={() => setDetailsOpen(true)}> Más Información</StyledButton>           
             
            
          </MotionCard>
        )}
      </AnimatePresence>
    </>
  );
};

export default WheaterInfo;

