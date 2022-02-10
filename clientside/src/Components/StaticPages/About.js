/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the About page with Information about our project

*****************************************************/

import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import imgHandDollarIcon from "../../images/hand_with_dollar_sign.png";
import imgGrady from "../../images/Grady.jpg";
import imgJay from "../../images/Jay.jpg";
import imgHaykal from "../../images/Haykal.jpg";
import imgReyan from "../../images/Reyan.png";
import imgiSchool from "../../images/iSchoolPrimary_RGB_Black.svg";

function About() {
  return (
    <div className="static-container">
      <h2>About</h2>
      <br></br>

      <h3>
        <img
          src={imgHandDollarIcon}
          alt="Hand with dollar sign icon"
          style={{ display: "inline-block" }}
          width="50px"
        />
        Funds to Votes:{" "}
        <em>
          Informing curious voters on their representatives' campaign finances
        </em>
      </h3>

      <p>
        According to AP-NORC, 53% of Americans know nothing or very little about
        how money works in politics. After the Citizens United ruling allowed
        more money in politics, understanding campaign finance became more
        important than ever. Funds to Votes helps by displaying this data in a
        user friendly and beginner researcher friendly manner, allowing voters
        to make more informed decisions. Finally, in addition to helping
        ordinary citizens decide who to vote for, our product is designed to aid
        endorsement groups in their research. This helps them decide who to
        endorse, which enables voters to select candidates according to their
        values.
      </p>

      <h3>Context</h3>
      <li>
        In 2020, a total of <strong>$14 billion</strong> was spent on political
        campaigns. (That's the the entire GDP of Madagascar!)
      </li>
      <li>
        Existing websites that show campaign finance data are{" "}
        <strong>too complex</strong> for a beginner user.
      </li>
      <li>
        Voters want and need to know more about their representatives in an
        easy-to-understand way so they can make{" "}
        <strong>informed decisions</strong>.
      </li>
      <br />

      <h3>Key Features</h3>
      <ul>
        <li>
          Learn what top industries are donating to your representatives in the
          U.S. Congress.
        </li>
        <li>
          Identify the bills your representative voted on and their positions.
        </li>
        <li>
          See how your representatives voted on bills that correlate with a top
          industry they are funded by.
        </li>
        <li>Get an overview of the campaign finance system.</li>
        <li>
          Take action, such as by registering to vote or contacting your
          representatives.
        </li>
      </ul>

      <h3>Team Members</h3>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <img src={imgGrady} alt="Grady" />
            <p>Grady Thompson</p>
          </MDBCol>
          <MDBCol>
            <img src={imgJay} alt="Jay" />
            <p>Jay Houppermans</p>
          </MDBCol>
          <MDBCol>
            <img src={imgHaykal} alt="Haykal" />
            <p>Haykal Mubin</p>
          </MDBCol>
          <MDBCol>
            <img src={imgReyan} alt="Reyan" />
            <p>Reyan Haji</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <br />

      <h3>Project Status</h3>
      <p>
        This project was developed by students at the University of Washington
        Information School as part of the Informatics program's 2021 Capstone.
      </p>
      <p>
        Email the project team at{" "}
        <a href="mailto:hello@fundstovotes.info">hello@fundstovotes.info</a>.
      </p>
      <img
        src={imgiSchool}
        role="img"
        alt="University of Washington Information School logo"
        width="300px"
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      />
      <br />

      <p>
        The project is now open sourced. Source code and documentation are
        available on <a href="https://github.com/FundsToVotes">GitHub</a>.
        Contributions are welcome.
      </p>
    </div>
  );
}
export default About;
