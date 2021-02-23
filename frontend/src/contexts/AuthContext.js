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

  // get user info from database
  async function getUser(email) {
    try {
      email = encodeURIComponent(email);
      const response = await axios({
        method: "get",
        url: `${BACKEND_ADDRESS}/user/getUserInfo?email=${email}`,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateInfo(email, building, phone) {
    let emailURI = encodeURIComponent(email).trim();
    building = encodeURIComponent(building);
    phone = encodeURIComponent(phone);
    try {
      await axios({
        method: "get",
        url: `${BACKEND_ADDRESS}/updateInfo?email=${emailURI}&building=${building}&phone=${phone}`,
      });
    } catch (error) {
      throw error;
    }
  }

  // takes in email and posting object
  async function addPost(email, displayName, posting) {
    try {
      await axios({
        method: "post",
        url: `${BACKEND_ADDRESS}/post`,
        data: { email: email, displayName: displayName, posting: posting },
      });
    } catch (error) {
      throw error;
    }
  }

  // takes in email and gets all postings of user
  async function getPostings(email) {
    try {
      let emailURI = encodeURIComponent(email);
      let response = await axios({
        method: "get",
        url: `${BACKEND_ADDRESS}/user/getPostings?email=${emailURI}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function getAllPostings(maxPrice, buildingFilter) {
    try {
      if (maxPrice) {
        maxPrice = maxPrice.toString();
      } else {
        maxPrice = "";
      }

      if (!buildingFilter) {
        buildingFilter = "";
      }
      let response = await axios({
        method: "get",
        url: `${BACKEND_ADDRESS}/postings?maxPrice=${maxPrice}&buildingFilter=${buildingFilter}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function deleteSinglePost(postingId) {
    try {
      // postingId = postingId.toString();
      await axios({
        method: "get",
        url: `${BACKEND_ADDRESS}/deletePost?postingId=${postingId}`,
      });
      console.log("hello");
    } catch (error) {
      throw error;
    }
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
    getUser,
    addPost,
    getPostings,
    getAllPostings,
    updateDisplayName,
    updateInfo,
    login,
    logout,
    deleteSinglePost,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
