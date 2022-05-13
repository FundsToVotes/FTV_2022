// import Plotly from "plotly.js";
import React from "react";
// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function ButterflyChart1() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     repsName1: this.props.repsName1,
  //     repsName2: this.props.repsName2,
  //   };
  // }

  const { search } = useLocation();
  const { representative } = queryString.parse(search);
  console.log(representative);
  // const [repOne, repTwo] = representative.split(" ");

  // const fetchData = () => {
  //   let splitName = this.state.repsName1.split(" ");
  //   let splitName2 = this.state.repsName2.split(" ");
  //   fetch(
  //     `http://localhost:3000/v1/topten?firstName=${splitName[0]}&lastName=${splitName[1]}&cycle=2020`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //caching to variable
  //       this.setState({ congressperson1: data });
  //     })
  //     .catch(() => {
  //       this.setState({
  //         congressperson1: {
  //           cycle: "2020",
  //           data: [],
  //           name: this.state.repsName1,
  //         },
  //       });
  //     });

  //   fetch(
  //     `http://localhost:3000/v1/topten?firstName=${splitName2[0]}&lastName=${splitName2[1]}&cycle=2020`
  //   )
  //     .then((response) => {
  //       //get json from above fetch as well
  //       return response.json();
  //     })
  //     .then((data) => {
  //       this.setState({ congressperson2: data });
  //     })
  //     .catch(() => {
  //       this.setState({
  //         congressperson2: {
  //           cycle: "2020",
  //           data: [],
  //           name: this.state.repsName2,
  //         },
  //       });
  //     });
  // };

  // const setUpGraph = () => {
  //   let congressperson1 = this.state.congressperson1;
  //   let congressperson2 = this.state.congressperson2;
  //   let top10_1 = congressperson1.data;
  //   //fetch mans, do things with data
  //   let values = [];
  //   let labels = [];
  //   top10_1.forEach((d) => {
  //     values.push(d.total);
  //     labels.push(d.industry_name);
  //   });

  //   let xAxis = [];
  //   let yAxis1 = [];

  //   top10_1.forEach((d) => {
  //     xAxis.push(d.industry_name);
  //     yAxis1.push(d.total);
  //   });
  //   let top10_2 = congressperson2.data;
  //   //fetch mans, do things with data
  //   let values_2 = [];
  //   let labels_2 = [];
  //   top10_2.forEach((d) => {
  //     values_2.push(d.total);
  //     labels_2.push(d.industry_name);
  //   });

  //   let xAxis_2 = [];
  //   let yAxis1_2 = [];

  //   top10_2.forEach((d) => {
  //     xAxis_2.push(d.industry_name);
  //     yAxis1_2.push(d.total);
  //   });

  //   let xAxisRange = [];

  //   if (Math.max(...yAxis1_2) > Math.max(...yAxis1)) {
  //     xAxisRange = [0, Math.max(...yAxis1_2)];
  //   } else {
  //     xAxisRange = [0, Math.max(...yAxis1)];
  //   }

  //   var trace1 = {
  //     x: yAxis1,
  //     text: xAxis.map(String),
  //     textposition: "outside",
  //     yaxis: "y2",
  //     xaxis: "x2",
  //     name: `${this.props.repsName1}`,
  //     type: "bar",
  //     hovertemplate: "<b>Sum of Donations</b>: %{x}<br>",
  //     marker: {
  //       color: `#F8BA1B`,
  //     },
  //     orientation: "h",
  //   };
  //   var trace2 = {
  //     x: yAxis1_2,
  //     text: xAxis_2.map(String),
  //     textposition: "outside",
  //     name: `${this.props.repsName2}`,
  //     type: "bar",
  //     marker: {
  //       color: `#91B05E`,
  //     },
  //     orientation: "h",
  //     hovertemplate: "<b>Sum of Donations</b>: %{x}<br>",
  //   };

  //   var data1 = [trace1, trace2];

  //   var layout1 = {
  //     grid: { rows: 1, columns: 2, pattern: "independent" },
  //     xaxis: {
  //       autorange: "reversed",
  //       range: xAxisRange,
  //     },
  //     xaxis2: {
  //       range: xAxisRange,
  //     },
  //     yaxis: {
  //       autorange: true,
  //       showgrid: false,
  //       zeroline: false,
  //       showline: false,
  //       autotick: true,
  //       ticks: "",
  //       showticklabels: false,
  //     },
  //     yaxis2: {
  //       autorange: true,
  //       showgrid: false,
  //       zeroline: false,
  //       showline: false,
  //       autotick: true,
  //       ticks: "",
  //       showticklabels: false,
  //     },

  //     title: {
  //       text: `Amount of Contributions by Industry<br>for ${this.props.repsName2} and ${this.props.repsName1}`,
  //       font: {
  //         family: "Optima, sans-serif",
  //       },
  //       xref: "paper",
  //     },
  //     font: {
  //       family: "Optima, sans-serif",
  //     },
  //   };

  //   var config = { responsive: true };
  //   Plotly.newPlot(`butterfly`, data1, layout1, config);
  // };

  // if (this.state.congressperson1 && this.state.congressperson2) {
  //   this.setUpGraph();
  // }

  return (
    <div>
      <div className={"graph-explanation comp-explanation "}>
        <h5 className="graph-title mt-1">Contributions Amount by Industry</h5>
        <p className="mt-1">
          This butterfly chart shows the amount of money each politition spent
          on the <strong>2020</strong> election cycle.
        </p>
      </div>

      <div id="butterfly"></div>
    </div>
  );
}
