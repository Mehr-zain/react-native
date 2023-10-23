import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import {FaKey} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();
  //let email = document.getElementById("resetemail").value;
  const [errorMsg, setErrorMsg] = useState();
  const resetPass = (event) => {
    const email = event.target.email.value;
    event.preventDefault();
    if (!email) {
      setErrorMsg("Please enter your email.");
      return;
    } 

    sendPasswordResetEmail(auth, email)
      .then(async () => {
        alert("Email send");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.message);
      });
  };

  return (
    <>
      <div className="main_container">
        <div className="forgot_pic"></div>
        <div className="email_form">
         <span className="forgot_icon"><FaKey/></span>
          <div className="forgot_text">
            <h2>Forgot Your Password?</h2>
            <p>
              Provide Email Address and we will send password reset link on your
              email address
            </p>
          </div>
          <form onSubmit={resetPass}>
          <div className="forgot_input_field">
          <AiOutlineMail className="forgot_input_icon"/>
            <input
              id="resetemail"
              type="email"
              className="forgot_email_field"
              placeholder="Email"
              name="email"
            />
            </div>
            <p style={{ color: "red" }}>{errorMsg}</p>
            <button className="reset_button">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
