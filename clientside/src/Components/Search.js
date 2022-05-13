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
  const [branchFilter, setBranchFilter] = useState("");
  const [partyFilter, setPartyFilter] = useState("");

  const fetchRepresentatives = () => {
    fetch(`https://api.fundstovote.com/v1/addressRepresentative?address=${address}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setOfficials(data.officials);
      });
  };

  const updateBranchFilter = (e) => {
    if (e.target.nodeName == "INPUT") {
      if (e.target.id == "all-chamber") {
        setBranchFilter("");
      } else {
        setBranchFilter(
          e.target.id == "radio-representative"
            ? "U.S. Representative"
            : "U.S. Senator"
        );
      }
      document.querySelector("#congresspeople").value = e.target.id;
    } else {
      if (e.target.value == "all-chamber") {
        setBranchFilter("");
      } else {
        setBranchFilter(
          e.target.value == "radio-representative"
            ? "U.S. Representative"
            : "U.S. Senator"
        );
      }
      document.querySelector(`#${e.target.value}`).checked = true;
    }
  };

  const updatePartyFilter = (e) => {
    if (e.target.nodeName == "INPUT") {
      if (e.target.id == "all-party") {
        setPartyFilter("");
      } else {
        setPartyFilter(
          e.target.id == "radio-republican"
            ? "Republican Party"
            : e.target.id == "radio-democrat"
            ? "Democratic Party"
            : "other"
        );
      }
      document.querySelector("#party").value = e.target.id;
    } else {
      if (e.target.value == "all-party") {
        setPartyFilter("");
      } else {
        setPartyFilter(
          e.target.value == "radio-republican"
            ? "Republican Party"
            : e.target.value == "radio-democrat"
            ? "Democratic Party"
            : "other"
        );
      }
      document.querySelector(`#${e.target.value}`).checked = true;
    }
  };

  useEffect(() => {
    fetchRepresentatives();
  }, [address]);

  return (
    <div className="white-container vertical-stretch">
      <div className="detailed-search-page">
        <div className="search-side-panel">
          <h4 className="pt-3">
            <strong>Filters</strong>
          </h4>

          <form>
            <h5 className="pt-3">Position</h5>
            <input
              type="radio"
              id="all-chamber"
              name="chamber"
              onClick={(e) => updateBranchFilter(e)}
              defaultChecked
            ></input>
            <label className="filter-label" htmlFor="all-chamber">
              All
            </label>
            <br></br>
            <input
              type="radio"
              id="radio-senator"
              name="chamber"
              onClick={(e) => updateBranchFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="radio-senator">
              Senator
            </label>
            <br></br>
            <input
              type="radio"
              id="radio-representative"
              name="chamber"
              onClick={(e) => updateBranchFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="radio-representative">
              Representative
            </label>

            <h5 className="pt-3">Party</h5>
            <input
              type="radio"
              id="all-party"
              name="Party"
              value="testest"
              onClick={(e) => updatePartyFilter(e)}
              defaultChecked
            ></input>
            <label className="filter-label" htmlFor="all-party">
              All
            </label>
            <br></br>
            <input
              type="radio"
              id="radio-republican"
              name="Party"
              onClick={(e) => updatePartyFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="radio-republican">
              Republican
            </label>
            <br></br>
            <input
              type="radio"
              id="radio-democrat"
              name="Party"
              onClick={(e) => updatePartyFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="radio-democrat">
              Democrat
            </label>
            <br></br>
            <input
              type="radio"
              id="radio-other"
              name="Party"
              onClick={(e) => updatePartyFilter(e)}
            ></input>
            <label className="filter-label" htmlFor="radio-other">
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
            <div className="mobile-filters">
              <select
                defaultValue="congressPeople"
                id="congresspeople"
                className="custom-select m-1"
                onChange={(e) => updateBranchFilter(e)}
              >
                <option value="all-chamber">Congresspeople</option>
                <option value="radio-representative">Representatives</option>
                <option value="radio-senator">Senators</option>
              </select>

              <select
                defaultValue="all"
                className="custom-select m-1"
                id="party"
                onChange={(e) => updatePartyFilter(e)}
              >
                <option value="all-party">All Parties</option>
                <option value="radio-democrat">Democratic Party</option>
                <option value="radio-republican">Republican Party</option>
                <option value="radio-other">Other</option>
              </select>
            </div>

            <div className="results">
              {address &&
                officials.length > 0 &&
                officials
                  .filter((official) =>
                    branchFilter.length == 0
                      ? true
                      : branchFilter.toLowerCase() ==
                        official.office.toLowerCase()
                  )
                  .filter((official) =>
                    partyFilter.length == 0
                      ? true
                      : partyFilter.toLowerCase() ==
                        official.party.toLowerCase()
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
  let party;
  if (candidate.party === "Republican Party") {
    party = "Republican";
  } else if (candidate.party === "Democratic Party") {
    party = "Democrat";
  }

  return (
    <div key={props.name} className="card candidate-card m-3 p-1">
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
        {candidate.office} - {party}
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
