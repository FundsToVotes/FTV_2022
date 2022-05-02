import Plotly from "plotly.js";
import React, { Component } from "react";

export default class Top10Bar extends Component {
  constructor(props) {
    super(props);
    this.state = { repsData: {} };
  }

  componentDidMount() {
    let splitName = this.props.repsName.split(" ");
    fetch(
      `https://api.fundstovote.com/v1/topten?firstName=${splitName[0]}&lastName=${splitName[1]}&cycle=2020`
    )
      .then((response) => response.json())
      .then((data) => {
        // this.setState({ repsData: data });
        console.log("this is the data" + JSON.stringify(data.data))
        if (data.length > 0) {
          //somehow get rep name
          let top10 = data.data;
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
            showlegend: true,
            legend: {
              x: 1,
              xanchor: 'right',
              y: 1},
            title: {
              text: `Number of PAC vs Individual Contributions by Industry<br>for ${this.props.repsName}`,
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

          //this.setState({ plot: <Plot data={data1} layout={layout1} /> });
        }
        var config = {
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'sendDataToCloud', 'toggleSpikelines', 'resetViewMapbox'],
          toImageButtonOptions: {
            format: 'png',
            filename: `PACvsIndividualChart-${splitName[1]}`,
            height: 500,
            width: 500,
            scale: 8
          }}
        Plotly.newPlot(`barchart1`, data1, layout1, config);
      });
  }

  render() {
    //return <div>{this.state.plot}</div>;
   return( <div>
    <div id="barchart1"></div>
  </div>)
  }
}

/*video notes!
lol

video no slides, don't exceed 10 slides

*/