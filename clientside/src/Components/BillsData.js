/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { BsArrowRight } from "react-icons/bs";

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
      `http://localhost:3000/v1/bills?firstName=${this.state.firstName}&lastName=${this.state.lastName}`
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
            let billLink;
            if (d.bill.billUri.length > 0) {
              billLink = (
                <a
                  href={d.bill.congressDotGovUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="bills-read-more"
                >
                  Read More <BsArrowRight />
                </a>
              );
            }
            return (
              <div key={d.bill.shortTitle} className="card mb-2 p-2 bill-card">
                <p>
                  <strong>Bill ID:</strong> {d.bill.billId}
                </p>
                <p>
                  <strong>Subject:</strong> {d.bill.primarySubject}
                </p>
                <p>
                  <strong>Position:</strong>{" "}
                  <span style={{ color: this.voteColor(d.position) }}>
                    {d.position}
                  </span>
                </p>
                <p>
                  <strong>Short Summary:</strong> {d.bill.title}
                </p>
                <p>
                  <strong>Latest Action:</strong> {d.bill.latestAction}
                </p>
                {billLink}
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
