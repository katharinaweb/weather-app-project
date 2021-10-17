// API integration
function showWeather(response) {
  let currentCity = response.data.name;
  let currentTemperature = response.data.main.temp;
  let currentHumidity = response.data.main.humidity;
  let currentWind = response.data.wind.speed;
  let currentDescription = response.data.weather[0].description;
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = currentCity;
  let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = Math.round(currentTemperature);
  let humidityElement = document.querySelector("#humidity-element");
  humidityElement.innerHTML = currentHumidity;
  let windElement = document.querySelector("#wind-element");
  windElement.innerHTML = currentWind;
  let descriptionElement = document.querySelector("#description-element");
  descriptionElement.innerHTML = currentDescription;
}

let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
let apiCity = "Vienna";
let apiUnit = "metric";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=${apiUnit}`;

axios.get(apiUrl).then(showWeather);
