/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import DemocratProfile from "../images/democrat-temp.png";
import RepublicanProfile from "../images/republican-temp.png";

function DetailedSearch() {
  const { search } = useLocation();
  const { address } = queryString.parse(search);

  const [officials, setOfficials] = useState([]);
  const [branchFilter, setBranchFilter] = useState(new Set());
  const [partyFilter, setPartyFilter] = useState(new Set());

  const fetchRepresentatives = () => {
    fetch(`http://localhost:3000/v1/addressRepresentative?address=${address}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setOfficials(data.officials);
      });
  };

  const updateBranchFilter = (e) => {
    if (e.target.checked) {
      branchFilter.add(e.target.name);
    } else {
      branchFilter.delete(e.target.name);
    }
    setBranchFilter(new Set(branchFilter));
  };

  const updatePartyFilter = (e) => {
    if (e.target.checked) {
      partyFilter.add(e.target.name);
    } else {
      partyFilter.delete(e.target.name);
    }
    setPartyFilter(new Set(partyFilter));
  };

  useEffect(() => {
    fetchRepresentatives();
  }, [address]);

  return (
    <div className="white-container">
      <div className="detailed-search-page">
        <div className="search-side-panel">
          <h4 className="pt-3">
            <strong>Filters</strong>
          </h4>

          <form>
            <h5 className="pt-3">Position</h5>
            <input
              type="checkbox"
              id="senator"
              name="U.S. Senator"
              onClick={(e) => updateBranchFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="senator">
              Senator
            </label>
            <br></br>
            <input
              type="checkbox"
              id="representative"
              name="U.S. Representative"
              onClick={(e) => updateBranchFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="representative">
              Representative
            </label>

            <h5 className="pt-3">Party</h5>
            <input
              type="checkbox"
              id="republican"
              name="Republican Party"
              onClick={(e) => updatePartyFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="republican">
              Republican
            </label>
            <br></br>
            <input
              type="checkbox"
              id="democrat"
              name="Democratic Party"
              onClick={(e) => updatePartyFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="democrat">
              Democrat
            </label>

            <br></br>
            <input
              type="checkbox"
              id="other"
              name="Other"
              onClick={(e) => updatePartyFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="other">
              Other
            </label>
          </form>
        </div>

        <div className="results-panel">
          <div className="results-header">
            <h1 className="reps-for">Congresspeople for</h1>
            <h2>{address || "No address specified"}</h2>
            <div className="detailed-searchbar">
              <SearchBar />
            </div>
          </div>
          <div className="search-results">
            <div className="results">
              {address &&
                officials.length > 0 &&
                officials
                  .filter((official) =>
                    branchFilter.size == 0
                      ? true
                      : branchFilter.has(official.office)
                  )
                  .filter((official) =>
                    partyFilter.size == 0
                      ? true
                      : partyFilter.has(official.party)
                  )
                  .map((official) => CandidateCard(official))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedSearch;

export function CandidateCard(props) {
  let candidate = props;
  if (candidate.party === "Republican Party") {
    candidate.party = "Republican";
  } else if (candidate.party === "Democratic Party") {
    candidate.party = "Democrat";
  }

  return (
    <div className="card candidate-card m-2 p-1">
      <div className="image-cropper mt-3">
        <img
          id="profile-image"
          src={candidate.photoUrl}
          alt="candidate headshot"
          className="headshot"
          onError={(event) => {
            if (candidate.party === "Republican Party") {
              event.target.src = RepublicanProfile;
            } else {
              event.target.src = DemocratProfile;
            }
            event.onerror = null;
          }}
        />
      </div>
      <p className="mt-4">{candidate.name}</p>
      <p className="mb-1">
        {candidate.office} - {candidate.party}
      </p>
      <Link
        to={`/details?representative=${candidate.name}`}
        className="btn landing-button search details-button"
      >
        Learn More
      </Link>
    </div>
  );
}
