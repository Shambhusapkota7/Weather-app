document.addEventListener("DOMContentLoaded", () => {
  fetchDefaultWeather();
});

const searchIcon = document.querySelector(".fa-search");
const locationInput = document.querySelector("#userlocation");
const converter = document.querySelector("#converter");
const weatherIcon = document.querySelector(".weatherIcon");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feelslike");
const description = document.querySelector(".description");
const dateElement = document.querySelector(".date");
const cityElement = document.querySelector(".city");
const humidityValue = document.querySelector("#HValue");
const windSpeedValue = document.querySelector("#WValue");
const sunriseValue = document.querySelector("#SRValue");
const sunsetValue = document.querySelector("#SSValue");
const cloudsValue = document.querySelector("#CValue");
const pressureValue = document.querySelector("#PValue");

let isCelsius = true;

searchIcon.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    alert("Please enter a location.");
  }
});

converter.addEventListener("change", () => {
  const currentTemp = parseFloat(temperature.textContent);
  if (isNaN(currentTemp)) return;

  if (converter.value === "°F" && isCelsius) {
    temperature.textContent = ((currentTemp * 9) / 5 + 32).toFixed(1) + "°F";
    feelsLike.textContent = `Feels like: ${((parseFloat(feelsLike.textContent.split(":")[1]) * 9) / 5 + 32).toFixed(1)}°F`;
    isCelsius = false;
  } else if (converter.value === "°C" && !isCelsius) {
    temperature.textContent = (((currentTemp - 32) * 5) / 9).toFixed(1) + "°C";
    feelsLike.textContent = `Feels like: ${(((parseFloat(feelsLike.textContent.split(":")[1]) - 32) * 5) / 9).toFixed(1)}°C`;
    isCelsius = true;
  }
});

async function fetchWeather(location) {
  let data;
  if (navigator.onLine) {
    try {
      const response = await fetch(`http://localhost/Weather app0/connection1.php?location=${encodeURIComponent(location)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server.");
      }
      data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      localStorage.setItem(location, JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again later.");
      return;
    }
  } else {
    data = JSON.parse(localStorage.getItem(location));
    if (!data) {
      alert("No cached data available for this location.");
      return;
    }
  }
  updateWeather(data);
}

function fetchDefaultWeather() {
  const defaultData = {
    city: "Kathmandu",
    country: "Nepal",
    temperature: 20.0,
    feels_like: 19.5,
    humidity: 60,
    wind: 3.5,
    clouds: 20,
    pressure: 1012,
    sunrise: 1672550400,
    sunset: 1672593600,
    weather: [
      {
        description: "clear sky",
        icon: "01d"
      }
    ]
  };

  updateWeather(defaultData);
}

function updateWeather(data) {
  console.log('the data is update weather', data);
  const {
    city,
    country,
    temperature: temp,
    feels_like: feelsLikeTemp,
    humidity,
    wind,
    clouds,
    pressure,
    sunrise,
    sunset,
    weather,
  } = data;

  // Ensure that the temperature and feels_like values are defined
  const temperatureValue = temp !== undefined ? temp : 0;
  const feelsLikeValue = feelsLikeTemp !== undefined ? feelsLikeTemp : 0;
  weatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${weather?.[0]?.icon || "01d"}@2x.png)`;
  temperature.textContent = `${temperatureValue.toFixed(1)}°C`;
  feelsLike.textContent = `Feels like: ${feelsLikeValue.toFixed(1)}°C`;
  description.textContent = weather?.[0]?.description || "Clear sky";
  dateElement.textContent = new Date().toLocaleDateString();
  cityElement.textContent = `${city}, ${country}`;
  humidityValue.textContent = `${humidity}%`;
  windSpeedValue.textContent = `${wind} m/s`;
  sunriseValue.textContent = formatTime(sunrise);
  sunsetValue.textContent = formatTime(sunset);
  cloudsValue.textContent = `${clouds}%`;
  pressureValue.textContent = `${pressure} hPa`;
}

function formatTime(timestamp) {
  const localDate = new Date(timestamp * 1000);
  let hours = localDate.getHours();
  let minutes = localDate.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = minutes.toString().padStart(2, "0");
  return `${hours}:${minutes} ${amPm}`;
}