
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;



function calculateWindChill(tempF, speed) {
  return (
    35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(speed, 0.16) +
    0.4275 * tempF * Math.pow(speed, 0.16)
  ).toFixed(2);
}


const temp = 82;
const windSpeed = 6.2;
const windChill = temp <= 50 && windSpeed > 3
  ? calculateWindChill(temp, windSpeed)
  : "N/A";

document.getElementById("windChill").textContent = windChill + (windChill !== "N/A" ? " °F" : "");