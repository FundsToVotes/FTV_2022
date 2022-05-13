import { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
import DemocratProfile from "../images/democrat-temp.png";
import RepublicanProfile from "../images/republican-temp.png";
import { BsArrowLeft } from "react-icons/bs";

export class ComparisonModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      officials: [],
    };
  }

  fetchRepresentativeDetails = (name) => {
    let splitName = name.split(" ");
    fetch(
      `https://api.fundstovote.com/v1/representativeDetails?firstName=${splitName[0]}&lastName=${splitName[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          let _ = data.urls.filter((d) => d.includes(".gov"));
          if (_.length > 0) {
            data.urls = (
              <div>
                {_.map((d) => (
                  <a className="websites" key={d} href={d}>
                    {d}
                  </a>
                ))}
              </div>
            );
          }
        } else {
          data.urls = (
            <div>
              <p>No sites listed</p>
            </div>
          );
        }

        data.address = this.formatAddress(
          data.address.line1,
          data.address.city,
          data.address.state
        );

        this.selectCandidate(data);
      });
  };

  formatAddress = (address, city, state) => {
    return (
      <p>
        {address} <br></br> {city}, {state}
      </p>
    );
  };

  //gets the list of representatives to display in search
  fetchRepresentatives = () => {
    fetch(
      `https://api.fundstovote.com/v1/addressRepresentative?address=${this.state.address}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ officials: data.officials });
      });
  };

  //sends reps details back to the parent ComparisonPage.js
  selectCandidate(details) {
    this.props.repsCallback(details, this.props.side);
  }

  onButtonClick = (name) => {
    this.setState({ name: name });
    this.fetchRepresentativeDetails(name);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchRepresentatives();
  };

  getAddress = (value) => {
    this.setState({ address: value });
  };

  render() {
    return (
      <div>
        <Modal
          modalClassName="modal"
          isOpen={this.props.show}
          toggle={this.props.toggle}
          size="lg"
        >
          <ModalHeader className="modal-header">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.props.toggle}
            >
              <BsArrowLeft aria-hidden="true" className="modal-icon" />
            </button>
            Search Congresspeople for Comparison
          </ModalHeader>
          <ModalBody>
            {/* Search Bar */}
            <div className="form-background mt-3">
              <div className="form-container">
                <form className="form-contents" onSubmit={this.handleSubmit}>
                  <input
                    className="form-control search-bar"
                    type="text"
                    placeholder="e.g: 1234 Main St. Seattle, WA; or Seattle, WA; or WA"
                    name="address"
                    onChange={(e) => this.getAddress(e.target.value)}
                  />
                  <button
                    type="submit"
                    value="Search"
                    className="btn search-button"
                  >
                    <AiOutlineSearch className="search-icon" />
                  </button>
                </form>
              </div>
            </div>

            <div className="modal-filters">
              <select
                defaultValue="congressPeople"
                id="congresspeople"
                className="custom-select m-1"
                // onChange={(e) => updateBranchFilter(e)}
              >
                <option value="all-chamber">Congresspeople</option>
                <option value="radio-representative">Representatives</option>
                <option value="radio-senator">Senators</option>
              </select>

              <select
                defaultValue="all"
                className="custom-select m-1"
                id="party"
                // onChange={(e) => updatePartyFilter(e)}
              >
                <option value="all-party">All Parties</option>
                <option value="radio-democrat">Democratic Party</option>
                <option value="radio-republican">Republican Party</option>
                <option value="radio-other">Other</option>
              </select>
            </div>

            {/* Candidate Cards */}
            <div className="modal-cards-container mt-2">
              {this.state.address &&
                this.state.officials.length > 0 &&
                this.state.officials.map((official) => {
                  let candidate = official;
                  return (
                    <div
                      key={candidate.name}
                      className="card candidate-card m-2 p-1 modal-card"
                    >
                      <div className="comp-img-crop">
                        <img
                          id="profile-image"
                          src={candidate.photoUrl}
                          alt="candidate headshot"
                          className="headshot"
                          onError={(event) => {
                            if (candidate.party === "Republican Party") {
                              event.target.src = RepublicanProfile;
                            } else {
                              event.target.src = DemocratProfile;
                            }
                            event.onerror = null;
                          }}
                        />
                      </div>
                      <div className="card-comp-info">
                        <p>{candidate.name}</p>
                        <p>
                          {candidate.office} - {candidate.party}
                        </p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            this.onButtonClick(e.target.value);
                          }}
                          className="btn landing-button search"
                          value={candidate.name}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
