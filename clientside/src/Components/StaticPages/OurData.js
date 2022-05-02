/* eslint-disable react/no-unescaped-entities */
/* ****************************************************
      
    This file is responsible for creating the Our Data Page with Information about our data sources

*****************************************************/

import React, { Component } from "react";
import OpenSecretsLogo from "../../images/open-secrets.png";
import ProPublicaLogo from "../../images/ProPublica-monogram-color.svg";
import GoogleLogo from "../../images/google.png";
import { Link } from "react-router-dom";

export class OurData extends Component {
  render() {
    return (
      <div className="static-page page-container">
        <div className="static-header">
          <h1>Our Data</h1>
          <p className="header-text">
            Funds to Vote relies on free, publicly-available APIs. We thank the
            sponsors and maintainers of these APIs for supporting civic
            technology. We don't save your information. See the bottom of our{" "}
            <Link to="about" className="privacy-link">
              About Page
            </Link>{" "}
            for more information on our privacy policy.
          </p>
        </div>
        <div className="static-container">
          <div className="data-cards">
            <div className="card info-card data-card">
              <div className="inner-card-data">
                <h3>Google Civic Information</h3>
                <p>
                  We use the Google Civic Information API to determine a user's
                  U.S. Senators and U.S. Representatives based on their address.
                  It also provides basic demographic and contact information.
                </p>
              </div>
              <div>
                <a
                  href="https://developers.google.com/civic-information"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={GoogleLogo}
                    alt="Google logo"
                    className="ml-2 data-img"
                  />
                </a>
              </div>
            </div>

            <div className="card info-card data-card">
              <div className="inner-card-data">
                <h3>ProPublica</h3>
                <p>
                  ProPublica is an independent, nonprofit newsroom focused on
                  investigative journalism. They also publish a lot of data in
                  APIs. We use ProPublica's Congress API to obtain data on bills
                  and votes in the U.S. Congress. We also use ProPublica's
                  Campaign Finance API to get campaign finance data,
                  specifically for independent expenditures.
                </p>
              </div>
              <div>
                <a
                  href="https://www.propublica.org/datastore/apis"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={ProPublicaLogo}
                    alt="ProPublica logo"
                    className="ml-2 data-img"
                  />
                </a>
              </div>
            </div>

            <div className="mb-5 card info-card data-card">
              <div className="inner-card-data">
                <h3>OpenSecrets</h3>
                <p>
                  The Center for Responsive Politics is a research group that
                  tracks money in U.S. politics on its website OpenSecrets.org.
                  We use the OpenSecrets API to obtain campaign finance data,
                  specifically for the industries that support a U.S.
                  Representative or U.S. Senator.
                </p>
              </div>
              <div>
                <a
                  href="https://www.opensecrets.org/open-data/api"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={OpenSecretsLogo}
                    alt="OpenSecrets logo"
                    className="ml-2 data-img"
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
