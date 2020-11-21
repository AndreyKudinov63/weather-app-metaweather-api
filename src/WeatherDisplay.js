import React from "react";
import "./WeatherDisplay.css";

class WeatherDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  componentDidMount() {
    const URL =
      "https://www.metaweather.com/api/location/2122265/";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + URL)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ weatherData: json });
      });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData)
      return <div>Сейчас загрузится...</div>;
    const weather = weatherData.consolidated_weather[0];
    const iconUrl =
      "https://www.metaweather.com/static/img/weather/png/64/" +
      weather.weather_state_abbr +
      ".png";
    let convertTime = function (timeJson) {
      let time = new Date(timeJson);
      let hours =
        time.getHours() < 10
          ? "0" + time.getHours()
          : time.getHours();
      let minutes =
        time.getMinutes() < 10
          ? "0" + time.getMinutes()
          : time.getMinutes();
      let normalTime = hours - 1 + ":" + minutes;
      return normalTime;
    };
    return (
      <div className="weatherDisplay">
        <img
          src={iconUrl}
          alt={weather.weather_state_name}
        />
        <h1>{weather.weather_state_name}</h1>
        <h2>in Mosсow</h2>
        <p>
          Current temp: {Math.round(weather.the_temp)}°C
        </p>
        <p>
          Wind speed: {Math.round(weather.wind_speed)} mph
        </p>
        <p>Sunrise: {convertTime(weatherData.sun_rise)} </p>
        <p>Sunset: {convertTime(weatherData.sun_set)} </p>
      </div>
    );
  }
}

export default WeatherDisplay;
