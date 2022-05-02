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
import Header from "./Components/Header";
import DetailedSearch from "./Components/Search";
import PersonDetails from "./Components/PersonDetails";
import HomePage from "./Components/HomePage";
import Comparison from "./Components/ComparisonPage";
import LandingPage from "./Components/LandingPage";

export class App extends Component {
  render() {
    return (
      <div>
        {window.location.pathname !== "/landing" ? <Header /> : null}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/political-funding" element={<Finance101 />} />
          <Route path="/take-action" element={<TakeAction />} />
          <Route path="/our-data" element={<OurData />} />
          <Route path="/about" element={<About />} />
          <Route path="/detailed-search" element={<DetailedSearch />} />
          <Route path="/details" element={<PersonDetails />} />
          <Route path="/compare-reps" element={<Comparison />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
