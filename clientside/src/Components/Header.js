import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVoteYea } from "@fortawesome/free-solid-svg-icons";

export class Header extends Component {
  render() {
    return (
      <Navbar className="nav-bar" expand="lg">
        <Navbar.Brand href="/">
          <span className="icon-container">
            <FontAwesomeIcon icon={faVoteYea} size="3x" />
            <h1 className="nav-title pl-3 pr-5 pt-1">Funds to Vote</h1>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ width: "100%" }}>
            <Link className="pr-3 nav-link" to="/finance-101">
              Campaign Finance 101
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
