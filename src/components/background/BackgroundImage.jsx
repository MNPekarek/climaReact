

import { motion } from "framer-motion";


const BackgroundImage = ({ imageUrl }) => {
    
  return (
    <motion.div
      key={imageUrl} // Para que la animación se reinicie al cambiar la imagen
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, //Para q el contenido quede por encima
        overflow: "hidden",
        filter: "brightness(0.6)",
      }}
    />
  );
};

export default BackgroundImage;