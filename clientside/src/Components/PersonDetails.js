/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* ****************************************************

    This file is responsible for creating the representative details page
    with three visualizations: Top 10 Industries, Bills Table, and Independent Expenditures

*****************************************************/

import { Component } from "react";
import tempPerson from "../images/temp-person.jpg";

export default class PersonDetails extends Component {
  render() {
    return (
      <div>
        <div className="details-header">
          <h1 className="details-header-text">Micheal Scott - US Senator</h1>
        </div>
        <div className="details-side-panel">
          <h2>Micheal Scott</h2>
          <h3>US Senator</h3>
          <img src={tempPerson} alt="candidate headshot" className="headshot" />
          <h4>Republican</h4>

          <h5 className="mt-3">DC Office Number:</h5>
          <p>(222) 555-0000</p>

          <h5 className="mt-3">Campaign Website:</h5>
          <a href="https://google.com">https://google.com</a>

          <h5 className="mt-3">Office Mailing Address:</h5>
          <p>420 Lane St. Riverdale, WA 69690</p>

          <h5 className="mt-3">Email:</h5>
          <p>michealscott@us.edu</p>

          <a href="/take-action" className="btn landing-button learn-more">
            Take Action
          </a>
        </div>
        <div className="breakdown-panel">
          <div className="card datavis-card mt-5 p-3">
            {" "}
            Data visualizations go here
          </div>
          <div className="card text-card mt-5 mb-5 p-3">
            Text heavy info goes here
          </div>
        </div>
      </div>
    );
  }
}
