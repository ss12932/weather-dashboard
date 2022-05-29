"use strict";
//Global Declarations
const recentSearchesCtr = $("#recent-searches-ctr");
const searchForm = $("#search-form");
const weatherInfoCtr = $("#weather-info-ctr");

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

const renderCurrentData = () => {
  const currentDayCard = `<div>
  <div class="flex justify-center space-x-6 my-4 flex-col md:flex-row">
    <div>
      <h2 class="text-center text-4xl font-bold my-2">Coventry</h2>
      <h3 class="text-center text-2xl semibold my-2">
        Friday 27th May 2022 12:56:22
      </h3>
    </div>
    <div>
      <img
        class="mx-auto"
        src="https://via.placeholder.com/100"
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
      <div class="w-full md:w-2/3 border p-1">17.15C</div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/3 border p-1 bg-rich-black-fogra-29 text-white font-semibold"
      >
        Humidity
      </div>
      <div class="w-full md:w-2/3 border p-1">17.15C</div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/3 border p-1 bg-rich-black-fogra-29 text-white font-semibold"
      >
        Windspeed
      </div>
      <div class="w-full md:w-2/3 border p-1">17.15C</div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/3 border p-1 bg-rich-black-fogra-29 text-white font-semibold"
      >
        UV Index
      </div>
      <div class="w-full md:w-2/3 border p-1">
        <span class="p-1 bg-red-500">17.15C</span>
      </div>
    </div>
  </div>
</div>`;
  weatherInfoCtr.append(currentDayCard);
};

const renderForecastData = () => {
  const forecastDataCard = `<h2 class="text-center text-4xl font-bold border-b-2 py-4">
    5 Day Forecast
  </h2>
  <!-- 5  day weather container -->
  <div class="flex flex-wrap gap-8 p-4 justify-center">
    <!-- card 1 -->
    <div class="border shadow-lg w-full sm:w-auto">
      <h3 class="text-center text-2xl my-2 p-4">Friday 27th May</h3>
      <div class="mx-auto">
        <img
          class="mx-auto my-2"
          src="https://via.placeholder.com/100"
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
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Humidity
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Windspeed
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            UV Index
          </div>
          <div class="border p-1">
            <span class="p-1 bg-red-500">17.15C</span>
          </div>
        </div>
      </div>
    </div>
    <!-- card 2 -->
    <div class="border shadow-lg w-full sm:w-auto">
      <h3 class="text-center text-2xl semibold my-2 p-4">
        Friday 27th May
      </h3>
      <div class="mx-auto">
        <img
          class="mx-auto my-2"
          src="https://via.placeholder.com/100"
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
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Humidity
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Windspeed
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            UV Index
          </div>
          <div class="border p-1">
            <span class="p-1 bg-red-500">17.15C</span>
          </div>
        </div>
      </div>
    </div>
    <!-- card 3 -->
    <div class="border shadow-lg w-full sm:w-auto">
      <h3 class="text-center text-2xl semibold my-2 p-4">
        Friday 27th May
      </h3>
      <div class="mx-auto">
        <img
          class="mx-auto my-2"
          src="https://via.placeholder.com/100"
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
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Humidity
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Windspeed
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            UV Index
          </div>
          <div class="border p-1">
            <span class="p-1 bg-red-500">17.15C</span>
          </div>
        </div>
      </div>
    </div>
    <!-- card 4 -->
    <div class="border shadow-lg w-full sm:w-auto">
      <h3 class="text-center text-2xl semibold my-2 p-4">
        Friday 27th May
      </h3>
      <div class="mx-auto">
        <img
          class="mx-auto my-2"
          src="https://via.placeholder.com/100"
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
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Humidity
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Windspeed
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            UV Index
          </div>
          <div class="border p-1">
            <span class="p-1 bg-red-500">17.15C</span>
          </div>
        </div>
      </div>
    </div>
    <!-- card 5 -->
    <div class="border shadow-lg w-full sm:w-auto">
      <h3 class="text-center text-2xl semibold my-2 p-4">
        Friday 27th May
      </h3>
      <div class="mx-auto">
        <img
          class="mx-auto my-2"
          src="https://via.placeholder.com/100"
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
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Humidity
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            Windspeed
          </div>
          <div class="border p-1">17.15C</div>
        </div>
        <div class="">
          <div
            class="border p-1 bg-rich-black-fogra-29 text-white font-semibold"
          >
            UV Index
          </div>
          <div class="border p-1">
            <span class="p-1 bg-red-500">17.15C</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  weatherInfoCtr.append(forecastDataCard);
};

const renderRecentSearches = () => {
  //target Parent Div

  // get From Local Storage
  const recentSearches = retrieveFromLS("recentSearches", []);
  // const recentSearches = ["London", "Bristol", "Leeds"];

  // if empty show alert
  if (!recentSearches.length) {
    const alert = `<div class="p-3 bg-rufous text-white">
  You have no recent searches!
</div>`;
    recentSearchesCtr.append(alert);
  } else {
    //else render recent searches list
    let ul = `<ul>`;
    const recentCities = $.each(recentSearches, (_, city) => {
      ul += `<li
      class="border p-3 flex justify-between cursor-pointer hover:bg-black hover:text-white hover:transition"
      data-city="${city}"
    >
      <span>${city}</span
      ><span
        class="font-bold text-md cursor-pointer hover:text-rust hover:scale-150"
        >&times</span
      >
    </li>`;
    });
    ul += `</ul>`;
    //append to parent
    recentSearchesCtr.append(ul);
  }
};

const handleRecentSearchClick = (e) => {
  const target = $(e.target);
  //restrict clicks only from lis
  if (target.is("li")) {
    // console.log("search");
    //get data city attribute
    const cityName = target.data("city");
    console.log(cityName);
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  // console.log("submit");

  //get form input value
  const cityName = $("#search-input").val();

  //validate
  if (cityName) {
    console.log(cityName);

    // fetch data from api

    //render current data
    renderCurrentData();
    //render forecast 5 day data
    renderForecastData();
    //get recentSearches from local storage
    const recentSearches = retrieveFromLS("recentSearches", []);

    //push city name to array
    recentSearches.push(cityName);

    //write recent searches to LS
    writeToLS("recentSearches", recentSearches);

    //remove previous items
    recentSearchesCtr.children().last().remove();
    //re render recent searches
    renderRecentSearches();
  }
};

const initialLoad = () => {
  renderRecentSearches();
};
recentSearchesCtr.on("click", handleRecentSearchClick);
searchForm.on("submit", handleFormSubmit);
$(document).ready(initialLoad);
