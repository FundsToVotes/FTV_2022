import { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import defaultProfile from "../images/default-profile.png";
import { AiOutlineSearch } from "react-icons/ai";

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
      `http://localhost:3000/v1/representativeDetails?firstName=${splitName[0]}&lastName=${splitName[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          let _ = data.urls.filter((d) => d.includes(".gov"));
          if (_.length > 0) {
            data.urls = (
              <div>
                <h5 className="mt-3">Congressperson Websites:</h5>
                <div>
                  {_.map((d) => (
                    <a className="websites" key={d} href={d}>
                      {d}
                    </a>
                  ))}
                </div>
              </div>
            );
          } else {
            data.urls = undefined;
          }
        }

        data.address =
          data.address.line1 +
          " " +
          data.address.city +
          ", " +
          data.address.state;
        this.selectCandidate(data);
      });
  };

  //gets the list of representatives to display in search
  fetchRepresentatives = () => {
    fetch(
      `http://localhost:3000/v1/addressRepresentative?address=${this.state.address}`
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
          <ModalHeader closeButton>
            Search Representative for Comparison
          </ModalHeader>
          <ModalBody>
            {/* Search Bar */}
            <div className="form-background mt-3">
              <div className="form-container">
                <form className="form-contents" onSubmit={this.handleSubmit}>
                  <input
                    className="form-control search-bar"
                    type="text"
                    placeholder="Search by address..."
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
                      <div className="image-cropper">
                        <img
                          id="profile-image"
                          src={candidate.photoUrl}
                          alt="candidate headshot"
                          className="headshot"
                          onError={(event) => {
                            event.target.src = defaultProfile;
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
