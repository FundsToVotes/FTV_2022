/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the Landing page with a 
    search bar that when submitted renders the Representative List on GoogleAPI.js

*****************************************************/
import React, { Component } from "react";
import { GoogleAPI } from "../GoogleAPI";
import { useState } from "react";
import { Link } from "@reach/router";
import { AiOutlineSearch } from "react-icons/ai";
import imgLanding from "../images/landing-page-main-img.png";

// Renders the Landing Page
export class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="landing-title-container">
          <Title />
          <AddressInput />
          <p className="landing-text pt-2">
            We don't save your information. See our{" "}
            <Link to="/privacy-policy" className="privacy-link">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="landing-bottom">
          <div className="p-5">
            <p className="landing-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              accumsan eros nec vulputate fermentum. Etiam aliquet vel justo a
              tincidunt. Suspendisse dapibus feugiat augue. Nullam pulvinar nisl
              sed magna efficitur posuere.
            </p>
            <a href="/" className="btn landing-button learn-more">
              Learn More
            </a>
          </div>
          <img
            className="landing-img"
            alt="cartoon people standing on a voting box"
            src={imgLanding}
          />
        </div>
      </div>
    );
  }
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
      <div className="form-background">
        <div className="form-container">
          <AiOutlineSearch className="search-icon" />
          <form className="form-contents" onSubmit={(e) => onSubmit(e)}>
            <input
              className="form-control search-bar"
              type="text"
              placeholder="Type address here..."
              address="address"
              onChange={(e) => setAddress(e.target.value)}
            />

            <select
              defaultValue="representatives"
              className="custom-select landing-dropdown"
            >
              <option value="representatives">Representatives</option>
              <option value="senators">Senators</option>
              <option value="candidates">Candidates</option>
            </select>

            <input
              type="submit"
              value="Search"
              className="btn landing-button search"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default LandingPage;
