export default function cleanTopTen (topTenJson) {
    topTenJson.data = topTenJson.data.map((d) => {
        d.indivs = d.indivs < 0 ? 0 : d.indivs;
        d.pacs = d.pacs < 0 ? 0 : d.pacs;
        d.total = d.indivs + d.pacs;
        return d;
    });
    topTenJson.name = topTenJson.name.slice(1, -1);
    return topTenJson;
}

