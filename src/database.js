import * as firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAC-l53fEULKLh78ZxBUVNx0Xp06es3UPk",
  authDomain: "findeste-36e23.firebaseapp.com",
  databaseURL: "https://findeste-36e23.firebaseio.com",
  projectId: "findeste-36e23",
  storageBucket: "",
  messagingSenderId: "889828770418"
}
const database = firebase.initializeApp(config);

export default database;



