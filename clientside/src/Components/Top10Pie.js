import React from "react";
import { useD3 } from "../hooks/useD3.js";
import * as d3 from "d3";

function Top10Pie({ repData, width }) {
  const ref = useD3(
    (parent) => {
      let margin = {
        left: 30,
        right: 175,
        height: 440, //hardcoded, if we want we can fix that.
        top: 40,
        bottom: 40,
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
        "#bab0ac",
      ];
      const mobile = margin.width < 500 ? true : false
      if (mobile) {
        margin.height = 600
        margin.right = 10
        margin.left = 10
      }
      const svg = parent.select("svg");
      svg
        .attr("width", margin.width + "px")
        .attr("height", margin.height + "px")
        .html("");
      
      const title = svg
        .append("text")
        .attr("transform", `translate(${margin.width / 2}, ${20})`)
        .attr("font-size", 20)
        .attr("text-anchor", "middle");

      let congressperson_name = repData.name;
      let cycle = repData.cycle;
      let title_text = `Top Ten Industries supporting ${congressperson_name} in ${cycle}`;
      title.text(title_text);
      if (
        title.node().getComputedTextLength() >
        margin.width - margin.padding
      ) {
        let num_splits =
          Math.floor(
            title.node().getComputedTextLength() /
              (margin.width - margin.padding)
          ) + 1;
        margin.top = 30 * num_splits
        title
          .text("")
        let approx_char_per_line = title_text.length / num_splits;
        let title_words = title_text.split(" ");
        let splits = [];
        for (let i = 0; i < num_splits; i++) {
          let current_string;
          if (title_words.length > 0) {
            current_string = title_words.shift();
            while (
              current_string.length < approx_char_per_line &&
              title_words.length > 0
            ) {
              current_string += " " + title_words.shift();
            }
            splits.push(current_string);
            title
              .append("tspan")
              .attr("x", 0)
              .attr("y", 0)
              .attr("dy", `${1.3 * i}em`)
              .text(current_string);
          }
        }
      }

      let pie_data = repData.data;
      let pie = d3.pie().value((d) => d.indivs + d.pacs);

      let radius = (margin.width - margin.right)/2
      let mid_y = margin.height / 2;
      
      if (mobile) {
        console.log("mobile", width)
        mid_y = margin.width/2 + margin.top
        
      } else if (radius * 2 > margin.height - margin.top) {
        radius = (margin.height - margin.top) /2
        mid_y = mid_y + margin.top/2
      } 
      console.log(mid_y)

      let mid_x = radius;

      var arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius);
      var text_radius = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius * 1.6);

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
    
      let prep_legend_labels = []
      color.domain().forEach(d => {
        let returnable = []
        if (d.length > 10) {
          let strings = d.split(/ /gm)
          let currentString = strings.shift()
          while (strings.length > 0) {            
            if (currentString.length > 10) {
              returnable.push(currentString)
              currentString = strings.shift()
            } else {
              currentString += " " + strings.shift()
            }
            
          }
          returnable.push(currentString)
        } else {
          returnable.push(d)
        }
        prep_legend_labels.push(returnable)
      })
      let cumulative_lines = []
      prep_legend_labels.forEach(() => {
        let pos = cumulative_lines.length
        if (pos > 0) {
          let num_prev_lines = cumulative_lines[pos - 1]
          cumulative_lines.push(num_prev_lines + prep_legend_labels[pos - 1].length)
        } else {
          cumulative_lines.push(0)
        }
      })
      let total_lines = 0
      prep_legend_labels.forEach(d => total_lines += d.length)
      if (mobile) {
        // don't ask about the 22, I just fiddled with the code until it 
        // looked nice lmao
        margin.height = margin.top + margin.width + total_lines / 2 * 22
        svg
          .attr("height", margin.height + "px")
      }
      svg
        .selectAll(".arc-label")
        .data(pie(pie_data))
        .join((enter) => {
          let text = enter
            .append("text")
            .classed("arc-label", true)
            .attr("text-anchor", "middle")
            .text(d => {
              return ((Math.abs(d.startAngle - d.endAngle) / (2 * Math.PI)) *
              100)
            .toFixed(1) + "%"
            })
            .attr("transform", d => `translate(${text_radius.centroid(d)[0] + mid_x}, ${text_radius.centroid(d)[1] + mid_y})`)
            .attr("font-size", 12)

          return text;
        });
        svg
        .selectAll(".legend")
        .data(color.domain())
        .join((enter) => {
          let height_divvy = 17
          let start_height = margin.height/2 - (height_divvy * total_lines)/2
          let legend_group = enter
            .append("g")
            .attr("transform", (d, i) => {
              if (!mobile) {
                let x = margin.left + 20 + radius * 2
                let y = start_height + (cumulative_lines[i] * height_divvy)
                return `translate(${x}, ${y})`
              }
              start_height = margin.top + radius * 2 + 30
              let x
              let y
              console.log(cumulative_lines[i])
              console.log()
              if (i < color.domain().length / 2) {
                x = margin.width / 2 / 5
                y = start_height + (cumulative_lines[i] * height_divvy) 
              } else {
                x = margin.width / 2 * 1.1
                y = start_height + ((cumulative_lines[i] - cumulative_lines[Math.floor(color.domain().length / 2)]) * height_divvy) 
              }
              return `translate(${x}, ${y})`
            })
          
          legend_group
            .append("rect")
            .attr("fill", (d) => color(d))
            .attr("width", 10)
            .attr("height", 10)
          let text = legend_group
            .append("text")
            .classed("legend", true)
            .attr("x", 15)
            .attr("y", 10)
            .attr("font-size", 12)
          text
            .selectAll("tspan")
            .data((d, i) => {
              d
              return prep_legend_labels[i]
            })
            .join("tspan")
            .text((d) => {
              return d
            })
            .attr("x", 15)
            .attr("y", 10)
            .attr("dy", (d, i) => `${1.3 * i}em`)

          return legend_group;
        });
    },
    [repData, width]
  );

  let display;
  if (repData.data.length == 0) {
    display = "no-data";
  } else {
    display = "";
  }

  let error;
  if (repData.data.length == 0) {
    error = <p className={"mt-2"}>No funding data at this time.</p>;
  } else {
    error = "";
  }

  return (
    <div>
      <div className={"graph-container " + display} id="bar-container">
        <div className="graph-explanation">
          <h5>What does this mean?</h5>
          <p>
          This pie chart shows the percent total of contributions to a candidate by a particular industry.
          </p>
        </div>
        <div>
          <div ref={ref}>
            <div id="bar-tooltip" width="100%"></div>
            <svg id="bar-graph"></svg>
          </div>
        </div>
      </div>
      {error}
    </div>
  );
}
export default Top10Pie;
