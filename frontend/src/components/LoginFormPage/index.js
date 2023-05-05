import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css"

export default function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    console.log("SESSION USER", sessionUser);
    if (sessionUser) return <Redirect to="/" />

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors({})
        return dispatch(sessionActions.postSession({ credential, password })).catch(
            async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            }
        )
    }
    return (
        <div id="container">
            <h1>Log In</h1>
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
                {errors.credential && <p>{errors.credential}</p>}
                <button type="submit">Log In</button>
            </form>

        </div>
    )
}
