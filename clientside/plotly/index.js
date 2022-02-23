window.addEventListener('load', async function () {
    let response = await fetch("http://localhost:3000/v1/topten?cid=N00009825&cycle=2020")
    let top10 = await response.json();
    let response = [
        {
            "industry_name": "Retired",
            "industry_code": "W06",
            "indivs": 84496,
            "pacs": 0,
            "total": 84496,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Lawyers/Law Firms",
            "industry_code": "K01",
            "indivs": 69954,
            "pacs": 0,
            "total": 69954,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Lobbyists",
            "industry_code": "K02",
            "indivs": 28725,
            "pacs": 0,
            "total": 28725,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Human Rights",
            "industry_code": "Q09",
            "indivs": 11868,
            "pacs": 7500,
            "total": 19368,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Leadership PACs",
            "industry_code": "Q03",
            "indivs": 0,
            "pacs": 18501,
            "total": 18501,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Misc Business",
            "industry_code": "N12",
            "indivs": 13580,
            "pacs": 0,
            "total": 13580,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Health Professionals",
            "industry_code": "H01",
            "indivs": 12690,
            "pacs": 0,
            "total": 12690,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Hospitals/Nursing Homes",
            "industry_code": "H02",
            "indivs": 11615,
            "pacs": 0,
            "total": 11615,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Misc Finance",
            "industry_code": "F13",
            "indivs": 10650,
            "pacs": 0,
            "total": 10650,
            "last_updated": "03/22/2021"
        },
        {
            "industry_name": "Insurance",
            "industry_code": "F09",
            "indivs": 10289,
            "pacs": 0,
            "total": 10289,
            "last_updated": "03/22/2021"
        }
    ]

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




    var data = [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie'
      }];
      
      var layout = {
        height: 400,
        width: 500
      };
      
      Plotly.newPlot('myDiv', data, layout);
      

})




