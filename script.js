// ===========================
// Weather App v5
// JavaScript Part 1
// ===========================

// Live Date & Time
function updateDateTime() {

const now = new Date();

document.getElementById("dateTime").innerText =
now.toLocaleString();

}

updateDateTime();

setInterval(updateDateTime,1000);

// DOM Elements

const searchBtn = document.getElementById("searchBtn");

const locationBtn = document.getElementById("locationBtn");

const cityInput = document.getElementById("city");

const loading = document.getElementById("loading");

// Search Button

searchBtn.addEventListener("click",getWeather);

// Enter Key

cityInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){

getWeather();

}

});

// Location Button

locationBtn.addEventListener("click",getCurrentLocation);
// ===========================
// Fetch Weather by City
// ===========================

async function getWeather(){

const city = cityInput.value.trim();

if(city===""){

alert("Please enter a city name");

return;

}

loading.style.display="block";

try{

const response = await fetch(
`https://wttr.in/${city}?format=j1`
);

const data = await response.json();

loading.style.display="none";

const current = data.current_condition[0];

const astronomy = data.weather[0].astronomy[0];

// Weather Icon
const icon = document.getElementById("weatherIcon");

icon.src = current.weatherIconUrl[0].value;
icon.style.display = "block";

// Basic Info
document.getElementById("cityName").innerText = city;
document.getElementById("temp").innerText = current.temp_C + "°C";
document.getElementById("description").innerText =
current.weatherDesc[0].value;

// Weather Details
document.getElementById("humidity").innerText =
current.humidity + "%";

document.getElementById("wind").innerText =
current.windspeedKmph + " km/h";

document.getElementById("feelsLike").innerText =
current.FeelsLikeC + "°C";

document.getElementById("visibility").innerText =
current.visibility + " km";

document.getElementById("pressure").innerText =
current.pressure + " mb";

document.getElementById("cloud").innerText =
current.cloudcover + "%";

document.getElementById("sunrise").innerText =
astronomy.sunrise;

document.getElementById("sunset").innerText =
astronomy.sunset;

}catch(error){

loading.style.display="none";

alert("Unable to fetch weather data.");

console.log(error);

}

}
// ===========================
// Current Location
// ===========================

function getCurrentLocation(){

if(!navigator.geolocation){

alert("Geolocation is not supported on this device.");

return;

}

loading.style.display="block";

navigator.geolocation.getCurrentPosition(

async(position)=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

try{

const response = await fetch(
`https://wttr.in/${lat},${lon}?format=j1`
);

const data = await response.json();

loading.style.display="none";

const current = data.current_condition[0];
const astronomy = data.weather[0].astronomy[0];
const nearest = data.nearest_area[0];

document.getElementById("weatherIcon").src =
current.weatherIconUrl[0].value;
document.getElementById("weatherIcon").style.display = "block";

document.getElementById("cityName").innerText =
nearest.areaName[0].value;

document.getElementById("temp").innerText =
current.temp_C + "°C";

document.getElementById("description").innerText =
current.weatherDesc[0].value;

document.getElementById("humidity").innerText =
current.humidity + "%";

document.getElementById("wind").innerText =
current.windspeedKmph + " km/h";

document.getElementById("feelsLike").innerText =
current.FeelsLikeC + "°C";

document.getElementById("visibility").innerText =
current.visibility + " km";

document.getElementById("pressure").innerText =
current.pressure + " mb";

document.getElementById("cloud").innerText =
current.cloudcover + "%";

document.getElementById("sunrise").innerText =
astronomy.sunrise;

document.getElementById("sunset").innerText =
astronomy.sunset;

// Dynamic Background

const desc = current.weatherDesc[0].value.toLowerCase();

if(desc.includes("sun")){

document.body.style.background =
"linear-gradient(135deg,#f59e0b,#f97316)";

}
else if(desc.includes("rain")){

document.body.style.background =
"linear-gradient(135deg,#2563eb,#0f172a)";

}
else if(desc.includes("cloud")){

document.body.style.background =
"linear-gradient(135deg,#64748b,#334155)";

}
else{

document.body.style.background =
"linear-gradient(135deg,#0f172a,#1e3a8a,#38bdf8)";

}

}catch(error){

loading.style.display="none";

alert("Unable to fetch location weather.");

console.log(error);

}

},

()=>{

loading.style.display="none";

alert("Location permission denied.");

}

);

}