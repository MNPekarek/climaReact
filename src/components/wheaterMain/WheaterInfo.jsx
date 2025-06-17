import styled from "styled-components";

const WheaterInfo = ({weather}) => {
    
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

return (
    <>
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
    </>
)

}

export default WheaterInfo;

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