 function updateDateTime(){

const now = new Date();

document.getElementById("dateTime").innerText =
now.toLocaleString();

}

updateDateTime();

setInterval(updateDateTime,1000);
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {

        const response = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        const data = await response.json();
        const current = data.current_condition[0];
const icon = document.getElementById("weatherIcon");

icon.src = current.weatherIconUrl[0].value;
icon.style.display = "block";
        document.getElementById("cityName").innerText = city;

        document.getElementById("temp").innerText =
            current.temp_C + "°C";

        document.getElementById("description").innerText =
            current.weatherDesc[0].value;

        document.getElementById("humidity").innerText =
            current.humidity;

        document.getElementById("wind").innerText =
            current.windspeedKmph;
    } catch (error) {

        alert("Unable to fetch weather data.");
        console.log(error);

    }

}
document.getElementById("city").addEventListener("keypress",function(e){

if(e.key==="Enter"){
searchWeather();
}

});
