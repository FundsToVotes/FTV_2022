/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the Landing page with a 
    search bar that when submitted renders the Representative List on GoogleAPI.js

*****************************************************/
import React, { Component } from "react";
// import { GoogleAPI } from "../GoogleAPI";
// import { useState } from "react";
import { Link } from "@reach/router";
import imgLanding from "../images/landing-page-main-img.png";
import SearchBar from "./SearchBar";

// Renders the Landing Page
export class LandingPage extends Component {

  render() {
    return (
      <div>
        <div className="landing-title-container">
          <div>
            <h2 className="landing-title">Who Funds Your Representatives?</h2>
            <p className="landing-text">
              Search to see what industries are donating to your representatives
              and how they voted on relvant issues.
            </p>
          </div>
          <SearchBar />
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
            Anyone 18 over over and who is a U.S. Citizen or permanent resident may donate to the campaigns of federal candidates. Political action committees (PACs), often ran by organizations or companies, can also donate.
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

export default LandingPage;
