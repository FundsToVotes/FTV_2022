/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* ****************************************************

    This file is responsible for creating the representative details page
    with three visualizations: Top 10 Industries, Bills Table, and Independent Expenditures

*****************************************************/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PersonDetails() {
  
  const urlParams = useParams();
  const [firstName, lastName] = urlParams.representative.split(" ")
  const [details, setDetails] = useState([]);
  const fetchRepresentativeDetails = () => {
    fetch(`http://localhost:3000/v1/representativeDetails?firstName=${firstName}&lastName=${lastName}`)
      .then(response => response.json())
      .then(data => {
        setDetails(data)
        console.log(data)
      })
  }

  useEffect(() => {
    fetchRepresentativeDetails()
  }, [])
  return (
    <div>
      <div className="details-header">
        <h1 className="details-header-text">{"U.S. Representative " + details.name}</h1>
      </div>
      <div className="details-side-panel">
        <h2>{details.name}</h2>
        {/* Tell Thomas to add senator vs representative to the api */}
        <h3>See Code Note</h3>
        <img src={details.photoUrl} alt="candidate headshot" className="headshot" />
        <h4>{details.party}</h4>

        <h5 className="mt-3">DC Office Number:</h5>
        <p>{details.phones}</p>

        <h5 className="mt-3">Campaign Website:</h5>
        <a href="https://google.com">https://google.com</a>

        <h5 className="mt-3">Office Mailing Address:</h5>
        {/* {details.address.line1 + " " + details.address.city + ", " + details.address.state} */}
        <p></p>

        <h5 className="mt-3">Socials:</h5>
        <p>michealscott@us.edu</p>

        <a href="/take-action" className="btn landing-button learn-more">
          Take Action
        </a>
      </div>
      <div className="breakdown-panel">
        <div className="card datavis-card mt-5 p-3">
          Data visualizations go here
        </div>
        <div className="card text-card mt-5 mb-5 p-3">
          Text heavy info goes here
        </div>
      </div>
    </div>
  );
}
