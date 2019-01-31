/********************************
**
**  UI Elements Module
**
** Modules are use IIFE's or Immediately invoked funciton expressions
** - this module will be responsible for controlling UI Elements like the Menu
** the _ before a function name will represent functions only used inside
module. Any funciton without _ before it will be used outside the module.
**
**
** *******************************/
const UI = (() => {
    let menu = document.querySelector("#menu-container");
    const showApp = () => {
      document.querySelector("#app-loader").classList.add("display-none");
      document.querySelector("#app-loader-image").classList.add("display-none");
      document.querySelector("main").removeAttribute('hidden');
      //document.getElementById('location-input').focus();

    };
    const loadApp = () => {
      document.querySelector("#app-loader").classList.remove("display-none");
      document.querySelector("#app-loader-image").classList.remove("display-none");
      document.querySelector("main").setAttribute('hidden','true');
    };

    const _showMenu = () => menu.style.right = 0;

    const _hideMenu = () => menu.style.right = '-65%';

    const _toggleHourlyWeather = () => {
      let hourlyWeather = document.querySelector("#hourly-weather-wrapper");
      let arrow = document.querySelector("#toggle-hourly-weather").children[0];
      let visible = hourlyWeather.getAttribute('visible');
      let dailyWeather = document.querySelector('#daily-weather-wrapper');

      if(visible == 'false'){
        hourlyWeather.setAttribute('visible','true');
        hourlyWeather.style.bottom=0;
        arrow.style.transform = "rotate(180deg)";
        dailyWeather.style.opacity = 0;
      }else if(visible == 'true'){
        hourlyWeather.setAttribute('visible','false');
        hourlyWeather.style.bottom="-100%";
        arrow.style.transform = "rotate(0deg)";
        dailyWeather.style.opacity = 1;
      }else{
        console.error("Unknow state of the hourly weather panel" +
        " and visible attribute")
      }

    };

    //Draw Weather data
    const drawWeatherData = (data,location) => {
      console.log(data);
      console.log(location);

      let currentlyData = data.currently;
      let dailyData = data.daily.data;
      let hourlyData = data.hourly.data;
      let weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday',
                      'Friday', 'Saturday'];
      let dailyWeatherWrapper = document.querySelector('#daily-weather-wrapper');
      let dailyWeatherModel;
      let hourlyWeatherWrapper = document.querySelector('#hourly-weather-wrapper');
      let hourlyWeatherModel;
      let hourlyTemp;
      let hour;
      let day;
      let hourlyIcon;
      let maxMinTemp;
      let dailyIcon;
      let currentTemp = Math.round(currentlyData.temperature);
      let summary = currentlyData.summary;
      let icon = currentlyData.icon;
      let precip = currentlyData.humidity;
      let windSpeed = currentlyData.windSpeed;

      //set current location
      document.querySelectorAll('.location-label').forEach((e) => {
        e.childNodes[0].nodeValue = location;
      });

      //set Background

      document.querySelector('main').style.backgroundImage = `url("assets/images/bg-images/${icon}.jpg")`;
      document.querySelector("#big-icon-image").src = `assets/images/summary-icons/${icon}-white.png`;
      document.querySelector('#degrees-label').innerHTML = currentTemp + "&#176;";
      document.querySelector('#summary-label').childNodes[0].nodeValue = summary;
      document.querySelector('#humidity-wind-container').childNodes[1].childNodes[3].childNodes[0].nodeValue = Math.round((precip * 100)) + "%";
      document.querySelector('#humidity-wind-container').childNodes[3].childNodes[3].childNodes[0].nodeValue = windSpeed + "m /h";


//set Daily Weather
      while(dailyWeatherWrapper.children[1]){
        dailyWeatherWrapper.removeChild(dailyWeatherWrapper.children[1]);
      }

      for(let i =0; i<=6; i++){
        dailyWeatherModel = dailyWeatherWrapper.children[0].cloneNode(true);
        //set the Day
        day = weekDays[new Date(dailyData[i].time * 1000).getDay()];
        dailyWeatherModel.children[0].children[0].textContent = day;
        maxMinTemp = Math.round(dailyData[i].temperatureMin) + "\u00B0/ " + Math.round(dailyData[i].temperatureMax) + "\u00B0";
        dailyWeatherModel.children[1].children[0].children[0].textContent = maxMinTemp;
        dailyIcon = dailyData[i].icon;
        dailyWeatherModel.children[1].children[1].children[0].src = `assets/images/summary-icons/${dailyIcon}-white.png`;
        dailyWeatherWrapper.appendChild(dailyWeatherModel);
        if(i>0){
          dailyWeatherModel.classList.remove("current-day-of-week");
        }
      }
 //delete the top element since it was just used for the model
  dailyWeatherWrapper.removeChild(dailyWeatherWrapper.children[0]);


//add hourly Weather
while(hourlyWeatherWrapper.children[1]){
  hourlyWeatherWrapper.removeChild(hourlyWeatherWrapper.children[1]);
}

for(let i =0; i<=23; i++){
  hourlyWeatherModel = hourlyWeatherWrapper.children[0].cloneNode(true);
  hour = new Date(hourlyData[i].time * 1000).getHours() + ":00";
  hourlyWeatherModel.children[0].children[0].textContent = hour;
  hourlyTemp = hourlyData[i].temperature + "\u00B0";
  hourlyWeatherModel.children[1].children[0].textContent = hourlyTemp;
  hourlyIcon = hourlyData[i].icon;
  hourlyWeatherModel.children[1].children[1].children[0].src = `assets/images/summary-icons/${hourlyIcon}-grey.png`;
  hourlyWeatherWrapper.appendChild(hourlyWeatherModel);
 //console.log(hourlyWeatherModel);
}
//delete the hourly model
hourlyWeatherWrapper.removeChild(hourlyWeatherWrapper.children[0]);

    //show data after data has been fetched
      UI.showApp();
    };

    //Hourly-weather wrapper event
    document.querySelector("#toggle-hourly-weather").children[0].addEventListener('click',_toggleHourlyWeather);


    document.querySelector("#open-menu-btn").addEventListener('click',_showMenu);
    document.querySelector("#close-menu-btn").addEventListener('click',_hideMenu);

    //export
    return {
      showApp, loadApp, drawWeatherData
    }
})();

