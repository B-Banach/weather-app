// prevents from reloading page on form submit
var form = document.getElementById("weather-form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

//Variables:
const searchBtn = document.getElementById('search-btn');

let locationInputValue;
const apiKey = '1d3ef3aa3bdc996cb2629d7a2963c51c';

// Code:
searchBtn.addEventListener('click', () => {
    locationInputValue = document.getElementById('location-input').value;
    weather.fetchWeather(locationInputValue);
})

let weather = {
    fetchWeather: function (city) {
      fetch("http://api.weatherstack.com/current?access_key=" + apiKey + "&query=" + city + "&units=m")
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        let city = data.location.name;
        let country = data.location.country;
        let localTime = data.location.localtime;
        let temperature = data.current.temperature;
        let description = data.current.weather_descriptions
        let uvIndex = data.current.uv_index;
        let visibility = data.current.visibility;

        const displayCity = document.querySelector(".city");
        const displayCountry = document.querySelector(".country");
        const displayLocalTime = document.querySelector(".local-time");
        const displayTemperature = document.querySelector(".temperature");
        const displayDescription = document.querySelector(".description");
        const displayUvIndex = document.querySelector(".uvIndex");
        const displayVisibility = document.querySelector(".visibility");

        displayCity.innerText = `City: ${city}`;
        displayCountry.innerText = `Country: ${country}`;
        displayLocalTime.innerText = `Locat Time: ${localTime}`;
        displayTemperature.innerText = `Temperature: ${temperature}°C/${(temperature * 9/5) + 32}°F`;
        displayDescription.innerText = `Weather Description: ${description}`;
        displayUvIndex.innerText = `UV Index: ${uvIndex}/11`;
        displayVisibility.innerText = `Visibility ${visibility}km`;
    }
}