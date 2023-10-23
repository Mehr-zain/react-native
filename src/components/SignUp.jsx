import "./SignUp.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../components/Firebase";
import { FcLock } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { FaEye, FaEyeSlash,FaUser } from "react-icons/fa";
import { db } from "./Firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState();
  const InputEvent = (event) => {
    const { name, value } = event.target;

    setValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    
    if (!values.name) {
      setErrorMsg("Please enter your name.");
      return;
    } else if (!values.email) {
      setErrorMsg("Please enter your email.");
      return;
    } else if (!values.password) {
      setErrorMsg("Please enter your password.");
      return;
    }
    setErrorMsg("");
  
    try {
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = res.user;
  
      // Update the user's display name
      await updateProfile(user, {
        displayName: values.name,
      });
  
      // Create a reference to the Firestore document using the user's UID
      const userDocRef = doc(db, 'users', user.uid);
  
      // Set the user's name and email in Firestore
      await setDoc(userDocRef, {
        Username: user.displayName,
        Email: user.email,
      });
  
   
      navigate("/EmailVerification");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="signUp_container">
        <div className="signUp_pic"></div>

        
          <div className="signUp_form_container">
          <div className="signUp_text">
          <h2>Welcome Aboard!</h2>
            <p>
              Create an account to get started.
            </p>
          </div>
          <form onSubmit={formSubmit}>
            <div className="signUp_icon_field">
            <FaUser className="signUp_icon" />
              <input
                type="name"
                className="signUp_input_field"
                placeholder="username"
                name="name"
                onChange={InputEvent}
              />
            </div>
            <div className="signUp_icon_field">
              <AiOutlineMail className="signUp_icon" />
              <input
                type="email"
                className="signUp_input_field"
                placeholder="Email"
                name="email"
                onChange={InputEvent}
              />
            </div>
            <div className="signUp_icon_field">
              <FcLock className="signUp_icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                className="signUp_input_field"
                placeholder="Password"
                name="password"
                onChange={InputEvent}
              />
              {passwordVisible ? (
                <FaEyeSlash
                  className="signUp_password_icon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="signUp_password_icon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <p style={{ color: "red" }}>{errorMsg}</p>

            <button className="register_button">Register</button>
            </form>
          </div>
      </div>
    </>
  );
}

export default SignUp;
