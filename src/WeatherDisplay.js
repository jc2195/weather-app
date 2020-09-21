import React, { useEffect, useState } from "react"
import Loader from 'react-loader-spinner'

function WeatherDisplay(props) {
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [main, setMain] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [temp, setTemp] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [clouds, setClouds] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [inFahrenheit, setInFahrenheit] = useState(false);

  const toCelsius = (temp) => {
    return `${Math.round(temp - 273.15)}°`;
  }

  const toFahrenheit = (temp) => {
    return `${Math.round((temp - 273.15) * (9/5) + 32)}°`;
  }

  const getWeatherData = async () => {
    const term = props.searchTerm === "" ? "london" : props.searchTerm;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${term}&appid=cba2636c927996baa0673e508a06ec4d`, {mode: 'cors'});

    if (response.status === 200) {
      const data = await response.json();
      setName(data.name);
      setCountry(data.sys.country);
      setMain(data.weather[0].main);
      setDescription(data.weather[0].description);
      setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      setTemp(data.main.temp);
      setPressure(data.main.pressure);
      setHumidity(data.main.humidity);
      setTempMin(data.main.temp_min);
      setTempMax(data.main.temp_max);
      setTempMax(data.main.temp_max);
      setWindSpeed(data.wind.speed);
      setWindDirection(data.wind.deg);
      setClouds(data.clouds.all);
      props.setIsNight(data.weather[0].icon.slice(-1) === 'n' ? true : false);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setIsLoading(false);
  }

  const handleChange = (event) => {
    const {checked} = event.target
    setInFahrenheit(checked)
  }

  const displaySwitcher = () => {
    if (!isValid){
      return (
        <div className="fail">Oops...<br/> That place doesn't seem to exist!</div>
      );
    } else if (isLoading) {
      return (
        <div className="loadbox">
          <Loader
            type="ThreeDots"
            color="white"
            height={100}
            width={100}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="tempswitch">
            <div className="switchlabel">°C</div>
            <label className="switch">
              <input type="checkbox" name="inFahrenheit" checked={inFahrenheit} onChange={handleChange}/>
              <span className="slider"></span>
            </label>
            <div className="switchlabel">°F</div>
          </div>
          <div className="weather-display">
            <div className="location">{name}, {country}</div>
            <div className="temp">{inFahrenheit ? toFahrenheit(temp) : toCelsius(temp)}</div>
            <div className="conditions">
            <img src={icon} alt=""/>
              <div className="conditions-text">
                <div>{main}</div>
                <div className="conditions-description">({description})</div>
              </div>
            </div>
            <div className="otherinfo">Lowest Temperature: {inFahrenheit ? toFahrenheit(tempMin) : toCelsius(tempMin)}</div>
            <div className="otherinfo">Highest Temperature: {inFahrenheit ? toFahrenheit(tempMax) : toCelsius(tempMax)}</div>
            <div className="otherinfo">Pressure: {pressure}hPa</div>
            <div className="otherinfo">Humidity: {humidity}%</div>
            <div className="otherinfo">Cloud Cover: {clouds}%</div>
            <div className="otherinfo">Wind Speed: {windSpeed}m/s</div>
            <div className="otherinfo">Wind Direction: {windDirection}°</div>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    getWeatherData();
  });

  return (
    displaySwitcher()
  );
}

export default WeatherDisplay;