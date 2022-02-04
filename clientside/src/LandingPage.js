/* ****************************************************
      
    This file is responsible for creating the Landing page with a 
    search bar that when submitted renders the Representative List on GoogleAPI.js

*****************************************************/

import { GoogleAPI } from './GoogleAPI';
import { useState } from 'react';
import { Link } from '@reach/router';

// Renders the Landing Page
export function LandingPage() {
    return (
        <div style={{ display: "block", margin: "auto", width: '75%', padding: '110px' }}>
            <Title />
            <AddressInput />
        </div>
    );
}

// Creates the Title for the landing page
function Title() {
    return (
        <div style={{ textAlign: 'center', fontFamily: "Comfortaa, sans-serif" }}>
            <h2 style={{ fontSize: 52, color: '#516F2A' }}>Who Funds Your Representatives?</h2>
            <p>Enter your address below to what industries are donating to your representatives and how they voted on relevant issues.</p>
        </div>
    )
}

// Creates the Search bar where users will input their Address, GoogleAPI.js is called when submitted
function AddressInput() {
    const [address, setAddress] = useState('');
    const [submitted, setSubmitted] = useState(false);

    let onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
        return <GoogleAPI address={address} />
    } else {
        return (
            <div style={{ textAlign: 'center', fontFamily: "Comfortaa, sans-serif" }}>
                <form onSubmit={e => onSubmit(e)}>
                    <label>
                        <input style={{ width: '450px', display: "inline-block", marginRight: "5px" }} class="form-control" type="text" placeholder="Insert Address Here" address="address" onChange={e => setAddress(e.target.value)} />
                        <input type="submit" value="Search" class="btn btn-dark" style={{ backgroundColor: "#000000" }} /><br />
                        <p style={{ fontFamily: "Comfortaa, sans-serif" }} >We don't save your information. See our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
                    </label>
                </form>
            </div>
        )
    }
}

export default LandingPage;