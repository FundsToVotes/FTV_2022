/* eslint-disable react/prop-types */
import React, { Component } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import tempPerson from "../images/temp-person.jpg";

export class DetailedSearch extends Component {
  render() {
    let candidateData = [
      {
        name: "Suzy",
        party: "Republican",
        position: "Mayor",
        photoUrl: tempPerson,
      },
      {
        name: "Jim",
        party: "Democrat",
        position: "Mayor",
        photoUrl: tempPerson,
      },
      {
        name: "Jake",
        party: "Democrat",
        position: "President",
        photoUrl: tempPerson,
      },
      {
        name: "Julie",
        party: "Republican",
        position: "President",
        photoUrl: tempPerson,
      },
    ];

    let candidateList = candidateData.map((candidate) => {
      return <CandidateCard key={candidateData.Name} candidate={candidate} />;
    });

    return (
      <div className="detailed-search-page">
        <div className="search-side-panel">
          <h4 className="pt-3">
            <strong>Filters</strong>
          </h4>
          <form>
            <h5 className="pt-3">Position</h5>
            <input type="checkbox" id="president" name="president"></input>
            <label className="filter-label" htmlFor="president">
              President
            </label>
            <br></br>
            <input type="checkbox" id="senator" name="senator"></input>
            <label className="filter-label" htmlFor="senator">
              Senator
            </label>
            <br></br>
            <input
              type="checkbox"
              id="representative"
              name="representative"
            ></input>
            <label className="filter-label" htmlFor="representative">
              Representative
            </label>
            <br></br>
            <input type="checkbox" id="mayor" name="mayor"></input>
            <label className="filter-label" htmlFor="mayor">
              Mayor
            </label>

            <h5 className="pt-3">Party</h5>
            <input type="checkbox" id="republican" name="republican"></input>
            <label className="filter-label" htmlFor="republican">
              Republican
            </label>
            <br></br>
            <input type="checkbox" id="democrat" name="democrat"></input>
            <label className="filter-label" htmlFor="democrat">
              Democrat
            </label>
            <br></br>
            <input type="checkbox" id="libratarian" name="libratarian"></input>
            <label className="filter-label" htmlFor="libratarian">
              Libratarian
            </label>
            <br></br>
            <input type="checkbox" id="other" name="other"></input>
            <label className="filter-label" htmlFor="other">
              Other
            </label>
          </form>
        </div>
        <div className="results-panel">
          <div className="results-header">
            <h1>Representatives for</h1>
            <h2>Address goes here</h2>
            <SearchBar />
          </div>
          <div className="search-results">
            <div className="results">{candidateList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedSearch;

export class CandidateCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let candidate = this.props.candidate;
    return (
      <div className="card candidate-card m-2 p-1">
        <img
          src={candidate.photoUrl}
          alt="candidate headshot"
          className="headshot"
        />
        <p>
          {candidate.name} - {candidate.party}
        </p>
        <p>{candidate.position}</p>
        <Link to="/details" className="btn landing-button search">
          Learn More
        </Link>
      </div>
    );
  }
}
