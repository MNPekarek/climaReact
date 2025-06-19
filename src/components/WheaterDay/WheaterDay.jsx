import { useEffect, useState } from "react";
import styled from "styled-components";

export default function WheaterDay({ city }) {
  const [dailySummary, setDailySummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "3a1b423599ea3cad866d45c1baa18347";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "200") {
          // agrupar por dia y sacar promedio/min/max
          const days = {};

          data.list.forEach((item) => {
            const date = item.dt_txt.split(" ")[0];

            if (!days[date]) {
              days[date] = {
                min: item.main.temp_min,
                max: item.main.temp_max,
                icon: item.weather[0].icon,
                description: item.weather[0].description,
              };
            } else {
              days[date].min = Math.min(days[date].min, item.main.temp_min);
              days[date].max = Math.max(days[date].max, item.main.temp_max);
            }
          });

          const resumen = Object.entries(days)
            .slice(1, 6) //Solo los proximos 5 dias
            .map(([date, info]) => ({
              date,
              temp_min: info.min,
              temp_max: info.max,
              icon: info.icon,
              description: info.description,
            }));

          console.log("Resumen generado", resumen);
          setDailySummary(resumen);
        } else {
          console.log("Error en datos: ", data);
          setDailySummary([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error en el fetch: ", err);
        setLoading(false);
      });
  }, [city]);

  if (loading) return <p>Cargando pronóstico...</p>;
  if (!dailySummary.length) return <p>No se pudo cargar el pronóstico.</p>;

  return (
    <ForecastContainer>
      {dailySummary.map((day, index) => (
        <ForecastCard key={index}>
          <p>
            {new Date(day.date).toLocaleDateString("es-AR", {
              weekday: "long", 
              
            }) }
          </p>
          <p>
            {new Date(day.date).toLocaleDateString("es-AR", {
              
              day: "numeric",
              month: "long",
            }) }
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt="icono clima"
          />
          <p>{day.description}</p>
          <p>Mín: {Math.round(day.temp_min)}°C</p>
          <p>Max: {Math.round(day.temp_max)}°C</p>
        </ForecastCard>
      ))}
    </ForecastContainer>    
  );
}

const ForecastContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 20px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; //Firefox
  &::-webkit-scrollbar {
    display: none; //Chrome/Safari
  }
`;

const ForecastCard = styled.div`
  min-width: 160px;
  flex: 0 0 auto;
  scroll-snap-align: start;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 60px;
    height: 60px;
  }

  p {
    margin: 8px 0;
    
    font-size: 16px;
  }
`;



