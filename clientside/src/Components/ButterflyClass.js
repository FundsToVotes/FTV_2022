import Plotly from "plotly.js";
import React, { Component } from "react";
var congressperson1, congressperson2

export default class ButterflyChart1 extends Component {
  constructor(props) {
    super(props);
    this.state = { repsData: {} };
    console.log(this.props)
  }

  componentDidMount() {
    let splitName = this.props.repsName1.split(" ");
    let splitName2 = this.props.repsName2.split(" ")
    console.log(splitName)
    fetch(
      `https://api.fundstovote.com/v1/topten?firstName=${splitName[0]}&lastName=${splitName[1]}&cycle=2020`
    )
      .then((response) => response.json())
      .then((data) => {
        // this.setState({ repsData: data });

            //caching to variable
            congressperson1 = data;
        
            return fetch(
                `https://api.fundstovote.com/v1/topten?firstName=${splitName2[0]}&lastName=${splitName2[1]}&cycle=2020`
              );
      

    }).then((response) => {
        //get json from above fetch as well
        return response.json();
    }).then((data) => {

        console.log(data)
        congressperson2 = data


        if(congressperson1 && congressperson2 ){
          let top10_1 = congressperson1.data;
          //fetch mans, do things with data
          let values = [];
          let labels = [];
          top10_1.forEach((d) => {
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
         // let yAxis2 = [];
      
          top10_1.forEach((d) => {
            xAxis.push(d.industry_name);
            yAxis1.push(d.total);
           // yAxis2.push(d.pacs);
          });
      
          var trace1 = {
            x:  yAxis1,
            //y: xAxis,
            text: xAxis.map(String),
            textposition: 'auto',
      
            yaxis: 'y2',
            xaxis: 'x2',
            name: `${this.props.repsName1}`,
                        type: "bar",
            marker: {
              color: colorScheme[8],
            },
            orientation: "h"
      
          };






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
           // let yAxis2 = [];
        
            top10_2.forEach((d) => {
                xAxis_2.push(d.industry_name);
                yAxis1_2.push(d.total);
             // yAxis2.push(d.pacs);
            });


      
          var trace2 = {
            x: yAxis1_2,
           // y: xAxis ,
                 //y: xAxis,
                 text: xAxis.map(String),
                 textposition: 'auto',
            name: `${this.props.repsName2}`,
            type: "bar",
            marker: {
              color: colorScheme[0],
            },
            orientation: "h"
      
          };
    
          var data1 = [trace1, trace2];
      
          var layout1 = {
           grid: {rows: 1, columns: 2, pattern: 'independent'},
           xaxis:{
             autorange: 'reversed'},
             title: {
                text: `Amount of Contributions by Industry<br>for ${this.props.repsName1} and ${this.props.repsName2}`,
                font: {
                  family: "Optima, sans-serif",
                },
                xref: "paper",
              },
              font: {
                family: "Optima, sans-serif",
              },
      
          };

          //this.setState({ plot: <Plot data={data1} layout={layout1} style={{width: `100%`, height: `100%`}}/> });


        }
        var config = {responsive: true}
        Plotly.newPlot(`butterfly`, data1, layout1, config);

      });
  }

  render() {
    //return <div>{this.state.plot}</div>;
   return( <div>
    <div id="butterfly"></div>
  </div>)
  }
}
