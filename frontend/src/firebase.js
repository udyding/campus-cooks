import firebase from "firebase/app";
import "firebase/auth";
require("dotenv").config();
// const { BACKEND_ADDRESS, FRONTEND_ADDRESS } = require("./config");
// const axios = require("axios");

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
export default app;

//let provider = new firebase.auth.GoogleAuthProvider();

// this allows you to sign in with google and sends you to your profile page if successful
// sends the email to backend users route and checks if the user has signed in before
// export const signInWithGoogle = async () => {
//   try {
//     const authData = await firebase.auth().signInWithPopup(provider);
//     const email = authData.user?.email;
//     const displayName = authData.user?.displayName;
//     const photoURL = authData.user?.photoURL;

//     // if login was not successful
//     if (!email) {
//       throw new Error("Authentication error");
//     }

//     const response = await axios({
//       method: "post",
//       url: `${BACKEND_ADDRESS}/users/login`,
//       data: {
//         email,
//         displayName,
//         photoURL,
//       },
//     });
//     const user = response.data;

//     window.location.href = `${FRONTEND_ADDRESS}/profilePage`; // profile page will display the postings of the user
//   } catch (err) {
//     window.location.href = `${FRONTEND_ADDRESS}/`;
//   }
// };
