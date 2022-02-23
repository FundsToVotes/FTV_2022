window.addEventListener('load', async function () {
    let response = await fetch("http://localhost:3000/v1/topten?cid=N00009825&cycle=2020")
    let top10 = await response.json();

    console.log(response.status)
    
    //fetch mans, do things with data
    let x = []
    let y = []
    data.forEach((d) => {
        x.push(d.a)
        y.push(d.b)
    })

    let traces = [
        {
            x: x,
            y: y,
            name: "hi"
        }
    ]
    Plotly.newPlot("plot", traces)

})




