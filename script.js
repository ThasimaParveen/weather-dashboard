const apiKey = "68c667a6a77a39dd2060ad22c7f7c3a7"; // Replace with your OpenWeather API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weatherResult.style.display = "block";
            weatherResult.innerHTML = `<p>❌ City not found</p>`;
            return;
        }

        weatherResult.style.display = "block";
        weatherResult.innerHTML = `
            <h2>${data.name} (${data.sys.country})</h2>
            <p>🌡️ Temperature: ${data.main.temp}°C</p>
            <p>🌤️ Weather: ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherResult.style.display = "block";
        weatherResult.innerHTML = `<p>⚠️ Failed to fetch weather data</p>`;
    }
}
