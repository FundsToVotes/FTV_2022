/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating our Privacy Policy page

*****************************************************/

import React, { Component } from "react";

export class PrivacyPolicy extends Component {
  render() {
    return (
      <div className="static-page page-container">
        <div className="static-header">
          <h2>Privacy Policy</h2>
        </div>
        <div className="static-container pb-2">
          <div className="mt-2 card info-card">
            <h3>What is Funds to Votes?</h3>
            <p>
              Funds to Votes is a project created by students at the{" "}
              <a href="https://ischool.uw.edu">
                University of Washington Information School
              </a>{" "}
              during Informatics Capstone 2021.
            </p>
          </div>

          <div className="mt-2 card info-card">
            <h3>What user data do you collect?</h3>
            <p>
              It's simple: Funds to Votes does not collect nor store{" "}
              <strong>any</strong> user data.
            </p>
          </div>

          <div className="mt-2 card info-card">
            <h3>What third-party services do we use?</h3>
            <ul>
              <li>
                Google Civic Information API. When using our app, we use this
                service to determine your elected officials based on the address
                you enter. The use is bound by the{" "}
                <a href="https://developers.google.com/civic-information/docs/terms">
                  Google APIs Terms of Service.
                </a>
              </li>
              <li>
                ProPublica Congress and Campaign Finance APIs. We use these
                services to obtain data about bills, votes, and some campaign
                finance information. The use is bound by the{" "}
                <a href="https://projects.propublica.org/api-docs/campaign-finance/">
                  Terms of Service
                </a>
                .
              </li>
              <li>
                OpenSecrets.org API. We use this service to obtain certain
                campaign finance data. The use is bound by the{" "}
                <a href="https://www.opensecrets.org/open-data/api-terms-of-service">
                  Terms of Service
                </a>
                .
              </li>
              <li>Render. We use this service to host our web application.</li>
              <li>
                Amazon Web Services. We use this service to host a server-side
                portion of our application to serve certain data shown on this
                site.
              </li>
            </ul>
          </div>

          <div className="mt-2 card info-card">
            <h3>How can you contact Funds to Votes?</h3>
            <p>
              You may contact the Funds to Votes team{" "}
              <a href="mailto:hello@fundstovotes.info">
                via email (hello@fundstovotes.info)
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default PrivacyPolicy;
