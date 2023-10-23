import { useState } from "react";
import "./SignIn.css";
import { auth, firestore, storage,db } from "../components/Firebase"; 
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { AiOutlineArrowRight } from "react-icons/ai";

const AdditionalInformation = () => {
  const user = auth.currentUser;
  const [selectedImage, setSelectedImage] = useState(null);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    DOB: "",
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSave = async () => {
    // Update user profile with additional information
    try {
      if (user) {
        // Update the user's profile in Firebase Authentication
        await updateProfile(user, {
          displayName: values.name,
        });
        if (selectedImage) {
          const storageRef = ref(storage, `avatars/${user.uid}`);
          await uploadBytes(storageRef, selectedImage);
          const imageURL = await getDownloadURL(storageRef);
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            Avatar: imageURL,
            "First Name":values.firstname,
            "Last Name":values.lastname,
            "Date Of Birth":  values.DOB,
          },{ merge: true });
        }

        console.log("Profile updated successfully");
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
     <div className="signIn_container">
        <div className="signIn_pic"></div>
          <div className="signIn_form_container">
          <div className="signIn_text">
          <h2>Additional Information</h2>
            <p>
             Enter your additional information to personalize your account
            </p>
          </div>
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : user && user.photoURL
              ? user.photoURL
              : "/default-avatar.png"
          }
          alt="Avatar"
          width="100"
          height="100"
        />
        <input type="file" onChange={handleImageChange} accept="image/*" />
     
      <div>
        <input
          type="text"
          className="signIn_input_field"
          value={user && user.displayName ? user.displayName : ""}
          disabled
          placeholder="Username"
        />
      </div>
      <div>
        <input
          type="email"
          className="signIn_input_field"
          value={user && user.email ? user.email : ""}
          disabled
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="text"
          name="firstname"
          className="signIn_input_field"
          onChange={InputEvent}
          placeholder="First Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="lastname"
          className="signIn_input_field"
          onChange={InputEvent}
          placeholder="Last Name"
        />
      </div>
      <div>
        <input
          type="date"
          name="DOB"
          className="signIn_input_field"
          onChange={InputEvent}
          placeholder="Birthday"
        />
      </div>
      <button className="login_button" onClick={handleSave}>Continue <AiOutlineArrowRight/></button>
    </div>
    </div>
    </>
  );
};

export default AdditionalInformation;