/********************************
**
**  Local Storage API
**
** - this module will be responsible for saving, retrieving,
deleting the cities added by the user.
**
**
** *******************************/

const LOCALSTORAGE = (() => {
  let savedCities = [];
  let currentCity;

  const save = (city) => {
    savedCities.push(city);
    localStorage.setItem('savedCities',JSON.stringify(savedCities));
  }

  const saveCurrentCity = (city) => {
    currentCity = city;
    localStorage.setItem('currentCity',JSON.stringify(city));
  }

  const getCurrentCity = () => {
    if(localStorage.getItem('currentCity') !== null){
    currentCity = JSON.parse(localStorage.getItem('currentCity'));
    }
  }

  const get = () => {
    if(localStorage.getItem('savedCities') !== null){
    savedCities = JSON.parse(localStorage.getItem('savedCities'));
    console.log(savedCities);
    }
  }

  const remove = (index) => {
      if(index < savedCities.length){
        savedCities.splice(index,1);
        localStorage.setItem('savedCities',JSON.stringify(savedCities));
      }
  }



  const getSavedCities = () => savedCities;
  const getCurrentCityName = () => currentCity;

  return {
    save, get, remove, getSavedCities, saveCurrentCity, getCurrentCityName, getCurrentCity
  }
})();

/********************************
**
**  Saved savedCities Module
**
** - this module will be responsible for showing the UI saved cities from
local storage and from here the user will be able to delte or switch between
the city he wants to see data
**
**
** *******************************/

