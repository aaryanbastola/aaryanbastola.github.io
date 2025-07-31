const apiKey = "YOUR_API_KEY_HERE"; // <-- Replace with your OpenWeatherMap API key

document.getElementById('searchForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;
  fetchWeather(city);
});

async function fetchWeather(city) {
  const weatherDiv = document.getElementById('weatherResult');
  weatherDiv.innerHTML = "Loading...";
  weatherDiv.classList.remove('hidden');

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error("City not found.");
    const data = await res.json();

    weatherDiv.innerHTML = `
      <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
      <div class="city-name">${data.name}, ${data.sys.country}</div>
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <div class="desc">${data.weather[0].description}</div>
      <div class="extra">Humidity: ${data.main.humidity}%</div>
      <div class="extra">Wind: ${data.wind.speed} m/s</div>
    `;
  } catch (err) {
    weatherDiv.innerHTML = `<span style="color:#ff7878;">${err.message}</span>`;
  }
}
