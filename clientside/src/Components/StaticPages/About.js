/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the About page with Information about our project

*****************************************************/

import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import imgGrady from "../../images/Grady.jpg";
import imgJay from "../../images/Jay.jpg";
import imgHaykal from "../../images/Haykal.jpg";
import imgReyan from "../../images/Reyan.png";
import imgiSchool from "../../images/iSchoolPrimary_RGB_Black.svg";
import imgHailey from "../../images/hailey.jpeg";
import imgCarson from "../../images/carson.jpg";
import imgLiv from "../../images/liv.jpg";
import imgThomas from "../../images/thomas.jpeg";

export class About extends Component {
  render() {
    return (
      <div className="static-page page-container mb-2">
        <div className="static-header">
          <h1>About</h1>
        </div>

        <div className="static-container">
          <div className="card info-card">
            <h3>
              {/* <img
                src={imgHandDollarIcon}
                alt="Hand with dollar sign icon"
                style={{ display: "inline-block" }}
                width="50px"
              /> */}
              Funds to Votes
            </h3>
            <h4 className="second-header">
              <em>
                Informing curious voters on their representatives' campaign
                finances
              </em>
            </h4>

            <p>
              According to AP-NORC, 53% of Americans know nothing or very little
              about how money works in politics. After the Citizens United
              ruling allowed more money in politics, understanding campaign
              finance became more important than ever. Funds to Votes helps by
              displaying this data in a user friendly and beginner researcher
              friendly manner, allowing voters to make more informed decisions.
              Finally, in addition to helping ordinary citizens decide who to
              vote for, our product is designed to aid endorsement groups in
              their research. This helps them decide who to endorse, which
              enables voters to select candidates according to their values.
            </p>
          </div>

          <div className="card info-card">
            <h3>Context</h3>
            <ul>
              <li>
                In 2020, a total of <strong>$14 billion</strong> was spent on
                political campaigns. (That's the the entire GDP of Madagascar!)
              </li>
              <li>
                Existing websites that show campaign finance data are{" "}
                <strong>too complex</strong> for a beginner user.
              </li>
              <li>
                Voters want and need to know more about their representatives in
                an easy-to-understand way so they can make{" "}
                <strong>informed decisions</strong>.
              </li>
            </ul>
          </div>

          <div className="card info-card">
            <h3>Key Features</h3>
            <ul>
              <li>
                Learn what top industries are donating to your representatives
                in the U.S. Congress.
              </li>
              <li>
                Identify the bills your representative voted on and their
                positions.
              </li>
              <li>
                See how your representatives voted on bills that correlate with
                a top industry they are funded by.
              </li>
              <li>Get an overview of the campaign finance system.</li>
              <li>
                Take action, such as by registering to vote or contacting your
                representatives.
              </li>
            </ul>
          </div>

          <div className="card info-card">
            <h3>Team Members 2022</h3>
            <MDBContainer>
              <MDBRow>
                <MDBCol>
                  <img src={imgHailey} alt="Hailey" className="about-photos" />
                  <p className="mt-1">Hailey Meister</p>
                </MDBCol>
                <MDBCol>
                  <img src={imgCarson} alt="Carson" className="about-photos" />
                  <p className="mt-1">Carson Bryant</p>
                </MDBCol>
                <MDBCol>
                  <img src={imgThomas} alt="Thomas" className="about-photos" />
                  <p className="mt-1">Thomas Serrano</p>
                </MDBCol>
                <MDBCol>
                  <img src={imgLiv} alt="Liv" className="about-photos" />
                  <p className="mt-1">Liv Victorino</p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>

          <div className="card info-card">
            <h3>Team Members 2021</h3>
            <MDBContainer>
              <MDBRow>
                <MDBCol>
                  <img src={imgGrady} alt="Grady" />
                  <p className="mt-1">Grady Thompson</p>
                </MDBCol>
                <MDBCol>
                  <img src={imgJay} alt="Jay" />
                  <p className="mt-1">Jay Houppermans</p>
                </MDBCol>
                <MDBCol>
                  <img src={imgHaykal} alt="Haykal" />
                  <p className="mt-1">Haykal Mubin</p>
                </MDBCol>
                <MDBCol>
                  <img src={imgReyan} alt="Reyan" />
                  <p className="mt-1">Reyan Haji</p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>

          <div className="project-info">
            <div className="mr-5 card info-card">
              <h3>Project Status</h3>
              <p>
                This project was developed by students at the University of
                Washington Information School as part of the Informatics
                program's 2021 Capstone. We hope this project continues to be
                passed down from team to team.
              </p>
            </div>
            <div className="card info-card">
              <p>
                Email the project team at{" "}
                <a href="mailto:hello@fundstovotes.info">
                  hello@fundstovotes.info
                </a>
                .
              </p>
              <p>
                The project is now open sourced. Source code and documentation
                are available on{" "}
                <a href="https://github.com/FundsToVotes">GitHub</a>.
                Contributions are welcome.
              </p>
            </div>
          </div>

          <img
            src={imgiSchool}
            role="img"
            alt="University of Washington Information School logo"
            width="300px"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>
      </div>
    );
  }
}
export default About;
