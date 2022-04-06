import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Creates the Search bar where users will input their Address, GoogleAPI.js is called when submitted
export function SearchBar() {
  const [address, setAddress] = useState(""); // '' is the initial state value

  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let path = `/detailed-search?address=${address}`;
    navigate(path, { replace: true });
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <AiOutlineSearch className="search-icon" />
        <form className="form-contents" onSubmit={handleSubmit}>
          <input
            className="form-control search-bar"
            type="text"
            placeholder="Type address here..."
            address="address"
            onChange={(e) => setAddress(e.target.value)}
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

export default SearchBar;
