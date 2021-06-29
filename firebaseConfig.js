//import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyADkaNWYGIU4844QkbpexDi_RDWqEhSUHU",
  authDomain: "sparta-myhoneytip-sykim.firebaseapp.com",
  projectId: "sparta-myhoneytip-sykim",
  storageBucket: "sparta-myhoneytip-sykim.appspot.com",
  messagingSenderId: "588256993727",
  appId: "1:588256993727:web:22487649ff0ffec978410a",
  measurementId: "G-8S0GW7NYK3"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()