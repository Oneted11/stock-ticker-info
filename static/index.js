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
      // stringify object back to json format
      let JSONdata = JSON.stringify(data);
      //insert json into html obejct to be state
      document.getElementById("testData").innerHTML = JSONdata;
      console.log("Success:", data);

      document.querySelector("#stock-detail-section").classList.remove("none");

      // console.table(testData);
      //create company tab
      document.querySelector(
        "#company-container"
      ).innerHTML = ` <table class="info-table">
      <tbody>
      <tr><img src=${data.logo} width="150em" ></tr>
      <tr><th>Company Name</th><td id="name">${data.name}</td></tr>
      <tr><th>Stock Ticker Symbol</th><td id="ticker">${data.ticker}</td></tr>
      <tr><th>Stock Exchange Code</th><td id="exchange">${data.exchange}</td></tr>
      <tr><th>Company IPO Date</th><td id="ipo">${data.ipo}</td></tr>
      <tr><th>Category</th><td id="finnhubIndustry">${data.finnhubIndustry}</td></tr>
    </tbody>
    </table>`;

      //create summary tab

      document.querySelector(
        "#summary-container"
      ).innerHTML = `<table class="info-table">
        <tbody>
        <tr><th>Stock Ticker Symbol</th><td id="ticker">${data.ticker}</td></tr>
        <tr><th>Trading Day</th><td id="trading-day">${new Date(
          data.t[0] * 1000
        )}</td></tr>
        <tr><th>Previous Closing Price</th><td id="pc">${data.pc}</td></tr>
        <tr><th>Opening Price</th><td id="o">${data.o[0]}</td></tr>
        <tr><th>High Price</th><td id="h">${data.h[0]}</td></tr>
        <tr><th>Low Price</th><td id="l">${data.l[0]} </td></tr>
        <tr><th>Change</th><td id="d">${data.d} ${
        Number(data.d) > 0
          ? '<span class="material-icons green">keyboard_arrow_up</span>'
          : '<span class="material-icons red">keyboard_arrow_down</span>'
      }</td></tr>
        <tr><th>Change Percentage</th><td id="dp">${data.dp} ${
        Number(data.dp) > 0
          ? '<span class="material-icons green">keyboard_arrow_up</span>'
          : '<span class="material-icons red">keyboard_arrow_down</span>'
      }</td></tr>
      </tbody>
      </table>`;

      //create chart with data

      const c = data.c;
      const t = data.t;
      const v = data.v;

      var areapoints = [],
        volume = [];
      const getData = function () {
        for (let i = 0; i < t.length; i++) {
          // console.log("t[i]*1000, c[i]>>>>>>>>>>>", t[i], c[i]);
          //multipliying by 1000 to turn epoch time to normal time
          areapoints.push([t[i] * 1000, c[i]]);
          //whats changed since ticker-info-1
          volume.push([t[i] * 1000, v[i]]);
          //end of changes ticker-info-1
        }
        // return areapoints, volume;
      };
      // console.log("getData=>>>>>>>>>>>>>>>>>", getData());
      //call function to create chart data
      getData();

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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//end form submit
//chart
// test data1---functioning

// testData2 from api
// const testData = JSON.parse(document.getElementById("testData").text);
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", testData);
//get elements

//end data wrangling

// //actual chart drawing--shoul clean up
// Highcharts.getJSON(
//   "https://demo-live-data.highcharts.com/aapl-c.json",
//   function (data) {
//     //display data
//     // console.table(volume);
//     // Create the chart
//     Highcharts.stockChart("chart-container", {
//       yAxis: [
//         {
//           labels: {
//             align: "left",
//           },
//           height: "80%",
//         },
//         {
//           labels: {
//             align: "left",
//           },
//           top: "80%",
//           height: "20%",
//           offset: 0,
//         },
//       ],
//       series: [
//         {
//           type: "area",
//           id: "price",
//           name: "Stock Price",
//           data: areapoints,
//         },
//         {
//           type: "column",
//           id: "volume",
//           name: "Volume",
//           data: volume,
//           yAxis: 1,
//         },
//       ],
//     });
//   }
// );
