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
form
  .addEventListener("submit", function (event) {
    event.preventDefault();
    searchTerm = form.elements[0].value;
    //get data from api
    fetch("http://localhost:5000/ticker/" + searchTerm)
      .then((response) => response.json())
      .then((data) => {
        // stringify object response back to json format
        let JSONdata = JSON.stringify(data);

        // console.log("Success:", data);

        //make visible the details section
        document
          .querySelector("#stock-detail-section")
          .classList.remove("none");

        //render company tab
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

        //descructure recommends
        const { buy, hold, sell, strongBuy, strongSell } =
          data.recommendations[0];

        //render summary tab
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
      </table>
      <div class="recommend-section">
           <div id="left-text"><b>Strong<br> Sell</b></div>
           <div class="box" id="strong-sell">${strongSell}</div>
           <div class="box" id="sell">${sell}</div>
           <div class="box" id="hold">${hold}</div>
           <div class="box" id="buy">${buy}</div>
           <div class="box" id="strong-buy">${strongBuy}</div>
           <div id="right-text"><b>Strong<br> Buy</b></div>                
       </div>`;

        //create chart with data

        const c = data.c;
        const t = data.t;
        const v = data.v;

        // chart data aggregator variables
        var areapoints = [],
          volume = [];

        //data transformations function
        const getData = function () {
          for (let i = 0; i < t.length; i++) {
            //multipliying by 1000 to turn epoch time to normal time
            areapoints.push([t[i] * 1000, c[i]]);

            volume.push([t[i] * 1000, v[i]]);
          }
        };

        //call function to create chart data
        getData();

        // render the chart
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
      });
  })
  ?.catch((error) => {
    console.error("Error:", error);
  });
