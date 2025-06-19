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
import ToggleButtonNightmode from "../components/ToggleButtonNightmode/ToggleButtonNightmode.jsx";
import { BsEye, BsEyeSlash } from "react-icons/bs";


motion;

export default function Home() {
  const { weather, city } = useContext(WeatherContext);
  const [imageUrl, setImageUrl] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [showOnlyBackground, setShowOnlyBackground] = useState(false);


  return (
    <Container>
      <UnsplashImage city={city} setImageUrl={setImageUrl} />
      <BackgroundImage imageUrl={imageUrl} />

      {showOnlyBackground && (
        <EyeButton 
            onClick={()=> setShowOnlyBackground(false)}>
        {showOnlyBackground ? <BsEyeSlash /> : <BsEye />}
      </EyeButton> 
      )}     

      {!showOnlyBackground && (
        <>
        <h1>Clima Actual</h1>
      <ToggleButtonNightmode />
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
              <WheaterInfo weather={weather} setDetailsOpen={setDetailsOpen} showOnlyBackground={showOnlyBackground} setShowOnlyBackground={setShowOnlyBackground} />
            </motion.div>
          )}
          {weather && detailsOpen && (           
           <WeatherDetails setDetailsOpen={setDetailsOpen} />             
          )}
        </motion.div>
      </AnimatePresence>
      

      {/* <ToggleButton onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </ToggleButton> */}
      <WheaterDay city={city} />

      <Outlet />
        </>
      )}

      
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

export const EyeButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 5;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  padding: 0.6rem 0.8rem;
  border-radius: 50%;
  font-size: 1.3rem;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;
