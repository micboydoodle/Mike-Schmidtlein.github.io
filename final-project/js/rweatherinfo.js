/*--REXBURG--*/
var weather = new XMLHttpRequest
weather.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=5605242&units=imperial&APPID=93513a5ecb45a4d44be23c0ee39c9db3', true);
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

var eventsSection = document.querySelector(".info");

                var requestURL = "https://micboydoodle.github.io/final-project/js/temple.json";
                var request = new XMLHttpRequest();
                request.open("GET", requestURL);
                request.responseType = "json";
                request.send();

                request.onload = function () {
                    var eventInfo = request.response;
                    showEvents(eventInfo);
                }

function showEvents(eventInfo) {
    var eventDetails = eventInfo["temples"];

    for (i=0; i < eventDetails.length; i++) {
        if (eventDetails[i].name === "rexburg") {
            var eventArticle = document.createElement("article");
            var list = document.createElement("ul");
            var townEvents = eventDetails[i].events;

            for (j=0; j < townEvents.length; j++) {
                var eventItem = document.createElement("li");
                eventItem.textContent = townEvents[j];
                eventItem.className = "info-article"
                list.appendChild(eventItem);
            }

            eventArticle.appendChild(list);
            eventsSection.appendChild(eventArticle);
            
        }

    }
}