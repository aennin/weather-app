const API_KEY = "6MHXD3V9P4B4V2GS7RB2RAJ8A";

async function getWeather(location) {
    const encodedLocation = encodeURIComponent(location);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=us&key=${API_KEY}&contentType=json`;

    try {
        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`HTTP error! status:${response.status}`);
        }

        const data = await response.json();
        console.log("weather data:", data)
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return null;
    }

}

async function displayWeather() {
    const location = document.getElementById("location").value;
    const weather = await getWeather(location);
    const showWeather = document.getElementById("weather-outcome");
    if (weather) {
        const current = weather.currentConditions;
        return showWeather.innerHTML =`<h2>Temperature: ${current.temp}°F</h2>
        <h3>Conditions: ${current.conditions}</h3>`;
    } else {
        return showWeather.innerHTML = `<h2>Weather data unavailable</h2>`;
    }
}

document.getElementById("weather-form").addEventListener("submit", (e) => {
    e.preventDefault();
    displayWeather();
});