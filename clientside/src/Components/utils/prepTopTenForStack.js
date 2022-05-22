export default function prepTopTenForStack (topTenJson) {
    let data = topTenJson.data;
    data = data.map((d) => {
      let indivs = d.indivs;
      let pacs = d.pacs;
      console.log(d.indivs + d.pacs)
      let returnable = [];
      returnable.push({ y0: 0, y1: indivs, name: "indivs" });
      returnable.push({ y0: indivs, y1: indivs + pacs, name: "pacs" });
      return {
        industry: d.industry_name,
        values: returnable,
        indivs: indivs,
        pacs: pacs
      };
    });
    topTenJson.data = data;
    return topTenJson;
  }