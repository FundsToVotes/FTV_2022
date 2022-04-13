import React, { Component } from "react";

export default class BillsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
    };
  }

  fetchBillsData = () => {
    fetch(
      `http://localhost:3000/v1/bills?firstName=${this.props.firstName}&lastName=${this.props.lastName}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bills: data.votes });
      });
  };

  componentDidMount() {
    this.fetchBillsData();
  }

  render() {
    console.log(this.state);
    let billsDom = <div></div>;
    if (this.state.bills.length > 0) {
      billsDom = (
        <div className="bills-container">
          {this.state.bills.map((d) => {
            console.log(d);
            return (
              <div key={d} className="card mb-2 p-2 bill-card">
                <p>
                  <strong>Bill ID:</strong> {d.bill.billId}
                </p>
                <p>
                  <strong>Subject:</strong> {d.bill.primarySubject}
                </p>
                <p>
                  <strong>Position:</strong> {d.position}
                </p>
                <p>
                  <strong>Short Summary:</strong> {d.bill.title}
                </p>
                <p>
                  <strong>Latest Action:</strong> {d.bill.latestAction}
                </p>
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
