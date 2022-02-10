import React from "react";
import { Link } from "@reach/router";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter backgroundcolor="light" className="text-center text-lg-left">
      <div className="text-center p-3">
        <p>
          Developed by students at the{" "}
          <a href="https://ischool.uw.edu">
            University of Washington Information School
          </a>
          .
        </p>
        <p>
          <a href="https://github.com/FundsToVotes/FundsToVotes-web/blob/main/LICENSE">
            MIT License
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/FundsToVotes/FundsToVotes-web"
            style={{ color: "#212121" }}
          >
            GitHub
          </a>{" "}
          | <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </MDBFooter>
  );
}

export default Footer;
