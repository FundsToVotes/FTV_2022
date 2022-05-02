import Plotly from "plotly.js";
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
        let top10 = data;
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
            text: `Top 10 Industries Supporting ${this.props.repsName}`,
            font: {
              family: "Optima, sans-serif",
            },
            xref: "paper",
          },
          showlegend: false,
          // legend: {
          //   font: {
          //     family: "Optima, sans-serif",
          //   },
          //   x: 1,
          //   xanchor: 'right',
          //   y: 1
        //  },
          width: "600",
        };
        var config = {
          displaylogo: false,
          responsive: true,
          toImageButtonOptions: {
            format: 'png',
           // resolution: 10,
            filename: `Top10Pie-${splitName[1]}`,
            height: 500,
            width: 500,
            scale: 8

          }}

        Plotly.newPlot(`pie1`, value, layout, config);

       // this.setState({ plot: <Plot data={value} layout={layout} /> });
        
      });
  }

  render() {
    //return <div>{this.state.plot}</div>;
   return( <div>
    <div id="pie1"></div>
  </div>)
  }
}
