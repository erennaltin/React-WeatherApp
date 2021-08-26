import { createContext, useContext, useState } from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState("weather");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);


  const values = {
    mode,
    setMode,
    results,
    setResults,
    loading,
    setLoading,
  };


  return (
    <ModeContext.Provider value={values}>
      {children}
    </ModeContext.Provider>
  )
};


export const useMode = () => useContext(ModeContext)