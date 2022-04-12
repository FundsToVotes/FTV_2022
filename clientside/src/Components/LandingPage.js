/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the Landing page with a 
    search bar that when submitted renders the Representative List on GoogleAPI.js

*****************************************************/
import React, { Component } from "react";
import { Link } from "@reach/router";
import imgLanding from "../images/landing-page-main-img.png";
// import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

// Renders the Landing Page
export class LandingPage extends Component {
  render() {
    // let navigate = useNavigate();
    // let changePage = (e) => {
    //   e.preventDefault();
    //   let path = `/privacy-policy`;
    //   navigate(path, { replace: true });
    // };

    return (
      <div className="page-container">
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
            <Link to="privacy-policy" className="privacy-link">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="landing-bottom">
          <div className="p-5">
            <p className="landing-paragraph">
              Helping Americas voters make informed decisions!
            </p>
            <a href="/take-action" className="btn landing-button learn-more">
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
