import React from "react";
import { useD3 } from "../hooks/useD3.js";
import * as d3 from "d3";

function Top10Pie({ repData, width }) {
  const ref = useD3(
    (parent) => {
      let margin = {
        left: 75,
        right: 50,
        height: 350, //hardcoded, if we want we can fix that.
        top: 100,
        bottom: 100,
        width: width,
        padding: 20,
      };
      const tableau_ten = [
        "#4E79A7",
        "#f28e2b",
        "#e15759",
        "#76b7b2",
        "#59a14f",
        "#edc948",
        "#b07aa1",
        "#ff9da7",
        "#9c755f",
        "#bab0ac"
      ]
      const svg = parent.select("svg");
      svg
        .attr("width", margin.width + "px")
        .attr("height", margin.height + "px")
        .html("");
      // input_data
      let pie_data = repData.data;
      pie_data = pie_data.map((d) => {
        d.total = 10;
        return d;
      });
      let pie = d3.pie().value((d) => d.total);
      let mid_x = margin.width / 2;
      let mid_y = margin.height / 2;

      
      let text_radius = width/2/2;

      var arc = d3.arc().innerRadius(0).outerRadius(width/4);
      var point_line_start = d3.arc().innerRadius(0).outerRadius(width/2 + 10).centroid;
      var point_line_end = d3.arc().innerRadius(0).outerRadius(width/2 + 20).centroid;

      let adjusted_palette = tableau_ten.slice(0, pie_data.length);
      const color = d3
        .scaleOrdinal()
        .domain(pie_data.map((d) => d.industry))
        .range(adjusted_palette);
        svg
        .selectAll("path")
        .data(pie(pie_data))
        .join("path")
        .attr("transform", `translate(${mid_x}, ${mid_y})`)
        .attr("d", (d) => {
          return arc(d);
        })
        .attr("fill", (d) => color(d.data.industry))
        .attr("stroke", "black");
      svg
        .selectAll("line")
        .data(pie(pie_data))
        .join("line")
        .attr("transform", `translate(${mid_x}, ${mid_y})`)
        .attr("x1", (d) => point_line_start(d)[0])
        .attr("y1", (d) => point_line_start(d)[1])
        .attr("x2", (d) => point_line_end(d)[0])
        .attr("y2", (d) => point_line_end(d)[1])
        .attr("stroke", "black");
      svg
        .selectAll(".arc-label")
        .data(pie(pie_data))
        .join((enter) => {
          let max_char_per_line = 10;
          let text = enter
            .append("text")
            .classed("arc-label", true)
            .attr("text-anchor", "middle")
            .html((d) => {
              let splits = [];
              if (d.data.industry.length < max_char_per_line) {
                splits.push(`
                  <tspan x=0 y=0 dy=0em>${d.data.industry}</tspan>
                  `);
              } else {
                let split_text = d.data.industry.split(/ /g);
                split_text = split_text
                  .map((d) => {
                    let new_split = d.split(/\//g);
                    if (new_split.length == 1) {
                      return new_split;
                    }
                    new_split.splice(1, 0, "/");
                    return new_split;
                  })
                  .flat(3);
                while (split_text.length > 0) {
                  let current_string;
                  if (split_text.length > 0) {
                    current_string = split_text.shift();
                    while (
                      current_string.length < max_char_per_line &&
                      split_text.length > 0
                    ) {
                      let new_word = split_text.shift();
                      let spacing =
                        new_word == "/" ||
                        current_string[current_string.length - 1] == "/"
                          ? ""
                          : " ";
                      current_string += spacing + new_word;
                    }
                  }
                  splits.push(`
                  <tspan x=0 y=0 dy=${
                    splits.length > 0 ? 1.3 : 0
                  }em>${current_string}</tspan>
                  `);
                }
              }
    
              splits.push(`
                  <tspan x=0 y=0 dy=${splits.length * 1.3}em>${
                (
                  (Math.abs(d.startAngle - d.endAngle) / (2 * Math.PI)) *
                  100
                ).toFixed(1) + "%"
              }</tspan>
    `);
              return splits.join("");
            });
    
          text.attr("transform", (d) => {
            let angle =
              d.startAngle - (d.startAngle - d.endAngle) / 2 - Math.PI / 2;
            // maybe rely on the max length for this
            let line_width = (d.data.industry.length / 2) * 5;
            // let direction_x = Math.cos(angle) > 0 ? 1 : -1;
            // let direction_y = Math.sin(angle) > 0 ? 1 : -1;
            let x =
              Math.cos(angle) * text_radius + Math.cos(angle) * line_width + mid_x;
            let y = Math.sin(angle) * text_radius + Math.sin(angle) * 8 + mid_y;
            return `translate(${x}, ${y})`;
          });
          return text;
        });
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
            committee that raises and spends money in order to elect and defeat
            candidates. Most PACs represent businesses, labor, or ideological
            interests. An individual contribution is a contribution made by an
            individual to a politician.
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
export default Top10Pie;

/*video notes!
lol

video no slides, don't exceed 10 slides

*/
