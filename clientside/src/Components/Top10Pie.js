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
      `https://api.fundstovote.com/v1/topten?firstName=${splitName[0]}&lastName=${splitName[1]}&cycle=2020`
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

        let content = (
          <div className="graph-container">
            <div className="graph-explanation">
              <h5>What does this mean?</h5>
              <p>
                This pie chart shows the percent total of contributions to a
                candidate by a particular industry.
              </p>
            </div>
            <Plot data={value} layout={layout} />
          </div>
        );

        this.setState({ plot: content });
      })
      .catch(() => {
        this.setState({ plot: <p>No funding data at this time.</p> });
      });
  }

  render() {
    return <div>{this.state.plot}</div>;
  }
}
