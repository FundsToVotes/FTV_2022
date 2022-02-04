/* ****************************************************
      
    This file is responsible for creating the List of Representatives through an API call with
    buttons that when selected renders the RepresentativeDetails Page for that Representative

*****************************************************/

import { useEffect, useState } from "react";
import { navigate } from '@reach/router';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

// Makes the Google API Call and returns a card list of representative that when selected render a RepresentativeDetails page for the selected representative
export function GoogleAPI(props) {
    const [officials, setOfficials] = useState({ nameList:[""], offList:[""] });
    let addressString = encodeURIComponent(props.address);
    useEffect(() => {
        fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" + addressString + "&key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&levels=country&roles=legislatorUpperBody&roles=legislatorLowerBody", {
            method: "GET",
            'Content-Type': 'application/json',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result["officials"].length === 3) {
                        let startIndexSen = result['offices'][0]['officialIndices'][0];
                        let endIndexSen = result['offices'][0]['officialIndices'][result['offices'][0]['officialIndices'].length - 1];
                        let indexRep = result['offices'][1]['officialIndices'][0];
                        let offNames = new Array(endIndexSen - startIndexSen + 2);
                        let listOff = new Array(endIndexSen - startIndexSen + 2);
                        let tempIndex = 0;
                        for(let i = startIndexSen; i <= endIndexSen; i++) {
                            offNames[tempIndex] = result['officials'][i].name;
                            listOff[tempIndex] = result['officials'][i];
                            tempIndex++;
                        }
                        offNames[offNames.length - 1] = result['officials'][indexRep].name;
                        listOff[listOff.length - 1] = result['officials'][indexRep];
                        let officialPlural = {nameList:offNames, offList:listOff}
                        setOfficials(officialPlural);
                    } else {
                        alert("Oops, we can't find the representatives for that location! Please try again using a full street address and ZIP code.");
                        window.location.reload();
                    }
                }
            )
            .catch(function(err) {
                alert("Oops, we can't find the representatives for that location! Please try again using a full street address and ZIP code.");
                window.location.reload();
            })
    }, [])

    return (
        <div style={{ fontFamily: "Comfortaa, sans-serif"}}>
            {officials['nameList'].map(name => (
                <MDBCard style={{ marginBottom: "10px" }}>
                    <MDBCardBody>
                        <MDBCardTitle tag="h3" className="h5" style={{ fontWeight: "700" }}>{name}</MDBCardTitle>
                        <MDBCardText>U.S. Congress</MDBCardText>
                        <MDBBtn style={{ backgroundColor: "#212121" }} onClick={() => { navigate("/representative-details", { state: { currName: name, off: officials } }) }}>Learn More</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            ))}
        </div>
    )
}
