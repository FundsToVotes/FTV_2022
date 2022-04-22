import Plot from "react-plotly.js";
import React from "react";

function Top10Pie(props) {
  const { repsData } = props;
  console.log(repsData);
  let returned;

  if (repsData.name) {
    //somehow get rep name
    let top10 = repsData.data;
    console.log(top10);

    //fetch mans, do things with data
    let values = [];
    let labels = [];

    top10.forEach((d) => {
      values.push(d.total);
      labels.push(d.industry_name);
    });
    var colorScheme = [];

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
        text: `Top 10 Industries Supporting ${repsData.name}`,
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

    returned = <Plot data={data} layout={layout} />;
  }

  // Plotly.newPlot("pie" + data.cid, data, layout);

  return <div>{returned}</div>;
}
export default Top10Pie;
