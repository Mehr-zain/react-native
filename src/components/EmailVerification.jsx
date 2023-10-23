import React, { useState } from "react";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { NavLink, useNavigate } from "react-router-dom";
import "./EmailVerification.css";
import { TbMailCheck } from "react-icons/tb";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EmailVerification = () => {
  const navigate = useNavigate();
  //let email = document.getElementById("resetemail").value;
  const [errorMsg, setErrorMsg] = useState();

  const sendEmail = (event) => {
    event.preventDefault();

    sendEmailVerification(auth.currentUser)
      .then(async () => {
        alert("Email send");
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.message);
      });
  };
  const goToInfo = () => {
    const user = auth.currentUser;

    if (user) {
      onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
          // Email is verified, navigate to the additional information page
          navigate("/AdditionalInformation");
        } else {
          // Email is not verified, show a message or take appropriate action
          alert("Email is not verified. Please verify your email first.");
        }
      });
    }
    // else {
    //   // User is not authenticated, handle accordingly
    // }
  };
  return (
    <>
      <div className="emailVerify_container">
        <div className="emailVerify_pic"></div>
        <div className="emailVerify_form">
          <span className="emailVerify_icon">
            <TbMailCheck />
          </span>
          <div className="emailVerify_text">
            <h2>Verify Your Email Address</h2>
            <p>
              We have sent email verification link on your Email Address. Please
              check your Inbox and click on that link to verify your Email
              Address.
            </p>
          </div>

          <p style={{ color: "red" }}>{errorMsg}</p>
          <button className="emailVerify_button" onClick={sendEmail}>
            Send Verification Link
          </button>
          <button className="emailVerify_button" onClick={goToInfo}>
            Continue
          </button>
          <NavLink to="/SignIn" className="emailVerify_login">
            <AiOutlineArrowLeft /> Back To Login
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default EmailVerification;
