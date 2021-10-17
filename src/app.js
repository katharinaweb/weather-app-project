// API integration
function showWeather(response) {
  console.log(response);
}

let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
let apiCity = "Vienna";
let apiUnit = "metric";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=${apiUnit}`;

axios.get(apiUrl).then(showWeather);
