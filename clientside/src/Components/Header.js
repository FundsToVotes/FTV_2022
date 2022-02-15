import React from "react";
import { Link } from "@reach/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVoteYea } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <Navbar className="nav-bar" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }}>
          <div className="nav-container">
            <span className="icon-container">
              <FontAwesomeIcon icon={faVoteYea} size="3x" />
              <Link to="/">
                <h1 className="nav-title pl-3 pr-5 pt-1">Funds to Vote</h1>
              </Link>
            </span>
            <Link className="pr-3" to="/finance-101">
              <Navbar.Text>Campaign Finance 101</Navbar.Text>
            </Link>
            <Link className="pr-3" to="/take-action">
              <Navbar.Text>Take Action</Navbar.Text>
            </Link>
            <Link className="pr-3" to="/our-data">
              <Navbar.Text>Our Data</Navbar.Text>
            </Link>
            <Link to="/about">
              <Navbar.Text>About</Navbar.Text>
            </Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Header;
