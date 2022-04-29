/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* ****************************************************
    This file is responsible for creating the representative details page
    with three visualizations: Top 10 Industries, Bills Table, and Independent Expenditures
*****************************************************/

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import twitterIcon from "../images/twitter.svg";
import instagramIcon from "../images/instagram.svg";
import facebookIcon from "../images/facebook.svg";
import youtubeIcon from "../images/youtube.svg";
import defaultProfile from "../images/placeholder-square.png";
import BillsData from "./BillsData";
import Top10Pie from "./Top10Pie";
import Top10Bar from "./Top10Bar";

export default function PersonDetails() {
  const { search } = useLocation();
  const { representative } = queryString.parse(search);
  const [firstName, lastName] = representative.split(" ");
  const [details, setDetails] = useState([]);

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
      <a
        href={url}
        key={platform}
        target="_blank"
        rel="noreferrer"
        className="mr-1"
      >
        <img src={icon} alt={platform}></img>
      </a>
    );
  };

  const fetchRepresentativeDetails = () => {
    fetch(
      `https://api.fundstovote.com/v1/representativeDetails?firstName=${firstName}&lastName=${lastName}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          let _ = data.urls.filter((d) => d.includes(".gov"));
          if (_.length > 0) {
            console.log(_);
            data.urls = (
              <div>
                {_.map((d) => (
                  <a className="websites" key={d} href={d}>
                    {d}
                  </a>
                ))}
              </div>
            );
          }
        } else {
          data.urls = (
            <div>
              <p>No sites listed</p>
            </div>
          );
        }

        data.address = formatAddress(
          data.address.line1,
          data.address.city,
          data.address.state
        );
        data.socials = data.socials.map((d) => setupIcon(d.platform, d.id));
        setDetails(data);
      });
  };

  const formatAddress = (address, city, state) => {
    return (
      <p>
        {address} <br></br> {city}, {state}
      </p>
    );
  };

  const colorCodeParty = (party) => {
    if (party === "Republican Party") {
      return "red";
    } else if (party === "Democratic Party") {
      return "blue";
    } else {
      return "black";
    }
  };

  const colorCodeBackground = (party) => {
    if (party === "Republican Party") {
      return "republican-background";
    } else {
      return "democrat-background";
    }
  };

  const phoneToString = (phone) => {
    if (phone == undefined) {
      return;
    }
    const regex = /\d+/;
    let arr = phone[0].match(regex);
    return "" + arr;
  };

  useEffect(() => {
    fetchRepresentativeDetails();
  }, []);

  return (
    <div className="white-container">
      {/* Header */}
      <div className="details-header">
        <h1 className="details-header-text">
          {details.name + " - " + details.office}
        </h1>
      </div>

      <div className="details-container">
        {/* Side Panel */}
        <div className="details-side-panel">
          <div className="details-side-header">
            <div className="side-panel-header">
              <h2>{details.name}</h2>
              <h3 className="position-text mb-3">{details.office}</h3>
            </div>

            <div className="image-box">
              <div>
                <img
                  src={details.photoUrl}
                  alt="candidate headshot"
                  className={
                    "headshot image-details-cropper " +
                    colorCodeBackground(details.party)
                  }
                  onError={(event) => {
                    event.target.src = defaultProfile;
                    event.onerror = null;
                  }}
                />
              </div>
            </div>

            <h4
              className="mt-3"
              style={{ color: colorCodeParty(details.party) }}
            >
              {details.party}
            </h4>
          </div>

          <div className="details-info">
            <h5 className="mt-4">DC Office Number:</h5>
            <a
              className="phone-for-mobile"
              href={`tel:${phoneToString(details.phones)}`}
            >
              {details.phones}
            </a>
            <p className="phone-for-desktop">{details.phones}</p>

            <h5 className="mt-3">Congressperson Websites:</h5>
            {details.urls}

            <h5 className="mt-3">Office Mailing Address:</h5>
            {details.address}

            <h5 className="mt-3">Socials:</h5>
            <p className="m-1">{details.socials}</p>

            <a
              href="/take-action"
              className="btn landing-button learn-more mt-3"
            >
              Take Action
            </a>
          </div>
        </div>

        {/* Right side of web page */}
        <div className="breakdown-panel">
          <h3 className="mt-3 details-gradiant mr-4 ml-4 mt-4 p-3">
            Campaign Funding
          </h3>

          <div className="card datavis-card mr-4 ml-4 p-3 ">
            <div className="m-2">
              <h4 className="graph-title">
                Political Action Committee vs. Individual Contrabutions
              </h4>
              <div className="graph-container">
                <div className="graph-explanation">
                  <h5>What does this mean?</h5>
                  <p>
                    A Pac, or political action committee is a term for a
                    political committee that raises and spends money in order to
                    elect and defeat candidates. Most PACs represent businesses,
                    labor, or ideological interests. An individual contribution
                    is a contribution made by an individual to a politician.
                    <br></br>
                    The bar chart shows total contributions by industry.
                  </p>
                </div>
                <Top10Bar repsName={representative} />
              </div>
            </div>

            <div className="m-2">
              <h4 className="graph-title">Top 10 Supporting Industries</h4>
              <div className="graph-container">
                <div className="graph-explanation">
                  <h5>What does this mean?</h5>
                  <p>
                    This pie chart shows the percent total of contributions to a
                    candidate by a particular industry.
                  </p>
                </div>
                <Top10Pie repsName={representative} />
              </div>
            </div>
          </div>

          <div className="m-4 mb-5 p-3">
            <h3 className="mt-3 details-gradiant">Bill Voting History</h3>
            <BillsData firstName={firstName} lastName={lastName} />
          </div>
        </div>
      </div>
    </div>
  );
}
