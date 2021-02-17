import React, { useContext, useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import { BACKEND_ADDRESS } from "../config";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password, displayName, building, phone) {
    try {
      let emailURI = encodeURIComponent(email).trim();
      displayName = encodeURIComponent(displayName);
      building = encodeURIComponent(building);
      phone = encodeURIComponent(phone);

      return auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (newUserCredential) => {
          // Signed in
          //   await newUserCredential.user.sendEmailVerification();
          const response = await axios({
            method: "get",
            url: `${BACKEND_ADDRESS}/signup?email=${emailURI}&displayName=${displayName}&building=${building}&phone=${phone}`,
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  //   function login(email, password) {
  async function login() {
    // check if email is verified first
    try {
      const authData = await auth.signInWithPopup(provider);
      const email = authData.user?.email;

      if (!email) {
        throw new Error("Authentication error");
      }

      //   const response = await axios({
      //     method: "get",
      //     url: `${BACKEND_ADDRESS}/signup?email=${emailURI}`,
      //   });
    } catch (err) {
      throw err;
    }
    // return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  // ALSO CREATE FUNCTIONS THAT UPDATE THE OTHER FIELDS TOO BUT IN THE DATABASE

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
