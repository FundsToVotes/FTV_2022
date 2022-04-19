/* eslint-disable react/prop-types */
import Plotly from "plotly.js";
// import React from "react";
// import {
//   // rest of the elements/components imported remain same
//   useParams,
// } from "react-router-dom";

export default function Top10Bar(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = { repsData: props.repsData };
  // }
  const { repsData } = props;
  console.log(repsData);

  //here is the candidate data thomas says to query using the name
  //You will want to set up the same structure for the other top ten file as well
  // I will be back online in a couple hours and can help with whatever - H
  let formattedName;
  if (repsData.name) {
    formattedName = repsData.name.split(" ");
    repsData.name = formattedName[1] + ",%20" + formattedName[0];
    console.log(repsData.name);
  }

  repsData.name = window.addEventListener("load", async function () {
    let response = await fetch(
      //going to need to make it so that the user can pick a cycle year and we use that to query

      //CHANGE THIS TO NAME= ONCE THOMAS FINISHES THE ENDPOINT UPDATE
      `http://localhost:3000/v1/topten?cid=N00042868&cycle=2020`
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

    let xAxis = [];
    let yAxis1 = [];
    let yAxis2 = [];

    top10.forEach((d) => {
      xAxis.push(d.industry_name);
      yAxis1.push(d.indivs);
      yAxis2.push(d.pacs);
    });

    var trace1 = {
      x: xAxis,
      y: yAxis1,
      name: "Individual Contributions",
      type: "bar",
      marker: {
        color: colorScheme[8],
      },
    };

    var trace2 = {
      x: xAxis,
      y: yAxis2,
      name: "PAC Contributions",
      type: "bar",
      marker: {
        color: colorScheme[0],
      },
    };

    var data1 = [trace1, trace2];

    var layout1 = {
      barmode: "stack",
      width: "600",
      title: {
        text: `Number of PAC vs Individual Contributions by Industry for ${repsData.name}`,
        font: {
          family: "Optima, sans-serif",
        },
        xref: "paper",
      },
      font: {
        family: "Optima, sans-serif",
      },
      xref: "paper",
    };
    //eventually, you won't get CID so you need to change this to another id
    Plotly.newPlot(`bar${repsData.name}`, data1, layout1);
  });
  //each tag is unique to the cid prop
  let IDtag = `bar${repsData.name}`;
  return (
    <div>
      <div id={IDtag}></div>
    </div>
  );
}
