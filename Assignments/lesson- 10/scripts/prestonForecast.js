var weathForecast = new XMLHttpRequest
weathForecast.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=93513a5ecb45a4d44be23c0ee39c9db3', true);
weathForecast.send();
weathForecast.onload = function() {

    var forecast = JSON.parse(weathForecast.responseText);
    console.log(forecast);

    var listDay = [];
    var listIconType = [];
    var listTempurature = [];

    for(i = 0; i < forecast.list.length; ++i) {
        time = forecast.list[i].dt_txt;
        if (time.includes("18:00:00")) {

            //Day of week
            var date = new Date(forecast.list[i].dt * 1000);
            var weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
            var pickDate = weekday[date.getDay()];
            listDay.push(pickDate);

            //Weather Icon
            var iconType = forecast.list[i].weather["0"].icon;
            var iconPath = "https://openweathermap.org/img/w/" + iconType + ".png";
            listIconType.push(iconPath);

            //Tempurater
            var temp = forecast.list[i].main.temp_max;
            temp = Math.round(temp);
            listTempurature.push(temp);
            
        }
        continue;
    }

    //Forecast day
    document.getElementById('day1').innerHTML = listDay[0];
    document.getElementById('day2').innerHTML = listDay[1];
    document.getElementById('day3').innerHTML = listDay[2];
    document.getElementById('day4').innerHTML = listDay[3];
    document.getElementById('day5').innerHTML = listDay[4];

    //Weather icon 
    document.getElementById('weather_icon1').src = listIconType[0];
    document.getElementById('weather_icon2').src = listIconType[1];
    document.getElementById('weather_icon3').src = listIconType[2];
    document.getElementById('weather_icon4').src = listIconType[3];
    document.getElementById('weather_icon5').src = listIconType[4];

    //Tempurature
    document.getElementById('highTemp1').innerHTML = listTempurature[0];
    document.getElementById('highTemp2').innerHTML = listTempurature[1];
    document.getElementById('highTemp3').innerHTML = listTempurature[2];
    document.getElementById('highTemp4').innerHTML = listTempurature[3];
    document.getElementById('highTemp5').innerHTML = listTempurature[4];

}