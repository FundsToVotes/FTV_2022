/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the Our Data Page with Information about our data sources

*****************************************************/

import React, { Component } from "react";
import OpenSecretsLogo from "../../images/open-secrets.png";
import ProPublicaLogo from "../../images/ProPublica-monogram-color.svg";
import GoogleLogo from "../../images/google.png";

export class OurData extends Component {
  render() {
    return (
      <div className="static-page page-container">
        <div className="static-header">
          <h1>Our Data</h1>
          <p className="header-text">
            Funds to Votes relies on free, publicly-available APIs. We thank the
            sponsors and maintainers of these APIs for supporting civic
            technology.
          </p>
        </div>
        <div className="static-container">
          <div className="data-cards">
            <div className="card info-card data-card">
              <h3>Google Civic Information</h3>
              <div className="inner-card-data">
                <p>
                  We use the Google Civic Information API to determine a user's
                  U.S. Senators and U.S. Representatives based on their address.
                  It also provides basic demographic and contact information.
                </p>
                <a
                  href="https://developers.google.com/civic-information"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={GoogleLogo}
                    alt="Google logo"
                    height="150px"
                    width="150px"
                    className="ml-2"
                  />
                </a>
              </div>
            </div>

            <div className="card info-card data-card">
              <h3>ProPublica</h3>
              <div className="inner-card-data">
                <p>
                  ProPublica is an independent, nonprofit newsroom focused on
                  investigative journalism. They also publish a lot of data in
                  APIs. We use ProPublica's Congress API to obtain data on bills
                  and votes in the U.S. Congress. We also use ProPublica's
                  Campaign Finance API to get campaign finance data,
                  specifically for independent expenditures.
                </p>{" "}
                <a
                  href="https://www.propublica.org/datastore/apis"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={ProPublicaLogo}
                    alt="ProPublica logo"
                    height="150px"
                    width="150px"
                    className="ml-2"
                  />
                </a>
              </div>
            </div>

            <div className="mb-5 card info-card data-card">
              <h3>OpenSecrets</h3>
              <div className="inner-card-data">
                <p>
                  The Center for Responsive Politics is a research group that
                  tracks money in U.S. politics on its website OpenSecrets.org.
                  We use the OpenSecrets API to obtain campaign finance data,
                  specifically for the industries that support a U.S.
                  Representative or U.S. Senator.
                </p>
                <a
                  href="https://www.opensecrets.org/open-data/api"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={OpenSecretsLogo}
                    alt="OpenSecrets logo"
                    width="200px"
                    height="150px"
                    className="ml-2"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OurData;
