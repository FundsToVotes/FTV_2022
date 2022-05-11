import Plotly from "plotly.js";
import React, { Component } from "react";
var congressperson1, congressperson2;

export default class ButterflyChart1 extends Component {
  constructor(props) {
    super(props);
    this.state = { repsData: {} };
  }

  componentDidMount() {
    let splitName = this.props.repsName1.split(" ");
    let splitName2 = this.props.repsName2.split(" ");
    fetch(
      `http://localhost:3000/v1/topten?firstName=${splitName[0]}&lastName=${splitName[1]}&cycle=2020`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //caching to variable
        congressperson1 = data;

        return fetch(
          `http://localhost:3000/v1/topten?firstName=${splitName2[0]}&lastName=${splitName2[1]}&cycle=2020`
        );
      })
      .then((response) => {
        //get json from above fetch as well
        return response.json();
      })
      .then((data) => {
        congressperson2 = data;
        console.log(data);

        console.log("then");

        if (congressperson1 && congressperson2) {
          let top10_1 = congressperson1.data;
          //fetch mans, do things with data
          let values = [];
          let labels = [];
          top10_1.forEach((d) => {
            values.push(d.total);
            labels.push(d.industry_name);
          });

          let xAxis = [];
          let yAxis1 = [];

          top10_1.forEach((d) => {
            xAxis.push(d.industry_name);
            yAxis1.push(d.total);
          });

          let top10_2 = congressperson2.data;
          //fetch mans, do things with data
          let values_2 = [];
          let labels_2 = [];
          top10_2.forEach((d) => {
            values_2.push(d.total);
            labels_2.push(d.industry_name);
          });

          let xAxis_2 = [];
          let yAxis1_2 = [];

          top10_2.forEach((d) => {
            xAxis_2.push(d.industry_name);
            yAxis1_2.push(d.total);
          });

          let xAxisRange = [];

          if (Math.max(...yAxis1_2) > Math.max(...yAxis1)) {
            xAxisRange = [0, Math.max(...yAxis1_2)];
            console.log(xAxisRange);
          } else {
            xAxisRange = [0, Math.max(...yAxis1)];
            console.log(xAxisRange);
          }

          var trace1 = {
            x: yAxis1,
            text: xAxis.map(String),
            textposition: "outside",
            yaxis: "y2",
            xaxis: "x2",
            name: `${this.props.repsName1}`,
            type: "bar",
            hovertemplate: "<b>Sum of Donations</b>: %{x}<br>",
            marker: {
              color: `#F8BA1B`,
            },
            orientation: "h",
          };
          var trace2 = {
            x: yAxis1_2,
            text: xAxis_2.map(String),
            textposition: "outside",
            name: `${this.props.repsName2}`,
            type: "bar",
            marker: {
              color: `#91B05E`,
            },
            orientation: "h",
            hovertemplate: "<b>Sum of Donations</b>: %{x}<br>",
          };

          var data1 = [trace1, trace2];

          var layout1 = {
            grid: { rows: 1, columns: 2, pattern: "independent" },
            xaxis: {
              autorange: "reversed",
              range: xAxisRange,
            },
            xaxis2: {
              range: xAxisRange,
            },
            yaxis: {
              autorange: true,
              showgrid: false,
              zeroline: false,
              showline: false,
              autotick: true,
              ticks: "",
              showticklabels: false,
            },
            yaxis2: {
              autorange: true,
              showgrid: false,
              zeroline: false,
              showline: false,
              autotick: true,
              ticks: "",
              showticklabels: false,
            },

            title: {
              text: `Amount of Contributions by Industry<br>for ${this.props.repsName2} and ${this.props.repsName1}`,
              font: {
                family: "Optima, sans-serif",
              },
              xref: "paper",
            },
            font: {
              family: "Optima, sans-serif",
            },
          };
        } else if (congressperson1 && !congressperson2) {
          console.log("1st");
        } else if (congressperson2 && !congressperson1) {
          console.log("2nd");
        }
        var config = { responsive: true };
        this.setState({ error: <p></p>, display: "" });
        Plotly.newPlot(`butterfly`, data1, layout1, config);
      })
      .catch(
        this.setState({
          error: <p>Neither candidate has funding data at this time.</p>,
          display: "no-data",
        })
      );
  }

  render() {
    return (
      <div>
        <div
          className={"graph-explanation comp-explanation " + this.state.display}
        >
          <h5 className="graph-title mt-1">Contributions Amount by Industry</h5>
          <p className="mt-1">
            This butterfly chart shows the amount of money each politition spent
            on the <strong>2020</strong> election cycle.
          </p>
        </div>

        <div id="butterfly"></div>
        <div>{this.state.error}</div>
      </div>
    );
  }
}
