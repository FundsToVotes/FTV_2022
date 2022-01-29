/* ****************************************************
      
    This file is responsible for building the site and defining the routing
    also where the header,footer, and navbar are called

*****************************************************/

import React from 'react';
import { Router } from "@reach/router";

import About from "./Components/StaticPages/About";
import Finance101 from "./Components/StaticPages/Finance101";
import OurData from "./Components/StaticPages/OurData";
import TakeAction from "./Components/StaticPages/TakeAction";
import PrivacyPolicy from "./Components/StaticPages/PrivacyPolicy";
import NotFound from "./Components/StaticPages/NotFound";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RepresentativeDetails from "./Components/RepresentativeDetails";
import LandingPage from "./LandingPage";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function App() {
    return (
        <div>
            <Header />

            <Router>
                <LandingPage exact path="/" />
                <Finance101 path="/finance-101" />
                <TakeAction path="/take-action" />
                <OurData path="/our-data" />
                <About path="/about" />
                <RepresentativeDetails path="/representative-details" />
                <PrivacyPolicy path="/privacy-policy" />
                <NotFound default />
            </Router>

            <Footer />
        </div>

    );
}

export default App;
