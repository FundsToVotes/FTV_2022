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
import cleanTopTen from "./utils/cleanTopTen.js";
import prepTopTenForStack from "./utils/prepTopTenForStack.js";

export default function PersonDetails() {
  const { search } = useLocation();
  const { representative } = queryString.parse(search);
  const [firstName, lastName] = representative.split(" ");
  const [topTen, setTopTen] = useState({
    name: firstName + " " + lastName,
    data: [],
    cycle: 2020,
  });
  const [svgSize, setSvgSize] = useState(0);
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
        key={platform + url}
        target="_blank"
        rel="noreferrer"
        className="mr-1"
      >
        <img src={icon} alt={platform}></img>
      </a>
    );
  };

  const fetchTopTenData = () => {
    fetch(
      `http://localhost:3000/v1/topten?firstName=${firstName}&lastName=${lastName}&cycle=2020`
    )
      .then((response) => {
        if (!response.ok) {
          throw Error();
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) => cleanTopTen(response))
      .then((response) => prepTopTenForStack(response))
      .catch(() => {
        return { name: firstName + " " + lastName, data: [], cycle: 2020 };
      })
      .then((data) => {
        console.log(data);
        setTopTen(data);
      });
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

  const handleResize = () => {
    let whitespace = 2 * (24 + 1 + 16 + 8);
    let non_mobile_width = document
      .querySelector("#bar-container")
      .getBoundingClientRect().width;
    let windowSize = document
      .querySelector("#root")
      .getBoundingClientRect().width;
    let almost_mobile_screen_width = document
      .querySelector("#test")
      .getBoundingClientRect().width;
    let side_panel_width = document
      .querySelector("#side-panel")
      .getBoundingClientRect().width;
    let svg_width = 0;
    if (windowSize <= 1259 && window.innerWidth <= 1259) {
      // might be mobile view if here
      if (window.innerWidth <= 763) {
        // we are def using the mobile view if we are here
        console.log("mobile");
        svg_width = windowSize - whitespace;
      } else {
        console.log("semi-mobile");
        // we are semi-mobile width if we are here
        // account for the width if we hit the minimum width for the side card.
        svg_width = almost_mobile_screen_width - side_panel_width - whitespace;
      }
    } else {
      console.log("non-mobile");
      svg_width = non_mobile_width / 2;
    }
    setSvgSize(svg_width);
  };

  useEffect(() => {
    handleResize();
    fetchRepresentativeDetails();
    fetchTopTenData();
    let side_panel_width = document.querySelector("#side-panel");

    const resizeObserver = new ResizeObserver((entries) => {
      entries;
      console.log("resize");
      handleResize();
      setTimeout(() => {
        resizeObserver.disconnect();
      }, 1000);
    });

    resizeObserver.observe(side_panel_width);
    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
      _; // I HATE THIS LINTER!!
    };
  }, []);

  return (
    <div className="white-container">
      {/* Header */}
      <div className="details-header">
        <h1 className="details-header-text">
          {details.name + " - " + details.office}
        </h1>
      </div>

      <div className="details-container" id="test">
        {/* Side Panel */}
        <div className="details-side-panel" id="side-panel">
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
                    "headshot image-details-cropper details-headshot " +
                    colorCodeBackground(details.party)
                  }
                  id="headshot"
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
        <div className="breakdown-panel" id="funding-parent">
          <h3 className="mt-3 details-gradiant mr-4 ml-4 mt-4 p-3">
            Campaign Funding
          </h3>

          <div className="card datavis-card mr-4 ml-4 p-3 ">
            <div className="m-2">
              <h4 className="graph-title">
                Political Action Committee vs. Individual Contrabutions
              </h4>
              <div>
                <Top10Bar repData={topTen} width={svgSize} />
              </div>
            </div>

            <div className="m-2">
              <h4 className="graph-title">Top 10 Supporting Industries</h4>
              <Top10Pie repsName={representative} />
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
