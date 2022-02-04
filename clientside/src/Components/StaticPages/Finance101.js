/* ****************************************************
      
    This file is responsible for creating the Finance101 Page with basic Information about campaign finance

*****************************************************/

import React from 'react'

class Finance101 extends React.Component {
    render() {
        return (
            <div style={{ display: "block", margin: "auto", width: '75%', paddingTop: '20px', backgroundColor: 'white', padding: '30px', marginTop: '30px', fontFamily: "Comfortaa, sans-serif" }}>
                <h2 style={{ fontWeight: "700" }}>Campaign Finance 101</h2>
                <em>This information applies to elections for federal offices. Other rules apply for state and local elections.</em>
                <br/><br/>

                <h3 style={{ fontWeight: "700" }}>Who can donate to federal political campaigns?</h3>
                <p>Anyone 18 over over and who is a U.S. Citizen or permanent resident may donate to the campaigns of federal candidates. Political action committees (PACs), often ran by organizations or companies, can also donate.</p>

                <h3 style={{ fontWeight: "700" }}>Are there limits?</h3>
                <p>Yes, there are limits to how much an individual or political action committee may contribute to a candidate. For an individual the limit is $2,900 per election. That means that an individual could donate $2,900 to a candidate for a primary election, and if the candidate advances to the general election, an individual could donate another $2,900.</p>
                <p>Political action committees (PACs) can donate up to $2,900 or $5,000 directly to a candidate, depending on the type of PAC.</p>
                <p>Super PACs may accept unlimited contributions from individuals, corporations, labor organizations. However, Super PACs can only engage in independent expenditures (described below). Unlike regular PACs, Super PACs cannot donate directly to a candidate.</p>

                <h3 style={{ fontWeight: "700" }}>Can anyone find out who donated and how much they donated?</h3>
                <p>Yes, federal candidates must file campaign finance reports indicating the name, address, date, and amount of each contribution. For contributions by individuals, their occupation and employer name will also be included. That information is public record - anyone can look it up.</p>

                <h3 style={{ fontWeight: "700" }}>What about independent expenditures?</h3>
                <p>Committees, as well as Super PACs, may also publicly support or oppose a candidate and spend money towards those efforts. They can't coordinate or communicate privately in any way with the candidate's campaign nor donate directly to a candidate. Instead, they can spend unlimited money on expenses, like online or TV ads, phone calls, text messages, and postcards to voters.</p>
            </div>
        )
    }
}

export default Finance101