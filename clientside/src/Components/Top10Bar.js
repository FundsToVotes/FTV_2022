import React from 'react'
import { useD3 } from '../hooks/useD3.js'
import * as d3 from "d3"

function Top10Bar({ repData, width }) {
  const ref = useD3(
    (parent) => {
      let margin = {
        left: 75,
        right: 50,
        height: 350, //hardcoded, if we want we can fix that.
        top: 100,
        bottom: 100,
        width:  width,
        padding: 20
      }
      const svg = parent.select("svg")
      svg
        .attr("width", margin.width  + "px")
        .attr("height", margin.height + "px")
        .html("")
      const x_axis = svg
        .append("g")
        .attr("transform", `translate(0, ${margin.height - margin.bottom})`);
      const y_axis = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`);
      // Set up titles and labels
      const title = svg
        .append("text")
        .attr("transform", `translate(${margin.width / 2}, ${margin.top / 2})`)
        .attr("font-size", 20)
        .attr("text-anchor", "middle");
      // set up color assignment
      const color = d3
        .scaleOrdinal()
        .domain(["indivs", "pacs"])
        .range(["#F8BA1B", "#8FBE5A"]);

      let candidate = repData;
      let congressperson_name = candidate.name;
      let funding_data = candidate.data;
      if (funding_data.length == 0) {
        return d3.create("p").text("no data").node()
      }
      let cycle = candidate.cycle;
      let title_text = `Top Ten Industries for ${congressperson_name} in ${cycle}`
      title.text(
        title_text
      );
      if (title.node().getComputedTextLength() > margin.width - margin.padding) {
        let num_splits = Math.floor(title.node().getComputedTextLength() / (margin.width - margin.padding)) + 1
        
        title.text("")
        .attr("transform", `translate(${margin.width / 2}, ${margin.top / 2 - 10})`)
        let approx_char_per_line = title_text.length / num_splits
        let title_words = title_text.split(" ")
        let splits = []
        for (let i = 0; i < num_splits; i++) {
          let current_string = title_words.shift()
          while (current_string.length < approx_char_per_line && title_words.length > 0) {
            current_string += " " + title_words.shift()
          }
          splits.push(current_string)
          title.append("tspan")
            .attr("x", 0)
            .attr("dy", `${1 * i}em`)
            .text(current_string)
        }
      }
      const y = d3
        .scaleLinear()
        .domain([0, Math.max(...funding_data.map((d) => d.total))])
        .range([margin.height - margin.top, margin.bottom])
        .nice();
      y_axis.call(d3.axisLeft(y).ticks(5));
      const x = d3
        .scaleBand()
        .domain(funding_data.map((d) => d.industry))
        .range([margin.left, margin.width - margin.right]);
      x_axis
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(30)")
        .style("text-anchor", "start");

      let tooltip = parent
        .select("#bar-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "10px")
        .style("background", "rgba(0,0,0,0.6)")
        .style("border-radius", "4px")
        .style("color", "#fff")
        .text("a simple tooltip");
        console.log(tooltip)
      let barGroups = svg
        .selectAll(".bargroup")
        .data(funding_data)
        .join("g")
        .classed(".bargroup", true)
        .attr("title", (d) => d.industry)
        .attr("transform", (d) => `translate(${x(d.industry) + 1}, 0)`)
        .on("mouseover", (event, d) => {
          tooltip
            .html(
              `
                <div>Industry: ${d.industry}</div>
                <div>PACs: $${d.pacs.toLocaleString("en-US")}</div>
                <div>Indivs: $${d.indivs.toLocaleString("en-US")}</div>
                    `
            )
            .style("visibility", "visible");
        })
        .on("mousemove", function (event, d) {
          d
          let pointer = d3.pointer(event, window)
          console.log(pointer)
          tooltip
            .style("top", pointer[1] - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          tooltip.html(``).style("visibility", "hidden");
        });
      // stacks
        barGroups
        .selectAll("rect")
        .data((d) => d.values)
        .join("rect")
        .attr("x", 0)
        .attr("y", (d) => {
          return y(d.y1);
        })
        .attr("width", (d) => {d; return x.bandwidth() - 2})
        .attr("height", (d) => y(d.y0) - y(d.y1))
        .attr("fill", (d) => color(d.name));
    },
    [repData, width]
  );

  return (
    <div ref={ref}>
      <div className="graph-container" id="bar-container">
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
        <div>
          <div id="bar-tooltip" width="100%"></div>
          <svg id="bar-graph"></svg>
        </div>
      </div>
    </div>
    
  );
}
export default Top10Bar

/*video notes!
lol

video no slides, don't exceed 10 slides

*/
