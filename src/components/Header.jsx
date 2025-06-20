import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import BackgroundImage from "./background/BackgroundImage";
import { motion } from "framer-motion";
import Search from "./Search/Search";
import styled from "styled-components";



export default function Header() {
    const { weather, city} = useContext(WeatherContext);

    const frases = {
        Rain: "Sacá el paraguas ☔",
        Clear: "Un día para brillar 🌞",
        Clouds: "Mood completativo ☁️",
        Snow: "Todo blanco como tus diseños ❄️",
    };

    const main = weather?.weather?.[0]?.main || "";

    return (
        <HeaderWrapper
        as={motion.div}
        animate={{ backgroundPosition: "100% 50$ "}}
        transition={{ duration: 30, repeat: Infinity, ease: "linear"}}
        style={{
            BackgroundImage: `url(/bg-${main.toLowerCase()}.svg)`
        }}
        >
            <motion.h1
            key={city}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            >
                {`Hoy en ${city}`}
            </motion.h1>

            <Search />

            {frases[main] && <Phrase>{frases[main]}</Phrase>}

        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
    padding: 2rem 1rem;
    background-size: 200% auto;
    /* color: white; */
    text-align: center;
`;

const Phrase = styled.p`
    margin-top: 0.5rem;
    font-style: italic;
    font-weight: 300;
    opacity: 0.9;
`;