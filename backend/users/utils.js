const User = require("../models/User");

async function login(email, displayName, photoURL) {
  try {
    let results = await User.find({ email: email }); // check if user's email is in database
    // if user is not in database, create new user in database
    if (results.length == 0) {
      let user = new User({
        email: email,
        building: null,
        phone: null,
        displayName: displayName,
        postings: null,
      });
      user.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
    }
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  login,
};
