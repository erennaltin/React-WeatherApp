import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

import axios from "axios";
import { BsFillCaretDownFill } from "react-icons/bs";

import { useCity } from "../../contexts/CityContext";
import { useMode } from "../../contexts/ModeContext";

export default function Header() {
  const { city, setCoords } = useCity();
  const { mode, setMode, setResults, setLoading } = useMode();
  const [local, setLocal] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=20d41c3183ed0727e536eec953e74d6f`
      );
      setCoords([data[0].lat, data[0].lon]);
      setLocal(city);
    })();
  }, [city, setCoords]);

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        url: "https://spott.p.rapidapi.com/places/autocomplete",
        params: { type: "CITY", q: local, skip: "0", limit: "10" },
        headers: {
          "x-rapidapi-host": "spott.p.rapidapi.com",
          "x-rapidapi-key":
            "4f9ad3372dmsh5c95ac3d45d0660p1d784bjsn42669a332747",
        },
      };
      if (mode === "search") {
        setLoading(true);
        const { data } = await axios.request(options);
        setResults(data);
        setLoading(false);
      }
    })();
  }, [local, city, mode, setResults, setLoading]);

  const changeMode = () => {
    setMode("search");
  };

  return (
    <div className={styles.Header}>
      {mode === "weather" ? (
        <p onClick={changeMode}>
          {" "}
          {city} <BsFillCaretDownFill class="searchIcon" />{" "}
        </p>
      ) : (
        <input
          type="text"
          value={local}
          onChange={({ target }) => setLocal(target.value)}
        />
      )}
    </div>
  );
}