const SAVEDCITIES = (() => {
  let container = document.querySelector("#saved-cities-wrapper");

  const drawCity = (city) => {
    //create Elements
     let cityBox = document.createElement("div");
     let cityWrapper= document.createElement("div");
     let deleteWrapper= document.createElement("div");
     let cityTextNode= document.createElement("h1");
     let deleteBtn = document.createElement('button');

     //Add Classes
     cityBox.classList.add('flex-container', 'saved-city-box');
     cityTextNode.textContent = city;
     cityTextNode.classList.add('set-city');
     cityWrapper.classList.add('ripple','set-city');

     //Append Elements
     cityWrapper.append(cityTextNode);
     cityBox.append(cityWrapper);
     deleteBtn.classList.add('ripple', 'remove-saved-city');
     deleteBtn.textContent = '-';
     deleteWrapper.append(deleteBtn);
     cityBox.append(deleteWrapper);

     container.append(cityBox);
  }

  const _deleteCity = (cityHTML) => {
    let nodes = Array.prototype.slice.call(container.children);
    let cityWrapper = cityHTML.closest('.saved-city-box');
    let cityIndex = nodes.indexOf(cityWrapper);

    LOCALSTORAGE.remove(cityIndex);
    cityWrapper.remove();
  }

  document.addEventListener('click',function(event){
    if(event.target.classList.contains('remove-saved-city')){
      _deleteCity(event.target);
    }
  });

  document.addEventListener('click',function(event){
    if(event.target.classList.contains('set-city')){
      let nodes = Array.prototype.slice.call(container.children);
      let cityWrapper = event.target.closest('.saved-city-box');
      let cityIndex = nodes.indexOf(cityWrapper);
      console.log(cityIndex);
      let savedCities = LOCALSTORAGE.getSavedCities();
      LOCALSTORAGE.saveCurrentCity(savedCities[cityIndex]);
      WEATHER.getWeather(savedCities[cityIndex],false);
    }
  });

  return{
    drawCity
  }

})();

/********************************
**
**  Get Location Module
**
** - this module will be responsible for getting the data
about the location to search for weather
**
**
** *******************************/

const GETLOCATION = (() => {
  let location;
  const locationInput = document.querySelector('#location-input');
  const addCityBtn = document.querySelector('#add-city-btn');

    const _addCity = () => {
      location = locationInput.value;
      locationInput.value = "";
      addCityBtn.setAttribute('disabled', 'true');
      addCityBtn.classList.add('disabled');


      //get weather Data
      LOCALSTORAGE.get();
      let cities = LOCALSTORAGE.getSavedCities();
      if (cities.includes(location)){
        WEATHER.getWeather(location,false);
      }else{
      WEATHER.getWeather(location, true);
    }
    }



    locationInput.addEventListener('input', function (){
      let inputText = this.value.trim();
      if(inputText != ''){
        addCityBtn.removeAttribute('disabled');
        addCityBtn.classList.remove('disabled');
      }else{
        addCityBtn.setAttribute('disabled', 'true');
        addCityBtn.classList.add('disabled');
      }
    });

    addCityBtn.addEventListener('click', _addCity);


})();

/********************************
**
**  Get Weather Data
**
** - this module will be responsible for getting the weather data
**
**
** *******************************/

const WEATHER = (() => {
  //API key from dark sky api to grab weather data
  const darkSkyKey = 'd642e141842f433579b70a2973004651';
  //API key from Open Cage Data  to grab cordinate data
  const geocoderKey = '014f2ba28f484170a232ff1904db4f0b';


  const _getGeocodeURL = (location) => `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geocoderKey}`;
  const _getDarkSkyURL = (lat,lng) => `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;

  const _getDarkSkyData = (url, location) => {
    axios.get(url)
    .then((res) => {
      console.log(url);
      UI.drawWeatherData(res.data, location);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const getWeather = (location, save) => {
      //use loading screen
      UI.loadApp();
      let geocodeURL = _getGeocodeURL(location);

      axios.get(geocodeURL)
      .then((res) => {
        //if the typed result is not a valid location then error
        if(res.data.results == 0){
          console.error("invalid location");
          UI.showApp();
          return;
        }

        //let lat = res.data.results[0].geometry.lat;
      //  let lng = res.data.results[0].geometry.lng;

        if(save){
          //  LOCALSTORAGE.save({city:location, lat:lat, lng:lng});
            LOCALSTORAGE.save(location);
            LOCALSTORAGE.saveCurrentCity(location);
            SAVEDCITIES.drawCity(location);
        }
        let lat = res.data.results[0].geometry.lat;
        let lng = res.data.results[0].geometry.lng;
        let darkskyURL = _getDarkSkyURL(lat,lng);
        _getDarkSkyData(darkskyURL, location);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return{
    getWeather
  };
})();

/********************************
**
**  Init
**
** *******************************/

window.onload = () => {
  LOCALSTORAGE.get();
  LOCALSTORAGE.getCurrentCity();
  let cities = LOCALSTORAGE.getSavedCities();

  let city = LOCALSTORAGE.getCurrentCityName();
  if (cities.length !== 0){
    cities.forEach((city1)=>{
        SAVEDCITIES.drawCity(city1);
    });
    //WEATHER.getWeather(cities[cities.length - 1],false);
    WEATHER.getWeather(city,false);
  }else{
    UI.showApp();
  }

}
