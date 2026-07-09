// ===============================
// Weather App v3.0 - Part 1
// ===============================

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const visibility = document.getElementById("visibility");
const weatherIcon = document.getElementById("weatherIcon");

function updateDateTime(){

    const now = new Date();

    document.getElementById("dateTime").innerText =
    now.toLocaleString();

}

updateDateTime();

setInterval(updateDateTime,1000);

searchBtn.addEventListener("click",()=>{

    getWeather(cityInput.value);

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        getWeather(cityInput.value);

    }

});

async function getWeather(city){

    city=city.trim();

    if(city===""){

        alert("Please enter a city name");

        return;

    }

    try{

        searchBtn.disabled=true;

        searchBtn.innerText="Loading...";

        const response=await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        const data=await response.json();

        const current=data.current_condition[0];
             weatherIcon.style.display = "block";
        weatherIcon.src = current.weatherIconUrl[0].value;

        cityName.innerText = city;

        temp.innerText =
        current.temp_C + "°C";

        description.innerText =
        current.weatherDesc[0].value;

        humidity.innerText =
        current.humidity + "%";

        wind.innerText =
        current.windspeedKmph + " km/h";

        feelsLike.innerText =
        current.FeelsLikeC + "°C";

        visibility.innerText =
        current.visibility + " km";

        updateBackground(
            current.weatherDesc[0].value
        );

        searchBtn.disabled = false;

        searchBtn.innerText = "Search";

    }catch(error){

        searchBtn.disabled = false;

        searchBtn.innerText = "Search";

        weatherIcon.style.display = "none";

        alert("Unable to fetch weather.");

        console.log(error);

    }

}
// ===============================
// Weather App v3.0 - Part 3
// ===============================

function updateBackground(weather){

    weather = weather.toLowerCase();

    if(weather.includes("sun") || weather.includes("clear")){

        document.body.style.background =
        "linear-gradient(135deg,#f59e0b,#f97316,#fb7185)";

    }

    else if(weather.includes("rain")){

        document.body.style.background =
        "linear-gradient(135deg,#0f172a,#1e40af,#38bdf8)";

    }

    else if(weather.includes("cloud")){

        document.body.style.background =
        "linear-gradient(135deg,#475569,#64748b,#94a3b8)";

    }

    else{

        document.body.style.background =
        "linear-gradient(135deg,#0f172a,#1e3a8a,#38bdf8)";

    }

}

if(locationBtn){

locationBtn.addEventListener("click",()=>{

if(!navigator.geolocation){

alert("Geolocation is not supported.");

return;

}

navigator.geolocation.getCurrentPosition(async(position)=>{

const lat=position.coords.latitude;
const lon=position.coords.longitude;

try{

const response=await fetch(
`https://wttr.in/${lat},${lon}?format=j1`
);

const data=await response.json();

const city =
data.nearest_area[0].areaName[0].value;

cityInput.value = city;

getWeather(city);

}catch(error){

alert("Unable to get your location.");

}

});

});

}

// Default Weather
getWeather("Mandsaur");
