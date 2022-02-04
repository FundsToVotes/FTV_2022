/* ****************************************************
      
    This file is responsible for creating the Our Data Page with Information about our data sources

*****************************************************/

import React from "react";
import OpenSecretsLogo from "../../images/OpenSecrets_logo.gif";
import ProPublicaLogo from "../../images/ProPublica-monogram-color.svg";
import GoogleLogo from "../../images/Google_2015_logo.svg";

function OurData() {
    return (
        <div style={{ display: "block", margin: "auto", width: '75%', paddingTop: '20px', backgroundColor: 'white', padding: '30px', marginTop: '30px', fontFamily: "Comfortaa, sans-serif" }}>
            <h2 style={{ fontWeight: "700" }}>Our Data</h2>
            <p>Funds to Votes relies on free, publicly-available APIs. We thank the sponsors and maintainers of these APIs for supporting civic technology.</p>

            <h3 style={{ fontWeight: "700" }}>Google Civic Information</h3>
            <img src={GoogleLogo} alt="Google logo" height="50px" width="150px" />
            <p>We use the Google Civic Information API to determine a user's U.S. Senators and U.S. Representatives based on their address. It also provides basic demographic and contact information.</p>

            <h3 style={{ fontWeight: "700" }}>ProPublica</h3>
            <img src={ProPublicaLogo} alt="ProPublica logo" height="100px" width="100px" />
            <p>ProPublica is an independent, nonprofit newsroom focused on investigative journalism. They also publish a lot of data in APIs. We use ProPublica's Congress API to obtain data on bills and votes in the U.S. Congress. We also use ProPublica's Campaign Finance API to get campaign finance data, specifically for independent expenditures.</p>

            <h3 style={{ fontWeight: "700" }}>OpenSecrets.org</h3>
            <img src={OpenSecretsLogo} alt="OpenSecrets logo" width="150px" />
            <p>The Center for Responsive Politics is a research group that tracks money in U.S. politics on its website OpenSecrets.org. We use the OpenSecrets API to obtain campaign finance data, specifically for the industries that support a U.S. Representative or U.S. Senator.</p>
        </div>
    );
}
export default OurData;
