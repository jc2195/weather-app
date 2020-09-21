import React, { useState } from "react"
import SearchBar from "./SearchBar"
import WeatherDisplay from "./WeatherDisplay"
import "./App.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNight, setIsNight] = useState(false);

  const background = isNight ? "night" : "day";

  return (
    <div className="app" id={background}>
      <SearchBar setSearchTerm={setSearchTerm}/>
      <WeatherDisplay searchTerm={searchTerm} setIsNight={setIsNight}/>
    </div>
  )
}

export default App;