import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

// Creates the Search bar where users will input their Name, GoogleAPI.js is called when submitted
export function ComparisonSearch() {
  const [setName] = useState(""); // '' is the initial state value

  return (
    <div className="form-background">
      <div className="form-container">
        <AiOutlineSearch className="search-icon" />
        <form className="form-contents">
          <input
            className="form-control search-bar"
            type="text"
            placeholder="Type Name Here"
            name="name"
            onChange={(e) => setName(e.target.value)}
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
          />
        </form>
      </div>
    </div>
  );
}

export default ComparisonSearch;
