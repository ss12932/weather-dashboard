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
  // const recentSearches = ["London", "Bristol", "Leeds"];

  // if empty show alert
  if (!recentSearches.length) {
    const alert = `<div class="p-3 bg-rufous text-white">
  You have no recent searches!
</div>`;
    $recentSearchesCtr.append(alert);
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
    $recentSearchesCtr.append(ul);
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
