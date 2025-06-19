import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes.jsx";



export default function App() {
  
  const [darkMode, setDarkMode] = useState(false); 

  return (  
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      {/* <BrowserRouter> */}
        <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode}/>        
        {/* </BrowserRouter>     */}
    </ThemeProvider>
    
  );
}
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
  
  