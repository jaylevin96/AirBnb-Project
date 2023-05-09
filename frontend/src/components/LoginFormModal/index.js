import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css"
import { useModal } from "../../context/Modal";

export default function LoginFormModal() {

    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user)
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();


    const onSubmit = (e) => {
        e.preventDefault();
        setErrors({})
        return dispatch(sessionActions.postSession({ credential, password })).then(closeModal)
            .catch(async (res) => {

                const data = await res.json();


                if (data && data.errors) {
                    setErrors(data.errors);
                }
                if (data.message) {
                    setErrors({ credential: data.message })
                }
                // if (data.)
            });
    };

    const disabled = credential.length < 4 || password.length < 6
    return (
        <div id="container">
            <h1>Log In</h1>
            {errors.credential && <p id="errors-message">The provided credentials were invalid.</p>}
            <form onSubmit={onSubmit}>
                <label>Username or Email
                    <input type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    ></input>
                </label>
                <label>Password
                    <input type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    ></input>
                </label>
                <button className={disabled ? "submit" : "submit styled"} type="submit"
                    // disabled={() => {
                    //     if (credential.length < 4 || password.length < 6) return true;
                    //     return false;
                    // }}
                    disabled={disabled}

                >Log In</button>
                <h2 id="demo"
                    onClick={() => {
                        dispatch(sessionActions.postSession({ credential: "Demo-lition", password: "password" })).then(closeModal)
                            .catch(async (res) => {
                                const data = await res.json();
                                if (data && data.errors) {
                                    setErrors(data.errors);
                                }
                            })
                    }}

                >Demo User</h2>
            </form>

        </div>
    )
}
