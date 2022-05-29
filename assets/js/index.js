"use strict";
//Global Declarations
const recentSearchesCtr = $("#recent-searches-ctr");
const searchForm = $("#search-form");

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
