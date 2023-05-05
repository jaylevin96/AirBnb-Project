import React from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import Logo from "./Logo";
export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className="navBar">
            <Logo
            />

            {isLoaded && (
                <li id="profile-menu">
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}
