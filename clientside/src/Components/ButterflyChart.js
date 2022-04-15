import Plotly from "plotly.js";
import React from "react";


  
function ButterflyChart() {

    window.addEventListener("load", function () {

    var trace1 = {
        x: [1, 2, 3],
        y: [4, 5, 6],
        type: 'scatter'
      };
      
      var trace2 = {
        x: [20, 30, 40],
        y: [50, 60, 70],
        xaxis: 'x2',
        yaxis: 'y2',
        type: 'scatter'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        grid: {rows: 1, columns: 2, pattern: 'independent'},
      };
      
      Plotly.newPlot('myDiv', data, layout)

  
    //let IDtag = "myDiv";
});

  
    return (
      <div>
        <div id="myDiv"></div>
      </div>
    );
    }
    
  export default ButterflyChart;