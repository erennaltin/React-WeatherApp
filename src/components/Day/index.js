import React from "react";
import styles from "./style.module.css";

function Day({ weather, day }) {
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  let date = new Date().getDay() + day;
  date = date > 6 ? date - 7 : date;
  const dayName = days[date];
  return (
    <div className={`${styles.container} ${day === 0 ? styles.today : undefined}`}>
      <h3 className={styles.day}> {dayName} </h3>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather"
      />
      <div className={styles.degreeContainer}>
        <p className={styles.degree}> {Math.ceil(weather.temp.day)}° </p>
        <p className={styles.degree}> {Math.ceil(weather.temp.night)}° </p>
      </div>
    </div>
  );
}

export default Day;
