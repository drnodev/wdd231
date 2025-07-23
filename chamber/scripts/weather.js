// scripts/weather.js

export async function getWeather(city = 'San Salvador') {
  const apiKey = '8906f48fd9680f61f41c7003fe2384dc'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data.');

    const data = await response.json();

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    console.log(data)

    
  } catch (error) {
    console.error(error);
    const container = document.querySelector("#weather");
    container.textContent = "Weather data not available.";
  }
}
