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

  async function login() {
    try {
      return auth
        .signInWithPopup(provider)
        .then(async (result) => {
          let user = result.user;
          let email = user.email;
          email = encodeURIComponent(email);
          let response = await axios({
            method: "get",
            url: `${BACKEND_ADDRESS}/login/checkUser?email=${email}`,
          });
          // if first time for user
          if (response.data) {
            return true;
          }
        })
        .catch((error) => {
          throw error;
        });
      // return auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async function firstLogin(email, building, phone) {
    try {
      await axios({
        method: "get",
        url: `${BACKEND_ADDRESS}/login/signIn?email=${email}`,
      });
    } catch (error) {
      throw error;
    }
  }

  async function updateInfo(email, building, phone) {
    let emailURI = encodeURIComponent(email).trim();
    building = encodeURIComponent(building);
    phone = encodeURIComponent(phone);
    await axios({
      method: "get",
      url: `${BACKEND_ADDRESS}/updateInfo?email=${emailURI}&building=${building}&phone=${phone}`,
    });
  }

  function logout() {
    return auth.signOut();
  }

  function updateDisplayName(newDisplayName) {
    return auth.updateProfile({ displayName: newDisplayName });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    firstLogin,
    updateDisplayName,
    updateInfo,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
