import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcqhEZRuWnp2b_TphWgjsJ1g69GsS-QOQ",
  authDomain: "dose-app-3e8f1.firebaseapp.com",
  databaseURL: "https://dose-app-3e8f1.firebaseio.com",
  projectId: "dose-app-3e8f1",
  storageBucket: "dose-app-3e8f1.appspot.com",
  messagingSenderId: "875973844426",
  appId: "1:875973844426:web:03fdea2151adfffea14333",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
