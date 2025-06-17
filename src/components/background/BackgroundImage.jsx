

import { AnimatePresence, motion } from "framer-motion";

motion
const BackgroundImage = ({ imageUrl }) => {    
  return (
    
      <motion.div
        key={imageUrl} // Para que la animación se reinicie al cambiar la imagen
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1.3 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
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
          zIndex: -2, //Para q el contenido quede por encima
          // overflow: "hidden",
          filter: "brightness(0.6) ",
        }}
      />
      
  );
};

export default BackgroundImage;