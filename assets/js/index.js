"use strict";

//Global Declarations
const recentSearchesCtr = $("#recent-searches-ctr");
const searchForm = $("#search-form");
const weatherInfoCtr = $("#weather-info-ctr");

// ## Start of Utility Functions ##
const retrieveFromLS = (key, value) => {
  // get from LS using key name and parse it.
  const dataFromLS = JSON.parse(localStorage.getItem(key));

  if (dataFromLS) {
    return dataFromLS;
  } else {
    return value;
  }
};

const writeToLS = (key, value) => {
  // set stringified value to LS for key name
  localStorage.setItem(key, JSON.stringify(value));
};

const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();
  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// ## End of Utility Functions ##

const getUviClassName = (uvi) => {
  if (uvi >= 0 && uvi <= 2) {
    return "bg-viridian-green";
  }

  if (uvi > 2 && uvi <= 8) {
    return "bg-gamboge";
  }
  if (uvi > 8) {
    return "bg-ruby-red";
  }
};

const renderCurrentData = (data) => {
  console.log(data);
  const {
    cityName,
    weatherData: {
      timezone_offset,
      current: {
        temp,
        uvi,
        humidity,
        wind_speed,
        dt,
        weather: [{ icon }],
      },
    },
  } = data;
  console.log(icon);
  const currentDayCard = `<div>
  <div class="flex justify-center space-x-6 my-4 flex-col md:flex-row">
    <div>
      <h2 class="text-center text-4xl font-bold my-2">${cityName}</h2>
      <h3 class="text-center text-2xl semibold my-2">
      ${moment.unix(dt + timezone_offset).format("dddd, Do MMM, YYYY HH:mm:ss")}
      </h3>
    </div>
    <div>
      <img
        class="mx-auto w-24 h-24"
        src="http://openweathermap.org/img/w/${icon}.png"
        alt=""
      />
    </div>
  </div>
  <!-- metric div -->
  <div class="mx-auto p-4 m-2">
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/3 border p-1 bg-rich-black-fogra-29 text-white font-semibold"
      >
        Temperature
      </div>
      <div class="w-full md:w-2/3 border p-1">${temp}C</div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/3 border p-1 bg-rich-black-fogra-29 text-white font-semibold"
      >
        Humidity
      </div>
      <div class="w-full md:w-2/3 border p-1">${humidity}</div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/3 border p-1 bg-rich-black-fogra-29 text-white font-semibold"
      >
        Windspeed
      </div>
      <div class="w-full md:w-2/3 border p-1">${wind_speed}</div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/3 border p-1 bg-rich-black-fogra-29 text-white font-semibold"
      >
        UV Index
      </div>
      <div class="w-full md:w-2/3 border p-1">
        <span class="p-1 text-white ${getUviClassName(uvi)}">${uvi}</span>
      </div>
    </div>
  </div>
</div>`;
  weatherInfoCtr.append(currentDayCard);
};

const renderForecastData = (data) => {
  let forecastDataCard = `<h2 class="text-center text-4xl font-bold border-b-2 py-4">
5 Day Forecast
</h2>
<!-- 5  day weather container -->
  <div class="flex flex-wrap gap-8 p-4 justify-center">`;

  const forecastCallBack = (_, day) => {
    const {
      temp,
      dt,
      uvi,
      humidity,
      wind_speed,
      weather: [{ icon }],
    } = day;

    forecastDataCard += `<div class="border shadow-lg w-full sm:w-auto">
    <h3 class="text-center text-2xl my-2 p-4">${moment
      .unix(dt)
      .format("ddd, Do MMM")}</h3>
    <div class="mx-auto">
      <img
        class="mx-auto my-2"
        src="http://openweathermap.org/img/w/${icon}.png"
        alt=""
      />
    </div>
    <div class="mx-auto grid grid-cols-1 p-4">
      <div class="">
        <div
          class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
        >
          Temperature
        </div>
        <div class="border p-1">${temp.day}C</div>
      </div>
      <div class="">
        <div
          class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
        >
          Humidity
        </div>
        <div class="border p-1">${humidity}</div>
      </div>
      <div class="">
        <div
          class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
        >
          Windspeed
        </div>
        <div class="border p-1">${wind_speed}MPH</div>
      </div>
      <div class="">
        <div
          class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
        >
          UV Index
        </div>
        <div class="border p-1">
          <span class="p-1 text-white ${getUviClassName(uvi)}">${uvi}</span>
        </div>
      </div>
    </div>
  </div>`;
  };

  const forecastCards = $.each(
    data.weatherData.daily.slice(1, 6),
    forecastCallBack
  );
  forecastDataCard += `
  </div>`;
  weatherInfoCtr.append(forecastDataCard);
};

