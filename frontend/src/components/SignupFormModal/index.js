import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.createUser({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        console.log(data.errors);
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    function isDisabled() {
        let inputs = [email, username, firstName, lastName, password, confirmPassword];
        if (username.length < 4 || password.length < 6) return true;
        for (let input of inputs) {
            if (!input.length) return true;

        }
        return false;
    }

    const disabled = isDisabled();
    const disabledClassName = disabled ? "disabled" : "";


    return (
        <>
            <h1>Sign Up</h1>
            <form id="signup-form" onSubmit={handleSubmit}>
                <label
                    style={{ marginTop: "2em" }}
                >
                    First Name

                </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                {errors.firstName && <p>{errors.firstName}</p>}
                <label>
                    Last Name

                </label>
                <input
                    type="text"
                    id='signup-lastName'
                    value={lastName}
                    style={{ marginBottom: "2em" }}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
                <label>
                    Email

                </label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <p className="signup-error">{errors.email}</p>}
                <label>
                    Username

                </label>
                <input
                    type="text"
                    value={username}
                    id="signup-username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {errors.username && <p className="signup-error">{errors.username}</p>}

                <label
                    style={{ marginTop: "2em" }}
                >
                    Password

                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <p className="signup-error">{errors.password}</p>}
                <label>
                    Confirm Password

                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}

                    required
                />
                {errors.confirmPassword && (
                    <p className="signup-error">{errors.confirmPassword}</p>
                )}
                <button
                    disabled={disabled}
                    className={disabledClassName}
                    id="signup-button" type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
