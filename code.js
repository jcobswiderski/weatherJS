'use strict';

let latitude;
let longitude;
const apiKey = "3df307e5c16b039a2b5bbc3cf16e6de7";

function startApp() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                console.log(latitude + " " + longitude);
                getWeatherData();
            } 
        );
    }
}

function getWeatherData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    
    fetch(url).then(
        function(response) {
            response.json().then(
                function(data) {
                    updateWeatherData(data);
                }
            );
        }
    )
}

function updateWeatherData(data) {
    document.getElementById("location").innerText = data.name;
    document.getElementById("temperature").innerText = data.main.temp + "℃";
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getElementById("pressure").innerText = data.main.pressure + "hPa";
    document.getElementById("clouds").innerText = data.clouds.all + "%";
    document.getElementById("windSpeed").innerText = data.wind.speed + "km/h";

    const sunriseTemp = new Date(data.sys.sunrise * 1000);
    const sunsetTemp = new Date(data.sys.sunset * 1000);

    document.getElementById("sunrise").innerText = sunriseTemp.getHours() + ":" + sunriseTemp.getMinutes();
    document.getElementById("sunset").innerText = sunsetTemp.getHours() + ":" + sunsetTemp.getMinutes();

    let imgUrl = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    document.getElementById("weatherImg").setAttribute("src", imgUrl);
}