import React from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import Logo from "./Logo";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const hideClass = sessionUser ? "" : "hidden"
    return (
        <ul className="navBar">
            <Logo
            />

            {isLoaded && (
                <>

                    <li id="profile-menu">

                        <NavLink className={hideClass} to="/spots/new">Create a New Spot</NavLink>

                        <ProfileButton user={sessionUser} />
                    </li>
                </>
            )}
        </ul>
    );
}
