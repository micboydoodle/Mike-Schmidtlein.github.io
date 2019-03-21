var wind = parseInt(document.getElementById('windSpeed').innerHTML);
var tempertaure = parseInt(document.getElementById('currentTemperature').innerHTML);
var windChill = 35.74 + 0.6215 * tempertaure - 35.75 * Math.pow(wind, 0.16) + 0.4275 * tempertaure * Math.pow(wind, 0.16);
windChill = Math.round(windChill);
document.getElementById('windChill').innerHTML = windChill;