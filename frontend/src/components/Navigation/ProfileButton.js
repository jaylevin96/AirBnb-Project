
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.removeSessionThunk());
        closeMenu()
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);
    return (
        <>
            <button id="profileButton" onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>Hello, {user.username}</li>
                        <li>{user.email}</li>
                        <li><NavLink to='/spots/current'>Manage Spots</NavLink></li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>

                        <OpenModalMenuItem
                            itemText="Log In"
                            onButtonClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />


                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onButtonClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />

                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
