import { useContext, useState } from "react";
import { WeatherContext } from "../components/WeatherContext.jsx";
import styled from "styled-components";
import UnsplashImage from "../components/background/UnsplashImage.jsx";
import BackgroundImage from "../components/background/BackgroundImage.jsx";
import Search from "../components/Search/Search.jsx";
import WheaterInfo from "../components/wheaterMain/wheaterInfo.jsx";
import WheaterDay from "../components/WheaterDay/WheaterDay.jsx";
import { Outlet } from "react-router-dom";
import WeatherDetails from "../components/wheaterMain/WeatherDetails.jsx";
import { AnimatePresence, motion } from "framer-motion";

motion;

export default function Home({ darkMode, setDarkMode }) {
  const { weather, city } = useContext(WeatherContext);
  const [imageUrl, setImageUrl] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Container>
      <UnsplashImage city={city} setImageUrl={setImageUrl} />
      <BackgroundImage imageUrl={imageUrl} />
      <h1>Clima Actual</h1>
      <Search />

      <AnimatePresence mode="wait">
        <motion.div
          layout="position"
          transition={{ layout: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }}
        >
          {weather && !detailsOpen && (
            <motion.div
              key="info"
              initial={{
                clipPath: "inset(100% 0% 0% 0%",
                opacity: 0,
                filter: "blur(6px)",
                scale: 0.96,
              }}
              animate={{
                clipPath: "inset(0% 0% 0% 0%",
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <WheaterInfo weather={weather} setDetailsOpen={setDetailsOpen} />
            </motion.div>
          )}
          {weather && detailsOpen && (
            
              
           <WeatherDetails setDetailsOpen={setDetailsOpen} />
              
           
          )}
        </motion.div>
      </AnimatePresence>

      <ToggleButton onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </ToggleButton>
      <WheaterDay city={city} />

      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
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
