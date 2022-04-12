
window.addEventListener('load', async function () {
    let response = await fetch("http://localhost:3000/v1/topten?cid=N00009825&cycle=2020")
    //somehow get rep name
    let top10 = await response.json();
    console.log(top10)

    //fetch mans, do things with data
    let values = []
    let labels = []
    top10.forEach((d) => {
        values.push(d.total)
        labels.push(d.industry_name)
    })
    var colorScheme = []
    var colorBlind = ['#003f5c',
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#ffa600',
        '#ffaa68', 
        '#fff80e'
    ]


    var purpleOrange = [
        '#291725',
        '#5c0049',
        '#7a134f',
        '#972953',
        '#b13f56',
        '#c95859',
        '#de725c',
        '#f08d61',
        '#ffaa68',
        '#fcc89f'
    ]

    var redWhiteGreen = [
        '#1a4242',
        '#005c5a',
        '#006d5b',
        '#187d54',
        '#408c46',
        '#699832',
        '#96aa216',
        '#c9a700',
        '#ffa600',
        '#ffd500'
    ] 


    colorScheme = redWhiteGreen

    var data = [{
        values: values,
        labels: labels,
        type: 'pie',
        marker: {
            colors: colorScheme
        },
        textinfo: "label+percent"

      }];

    var layout = {
        title: {
            text:'Top 10 Industries Supporting N00009825',
            font: {
                family: 'Optima, sans-serif'
            },
            xref: 'paper'
        },
        legend: {
            font: {
                family: 'Optima, sans-serif'
            }
        },
        width: '600'
    }
    Plotly.newPlot("plot", data, layout) 



    let xAxis = []
    let yAxis1 = []
    let yAxis2 = []

    top10.forEach((d) => {
        xAxis.push(d.industry_name)
        yAxis1.push(d.indivs)
        yAxis2.push(d.pacs)
    })


    var trace1 = {
        x: xAxis,
        y: yAxis1,
        name: 'Individual Contributions',
        type: 'bar',
        marker: {
            color: colorScheme[8],
          }
      };
      
      var trace2 = {
        x: xAxis,
        y: yAxis2,
        name: 'PAC Contributions',
        type: 'bar',
        marker: {
            color: colorScheme[0],
          }
      };
      
      var data1 = [trace1, trace2];
      
      var layout1 = {
          barmode: 'stack',
           width: '600',
           title: {
            text:'Number of PAC vs Individual Contributions by Industry',
                font: {
                    family: 'Optima, sans-serif'
                },
                xref: 'paper'
            },
            font: {
                family: 'Optima, sans-serif'
            },
            xref: 'paper'};
      

    Plotly.newPlot("plot2", data1, layout1) 


/* 
    window.addEventListener('load', async function () {

let response = await fetch(`http://localhost:3000/v1/topten?cid=${userCIDInput}&cycle=${userCycleInput}`)
let top10 = await response.json();
console.log(top10)

 */
    })

/*     onClick={() => {
        navigate("/representative-details", {
          state: { currName: name, off: officials },
        });

 */

      
    //   var layout = {
    //     height: 400,
    //     width: 500
    //   };
      
    //   Plotly.newPlot('plot', data, layout);
      






