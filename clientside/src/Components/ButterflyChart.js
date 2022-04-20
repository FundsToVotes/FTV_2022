import Plotly from "plotly.js";
import React from "react";


  
function ButterflyChart() {

  let repsData = {name: "Maria Cantwell", cid: "N00009825"}
  let names = repsData.name.split(" ")
  //here is the candidate data thomas says to query using the name
  //You will want to set up the same structure for the other top ten file as well
  // I will be back online in a couple hours and can help with whatever - H
  console.log(repsData);

  window.addEventListener("load", async function () {

    //i think partly, that the top10 name endpoint may be broken. once thomas does the name setup you can change this to repsData.name
    let response = await fetch(
      `https://api.fundstovote.com/v1/topten?firstName=${names[0]}&lastName=${names[1]}&cycle=2020`
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
      yAxis1.push(d.total);
     // yAxis2.push(d.pacs);
    });

    var trace1 = {
      x:  yAxis1,
      y: xAxis,
      name: "Individual Contributions",
      type: "bar",
      marker: {
        color: colorScheme[8],
      },
      orientation: "h"

    };

    var trace2 = {
      x: yAxis1,
      y: xAxis ,
      name: "PAC Contributions",
      type: "bar",
      marker: {
        color: colorScheme[0],
      },
      orientation: "h"

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
    Plotly.newPlot(`myDiv`, data1, layout1);
  });



















    // window.addEventListener("load", function () {

    // var trace1 = {
    //     x: [1, 2, 3],
    //     y: [4, 5, 6],
    //     type: 'scatter'
    //   };
      
    //   var trace2 = {
    //     x: [20, 30, 40],
    //     y: [50, 60, 70],
    //     xaxis: 'x2',
    //     yaxis: 'y2',
    //     type: 'scatter'
    //   };
      
    //   var data = [trace1, trace2];
      
    //   var layout = {
    //     grid: {rows: 1, columns: 2, pattern: 'independent'},
    //   };
      
    //   Plotly.newPlot('myDiv', data, layout)

  
    // //let IDtag = "myDiv";
//});

  
    return (
      <div>
        <div id="myDiv"></div>
      </div>
    );
    }
    
  export default ButterflyChart;