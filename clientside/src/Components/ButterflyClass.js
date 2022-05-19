import React from "react";
import { useD3 } from "../hooks/useD3.js";
import * as d3 from "d3";

function smooshFunding(leftCandidate, rightCandidate) {
  if (
    leftCandidate &&
    rightCandidate &&
    leftCandidate.data.length > 0 &&
    rightCandidate.data.length > 0
  ) {
    // if both data exists:
    let data_map = new Map();
    leftCandidate.data.forEach((d) => {
      data_map.set(d.industry, {
        industry: d.industry,
        values: [
          {
            side: "left",
            total: d.total,
            indivs: d.indivs,
            pacs: d.pacs,
            name: leftCandidate.name,
            industry: d.industry,
          },
        ],
      });
    });
    rightCandidate.data.forEach((d) => {
      if (data_map.has(d.industry)) {
        let obj = data_map.get(d.industry);
        obj.values.push({
          side: "right",
          total: d.total,
          indivs: d.indivs,
          pacs: d.pacs,
          name: rightCandidate.name,
          industry: d.industry,
        });
      } else {
        data_map.set(d.industry, {
          industry: d.industry,
          values: [
            {
              side: "right",
              total: d.total,
              indivs: d.indivs,
              pacs: d.pacs,
              name: rightCandidate.name,
              industry: d.industry,
            },
          ],
        });
      }
    });

    let payload = Array.from(data_map.values());
    payload.forEach((d) => {
      if (d.values.length == 1) {
        let side = d.values[0].side == "left" ? "right" : "left";
        let cName =
          d.values[0] == "left" ? rightCandidate.name : leftCandidate.name;
        d.values.push({
          side: side,
          total: 0,
          indivs: 0,
          pacs: 0,
          name: cName,
          industry: d.industry,
        });
      }
      d.values.biggest = Math.max(d.values[0].total, d.values[1].total);
    });

    return payload;
  } else if (
    (leftCandidate && leftCandidate.data.length == 0) ||
    (rightCandidate && rightCandidate.data.length == 0)
  ) {
    let candidate;
    let otherName;
    let otherSide;
    let side;
    if (leftCandidate && leftCandidate.data.length != 0) {
      candidate = leftCandidate;
      otherName = rightCandidate ? rightCandidate.name : "None Selected";
      side = "left";
      otherSide = "right";
    } else {
      candidate = rightCandidate;
      side = "right";
      otherSide = "left";
      otherName = leftCandidate ? leftCandidate.name : "None Selected";
    }
    let payload = [];
    candidate.data.forEach((d) => {
      let row = [
        {
          side: side,
          total: d.total,
          indivs: d.indivs,
          pacs: d.pacs,
          name: candidate.name,
          industry: d.industry,
        },
        {
          side: otherSide,
          total: 0,
          indivs: 0,
          pacs: 0,
          name: otherName,
          industry: d.industry,
        },
      ];
      row.biggest = d.total;
      payload.push({
        industry: d.industry,
        values: row,
      });
    });
    return payload;
  } else {
    return [];
  }
}

