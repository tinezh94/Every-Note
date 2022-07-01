import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import background from '../../context/backgroundImage.png'

function LoginFormPage() {
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

  // const [ loginOpened, setLoginOpend ] = useState(false);
  // const [ signupOpened, setSignupOpened ] = useState(false);

  // openModal = (modalType) => {
  //   if (modalType === "Create account") {
  //     setLoginOpend(false);
  //     setSignupOpened(true);
  //   } else if (modalType === "Sign In") {
  //     setLoginOpend(true);
  //     setSignupOpened(false);
  //   }
  // };

  // closeModal = (modalType) => {
  //   if (modalType === "Create account") {
  //     setSignupOpened(false);
  //   }else if (modalType === 'Sign In') {
  //     setLoginOpend(false);
  //   }
  // };

  // const handleClick = (e) => {

  // }

  return (

    <div className="log-in-form">
      <div id="formpage-background" style={{ backgroundImage:`url(${background})`}}></div>
      <form onSubmit={handleSubmit}>
        <div className="logo-div">
            <img id='form-page-logo' src='https://cdn-icons-png.flaticon.com/512/889/889669.png' alt='post-it' />
        </div>
        <h1 id='log-in-h1'> EveryNote </h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div id="formContent" className="form-content">
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
      <div id="switch-to-signup" className="switch-to-signup-div">
        <p className="no-account">Don't have an account?</p>
        {/* <button className="create-account" onClick={handleClick}>Create account</button> */}
        <NavLink id='formpage-create' className="create-account" to='/signup'>Create account</NavLink>
      </div>
    </div>
  );
}

export default LoginFormPage;
