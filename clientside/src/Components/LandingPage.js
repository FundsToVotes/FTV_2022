import { Component } from "react";
import navIcon from "../images/nav-icon.png";
import circlePeople from "../images/circle-people.png";
import piggyBank from "../images/piggy-bank.png";
import presentingMan from "../images/presenting-man.png";
import computer from "../images/computer.png";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-background table">
        <span className="icon-container">
          <img
            src={navIcon}
            className="nav-icon ml-3"
            alt="funds to vote nav icon"
          />
          <h1 className="nav-title m-3">
            <strong>
              Who Funds Our<br></br>Government
            </strong>
          </h1>
        </span>
        <div>
          <div className="left-container mt-3">
            <div className="circle-container">
              <div className="circle-background circle-flex">
                <img
                  src={circlePeople}
                  alt="8 circles with icon people"
                  className="landing-icon-img"
                />
              </div>
              <h2>
                Search for <br></br>elected officials.
              </h2>
            </div>
            <div className="circle-container">
              <h2>
                See who’s <br></br>funding them.
              </h2>
              <div className="circle-background circle-flex">
                <img
                  src={piggyBank}
                  alt="small icon man riding a piggy bank"
                  className="landing-icon-img"
                />
              </div>
            </div>
            <div className="circle-container">
              <div className="circle-background circle-flex">
                <img
                  src={presentingMan}
                  alt="icon person pointing to a large computer screen"
                  className="landing-icon-img"
                />
              </div>
              <h2>
                Make informed <br></br> votes.
              </h2>
            </div>
          </div>

          <div className="right-container">
            <h2>Helping Americas voters make informed decisions</h2>
            <a href="/" className="btn landing-button mt-3 landing-btn">
              Show me the money
            </a>
            <img src={computer} alt="computer" className="computer-img" />
          </div>
        </div>
      </div>
    );
  }
}
