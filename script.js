import { getAPIKey } from "./config.js";

apiKey = getAPIKey();
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  document.querySelector(".temp").style.display = "flex";
  document.querySelector(".other-info").style.display = "flex";
  fetchWeather(cityName);
});

async function fetchWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    document.querySelector(".temp-desc").textContent =
      data.weather[0].description;
    document.querySelector(
      ".city-name"
    ).textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector(".city-temp").textContent = `${data.main.temp} °C`;
    document.querySelector(
      ".Min"
    ).textContent = `Min: ${data.main.temp_min} °C`;
    document.querySelector(
      ".Max"
    ).textContent = `Max: ${data.main.temp_max} °C`;
    document.querySelector(
      ".humidity"
    ).textContent = `Humidity: ${data.main.humidity}%`;

    if (data.weather[0].main.toLowerCase().includes("cloud")) {
      document.querySelector("video").src = "images/clouds.mp4";
    } else if (data.weather[0].main.toLowerCase().includes("rain")) {
      document.querySelector("video").src = "images/rain.mp4";
    } else if (data.weather[0].main.toLowerCase().includes("clear")) {
      document.querySelector("video").src = "images/clear.mp4";
    } else if (data.weather[0].main.toLowerCase().includes("snow")) {
      document.querySelector("video").src = "images/snow.mp4";
    } else if (data.weather[0].main.toLowerCase().includes("mist")) {
      document.querySelector("video").src = "images/mist.mp4";
    } else if (data.weather[0].main.toLowerCase().includes("snow")) {
      document.querySelector("video").src = "images/snow.mp4";
    } else if (data.weather[0].main.toLowerCase().includes("humid")) {
      document.querySelector("video").src = "images/humid.mp4";
    } else if (data.weather[0].main.toLowerCase().includes("wind")) {
      document.querySelector("video").src = "images/wind.mp4";
    } else if (data.weather[0].main.toLowerCase().includes("thunderstorm")) {
      document.querySelector("video").src = "images/thunderstorm.mp4";
    } else {
      document.querySelector("video").src = "images/wind.mp4";
    }
    document.querySelector("video").style.display = "block";
  } catch (error) {
    alert(error.message);
  }
}
