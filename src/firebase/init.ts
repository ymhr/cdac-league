import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

var config = {
  apiKey: "AIzaSyBj7-2o9Ge7EDJotshFZP4H2JZFmJi8RnM",
  authDomain: "cdac-league.firebaseapp.com",
  databaseURL: "https://cdac-league.firebaseio.com",
  projectId: "cdac-league",
  storageBucket: "cdac-league.appspot.com",
  messagingSenderId: "664293566451",
  appId: "1:664293566451:web:4210b125afb8c48dcad486",
  measurementId: "G-NCFLQR3JHN"
};

firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const firestore = firebase.firestore();

firestore.enablePersistence({ synchronizeTabs: true }).catch(err => {
  if (err.code === "failed-precondition") {
    console.error("Multiple tabs open");
  } else if (err.code === "unimplemented") {
    console.error("The browser does not support offline mode");
  }
});
