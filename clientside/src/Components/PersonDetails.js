/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* ****************************************************

    This file is responsible for creating the representative details page
    with three visualizations: Top 10 Industries, Bills Table, and Independent Expenditures

*****************************************************/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import twitterIcon from "../images/twitter.svg";
import instagramIcon from "../images/instagram.svg";
import facebookIcon from "../images/facebook.svg";
import youtubeIcon from "../images/youtube.svg";
import dummyContributions from "../images/dummy_contributions.png";
import dummyIndustries from "../images/dummy_industries.png";

export default function PersonDetails() {
  const urlParams = useParams();
  const [firstName, lastName] = urlParams.representative.split(" ");
  const [details, setDetails] = useState([]);
  // const [urls, setUrls] = useState([]);

  const setupIcon = (platform, id) => {
    let url, icon;
    switch (platform) {
      case "Facebook":
        url = `https://www.facebook.com/${id}`;
        icon = facebookIcon;
        break;
      case "Instagram":
        url = `https://www.instagram.com/${id}`;
        icon = instagramIcon;
        break;
      case "Twitter":
        url = `https://www.twitter.com/${id}`;
        icon = twitterIcon;
        break;
      case "YouTube":
        url = `https://www.youtube.com/${id}`;
        icon = youtubeIcon;
        break;
      default:
        return;
    }
    return (
      <a href={url} target="_blank" rel="noreferrer" className="mr-1">
        <img src={icon} alt={platform}></img>
      </a>
    );
  };

  const fetchRepresentativeDetails = () => {
    fetch(
      `http://localhost:3000/v1/representativeDetails?firstName=${firstName}&lastName=${lastName}`
    )
      .then((response) => response.json())
      .then((data) => {
        let _ = data.urls.filter((d) => d.includes(".gov"));
        if (_.length > 0) {
          data.urls = (
            <div>
              <h5 className="mt-3">Representative Websites:</h5>
              <div>
                {_.map((d) => (
                  <a key={d} href={d}>
                    {d}
                  </a>
                ))}
              </div>
            </div>
          );
        } else {
          data.urls = undefined;
        }
        data.address =
          data.address.line1 +
          " " +
          data.address.city +
          ", " +
          data.address.state;
        data.socials = data.socials.map((d) => setupIcon(d.platform, d.id));
        setDetails(data);
      });
  };

  const phoneToString = (phone) => {
    if (phone == undefined) {
      return;
    }
    console.log(phone[0]);
    const regex = /\d+/;
    let arr = phone[0].match(regex);
    return "" + arr;
  };

  useEffect(() => {
    fetchRepresentativeDetails();
  }, []);

  console.log(details);

  return (
    <div>
      {/* Header */}
      <div className="details-header">
        <h1 className="details-header-text">
          {details.office + " - " + details.name}
        </h1>
      </div>

      {/* Side Panel */}
      <div className="details-side-panel">
        <div className="details-side-header">
          <h2 className="mb-3">{details.name}</h2>
          <div className="image-box">
            <div>
              <img
                src={details.photoUrl}
                alt="candidate headshot"
                className="headshot image-details-cropper"
              />
            </div>
          </div>

          <h4 className="mt-3">{details.party}</h4>
        </div>

        <h5 className="mt-4">DC Office Number:</h5>
        <a href={`tel:${phoneToString(details.phones)}`}>{details.phones}</a>

        {details.urls}

        <h5 className="mt-3">Office Mailing Address:</h5>
        {details.address}

        <h5 className="mt-3">Socials:</h5>
        <p className="m-1">{details.socials}</p>

        <a href="/take-action" className="btn landing-button learn-more mt-3">
          Take Action
        </a>
      </div>

      {/* Right side of web page */}
      <div className="breakdown-panel">
        <div className="card datavis-card mt-5 p-3">
          <h5 className="mt-3">Funding at a glance:</h5>
          <div>
            <img src={dummyIndustries} />
            <img src={dummyContributions} />
          </div>
        </div>
        <div className="card text-card mt-5 mb-5 p-3">
          Text heavy info goes here
        </div>
      </div>
    </div>
  );
}
