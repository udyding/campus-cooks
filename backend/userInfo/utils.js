const Posting = require("../models/Posting");
const User = require("../models/User");

// gets and displays all the postings of a user
async function userPostings(email) {
  try {
    email = decodeURIComponent(email);
    const postings = await Posting.find({
      email: email,
    });
    console.log(postings);
    return postings;
  } catch (err) {
    console.log(err.response);
  }
}

// gets and displays the user information not including the postings
async function userInfo(email) {
  try {
    email = decodeURIComponent(email);
    console.log("hello");
    const userList = await User.find({
      email: email,
    });
    let user = userList[0]; // there will always only be one user found

    let userInfo = {
      building: user.building,
      phone: user.phone,
    };
    console.log(userInfo);
    return userInfo;
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  userPostings,
  userInfo,
};
