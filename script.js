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
