/* ****************************************************
      
    This file is responsible for creating the Take Action Page with Information about how to take action

*****************************************************/

import React from "react";

function OurData() {
    return (
        <div style={{ display: "block", margin: "auto", width: '75%', paddingTop: '20px', backgroundColor: 'white', padding: '30px', marginTop: '30px', fontFamily: "Comfortaa, sans-serif" }}>
            <h2 style={{ fontWeight: "700" }}>Take Action</h2>
            <p><em>Want to contine learning more and take action?</em></p>

            <h3 style={{ fontWeight: "700" }}>Register to Vote</h3>
            <p>Voting is an important way to make your voice heard. If you are not already registered to vote, register to vote today at <a href="https://vote.gov">Vote.gov</a>. It just takes a couple minutes.</p>

            <h3 style={{ fontWeight: "700" }}>Learn About H.R. 1 (The For the People Act)</h3>
            <p>House Resolution 1 is bill that will promote voter access, election integrity and security, eliminate "dark money" in politics, and make other changes to reduce corruption and improve campaign finance systems. A companion bill, S. 1, has been introduced in the Senate. Learn more about <a href="https://hr1-cha.house.gov" target="_blank">H.R. 1 on House.gov</a> and on <a href="https://www.congress.gov/bill/117th-congress/house-bill/1" target="_blank">Congress.gov</a>.</p>

            <h3 style={{ fontWeight: "700" }}>Contact Your Representative or Senators</h3>
            <p>Did you learn something about your members of Congress' voting records or campaign funding that you'd like to comment on? Do you want them to support H.R. 1? Use the phone number or website listed on the details page to call or send a message to your representative or senators.</p>

        </div>
    );
}
export default OurData;
