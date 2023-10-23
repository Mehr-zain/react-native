
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbkyf7bUcaCM0beeD3pTt1A61gbCVvyMI",
  authDomain: "student-helper1.firebaseapp.com",
  projectId: "student-helper1",
  storageBucket: "student-helper1.appspot.com",
  messagingSenderId: "1034471920150",
  appId: "1:1034471920150:web:7bfedc7f5226b77c89db37",
  measurementId: "G-0H8ZXSYJGC"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export{app,auth,db,storage};