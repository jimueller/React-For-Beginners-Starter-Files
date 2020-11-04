import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBewo1wwnAaNipB4idUw0rUJKvbyu3AdbQ",
  authDomain: "catch-of-the-day-jimueller.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jimueller.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is default export
export default base;
