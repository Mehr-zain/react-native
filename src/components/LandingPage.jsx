import React from "react";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth,db } from "./Firebase";
import { doc, setDoc } from 'firebase/firestore';

const LandingPage = () => {
  const navigate = useNavigate();

  const Signin = () => {
    navigate("/SignIn");
  };
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      
      // Create a reference to the Firestore document using the user's UID
      const userDocRef = doc(db, 'users', user.uid);
  
      // Set the user's name and email in Firestore
      await setDoc(userDocRef, {
        username: user.displayName,
        Email: user.email,
      });
  
      // Navigate to the Home page
      navigate("/AdditionalInformation");
      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="landingPage_container">
        <div className="landingPage_picture"></div>
        <div className="landingPage_content">
          <div className="landingPage_text">
            <h1>Select Sign-In Method</h1>
            <p>
              Streamline your access to students helper by choosing a sign-in
              method that suits you. We offer a variety of secure options to
              ensure a smooth and effiecent experience. Whether you prefer using
              your email address or a other method, We've got you covered. Your
              conveience and security are oue top priorities.
            </p>
          </div>
          <button className="landingPage_button" onClick={Signin}>
            <span className="landingPage_icon">
              <MdEmail />
            </span>
            Continue With Email Address
          </button>
          <button className="landingPage_button" onClick={googleSignIn}>
            <span className="landingPage_icon">
              <FcGoogle />
            </span>
            Continue With Google Account
          </button>
          <div className="landingPage_text">
          <p>By using student helper, you agree to our privacy policy and terms of service.</p></div>
        </div>
       
      </div>
    </>
  );
};

export default LandingPage;
