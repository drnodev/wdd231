// scripts/weather.js

export async function getWeather(city = 'San Salvador') {
  
  
  const apiKey = '8906f48fd9680f61f41c7003fe2384dc'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  const weather = document.getElementById("weather");


  try {

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data.');

    const data = await response.json();

    const temp        = data.main.temp;
    const description = data.weather[0].description;
    const icon        = data.weather[0].icon;
    const humidity    = data.main.humidity
    const sunrise     = data.sys.sunrise
    const dsr         = new Date(sunrise * 1000)
    const sunset      = data.sys.sunset
    const dst         = new Date(sunset * 1000)
    const iconUrl     = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Limpiar antes de renderizar
    weather.innerHTML = `
        <div><strong>${city}</strong></div>
        <div>${temp}°C</div>
        <img src="${iconUrl}" alt="${description}" loading='lazy'>
        <div>${description}</div>
         <div>Humidity ${humidity} %</div>
         <div>Sunrise ${dsr.toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',hour12: true})} </div>
        <div>Sunset  ${dst.toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',hour12: true})}  </div>
    `;
    

  } catch (error) {
    console.error(error);
    const container = document.querySelector("#weather");
    container.textContent = "Weather data not available.";
  }
}



export const foecast = async (city = 'San Salvador') =>{
    const apiKey    = '8906f48fd9680f61f41c7003fe2384dc'; 
    const url       = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const forecast  = document.getElementById("forecast");

    try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Forecast data fetch failed");

    const data = await response.json();

   
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    forecast.innerHTML = dailyData.map(item => {
      const date        = new Date(item.dt * 1000);
      const weekday     = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp        = Math.round(item.main.temp);
      const description = item.weather[0].description;
      const icon        = item.weather[0].icon;
      const iconUrl     = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      return `
        <div class="day">
          <p><strong>${weekday}</strong> ${temp}°C</p>
          <img src="${iconUrl}" alt="${description}">
          <p class="desc">${description}</p>
        </div>
      `;
    }).join("");

  } catch (err) {
    console.error(err);
    container.textContent = "Could not load forecast.";
  }
}
