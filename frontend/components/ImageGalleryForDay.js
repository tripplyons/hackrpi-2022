import ImageGallery from "components/ImageGallery";
import { useState, useEffect } from "react";

export default function ImageGalleryForDay({ date }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      });
  }, [date]);

  return (
    <ImageGallery images={images.map(image => ({
      date: date,
      id: image.image
    }))} />
  );
}