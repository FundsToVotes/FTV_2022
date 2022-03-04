/* eslint-disable react/prop-types */
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useParams } from "react-router-dom";
// import tempPerson from "../images/temp-person.jpg";
// import { test } from "../api.js"

function DetailedSearch(props) {
  console.log(props)
  const urlParams = useParams();

  const [users, setUsers] = useState([])

  // somehow, there is a weird "calling fetch reps hella times" issue with my solution. 
  // it is a workaround at best. 
  const fetchRepresentatives = () => {
    fetch(`http://localhost:3000/v1/addressRepresentative?address=${urlParams.address}`)
      .then(response => {return response.json()})
      .then(data => {
        console.log(data)
        return setUsers(data.officials)
      })
  }

  return (
    <div className="detailed-search-page">
      <div className="search-side-panel">
        <h4 className="pt-3">
            {fetchRepresentatives()}
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
          <h2>{urlParams.address || "No address specified"}</h2>
          <SearchBar />
        </div>
        <div className="search-results">
          <div className="results">
            {users.length > 0 && (users.map(user => CandidateCard(user)))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedSearch;

export function CandidateCard(props) {
  let candidate = props;
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
      <Link to={`/details/${candidate.name}`} className="btn landing-button search">
        Learn More
      </Link>
    </div>
  );

}
