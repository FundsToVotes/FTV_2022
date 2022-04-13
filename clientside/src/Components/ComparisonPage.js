// import Plotly from 'plotly.js'
import React, { Component } from "react";
// import Top10Pie from "./Top10Pie";
// import Top10Bar from "./Top10Bar";

export class ComparisonPage extends Component {
  constructor(props) {
    super(props);

    //default state
    this.state = {
      name1: "",
      name2: "",
    };
  }

  fetchRepresentativeDetails = () => {
    fetch(`http://localhost:3000/v1/topten?firstName=Maria&lastName=Cantwell`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // data.address =
        //   data.address.line1 +
        //   " " +
        //   data.address.city +
        //   ", " +
        //   data.address.state;
        // data.socials = data.socials.map((d) => setupIcon(d.platform, d.id));
        // setDetails(data);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.fetchRepresentativeDetails();
  };

  getNameOne = (value) => {
    console.log(value);
    this.setState({ name1: value });
  };
  getNameTwo = (value) => {
    console.log(value);
    this.setState({ name2: value });
  };

  render() {
    return (
      <div className="static-page page-container mb-2">
        <div className="static-header comparison-header">
          <h1>Candidate Comparison</h1>
          <div className="form-background mt-3">
            <div className="form-container">
              <form className="form-contents" onSubmit={this.handleSubmit}>
                <p>Compare</p>
                <input
                  className="form-control search-bar"
                  type="text"
                  placeholder="Search by name..."
                  name="name-one"
                  onChange={(e) => this.getNameOne(e.target.value)}
                />

                <p>and</p>

                <input
                  className="form-control search-bar"
                  type="text"
                  placeholder="Search by name..."
                  name="name-two"
                  onChange={(e) => this.getNameTwo(e.target.value)}
                />

                <input
                  type="submit"
                  value="Search"
                  className="btn landing-button search"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComparisonPage;
