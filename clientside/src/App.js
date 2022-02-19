/* ****************************************************
      
    This file is responsible for building the site and defining the routing
    also where the header,footer, and navbar are called

*****************************************************/

import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import About from "./Components/StaticPages/About";
import Finance101 from "./Components/StaticPages/Finance101";
import OurData from "./Components/StaticPages/OurData";
import TakeAction from "./Components/StaticPages/TakeAction";
import PrivacyPolicy from "./Components/StaticPages/PrivacyPolicy";
import Header from "./Components/Header";
// import RepresentativeDetails from "./Components/RepresentativeDetails";
import LandingPage from "./Components/LandingPage";

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/finance-101" element={<Finance101 />} />
          <Route path="/take-action" element={<TakeAction />} />
          <Route path="/our-data" element={<OurData />} />
          <Route path="/about" element={<About />} />
          {/* <Route
            path="/representative-details"
            component={RepresentativeDetails}
          /> */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* <Redirect to="/" /> */}
        </Routes>
      </div>
    );
  }
}

export default App;
