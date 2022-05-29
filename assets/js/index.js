"use strict";
//Global Declarations
const $recentSearchesCtr = $("#recent-searches-ctr");

const retrieveFromLS = (key, value) => {
  // get from LS using key name and parse it.
  const dataFromLS = JSON.parse(localStorage.getItem(key));

  if (dataFromLS) {
    return dataFromLS;
  } else {
    return value;
  }
};

const renderRecentSearches = () => {
  //target Parent Div

  // get From Local Storage
  const recentSearches = retrieveFromLS("recentSearches", []);

  // if empty show alert
  if (!recentSearches.length) {
    const alert = `<div class="p-3 bg-rufous text-white">
  You have no recent searches!
</div>`;
    $recentSearchesCtr.append(alert);
  } else {
    //else render recent searches list
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

const initialLoad = () => {
  renderRecentSearches();
};
$recentSearchesCtr.on("click", handleRecentSearchClick);
$(document).ready(initialLoad);
