// import Plotly from 'plotly.js'
import React, { Component } from "react";
// import Top10Pie from "./Top10Pie";
// import Top10Bar from "./Top10Bar";
import defaultProfile from "../images/default-profile.png";

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
    fetch(
      `http://localhost:3000/v1/representativeDetails?firstName=${this.state.name1[0]}&lastName=${this.state.name1[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          let _ = data.urls.filter((d) => d.includes(".gov"));
          console.log(_);
          if (_.length > 0) {
            data.urls = (
              <div>
                <h5 className="mt-3">Representative Websites:</h5>
                <div>
                  {_.map((d) => (
                    <a key={d} href={d}>
                      {d}
                    </a>
                  ))}
                </div>
              </div>
            );
          } else {
            data.urls = undefined;
          }
        }
        console.log(data.urls);

        data.address =
          data.address.line1 +
          " " +
          data.address.city +
          ", " +
          data.address.state;
        this.setState({ repOne: data });
      });

    fetch(
      `http://localhost:3000/v1/representativeDetails?firstName=${this.state.name2[0]}&lastName=${this.state.name2[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          let _ = data.urls.filter((d) => d.includes(".gov"));
          console.log(_);
          if (_.length > 0) {
            data.urls = (
              <div>
                <h5 className="mt-3">Representative Websites:</h5>
                <div>
                  {_.map((d) => (
                    <a key={d} href={d}>
                      {d}
                    </a>
                  ))}
                </div>
              </div>
            );
          } else {
            data.urls = undefined;
          }
        }
        console.log(data.urls);

        data.address =
          data.address.line1 +
          " " +
          data.address.city +
          ", " +
          data.address.state;
        this.setState({ repTwo: data });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.fetchRepresentativeDetails();
  };

  getNameOne = (value) => {
    console.log(value);
    let name = value.split(" ");
    this.setState({ name1: name });
  };
  getNameTwo = (value) => {
    console.log(value);
    let name = value.split(" ");
    this.setState({ name2: name });
  };

  colorCodeParty = (party) => {
    if (party === "Republican Party") {
      return "red";
    } else if (party === "Democratic Party") {
      return "blue";
    } else {
      return "black";
    }
  };

  phoneToString = (phone) => {
    if (phone == undefined) {
      return;
    }
    console.log(phone[0]);
    const regex = /\d+/;
    let arr = phone[0].match(regex);
    return "" + arr;
  };

  makeSidePanel = (details, side) => {
    console.log(details.name);
    let sideClass;
    if (side === "right") {
      sideClass = "details-side-panel comp-side-right comp-side";
    } else {
      sideClass = "details-side-panel comp-side-left";
    }
    return (
      <div className={sideClass}>
        <div className="details-side-header">
          <h2>{details.name}</h2>
          <h3 className="position-text mb-3">{details.office}</h3>
          <div className="image-box">
            <div>
              <img
                src={details.photoUrl}
                alt="candidate headshot"
                className="headshot image-details-cropper"
                onError={(event) => {
                  event.target.src = defaultProfile;
                  event.onerror = null;
                }}
              />
            </div>
          </div>

          <h4
            className="mt-3"
            style={{ color: this.colorCodeParty(details.party) }}
          >
            {details.party}
          </h4>
        </div>

        <h5 className="mt-4">DC Office Number:</h5>
        <a href={`tel:${this.phoneToString(details.phones)}`}>
          {details.phones}
        </a>

        {details.urls}

        <h5 className="mt-3">Office Mailing Address:</h5>
        {details.address}
      </div>
    );
  };

  render() {
    console.log(this.state);
    let sidePanelOne;
    if (this.state.repOne) {
      console.log(this.state.repOne);
      sidePanelOne = this.makeSidePanel(this.state.repOne, "left");
    } else {
      sidePanelOne = <p></p>;
    }
    let sidePanelTwo;
    if (this.state.repTwo) {
      console.log(this.state.repTwo);
      sidePanelTwo = this.makeSidePanel(this.state.repTwo, "right");
    } else {
      sidePanelTwo = <p></p>;
    }

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

        {/* Side panel one */}
        <div>{sidePanelOne}</div>

        {/* Make container for liv to put visualizations */}
        <div className="comp-viz-container"></div>

        {/* Side panel two */}
        <div>{sidePanelTwo}</div>
      </div>
    );
  }
}

export default ComparisonPage;
