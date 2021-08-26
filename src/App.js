import "./App.css";

import { CityProvider } from "./contexts/CityContext";
import { ModeProvider } from "./contexts/ModeContext";

import CityContainer from "./components/CityContainer";

function App() {
  return (
    <CityProvider>
      <ModeProvider>
        <div className="App">
          <div className="Header">
            <h1> Patika Weather App - React Homework 2</h1>
          </div>
          <div className="WeatherContainer">
            <CityContainer />
          </div>
        </div>
      </ModeProvider>
    </CityProvider>
  );
}

export default App;
