import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

import axios from "axios";

import { useCity } from "../../contexts/CityContext";
import { useMode } from "../../contexts/ModeContext";

import Header from "../Header";
import Day from "../Day";

export default function CityContainer() {
  const { coords, setCoords, setCity } = useCity();
  const { mode, results, setMode, loading: searchLoading } = useMode();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: weather } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=current,minutely,hourly,alerts&appid=20d41c3183ed0727e536eec953e74d6f&units=metric`
      );
      setData(weather.daily);
      setMode("weather");
      setLoading(false);
    })();
  }, [coords, setMode]);

  const chooseCity = (e) => {
    const lon = e.target.attributes[0].value;
    const lat = e.target.attributes[1].value;
    const city = e.target.attributes[2].value;
    setCoords([lat, lon]);
    setCity(city);
  };

  return (
    <div className={styles.CityContainer}>
      <Header />
      <div
        className={
          mode === "weather" ? styles.WeatherContainer : styles.SearchContainer
        }
      >
        {loading ? (
          <p> Loading...</p>
        ) : mode === "weather" ? (
          data.map((item, index) => (
            <Day key={index} weather={item} day={index} />
          ))
        ) : searchLoading ? <p>Loading...</p>: (
          results.map((item, index) => (
            <p
              key={index}
              onClick={chooseCity}
              lon={item.coordinates.longitude}
              lat={item.coordinates.latitude}
              city={item.name}
            >
              {item.name}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