function ButterflyClass({ rep1, rep2, parentWidth }) {
  const ref = useD3(
    (parent) => {
      let margin = {
        left: 50,
        right: 50,
        height: 800, //hardcoded, if we want we can fix that.
        top: 50,
        bottom: 100,
        width: parentWidth,
        padding: 20,
      };

      const svg = parent.select("svg");

      svg
        // .attr("viewBox", [0, 0, margin.width, margin.height])
        .attr("width", margin.width - margin.padding + "px")
        .attr("height", margin.height + "px")
        .html("");

      // set up axis that we want to draw. Move them to the appropriate height
      const left_x_axis = svg
        .append("g")
        .attr("transform", `translate(0, ${margin.height - margin.bottom})`);
      const right_x_axis = svg
        .append("g")
        .attr("transform", `translate(0, ${margin.height - margin.bottom})`);

      // Define our color gradients
      const gradients = svg.append("defs");

      // Green
      const greenGradient = gradients
        .append("linearGradient")
        .attr("id", "greenGradient");
      greenGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#91b05e");
      greenGradient
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#8FBE5A");
      greenGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#B3E07F56");
      // Yellow
      const yellowGradient = gradients
        .append("linearGradient")
        .attr("id", "yellowGradient");
      yellowGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#F5BC2936");
      yellowGradient
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#F5BC29");
      yellowGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#F8BA1B");

      // set up the title of the plot as well as the labels
      const title = svg
        .append("text")
        .attr("transform", `translate(${margin.width / 2}, ${margin.top / 2})`)
        .attr("font-size", 20)
        .attr("text-anchor", "middle");

      // x label
      svg
        .append("text")
        .attr(
          "transform",
          `translate(${margin.width / 2}, ${
            margin.height - margin.bottom / 2 + 10
          })`
        )
        .attr("font-size", 15)
        .attr("text-anchor", "middle")
        .text("Funding in USD");

      // setup the update callback function
      // by supplying this with data, we can update our information automagically.

      // get names and smoosh data together for plotting

      let left_candidate = rep1.funding;
      let right_candidate = rep2.funding;
      let left_congressperson_name = left_candidate.name;
      let right_congressperson_name = right_candidate.name;
      let smooshed_data = smooshFunding(left_candidate, right_candidate);

      // set the title's text
      let title_text = `Top Ten Industries for ${left_congressperson_name} vs ${right_congressperson_name}`;
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

        title
          .text("")
          .attr(
            "transform",
            `translate(${margin.width / 2}, ${margin.top / 2 - 10})`
          );
        let approx_char_per_line = title_text.length / num_splits;
        let title_words = title_text.split(" ");
        let splits = [];
        for (let i = 0; i < num_splits; i++) {
          let current_string = title_words.shift();
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
            .attr("dy", `${1 * i}em`)
            .text(current_string);
        }
      }

      // figure out the bounds of our axis
      let max = Math.max(
        ...smooshed_data.map((d) => {
          return d.values.biggest;
        })
      );

      // set up our left x axis and right x axis
      const left_x = d3
        .scaleLinear()
        .domain([max, 0])
        .range([margin.left, margin.width / 2]);
      left_x_axis
        .call(d3.axisBottom(left_x).ticks(5))
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

      const right_x = d3
        .scaleLinear()
        .domain([0, max])
        .range([margin.width / 2, margin.width - margin.right]);
      right_x_axis
        .call(d3.axisBottom(right_x).ticks(5))
        .selectAll("text")
        .attr("transform", "rotate(30)")
        .style("text-anchor", "start");

      // set up our y axis
      const y = d3
        .scaleBand()
        .domain(smooshed_data.map((d) => d.industry))
        .range([margin.height - margin.bottom, margin.top])
        .paddingInner(0.1);

      // define the tooltip
      let tooltip = parent
        .select("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "10px")
        .style("background", "rgba(0,0,0,0.6)")
        .style("border-radius", "4px")
        .style("color", "#fff")
        .text("a simple tooltip");

      // set up our y axis labels
      let center = left_x(0);

      //labels
      svg
        .selectAll(".label-text")
        .data(y.domain())
        .join("text")
        .text((d) => d)
        .attr("x", center)
        .attr("y", (d) => y(d) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .style("padding", "5px");

      // set up the background grey bars, yo
      svg
        .selectAll(".grey-rect")
        .data(y.domain())
        .join("path")
        .classed("grey-rect", true)
        .attr("d", (d, i) => {
          console.log(d);
          console.log(i);
          console.log(y.bandwidth());
          let x_start = left_x(0);
          let y_start = y(d);
          let bevel_height = y.bandwidth() / 2;
          let bar_height = y.bandwidth() - 20;
          let bar_length =
            left_x(left_x.domain()[0]) - left_x(0) + bevel_height;
          return `M${x_start}, ${y_start}
                  h${bar_length}
                  a ${bevel_height} ${bevel_height} 0 0,0 0 ${bar_height}
                  h${bar_length * -1 * 2}
                  a ${bevel_height} ${bevel_height} 0 0,0 0 ${bar_height * -1}
                  z`;
        })
        .attr("fill", "#F4F4F4");

      // do data join to place one grey bar for each industry
      let industryGroup = svg
        .selectAll(".industryGroup")
        .data(smooshed_data)
        .join("g")
        .classed("industryGroup", true)
        .attr("title", (d) => d.industry)
        .on("mouseover", (event, d) => {
          let left = d.values[0].side == "left" ? d.values[0] : d.values[1];
          let right = d.values[0].side == "right" ? d.values[0] : d.values[1];

          tooltip
            .html(
              `
    <div>Industry: ${d.industry}</div>
    <div>Total for ${left.name}: $${left.total.toLocaleString("en-US")}</div>
    <div>Total for ${right.name}: $${right.total.toLocaleString("en-US")}</div>
    `
            )
            .style("visibility", "visible");
        })
        .on("mousemove", function (event, d) {
          d; // bc the fucking linter :(
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          tooltip.html(``).style("visibility", "hidden");
        });

      // the double data join to join each politicians thing
      industryGroup
        .selectAll("path")
        .data((d) => d.values)
        .join("path")
        .attr("d", (d) => {
          let x_axis = d.side == "left" ? left_x : right_x;
          let directional_shift_direction = d.side == "left" ? 1 : -1;
          let x_start = x_axis(0);
          let y_start = y(d.industry);
          let bevel_height = y.bandwidth() / 2;
          let bar_height = y.bandwidth() - 20;
          let bar_length =
            x_axis(d.total) -
            x_axis(0) +
            bevel_height * directional_shift_direction;
          let clockwise_circle = d.side == "left" ? 0 : 1;
          return d.total == 0
            ? ""
            : `M${x_start}, ${y_start}
                h${bar_length}
                a ${bevel_height} ${bevel_height} 0 0,${clockwise_circle} 0 ${bar_height}
                h${bar_length * -1}
                z`;
        })
        .attr("fill", (d) =>
          d.side == "left" ? "url(#greenGradient)" : "url(#yellowGradient)"
        );
    },
    [rep1.name, rep2.name, parentWidth]
  );

  return (
    <div>
      <div className="graph-explanation comp-explanation">
        <h5 className="graph-title mt-1">Contributions Amount by Industry</h5>
        <p className="mt-1">
          This butterfly chart shows the amount of money each politition spent
          on the <strong>2020</strong> election cycle.
        </p>
      </div>
      <div ref={ref}>
        <div className=".butterfly-tooltip" width="100%"></div>
        <svg></svg>
      </div>
    </div>
  );
}
export default ButterflyClass;
