// tabs
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");
  });
});
//handle form submit
const form = document.querySelector("#search-form");
form.addEventListener("submit", function (event) {
  //add code
  event.preventDefault();
  searchTerm = form.elements[0].value;

  fetch("http://localhost:5000/ticker/" + searchTerm)
    .then((response) => response.json())
    .then((data) => {
      testData = data;
      // console.log("Success:", data);
      document.querySelector("#stock-detail-section").classList.remove("none");
      console.table(testData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//end form submit
//chart
// test data1---functioning
const c = [149.9, 144.908, 140.696, 121.6, 129.066];
const t = [1583280000, 1583366400, 1583452800, 1583712000, 1583798400];
const v = [75244885, 54263285, 63314590, 85368700, 77972215];

var areapoints = [],
  volume = [];
const getData = function () {
  for (let i = 0; i < t.length; i++) {
    // console.log("t[i], c[i]>>>>>>>>>>>", t[i], c[i]);
    areapoints.push([t[i], c[i]]);
    //whats changed since ticker-info-1
    volume.push([t[i], v[i]]);
    //end of changes ticker-info-1
  }
  // return areapoints, volume;
};
// console.log("getData=>>>>>>>>>>>>>>>>>", getData());
getData();
// testData2 from api
let testData;
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", testData);
//get elements
const tickerEl = document.getElementById("ticker");
const nameEl = document.getElementById("name");
const exchangeEl = document.getElementById("exchange");
const ipoEl = document.getElementById("ipo");
const finnhubIndustryEl = document.getElementById("finnhubIndustry");
const tradingDayEl = document.getElementById("trading-day");
const pcEl = document.getElementById("pc");
const oEl = document.getElementById("o");
const hEl = document.getElementById("h");
const lEl = document.getElementById("l");
const dEl = document.getElementById("d");
const dpEl = document.getElementById("dp");
const sSellEl = document.getElementById("strong-sell");
const sellEl = document.getElementById("sell");
const holdEl = document.getElementById("hold");
const buyEl = document.getElementById("buy");
const sBuyEl = document.getElementById("strong-buy");
// const dpEl = document.getElementById("dp");
if (testData != undefined) {
  // asign elements values
  tickerEl.innerHTML = testData.ticker;
  nameEl.innerHTML = `${testData.name}`;
  exchangeEl.innerHTML = testData.exchange;
  ipoEl.innerHTML = testData.ipo;
  finnhubIndustryEl.innerHTML = testData.finnhubIndustry;
  tradingDayEl.innerHTML = new Date(testData.t[0] * 1000);
  pcEl.innerHTML = testData.pc;
  oEl.innerHTML = testData.o[0];
  hEl.innerHTML = testData.h[0];
  lEl.innerHTML = testData.l[0];
  dEl.innerHTML = testData.d;
  dpEl.innerHTML = testData.dp;
  // sSellEl.value=
  // sellEl.value=
  // holdEl.value=
  // buyEl.value=
  // sBuyEl.value=
}
//end data wrangling

//actual chart drawing--shoul clean up
Highcharts.getJSON(
  "https://demo-live-data.highcharts.com/aapl-c.json",
  function (data) {
    //display data
    // console.table(volume);
    // Create the chart
    Highcharts.stockChart("chart-container", {
      yAxis: [
        {
          labels: {
            align: "left",
          },
          height: "80%",
        },
        {
          labels: {
            align: "left",
          },
          top: "80%",
          height: "20%",
          offset: 0,
        },
      ],
      series: [
        {
          type: "area",
          id: "price",
          name: "Stock Price",
          data: areapoints,
        },
        {
          type: "column",
          id: "volume",
          name: "Volume",
          data: volume,
          yAxis: 1,
        },
      ],
    });
  }
);
