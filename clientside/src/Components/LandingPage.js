/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the Landing page with a 
    search bar that when submitted renders the Representative List on GoogleAPI.js

*****************************************************/

import { GoogleAPI } from "../GoogleAPI";
import { useState } from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Renders the Landing Page
export function LandingPage() {
  return (
    <div className="landing-title-container">
      <Title />
      <AddressInput />
      <p className="landing-text pt-2">
        We don't save your information. See our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>
    </div>
  );
}

// Creates the Title for the landing page
function Title() {
  return (
    <div>
      <h2 className="landing-title">Who Funds Your *Representatives*?</h2>
      <p className="landing-text">
        Search to see what industries are donating to your representatives and
        how they voted on relvant issues.
      </p>
    </div>
  );
}

// Creates the Search bar where users will input their Address, GoogleAPI.js is called when submitted
function AddressInput() {
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  let onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <GoogleAPI address={address} />;
  } else {
    return (
      <div style={{ textAlign: "center" }} className="landing-form">
        <span className="form-container">
          <FontAwesomeIcon icon={faSearch} size="2x" />
          <form onSubmit={(e) => onSubmit(e)}>
            <label>
              <input
                style={{
                  width: "450px",
                  display: "inline-block",
                  marginRight: "5px",
                }}
                className="form-control"
                type="text"
                placeholder="Insert Address Here"
                address="address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="submit"
                value="Search"
                className="btn btn-dark search-button"
              />
            </label>
          </form>
        </span>
      </div>
    );
  }
}

export default LandingPage;
