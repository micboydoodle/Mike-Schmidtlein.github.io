var weathForecast = new XMLHttpRequest
weathForecast.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?id=5607916&units=imperial&APPID=93513a5ecb45a4d44be23c0ee39c9db3', true);
weathForecast.send();
weathForecast.onload = function() {

    var forecast = JSON.parse(weathForecast.responseText);
    console.log(forecast);

    var listDay = [];
    var listIcon = [];
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
            var icon = forecast.list[i].weather["0"].icon;
            var iconPath = "https://openweathermap.org/img/w/" + icon + ".png";
            listIcon.push(iconPath);

            //Tempurater
            var temp = forecast.list[i].main.temp_max;
            temp = Math.round(temp);
            listTempurature.push(temp);
            
        }
        continue;
    }

    //Forecast day
    document.getElementById('day0').innerHTML = listDay[0];
    document.getElementById('day1').innerHTML = listDay[1];
    document.getElementById('day2').innerHTML = listDay[2];
    document.getElementById('day3').innerHTML = listDay[3];
    document.getElementById('day4').innerHTML = listDay[4];

    //Weather icon 
    document.getElementById('weatherIcon0').src = listIcon[0];
    document.getElementById('weatherIcon1').src = listIcon[1];
    document.getElementById('weatherIcon2').src = listIcon[2];
    document.getElementById('weatherIcon3').src = listIcon[3];
    document.getElementById('weatherIcon4').src = listIcon[4];

    //Tempurature
    document.getElementById('Temp0').innerHTML = listTempurature[0];
    document.getElementById('Temp1').innerHTML = listTempurature[1];
    document.getElementById('Temp2').innerHTML = listTempurature[2];
    document.getElementById('Temp3').innerHTML = listTempurature[3];
    document.getElementById('Temp4').innerHTML = listTempurature[4];

}