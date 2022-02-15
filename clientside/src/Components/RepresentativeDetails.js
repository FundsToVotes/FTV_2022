/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* ****************************************************

    This file is responsible for creating the representative details page
    with three visualizations: Top 10 Industries, Bills Table, and Independent Expenditures

*****************************************************/

import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Link } from "@reach/router";
import { Icon } from "@iconify/react";
import externalLink from "@iconify-icons/feather/external-link";

// Renders the Representative Page with the three visualizations
export default function RepresentativePage(props) {
  const [industries, setIndustries] = useState({
    industry: [],
    "@attributes": { cid: "" },
  });
  const [bills, setBills] = useState([]);
  const [expenditures, setExpenditures] = useState({ results: [] });
  const offName = props.location.state.currName;
  const officials = props.location.state.off.offList;
  let offObj = "";
  for (let i = 0; i < officials.length; i++) {
    if (officials[i].name === offName) {
      offObj = officials[i];
      break;
    }
  }
  let fecID = "";
  let memberID = "";
  let crp_id = "";
  let senClassYr = "";
  let type = "senate";
  let typeStyled = "US Senator";
  if (offObj["urls"][0].includes("house")) {
    type = "house";
    typeStyled = "Representative of the House";
  }
  useEffect(() => {
    fetch(
      "https://api.propublica.org/congress/v1/117/" + type + "/members.json",
      {
        method: "GET",
        headers: {
          "X-API-Key": process.env.REACT_APP_PROPUBLICA_CONGRESS_API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const nameArray = offName.split(" ");
        const offFName = nameArray[0];
        const offLName = nameArray[nameArray.length - 1];
        const indexOfOfficial = result["results"][0]["members"].findIndex(
          (x) => (x.first_name === offFName) & (x.last_name === offLName)
        );
        memberID = result["results"][0]["members"][indexOfOfficial]["id"];
        fecID =
          result["results"][0]["members"][indexOfOfficial]["fec_candidate_id"];
        crp_id = result["results"][0]["members"][indexOfOfficial]["crp_id"];
        const senClass =
          result["results"][0]["members"][indexOfOfficial]["title"];
        senClassYr = "2020";
        if (senClass.includes("1st Class")) {
          senClassYr = "2018";
        } else if (senClass.includes("3rd Class")) {
          senClassYr = "2016";
        }
        return fetch("https://api.fundstovotes.info/topten?crp_id=" + crp_id);
      })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIndustries(result);
        return fetch(
          "https://api.propublica.org/campaign-finance/v1/" +
            senClassYr +
            "/candidates/" +
            fecID +
            "/independent_expenditures.json",
          {
            method: "GET",
            headers: {
              "X-API-Key":
                process.env.REACT_APP_PROPUBLICA_CAMPAIGN_FINANCE_API_KEY,
            },
          }
        );
      })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setExpenditures(result);
        return fetch(
          "https://api.fundstovotes.info/bills?member_id=" + memberID
        );
      })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setBills(result["votes"]);
      });
  }, []);
  const listOfInd = industries.industry.map((item) => {
    return item["industry_code"];
  });
  let partyColor = "red";
  if (offObj.party === "Democratic Party") {
    partyColor = "blue";
  }

  return (
    <div style="static-container">
      <h1>{offName}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p style={{ display: "inline", color: partyColor }}>{offObj.party}</p>
        <p style={{ display: "inline" }}>{typeStyled}</p>
        <p style={{ display: "inline" }}>DC Office: {offObj.phones[0]}</p>
        <p style={{ display: "inline" }}>
          <a href={offObj.urls[0]} target="_blank" rel="noreferrer">
            {offObj.urls[0]} <Icon icon={externalLink} />
          </a>
        </p>
      </div>
      <img
        src={offObj.photoUrl}
        alt="A photograph of the representative"
        style={{ display: "none" }}
      />
      <div style={{ marginBotton: "20px" }}>
        <h3 style={{ fontWeight: "700" }}>
          Top 10 Industries Funding This Representative
        </h3>
        <p>
          These industries are top contributors to {offName}'s campaign by
          individuals who work in those industries or Political Action
          Committees (PACs) in that industry.
        </p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IndustriesChart ind={industries.industry} />
          <IndustriesTextList ind={industries.industry} />
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Bills Recently Voted On</h3>
        <p>
          These are the recent bills that {offName} has voted on. The industry
          that the bill relates to may correlate with an industry that supports{" "}
          {offName}.
        </p>
        <BillsList bil={bills} ind={listOfInd} type={type} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Independent Expenditures</h3>
        <p>
          These groups spent money in support or opposition of {offName}. Learn
          more about independent expenditures on the{" "}
          <Link to="/finance-101">Campaign Finance 101 page.</Link>
        </p>
        <ExpendituresPie exp={expenditures} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Find Out More About {offName}'s Funding</h3>
        <ExtendedInfoOnRep
          cid={industries["@attributes"]["cid"]}
          name={offName}
        />
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          style={{
            backgroundColor: "green",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>
            <a href="/take-action" style={{ color: "white" }}>
              Ready to act? Click Here to Take Action!
            </a>
          </h3>
        </button>
      </div>
    </div>
  );
}

// Top 10 Industries: Builds up the Industries Bar Chart
function IndustriesChart(props) {
  const industries = props.ind;
  const trace1 = {
    x: [],
    y: [],
    name: "Individual",
    type: "bar",
    marker: { color: "#90EE90" },
  };
  const trace2 = {
    x: [],
    y: [],
    name: "PACs",
    type: "bar",
    marker: { color: "#2E8B57" },
  };
  for (let i = 0; i < industries.length; i++) {
    trace1.x[i] = industries[i]["industry_name"];
    trace2.x[i] = industries[i]["industry_name"];
    trace1.y[i] = industries[i]["indivs"];
    trace2.y[i] = industries[i]["pacs"];
  }
  const data = [trace1, trace2];

  return (
    <div>
      <Plot
        data={data}
        layout={{ barmode: "stack" }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

// Top 10 Industries: Method to create list of Top 10 Industries
function IndustriesTextList(props) {
  const industries = props.ind;
  const industryElem = industries.map((item) => {
    const elem = <IndustryItem industryObj={item} />;
    return elem;
  });
  return (
    <div>
      <p>Top 10 Industries List</p>
      <ol>{industryElem}</ol>
    </div>
  );
}

// Top 10 Industries: Helper method that makes the individual Industry list item
function IndustryItem(props) {
  const industry = props.industryObj;
  const companyEx = {
    H: "Kaiser Permanente, Pfizer Inc",
    Z: "Other Candidates",
    Q: "One Nation, Fund for Policy Reform",
    P: "National Education Assn, Carpenters & Joiners Union",
    D: "Lockheed Martin, Raytheon Technologies",
    M: "Boeing Co, Delta Air Lines",
    C: "Suffolk Construction, National Assn of Home Builders",
    A: "British American Tobacco, American Crystal Sugar",
    E: "Chevron Corp, American Petroleum Institute",
    W: "University of California, Marcus Foundation",
    C: "Microsoft Corp, Amazon.com",
    Y: "Unknown",
    N: "Walmart Inc, Las Vegas Sands",
    F: "Bloomberg Lp, Fahr LLC/Tom Steyer",
    K: "Kirkland & Ellis, Paul, Weiss et al",
  };
  return (
    <div>
      <li className="hoverIndustry">{industry["industry_name"]}</li>
      <p className="hideExamples">
        Example Organizations:{" "}
        {companyEx[industry["industry_code"].split("")[0]]}
      </p>
    </div>
  );
}

// Bills Table: Creates the table for the bills for the specific representative
function BillsList(props) {
  const bills = props.bil;
  const ind = props.ind;
  const billsElem = bills.map((item) => {
    const bill = <BillsItem billObj={item} indList={ind} type={props.type} />;
    return bill;
  });
  return (
    <div>
      <table>
        <tbody>
          <tr
            style={{
              border: "3px solid #516F2A",
              padding: "8px",
              backgroundColor: "white",
            }}
          >
            <th
              style={{
                border: "3px solid #516F2A",
                padding: "8px",
              }}
            >
              Name
            </th>
            <th
              style={{
                border: "3px solid #516F2A",
                padding: "8px",
              }}
            >
              Representative's Position
            </th>
            <th
              style={{
                border: "3px solid #516F2A",
                padding: "8px",
              }}
            >
              Industry of Bill
            </th>
            <th
              style={{
                border: "3px solid #516F2A",
                padding: "8px",
              }}
            >
              Bill Summary
            </th>
            <th
              style={{
                border: "3px solid #516F2A",
                padding: "8px",
              }}
            >
              Industry and Funding Match
            </th>
          </tr>
          {billsElem}
        </tbody>
      </table>
    </div>
  );
}

// Bills Table: Creates each individual row of the bills
function BillsItem(props) {
  const bill = props.billObj;
  const ind = props.indList;
  let ifMatch = "False";
  let colorRow = "white";
  for (let i = 0; i < ind.length; i++) {
    if (ind[i].startsWith(bill.bill.Opensecrets_Sector_Prefix)) {
      ifMatch = "True";
      colorRow = "#dcedc8b2";
    }
  }

  let billStubArray = bill.bill.number.split(" ");
  if (billStubArray[billStubArray.length - 1].includes(".")) {
    billStubArray = billStubArray[billStubArray.length - 1].split(".");
  }
  const website =
    "https://www.congress.gov/bill/117th-congress/" +
    props.type +
    "-bill/" +
    billStubArray[billStubArray.length - 1];
  return (
    <tr
      style={{
        border: "3px solid #516F2A",
        padding: "8px",
        backgroundColor: colorRow,
      }}
    >
      <td
        style={{
          border: "3px solid #516F2A",
          padding: "8px",
        }}
      >
        <a href={website} target="_blank" rel="noreferrer">
          {bill.bill.short_title} <Icon icon={externalLink} />
        </a>
      </td>
      <td
        style={{
          border: "3px solid #516F2A",
          padding: "8px",
        }}
      >
        {bill.position}
      </td>
      <td
        style={{
          border: "3px solid #516F2A",
          padding: "8px",
        }}
      >
        {bill.bill.Opensecrets_Sector_Long}
      </td>
      <td
        style={{
          border: "3px solid #516F2A",
          padding: "8px",
        }}
      >
        {bill.bill.summary_short}
      </td>
      <td
        style={{
          border: "3px solid #516F2A",
          padding: "8px",
        }}
      >
        {ifMatch}
      </td>
    </tr>
  );
}

// Responsible for the creation of links to other resources about the other representitive
function ExtendedInfoOnRep(props) {
  const openSecretsLink =
    "https://www.opensecrets.org/members-of-congress/" +
    props.name.replace(" ", "-") +
    "/summary?cid=" +
    props.cid;
  const voterlyLink =
    "https://voterly.com/search/politicians?q=" + props.name.replace(" ", "-");
  const govTrackLink =
    "https://www.govtrack.us/search?q=" + props.name.replace(" ", "-");
  return (
    <div>
      <ul>
        <li>
          <a href={openSecretsLink} target="_blank" rel="noreferrer">
            Open Secrets Page <Icon icon={externalLink} />
          </a>
        </li>
        <li>
          <a href={voterlyLink} target="_blank" rel="noreferrer">
            Voterly Page <Icon icon={externalLink} />
          </a>
        </li>
        <li>
          <a href={govTrackLink} target="_blank" rel="noreferrer">
            GovTrack <Icon icon={externalLink} />
          </a>
        </li>
      </ul>
    </div>
  );
}

// Independent Expenditures: Creates the list of committees that have supported or donated against a certain representative
function ExpendituresPie(props) {
  const exp = props.exp;
  const comitteesS = [];
  const committeesO = [];
  for (let i = 0; i < exp.results.length; i++) {
    if (
      (exp.results[i].support_or_oppose === "S") &
      !comitteesS.includes(exp.results[i].fec_committee_name)
    ) {
      comitteesS.push(exp.results[i].fec_committee_name);
    } else if (
      (exp.results[i].support_or_oppose === "O") &
      !committeesO.includes(exp.results[i].fec_committee_name)
    ) {
      committeesO.push(exp.results[i].fec_committee_name);
    }
  }
  if (comitteesS.length === 0) {
    comitteesS.push("No Committees Found");
  }
  if (committeesO.length === 0) {
    committeesO.push("No Committees Found");
  }
  const listOfS = comitteesS.map((item) => {
    return <ExpenditureListItem committee={item} />;
  });
  const listOfO = committeesO.map((item) => {
    return <ExpenditureListItem committee={item} />;
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <div>
        <p>Committees That Support Representative:</p>
        <ul>{listOfS}</ul>
      </div>
      <div>
        <p>Committees That Donated Against Representative:</p>
        <ul>{listOfO}</ul>
      </div>
    </div>
  );
}

// Independent Expenditures: Creates the individual list items for Independent Expenditures List
function ExpenditureListItem(props) {
  return <li>{props.committee}</li>;
}
