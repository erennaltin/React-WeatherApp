import { createContext, useContext, useState } from "react";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("Istanbul");
  const [coords, setCoords] = useState([41.0351,28.9833]);


  const values = {
    city,
    setCity,
    coords,
    setCoords
  };


  return (
    <CityContext.Provider value={values}>
      {children}
    </CityContext.Provider>
  )
};


export const useCity = () => useContext(CityContext)