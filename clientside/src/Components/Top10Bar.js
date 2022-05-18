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
      `http://localhost:3000/v1/topten?firstName=${splitName[0]}&lastName=${splitName[1]}&cycle=2020`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length > 0) {
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

          var traceData = [trace1, trace2];

          // NOT PROPERLY RESPONSIVE NEEDS A HEIGHT THAT IS STILL RESPONSIVE
          var layout = {
            barmode: "stack",
            width: "600",
            showlegend: true,
            legend: {
              x: 1,
              xanchor: "right",
              y: 1,
            },
            title: {
              text: `Number of PAC vs Individual Contributions by Industry<br>for ${this.props.repsName} in ${cycle}`,
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
        }
        var config = {
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: [
            "zoom2d",
            "pan2d",
            "select2d",
            "lasso2d",
            "zoomIn2d",
            "zoomOut2d",
            "autoScale2d",
            "resetScale2d",
            "hoverClosestGl2d",
            "hoverClosestPie",
            "toggleHover",
            "resetViews",
            "sendDataToCloud",
            "toggleSpikelines",
            "resetViewMapbox",
          ],
          toImageButtonOptions: {
            format: "png",
            filename: `PACvsIndividualChart-${splitName[1]}`,
            height: 500,
            width: 500,
            scale: 8,
          },
        };
        this.setState({ error: <p></p>, display: "" });
        Plotly.newPlot(`barchart1`, traceData, layout, config);
      })
      .catch(
        this.setState({
          error: <p className="mt-2">No funding data at this time.</p>,
          display: "no-data",
        })
      );
  }

  render() {
    return (
      <div>
        <div className={"graph-container " + this.state.display}>
          <div className="graph-explanation">
            <h5>What does this mean?</h5>
            <p>
              A PAC, or political action committee, is a term for a political
              committee that raises and spends money in order to elect and
              defeat candidates. Most PACs represent businesses, labor, or
              ideological interests. An individual contribution is a
              contribution made by an individual to a politician.
              <br></br>
              The bar chart shows total contributions by industry.
            </p>
          </div>
          <div id="barchart1"></div>
        </div>
        <div>{this.state.error}</div>
      </div>
    );
  }
}
