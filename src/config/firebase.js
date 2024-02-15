import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsfQskRKGi5vz1DxUvGVhdTi7DItc9e4U",
  authDomain: "social-media-app-66f89.firebaseapp.com",
  projectId: "social-media-app-66f89",
  storageBucket: "social-media-app-66f89.appspot.com",
  messagingSenderId: "360956374706",
  appId: "1:360956374706:web:ec892b2f70be33a4d563ab",
  measurementId: "G-XNKG5101MG"
};


firebase.initializeApp(firebaseConfig);

export default firebase;