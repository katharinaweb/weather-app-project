// API integration
function formatDate(timestamp) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = new Date(timestamp);
  let day = currentDate.getDay();
  let date = currentDate.getDate();
  if (date < 10) {
    date = `0${day}`;
  }
  let month = currentDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${weekdays[day]}, ${date}.${month}, ${hours}:${minutes}`;
}

/// Forecast

let forecastHTML = ``;

let forecastDays = ["Sat", "Sun", "Mon", "Tue", "Fri"];

forecastDays.forEach(function (day) {
  forecastHTML =
    forecastHTML +
    `
  <div class="col-2">
    <div id="forecast-day">${day}</div>
    <div>
      <img
        id="forecast-image"
        src="https://openweathermap.org/img/wn/02d@2x.png"
        alt=""
      />
    </div>
    <div>
      <span id="forecast-min-temp">9°</span> /
      <span id="forecast-max-temp">13°</span>
    </div>
  </div>`;
});

forecastHTML = `<div class="col-1"></div>` + forecastHTML;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast-element");
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

///

function checkUnit() {
  let currentUnit = document.getElementsByClassName("active").item(0).innerHTML;
  if (currentUnit === "°C") {
    unit = "metric";
  } else if (currentUnit === "°F") {
    unit = "imperial";
  }
}

function showWeather(response) {
  let currentCity = response.data.name;
  let currentIcon = response.data.weather[0].icon;
  let currentTemperature = response.data.main.temp;
  let currentHumidity = response.data.main.humidity;
  let currentWind = response.data.wind.speed;
  let currentDescription = response.data.weather[0].description;
  let currentTimestamp = response.data.dt * 1000;
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = currentCity;
  let iconElement = document.querySelector("#icon-element");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${currentIcon}@2x.png`
  );
  iconElement.setAttribute("alt", currentDescription);
  let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = Math.round(currentTemperature);
  let humidityElement = document.querySelector("#humidity-element");
  humidityElement.innerHTML = currentHumidity;
  let windElement = document.querySelector("#wind-element");
  windElement.innerHTML = currentWind;
  let descriptionElement = document.querySelector("#description-element");
  descriptionElement.innerHTML = currentDescription;
  let dateElement = document.querySelector("#date-element");
  dateElement.innerHTML = formatDate(currentTimestamp);
}

function defaultLocation() {
  checkUnit();
  axios
    .get(`${apiRoot}${apiPath}?q=${defaultCity}&appid=${apiKey}&units=${unit}`)
    .then(showWeather);
}

function changeLocation(event) {
  event.preventDefault();
  checkUnit();
  let cityInput = document.querySelector("#city-input");
  if (cityInput.value !== "") {
    axios
      .get(
        `${apiRoot}${apiPath}?q=${cityInput.value}&appid=${apiKey}&units=${unit}`
      )
      .then(showWeather);
  }
}

function changeToFahrenheit(event) {
  event.preventDefault;
  let temperatures = document.querySelectorAll(".temperature");
  for (let i = 0; i < temperatures.length; i++) {
    temperatures[i].innerHTML = Math.round(
      temperatures[i].innerHTML * (9 / 5) + 32
    );
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
  }
}

function changeToCelsius(event) {
  event.preventDefault;
  let temperatures = document.querySelectorAll(".temperature");
  for (let i = 0; i < temperatures.length; i++) {
    temperatures[i].innerHTML = Math.round(
      (temperatures[i].innerHTML - 32) * (5 / 9)
    );
    fahrenheit.classList.remove("active");
    celsius.classList.add("active");
  }
}

let apiRoot = "https://api.openweathermap.org/";
let apiPath = "data/2.5/weather";
let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
let defaultCity = "Vienna";

defaultLocation();

let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", changeLocation);

let selectFahrenheit = document.querySelector("#fahrenheit");
selectFahrenheit.addEventListener("click", changeToFahrenheit);

let selectCelsius = document.querySelector("#celsius");
selectCelsius.addEventListener("click", changeToCelsius);
