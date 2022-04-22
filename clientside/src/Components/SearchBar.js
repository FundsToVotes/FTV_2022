import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Creates the Search bar where users will input their Address, GoogleAPI.js is called when submitted
export function SearchBar() {
  const [address, setAddress] = useState(""); // '' is the initial state value

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let path = `/detailed-search?address=${address}`;
    navigate(path, { replace: true });
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <AiOutlineSearch className="search-icon" />
        <form
          className="form-contents"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="form-control search-bar"
            type="text"
            placeholder="Type address here..."
            address="address"
            onChange={(e) => setAddress(e.target.value)}
          />

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