const renderRecentSearches = () => {
  //target Parent Div

  // get From Local Storage
  const recentSearches = retrieveFromLS("recentSearches", []);
  // const recentSearches = ["London", "Bristol", "Leeds"];
  const alertExists = $(".search-alert").length;
  // if empty show alert
  if (!recentSearches.length && alertExists === 0) {
    const alert = `<div class="search-alert p-3 bg-rufous text-white">
  You have no recent searches!
</div>`;
    recentSearchesCtr.append(alert);
  } else {
    //else render recent searches list
    let ul = `<ul id="recent-search-list">`;
    const recentCities = $.each(recentSearches, (_, city) => {
      ul += `<li
      class="border p-3 flex justify-between cursor-pointer hover:bg-black hover:text-white hover:transition"
      data-city="${city}"
    >
      <span>${city}</span
      ><span
        class="remove-btn font-bold text-md cursor-pointer hover:text-rust hover:scale-150"
        >&times</span
      >
    </li>`;
    });
    ul += `</ul>`;
    //append to parent
    recentSearchesCtr.append(ul);
  }
};

const renderErrorAlert = () => {
  //empty container before rendering alert
  weatherInfoCtr.empty();
  const alert = `<div class="p-3 bg-rufous text-white">
  Something went wrong!! Please try again :)
</div>`;
  weatherInfoCtr.append(alert);
};

const renderWeatherInfo = async (cityName) => {
  try {
    //fetch weather data
    const weatherData = await fetchWeatherData(cityName);

    // empty weather info container
    weatherInfoCtr.empty();
    //render current data
    renderCurrentData(weatherData);
    //render forecast 5 day data
    renderForecastData(weatherData);
    return true;
  } catch (err) {
    renderErrorAlert();
    return false;
  }
};

const fetchWeatherData = async (cityName) => {
  // fetch data from api

  //url
  const currentDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: cityName,
      appid: "8109f605d79877f7488a194794a29013",
    }
  );

  const currentData = await fetchData(currentDataUrl);

  console.log(currentData);

  //get lat lon and city name
  const {
    coord: { lat, lon },
    name: CityName,
  } = currentData;
  // console.log(lat, lon, displayCityName);

  // forecast url
  const forecastDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "minutely,hourly",
      units: "metric",
      appid: "8109f605d79877f7488a194794a29013",
    }
  );

  const forecastData = await fetchData(forecastDataUrl);
  console.log(forecastData);

  return {
    cityName,
    weatherData: forecastData,
  };
};

const resetBtnClear = () => {
  const searchList = $("#recent-search-list");
  localStorage.removeItem("recentSearches");
  searchList.remove();
};

const handleRecentSearchClick = (e) => {
  const target = $(e.target);
  //restrict clicks only from lis
  if (target.is("li")) {
    // console.log("search");
    //get data city attribute
    const cityName = target.data("city");
    console.log(cityName);

    renderWeatherInfo(cityName);
  }

  if (target.is("button")) {
    // console.log("im the reset button hey");
    //clear all content including local storage
    resetBtnClear();
    //re render recent searches
    renderRecentSearches();
  }
  // console.log(target.hasClass("remove-btn"));
  // console.log(target.parent().data("city"));

  //checks if span of x button clicked and has class remove-btn
  if (target.is("span") && target.hasClass("remove-btn")) {
    //retrive array from local storage
    const arrFromLS = retrieveFromLS("recentSearches");

    //finding index of array of item to be removed. this is done by finding the item data attribute.
    const removeIndex = arrFromLS.indexOf(target.parent().data("city"));
    //once we have the index, we splice the array element containing this data attribute and rewrite it back to local storage
    arrFromLS.splice(removeIndex, 1);
    writeToLS("recentSearches", arrFromLS);
    //also target the parent which is li and remove.
    target.parent().remove();
  }
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  // console.log("submit");

  //get form input value
  const cityName = $("#search-input").val();

  //validate
  if (cityName) {
    // console.log(cityName);

    //render weather cards
    const renderStatus = await renderWeatherInfo(cityName);
    //get recentSearches from local storage
    const recentSearches = retrieveFromLS("recentSearches", []);

    if (!recentSearches.includes(cityName) && renderStatus) {
      //push city name to array
      recentSearches.push(cityName);

      //write recent searches to LS
      writeToLS("recentSearches", recentSearches);

      //remove previous items
      recentSearchesCtr.children().last().remove();
      //re render recent searches
      renderRecentSearches();
    }
  }
};

const initialLoad = () => {
  renderRecentSearches();
};
recentSearchesCtr.on("click", handleRecentSearchClick);
searchForm.on("submit", handleFormSubmit);
$(document).ready(initialLoad);
