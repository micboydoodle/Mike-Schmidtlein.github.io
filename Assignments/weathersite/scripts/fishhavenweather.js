var weather = new XMLHttpRequest
weather.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=5585010&units=imperial&APPID=93513a5ecb45a4d44be23c0ee39c9db3', true);
weather.send();
weather.onload = function () {

    var weatherInfo = JSON.parse(weather.responseText);
    console.log(weatherInfo);
    
    document.getElementById('currentTemputare').innerHTML = weatherInfo.main.temp;
    document.getElementById('high').innerHTML = weatherInfo.main.temp_max;
    document.getElementById('humidity').innerHTML = weatherInfo.main.humidity;
    document.getElementById('windSpeed').innerHTML = weatherInfo.wind.speed;

    var  windChill = 35.74 + 0.6215 * weatherInfo.main.temp - 35.75 * Math.pow(weatherInfo.wind.speed, 0.16) 
                    + 0.4275 * weatherInfo.main.temp * Math.pow(weatherInfo.wind.speed, 0.16);
    windChill = Math.round(windChill);
    document.getElementById('windChill').innerHTML = windChill;

}
