const apiKey = '&APPID=bb816778e1f33afa1bbea8b30d699472';
const cityList = {
  'Preston': '5604473',
  'Fish Haven': '5585010',
  'Soda Springs': '5607916'
};


// Weather Object Creation Function
function Weather(data) {
  this.location = data.name ? data.name : '';
  this.conditions = data.weather[0].main;
  this.description = data.weather[0].description;
  this.icon = data.weather[0].icon;
  this.iconURL = 'https://openweathermap.org/img/w/' + this.icon + '.png';
  this.temp = data.main.temp;
  this.low = data.main.temp_min;
  this.high = data.main.temp_max;
  this.humidity = data.main.humidity;
  this.windspeed = data.wind.speed;
  this.windchill = windChill(this.temp, this.windspeed);
  this.dt = data.dt;
  if (data.rain && data.snow) {
    this.precipitation = data.rain['3h'] + data.snow['3h'];
  } else if (data.rain) {
    this.precipitation = data.rain['3h'];
  } else if (data.snow) {
    this.precipitation = data.snow['3h'];
  } else {
    this.precipitation = 0;
  }
}

// Weather Summary Element Creation
function wSummary(data) {
  let list = document.createElement('ul');
  let props = [{
      label: 'Currently',
      data: data.conditions
    },
    {
      label: 'High',
      data: data.high + '&deg;F'
    },
    {
      label: 'Wind Chill',
      data: data.windchill + '&deg;F'
    },
    {
      label: 'Humidity',
      data: data.humidity + '%'
    },
    {
      label: 'Precipitation',
      data: data.precipitation + ' Inches'
    },
    {
      label: 'Wind Speed',
      data: data.windspeed + 'mph'
    }
  ];
  for (let i = 0; i < props.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = props[i].label + ': ' + props[i].data;
    list.appendChild(li);
  }
  return list;
}

// Current Weather Element Creation
function wCurrent(data) {
  var box = document.createElement('div');
  var icon = document.createElement('img');
  var temp = document.createElement('span');
  icon.setAttribute('src', data.iconURL);
  icon.setAttribute('alt', data.conditions);
  temp.innerHTML = data.temp + '&deg;F';
  box.appendChild(icon);
  box.appendChild(temp);
  return box;
}

// Current Weather
function getWeather(town) {
  // Target Elements
  let summary = document.getElementById('w-summary');
  let current = document.getElementById('w-current');

  // URL Variables
  let cityid = cityList[town];
  let units = '&units=imperial';
  let addr = 'https://api.openweathermap.org/data/2.5/weather?id=';
  let url = addr + cityid + units + apiKey;

  getJSON(url, (data) => {
    // Create a new Weather Object
    let weather = new Weather(data);

    // Outputs a Weather Summary "View"
    summary.appendChild(wSummary(weather));
    // Outputs a Current Weather "View"
    current.appendChild(wCurrent(weather));
  });
}

// Weather Forecast
function getForecast(town) {
  // Target Elements
  let forecast = document.getElementById('w-forecast');
  let cityid = cityList[town];
  let units = '&units=imperial';
  let addr = 'https://api.openweathermap.org/data/2.5/forecast?id=';
  let url = addr + cityid + units + apiKey;

  let date = new Date();
  let daysInWeek = ['Sun', 'Mon', 'Tue', 'Wen', 'Thur', 'Fri', 'Sat'];

  getJSON(url, (data) => {
    let table = document.createElement('table');
    let tHeadings = document.createElement('tr');
    let trIcons = document.createElement('tr');
    let trTemps = document.createElement('tr');
    let days = [];

    for (let i = 0; i < data.list.length; i++) {
      date.setTime(data.list[i].dt * 1000);
      let hour = date.getHours();
      console.log(hour);
      if (date.getHours() === 17) {
        days.push(data.list[i]);
      }
    }

    days.forEach((ut) => {
      let th = document.createElement('th');
      let tdIcon = document.createElement('td');
      let tdTemp = document.createElement('td');
      let icon = document.createElement('img');

      let day = new Weather(ut);

      date.setTime(day.dt * 1000);
      dow = daysInWeek[date.getDay()];
      th.textContent = dow;

      icon.src = day.iconURL;
      icon.alt = day.conditions;
      tdIcon.appendChild(icon);

      tdTemp.innerHTML = day.temp + '&deg; F';

      tHeadings.appendChild(th);
      trIcons.appendChild(tdIcon);
      trTemps.appendChild(tdTemp);
    });
    table.appendChild(tHeadings);
    table.appendChild(trIcons);
    table.appendChild(trTemps);
    forecast.appendChild(table);
  });
}