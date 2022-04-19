// import Plotly from 'plotly.js'
import React, { Component } from "react";
// import Top10Pie from "./Top10Pie";
// import Top10Bar from "./Top10Bar";
import defaultProfile from "../images/default-profile.png";
import { ComparisonModal } from "./ComparisonModal";

export class ComparisonPage extends Component {
  constructor(props) {
    super(props);

    //default state
    this.state = {
      show: false,
    };
  }

  repsCallback = (details, side) => {
    if (side === "left") {
      this.setState({ repOne: details });
    } else {
      this.setState({ repTwo: details });
    }
    this.setState({ show: false });
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

  makeSidePanel = (details) => {
    console.log(details.name);

    return (
      <div>
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

  showModal = (side) => {
    this.setState({ show: true, side: side });
  };

  toggle = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    console.log(this.state);

    let sidePanelOne;
    if (this.state.repOne) {
      console.log(this.state.repOne);
      sidePanelOne = this.makeSidePanel(this.state.repOne, "left");
    }

    let sidePanelTwo;
    if (this.state.repTwo) {
      console.log(this.state.repTwo);
      sidePanelTwo = this.makeSidePanel(this.state.repTwo, "right");
    }

    let candidateChosen = false;
    if (this.state.repOne && this.state.repTwo) {
      candidateChosen = true;
    }

    let candidates;
    if (candidateChosen) {
      candidates = this.state.repOne.name + " and " + this.state.repTwo.name;
    } else {
      candidates = "";
    }

    return (
      <div className="white-container mb-2">
        <div className="comparison-header">
          <h1>Candidate Comparison</h1>
          <h2>{candidates}</h2>
        </div>

        {/* Side panel one */}
        <div>
          <div className="details-side-panel comp-side-left">
            {sidePanelOne}
            <button
              onClick={(e) => {
                e.preventDefault();
                this.showModal("left");
              }}
              className="btn landing-button learn-more select-candidate"
            >
              Select Candidate
            </button>
          </div>
        </div>

        {/* Make container for liv to put visualizations */}
        <div className="comp-viz-container"></div>

        {/* Side panel two */}
        <div className="details-side-panel comp-side-right">
          {sidePanelTwo}
          <button
            onClick={(e) => {
              e.preventDefault();
              this.showModal("right");
            }}
            className="btn landing-button learn-more select-candidate btn-right"
          >
            Select Candidate
          </button>
        </div>
        <ComparisonModal
          show={this.state.show}
          toggle={this.toggle}
          repsCallback={this.repsCallback}
          side={this.state.side}
        />
      </div>
    );
  }
}

export default ComparisonPage;
