import { useContext } from "react";
import styled from "styled-components";
import { WeatherContext } from "../WeatherContext";
import { motion } from "framer-motion";

const StyledCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 0 10px #00000033;
  width: 300px;
  transition: background 0.3s ease;
  min-height: 450px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }
`;

export const StyledButton = styled(motion.button)`
  background: #444;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }
`

const variantsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const variantsItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// const variantBtn = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: {
//     opacity: 1,

//     scale: 1,
//     transition: {
//       duration: 0.5,
//       ease: [0.42, 0, 0.58, 1],

//     },
//   },
// };

const MotionCard = motion.create(StyledCard); // Usamos el styled component directamente

const WeatherDetails = ({ setDetailsOpen }) => {
  const { weather } = useContext(WeatherContext);

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
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Hora no disponible";

  if (!weather || !weather.main || !weather.weather) return null;
  return weather ? (
    <MotionCard
      layout
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div variants={variantsContainer}>
        <motion.h2 variants={variantsItem}>{weather.name}</motion.h2>
        <motion.img
          variants={variantsItem}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="icono clima"
        />

        <motion.p variants={variantsItem}>
          {weather.weather[0].description}
        </motion.p>
        <motion.h3 variants={variantsItem}>
          {Math.round(weather.main.temp)}°C
        </motion.h3>
        <motion.h4 variants={variantsItem}>
          {Math.round(weather.main.temp_min)}°C
        </motion.h4>
        <motion.h4 variants={variantsItem}>
          {Math.round(weather.main.temp_max)}°C
        </motion.h4>
        <motion.p variants={variantsItem}>
          Sensación térmica: {Math.round(weather.main.feels_like)}°C
        </motion.p>
        <motion.p variants={variantsItem}>
          Viento: {kmh(weather.wind.speed)} km/h desde el{" "}
          {getWindDirection(weather.wind.deg)}
        </motion.p>
        <motion.h4 variants={variantsItem}>
          Humedad: {weather.main.humidity}%
        </motion.h4>
        <motion.h4 variants={variantsItem}>
          Presión: {weather.main.pressure} hPa
        </motion.h4>
        <motion.p variants={variantsItem}>
          Última actualización: {fechaCompleta}
        </motion.p>
        <StyledButton
          
          variants={variantsItem}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDetailsOpen(false)}
        >
          Cerrar detalles
        </StyledButton>
      </motion.div>
    </MotionCard>
  ) : (
    <p>Cargando datos...</p>
  );
};

export default WeatherDetails;
