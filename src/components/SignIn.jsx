
import "./SignIn.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../components/Firebase";
import { FcLock } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import {  FaEye, FaEyeSlash } from 'react-icons/fa';


const SignIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const InputEvent = (event) => {
    const { name, value } = event.target;

    setValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const formSubmit = (event) => {
    event.preventDefault();
     if (!values.email) {
      setErrorMsg("Please enter your email.");
      return;
    } else if (!values.password) {
      setErrorMsg("Please enter your password.");
      return;
    }
    setErrorMsg("");

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        navigate("/Home");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <>
      <div className="signIn_container">
        <div className="signIn_pic"></div>
          <div className="signIn_form_container">
          <div className="signIn_text">
          <h2>Welcome Back!</h2>
            <p>
              Log in to access your account and continue your journey with us.
            </p>
          </div>
          <form onSubmit={formSubmit}>
            
            <div className="signIn_icon_field">
              <AiOutlineMail className="signIn_icon" />
              <input
                type="email"
                className="signIn_input_field"
                placeholder="Email Address"
                name="email"
                onChange={InputEvent}
              />
            </div>
            <div className="signIn_icon_field">
              <FcLock className="signIn_icon" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="signIn_input_field"
                placeholder="Password"
                name="password"
                onChange={InputEvent}
              />
               {passwordVisible ? (
                <FaEyeSlash
                  className="signIn_password_icon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="signIn_password_icon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div className="signIn_social">
            <p style={{ color: "red" }}>{errorMsg}</p>
            <NavLink to="/ForgotPassword" className="signIn_forgot_password">
              Forgot password?
            </NavLink>
            <button className="login_button">Log In</button>
            <NavLink to="/SignUp" className="signIn_register_user">
              Not Registered Yet?
            </NavLink>
            </div>
            </form>
          </div>
       
      </div>
    </>
  );
};
export default SignIn;
