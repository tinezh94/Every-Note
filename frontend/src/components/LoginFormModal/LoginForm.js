import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoUser = async () => {
    return dispatch(sessionActions.login({credential: "Demo-lition", password: "password"}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-content">
          <div>
            <label className="login-form-label">
              Username or Email
            </label>
            <div className="login-form-input-div">
              <input
                className="login-form-input"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder="Please enter email address/username..."
              />
            </div>
          </div>
          <div>
            <label className="login-form-label">
              Password
            </label>
            <div className="login-form-input-div">
              <input
                className="login-form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Please enter password..."
              />
            </div>
          </div>
        </div>
        <div className="login-button-div">
          <button className="login-button" type="submit">Log In</button>
          <button className="demo-login" type="submit" onClick={(demoUser)}>Demo User</button>
        </div>
      </form>
      <div className="switch-to-signup-div">
        <p className="no-account">Don't have an account?</p>
        {/* <button className="create-account" onClick={handleClick}>Create account</button> */}
        <NavLink className="create-account" to='/signup'>Create account</NavLink>
      </div>
    </div>
  );
}

export default LoginForm;
