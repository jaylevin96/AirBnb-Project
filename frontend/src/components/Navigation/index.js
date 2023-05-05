import React from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user)


    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <li> <ProfileButton user={sessionUser} /></li>
                {/* <li><button onClick={logout}>Log Out</button></li> */}

            </>

        );
    } else {
        sessionLinks = (
            <>
                <li><OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal />} /></li>
                {/* <li><NavLink to="/login">Log In</NavLink></li> */}
                <li> <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                /></li>
            </>

        );
    }

    return (
        <ul className="navBar">
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}
