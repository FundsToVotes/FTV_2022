/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the Landing page with a 
    search bar that when submitted renders the Representative List on GoogleAPI.js

*****************************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import imgLanding from "../images/landing-page-main-img.png";
import SearchBar from "./SearchBar";

// Renders the Landing Page
export class LandingPage extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="landing-title-container">
          <div>
            <h2 className="landing-title">
              <strong>Who Funds Your</strong>
            </h2>
            <h2 className="landing-title landing-title-reps">
              <strong>Representatives?</strong>
            </h2>
            <p className="landing-text">
              Search to see what industries are donating to your representatives
              and how they voted on relvant issues.
            </p>
          </div>
          <SearchBar />
          <p className="landing-text pt-2">
            We don't save your information. See our{" "}
            <Link to="privacy-policy" className="privacy-link">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="landing-bottom">
          <div className="p-5 landing-card">
            <h3>About Our Project</h3>
            <p className="landing-paragraph">As part of our project...</p>
            <a href="/take-action" className="btn landing-button learn-more">
              Learn More Our Team
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
