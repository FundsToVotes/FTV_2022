/* eslint-disable react/prop-types */
import React, { Component } from "react";

export default class BillsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      bills: [],
    };
  }

  fetchBillsData = () => {
    fetch(
      `https://api.fundstovote.com/v1/bills?firstName=${this.state.firstName}&lastName=${this.state.lastName}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bills: data.votes });
      });
  };

  componentDidMount() {
    this.fetchBillsData();
  }

  voteColor = (vote) => {
    if (vote === "Yes") {
      return "green";
    } else {
      return "red";
    }
  };

  render() {
    let billsDom = <div></div>;
    if (this.state.bills.length > 0) {
      billsDom = (
        <div className="bills-container">
          {this.state.bills.map((d) => {
            return (
              <div key={d.bill.shortTitle} className="card mb-2 p-2 bill-card">
                <h6>{d.bill.shortTitle}</h6>

                <div className="position-container mt-3 mb-2">
                  <h6>Position:</h6>
                  <p style={{ color: this.voteColor(d.position) }}>
                    {" "}
                    {d.position}
                  </p>
                </div>

                <p>{d.bill.title}</p>
              </div>
            );
          })}
        </div>
      );
    } else {
      billsDom = <p>No bills to show at this time</p>;
    }

    return <div>{billsDom}</div>;
  }
}
