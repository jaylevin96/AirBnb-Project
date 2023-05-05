import React from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import ProfileButton from "./ProfileButton";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.removeSessionThunk());
    };
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <li> <ProfileButton user={sessionUser} /></li>
                <li><button onClick={logout}>Log Out</button></li>

            </>

        );
    } else {
        sessionLinks = (
            <>
                <li><NavLink to="/login">Log In</NavLink></li>
                <li><NavLink to="/signup">Sign Up</NavLink></li>
            </>

        );
    }

    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}
