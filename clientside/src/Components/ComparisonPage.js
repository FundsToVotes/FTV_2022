// import Plotly from 'plotly.js'
import React, { Component } from "react";
// import Top10Pie from "./Top10Pie";
import Top10Bar from "./Top10Bar";

export class ComparisonPage extends Component {
  constructor(props) {
    super(props);

    //default state
    this.state = {
      name1: "",
      name2: "",
    };
  }

  fetchRepresentativeDetails = () => {
    fetch(
      `http://localhost:3000/v1/representativeDetails?firstName=${this.state.name1[0]}&lastName=${this.state.name1[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          let _ = data.urls.filter((d) => d.includes(".gov"));
          console.log(_);
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
        }
        console.log(data.urls);

        data.address =
          data.address.line1 +
          " " +
          data.address.city +
          ", " +
          data.address.state;
        this.setState({ repOne: data });
      });

    fetch(
      `http://localhost:3000/v1/representativeDetails?firstName=${this.state.name2[0]}&lastName=${this.state.name2[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          let _ = data.urls.filter((d) => d.includes(".gov"));
          console.log(_);
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
        }
        console.log(data.urls);

        data.address =
          data.address.line1 +
          " " +
          data.address.city +
          ", " +
          data.address.state;
        this.setState({ repTwo: data });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.fetchRepresentativeDetails();
  };

  getNameOne = (value) => {
    console.log(value);
    let name = value.split(" ");
    this.setState({ name1: name });
  };
  getNameTwo = (value) => {
    console.log(value);
    let name = value.split(" ");
    this.setState({ name2: name });
  };

  colorCodeParty = (party) => {
    if (party === "Republican Party") {
      return "red";
    } else if (party === "Democratic Party") {
      return "blue";
    } else {
      return "black";
    }
  };

  phoneToString = (phone) => {
    if (phone == undefined) {
      return;
    }
    console.log(phone[0]);
    const regex = /\d+/;
    let arr = phone[0].match(regex);
    return "" + arr;
  };

  makeSidePanel = (details, side) => {
    console.log(details.name);
    let sideClass;
    if (side === "right") {
      sideClass = "details-side-panel comp-side-right comp-side";
    } else {
      sideClass = "details-side-panel comp-side-left";
    }
    return (
      <div className={sideClass}>
        <div className="details-side-header">
          <h2>{details.name}</h2>
          <h3 className="position-text mb-3">{details.office}</h3>
          <div className="image-box">
            <div>
              <img
                src={details.photoUrl}
                alt="candidate headshot"
                className="headshot image-details-cropper"
                onError={(event) => {
                  // event.target.src = defaultProfile;
                  event.onerror = null;
                }}
              />
            </div>
          </div>

          <h4
            className="mt-3"
            style={{ color: this.colorCodeParty(details.party) }}
          >
            {details.party}
          </h4>
        </div>

        <h5 className="mt-4">DC Office Number:</h5>
        <a href={`tel:${this.phoneToString(details.phones)}`}>
          {details.phones}
        </a>

        {details.urls}

        <h5 className="mt-3">Office Mailing Address:</h5>
        {details.address}
      </div>
    );
  };

  render() {
    //cid= is candidate id, which Top10 components use for API call
    //name= is candidate name
    //<ComparisonSearch/> TODO: see above TODO

    return (
      <div>
        <Top10Bar />
        {/* <ComparisonSearch /> */}
      </div>
    );
  }
}

export default ComparisonPage;
