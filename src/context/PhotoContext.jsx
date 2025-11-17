import { createContext } from "react";
import { useState } from "react";

//create context outside of component
export const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const value = {};

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
}
