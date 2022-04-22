import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faVoteYea } from "@fortawesome/free-solid-svg-icons";
import navIcon from "../images/nav-icon.png";

export class Header extends Component {
  render() {
    return (
      <Navbar className="nav-bar" expand="lg">
        <Navbar.Brand href="/">
          <span className="icon-container">
            <img
              src={navIcon}
              className="nav-icon"
              alt="funds to vote nav icon"
            />
            <h1 className="nav-title pl-3 pt-1">
              <strong>Funds to Vote</strong>
            </h1>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ width: "100%" }}>
            <Link className="pr-3 nav-link" to="/compare-reps">
              Campaign Comparison
            </Link>
            <Link className="pr-3 nav-link" to="/take-action">
              Take Action
            </Link>
            <Link className="pr-3 nav-link" to="/our-data">
              Our Data
            </Link>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Header;
