import { useEffect } from "react";
import axios from "axios";
import BackgroundImage from "./BackgroundImage";

const UnsplashImage = ({ city, setImageUrl}) => {
  

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: { query: city, per_page: 1 },
            headers: {
              Authorization: `Client-ID KLPCFeob1VL42JDNJdV-gF02QR9dadFC5AOLoOnv7l0`,
            },
          }
        );
        setImageUrl(response.data.results[0]?.urls.regular || "");
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      }
    };

    if (city) fetchImage();
  }, [city, setImageUrl]);

  return null;
};

export default UnsplashImage;
