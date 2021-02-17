const User = require("../models/User");

// returns true if this is the user's first time signing in and false otherwise
async function checkFirst(email) {
  try {
    email = decodeURIComponent(email);
    const results = await User.find({ email: email });
    if (results.length == 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.response);
  }
}
// this function just creates a new user document in the users collection in the database
async function signIn(email) {
  try {
    email = decodeURIComponent(email);

    let user = new User({
      email: email,
      building: "Village 1",
    });
    user.save(function (err) {
      if (err) return handleError(err);
      // saved!
    });
    return email;
    // create a new user with only email, the other info they need to add in
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  checkFirst,
  signIn,
};
