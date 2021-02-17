const User = require("../models/User");

// this function just creates a new user document in the users collection in the database
async function signUp(email, displayName, building, phone) {
  try {
    // create a new user with all information given
    let user = new User({
      email: email,
      building: building,
      phone: phone,
      displayName: displayName,
    });
    user.save(function (err) {
      if (err) return handleError(err);
      // saved!
    });
    return user;
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  signUp,
};
