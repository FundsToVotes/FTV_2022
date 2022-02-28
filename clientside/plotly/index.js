window.addEventListener('load', async function () {
    let response = await fetch("http://localhost:3000/v1/topten?cid=N00009825&cycle=2020")
    let top10 = await response.json();
    console.log(top10)

    //fetch mans, do things with data
    let values = []
    let labels = []
    top10.forEach((d) => {
        values.push(d.total)
        labels.push(d.industry_name)
    })

    var data = [{
        values: values,
        labels: labels,
        type: 'pie'
      }];
    Plotly.newPlot("plot", data)




      
    //   var layout = {
    //     height: 400,
    //     width: 500
    //   };
      
    //   Plotly.newPlot('plot', data, layout);
      

})




