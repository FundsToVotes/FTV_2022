import Plot from "react-plotly.js";
import React, { Component } from "react";

export default class Top10Pie extends Component {
  constructor(props) {
    super(props);
    this.state = { repsData: {} };
  }

  componentDidMount() {
    let splitName = this.props.repsName.split(" ");
    fetch(
      `http://localhost:3000/v1/topten?firstName=${splitName[0]}&lastName=${splitName[1]}&cycle=2020`
    )
      .then((response) => response.json())
      .then((data) => {
        //somehow get rep name
          let top10 = data.data;
          let cycle = data.cycle;

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

        var value = [
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
            text: `Top 10 Industries Supporting ${this.props.repsName} in ${cycle}`,
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

        this.setState({ plot: <Plot data={value} layout={layout} /> });
      });
  }

  render() {
    return <div>{this.state.plot}</div>;
  }
}
