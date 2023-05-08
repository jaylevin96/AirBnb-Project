import React from "react";
import logoImage from "../../static/images/logo.png"
import { Redirect, useHistory } from "react-router-dom";
export default function Logo() {
    let history = useHistory();
    return (
        <div id="logo-text"
            onClick={() => {
                history.push("/")
            }}>
            <img id="logo" src={logoImage} alt="not loading"


            />
            <div>Jaybnb</div>

        </div>
    )
}
