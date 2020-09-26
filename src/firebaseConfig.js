import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACbAHjxAyFsgKl36eFQRrOG0vyZ9lR6e0",
    authDomain: "miatavel-d1d6e.firebaseapp.com",
    databaseURL: "https://miatavel-d1d6e.firebaseio.com",
    projectId: "miatavel-d1d6e",
    storageBucket: "miatavel-d1d6e.appspot.com",
    messagingSenderId: "119051298988",
    appId: "1:119051298988:web:06674e32919f94fec35709",
    measurementId: "G-HVWC2EYZ1S"
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const signOut = () => {
  // Sign out of Firebase.
  auth.signOut();
};

export const getDisplayName = (usr) => {
  // Sign out of Firebase.
  return usr.currentUser.displayName;
};
