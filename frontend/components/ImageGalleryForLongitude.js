// import ImageGallery from "./ImageGallery";
// import { useState, useEffect } from "react";
// import { nextDate } from "../src/util";

// export default function ImageGalleryForLongitude({ startDate, endDate, longitude }) {
//   const [images, setImages] = useState([]);
//   const nextDateToLoad = images.length > 0 ? nextDate(images[images.length - 1].date) : startDate;

//   useEffect(() => {
//     if (nextDateToLoad <= endDate) {
//       fetch(
//         `https://api.nasa.gov/EPIC/api/natural/date/${nextDateToLoad}?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setImages([...images, ...data]);
//         });
//     }
//   }, [images]);

//   console.log('images', images);

//   let filteredImages = [];
//   for (let i = 0; i < images.length - 1; i++) {
//     console.log(images[i + 1].centroid_coordinates.lon);
//     if (images[i + 1].centroid_coordinates.lon - longitude % 360 > 180
//       && images[i].centroid_coordinates.lon - longitude % 360 < 180) {
//       filteredImages.push(images[i]);
//     }
//   }

//   console.log(filteredImages);

//   return (
//     <ImageGallery images={filteredImages.map(image => ({
//       date: image.date.split(' ')[0],
//       id: image.image
//     }))} />
//   );
// }