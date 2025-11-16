import { createContext } from "react";
import { useState } from "react";

//create context outside of component
export const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const [currentPhoto, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([])

  const value = {
    currentPhoto,
    setPhoto,
    photos,
    setPhotos
  };

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
}
