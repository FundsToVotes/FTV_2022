import React from "react";
import { Link } from "@reach/router";
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
    return (
        <MDBFooter backgroundColor='light' className='text-center text-lg-left'  /*style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}*/>
            <div className='text-center p-3' style={{ fontFamily: "Comfortaa, sans-serif" }}>
                <p style = {{ color: "black" }}>Developed by students at the <a href="https://ischool.uw.edu" style={{ color: "#212121" }}>University of Washington Information School</a>.</p>
                <p>
                    <a href='https://github.com/FundsToVotes/FundsToVotes-web/blob/main/LICENSE' style={{ color: "#212121" }}>MIT License</a> | <a href='https://github.com/FundsToVotes/FundsToVotes-web' style={{ color: "#212121" }}>GitHub</a> | <Link to="/privacy-policy" style={{ color: "#212121" }}>Privacy Policy</Link>
                </p>
            </div>

        </MDBFooter>
    );
}

export default Footer;