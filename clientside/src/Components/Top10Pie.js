import Plotly from "plotly.js";
import React from "react";

function Top10Pie(props) {
  let data = props;
  console.log(data);
  window.addEventListener("load", async function () {
    let response = await fetch(
      `http://localhost:3000/v1/topten?cid=${data.cid}&cycle=2020`
    );
    //somehow get rep name
    let top10 = await response.json();
    console.log(top10);

    //fetch mans, do things with data
    let values = [];
    let labels = [];
    top10.forEach((d) => {
      values.push(d.total);
      labels.push(d.industry_name);
    });
    var colorScheme = [];
    // var colorBlind = [
    //   "#003f5c",
    //   "#2f4b7c",
    //   "#665191",
    //   "#a05195",
    //   "#d45087",
    //   "#f95d6a",
    //   "#ff7c43",
    //   "#ffa600",
    //   "#ffaa68",
    //   "#fff80e",
    // ];

    // var purpleOrange = [
    //   "#291725",
    //   "#5c0049",
    //   "#7a134f",
    //   "#972953",
    //   "#b13f56",
    //   "#c95859",
    //   "#de725c",
    //   "#f08d61",
    //   "#ffaa68",
    //   "#fcc89f",
    // ];

    var redWhiteGreen = [
      "#1a4242",
      "#005c5a",
      "#006d5b",
      "#187d54",
      "#408c46",
      "#699832",
      "#96a216",
      "#c9a700",
      "#ffa600",
      "#ffd500",
    ];

    colorScheme = redWhiteGreen;

    var data = [
      {
        values: values,
        labels: labels,
        type: "pie",
        marker: {
          colors: colorScheme,
        },
        textinfo: "label+percent",
      },
    ];

    var layout = {
      title: {
        text: `Top 10 Industries Supporting ${data.name}`,
        font: {
          family: "Optima, sans-serif",
        },
        xref: "paper",
      },
      legend: {
        font: {
          family: "Optima, sans-serif",
        },
      },
      width: "600",
    };
    Plotly.newPlot("pie" + data.cid, data, layout);
  });

  let IDtag = "pie" + data.cid;

  return (
    <div>
      <div id={IDtag}></div>
    </div>
  );
}
export default Top10Pie;
