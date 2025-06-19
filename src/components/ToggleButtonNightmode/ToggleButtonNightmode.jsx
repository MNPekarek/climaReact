import { useContext } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import styled from "styled-components";
import { WeatherContext } from "../WeatherContext";



const ToggleButtonNightmode = () => {

    const {darkMode, setDarkMode} = useContext(WeatherContext);

  return (
    <ButtonNightMode  onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <BsMoonFill /> : <BsSunFill />}
      
    </ButtonNightMode>
  );
};

export default ToggleButtonNightmode;
const ButtonNightMode = styled.button`
  background: ${({ darkMode }) => (darkMode ? " rgba(255, 255, 255, 0.3)" : " rgba(255, 255, 255, 0.3)")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#333")};
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: "pointer";
  font-size: 16px;
  position: absolute;
  right: 40px;
  @media (max-width: 768px) {
    right: 20px;
  }
`;