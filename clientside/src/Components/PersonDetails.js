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
import defaultProfile from "../images/default-profile.png";
import BillsData from "./BillsData";
import Top10Pie from "./Top10Pie";
import Top10Bar from "./Top10Bar";

export default function PersonDetails() {
  const { search } = useLocation();
  const { representative } = queryString.parse(search);
  const [firstName, lastName] = representative.split(" ");
  const [details, setDetails] = useState([]);
  const [industries, setIndustries] = useState([]);
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
        if (data.urls) {
          let _ = data.urls.filter((d) => d.includes(".gov"));
          if (_.length > 0) {
            data.urls = (
              <div>
                <h5 className="mt-3">Congressperson Websites:</h5>
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

  const fetchTopTen = () => {
    fetch(
      `http://localhost:3000/v1/topten?firstName=${firstName}&lastName=${lastName}&cycle=2020`
    )
      .then((response) => response.json())
      .then((data) => {
        data = { name: representative, data: data };
        let dataviz = (
          <div className="side-by-side">
            <Top10Bar repsData={data} />
            <Top10Pie repsData={data} />
          </div>
        );
        setIndustries(dataviz);
      })
      .catch(() => {
        setIndustries("no data found :(");
      });
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
    fetchTopTen();
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
                  className="headshot image-details-cropper"
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
            <a href={`tel:${phoneToString(details.phones)}`}>
              {details.phones}
            </a>

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
          <div className="details-card">
            <h3 className="mt-3 details-gradiant">Funding at a glance:</h3>
            <div>{industries}</div>
          </div>
          <div className="details-card">
            <h3 className="mt-3 details-gradiant">Bill Voting History</h3>
            <BillsData firstName={firstName} lastName={lastName} />
          </div>
        </div>
      </div>
    </div>
  );
}
