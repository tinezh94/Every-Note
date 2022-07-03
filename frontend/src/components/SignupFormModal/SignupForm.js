import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import SigninModal from "./SigninModal";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-content">
            <div>
                <label className='signup-form-label'>Email</label>
                <div className="signup-form-input-div">
                    <input
                        className="signup-form-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Please enter your email..."
                    />
                </div>
            </div>
            <div>
                <label className='signup-form-label'>Username</label>
                <div className="signup-form-input-div">
                    <input
                        className="signup-form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Please enter your username..."
                    />
                </div>
            </div>
            <div>
                <label className='signup-form-label'>Password</label>
                <div className="signup-form-input-div">
                    <input
                        className="signup-form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Please enter your password..."
                    />
                </div>
            </div>
            <div>
                <label className='signup-form-label'>Confirm Password</label>
                <div className="signup-form-input-div">
                    <input
                        className="signup-form-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Please enter your password again..."
                    />
                </div>
            </div>
        </div>
        <div className="signup-button-div">
            <button className="signup-button" type="submit">Sign Up</button>
        </div>
      </form>
      <div className="switch-to-login-div">
        <p className="have-account">Already have an account?</p>
        <SigninModal />
        {/* <NavLink className="login-to-account"  exact to='/login'> Sign In</NavLink> */}
      </div>
    </div>
  );
}

export default SignupForm;
