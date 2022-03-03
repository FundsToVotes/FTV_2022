import React, { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";

// Creates the Search bar where users will input their Address, GoogleAPI.js is called when submitted
export class SearchBar extends Component {
  handleClick() {
    console.log("clicky clicky")
  }
  render() {
    return (
      <div className="form-background">
        <div className="form-container">
          <AiOutlineSearch className="search-icon" />
          <form className="form-contents">
            <input
              className="form-control search-bar"
              type="text"
              placeholder="Type address here..."
              address="address"
              // onChange={(e) => setAddress(e.target.value)}
            />

            <select
              defaultValue="representatives"
              className="custom-select landing-dropdown"
            >
              <option value="representatives">Representatives</option>
              <option value="senators">Senators</option>
              <option value="candidates">Candidates</option>
            </select>

            <input
              type="submit"
              value="Search"
              className="btn landing-button search"
              onClick={this.handleClick}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
