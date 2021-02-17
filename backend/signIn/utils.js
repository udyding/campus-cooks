const User = require("../models/User");

// this function just creates a new user document in the users collection in the database
async function signIn(email) {
  try {
    email = decodeURIComponent(email);
    const results = await User.find({ email: email }); // finds if user is already in database

    // if user doesn't exist in database
    console.log(results);
    if (results.length == 0) {
      let user = new User({
        email: email,
        building: "Village 1",
      });
      user.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
    }
    // create a new user with only email, the other info they need to add in

    return email;
  } catch (err) {
    console.log(err.response);
  }
}
// async function signUp(email, displayName, building, phone) {
//   try {
//     // create a new user with all information given
//     let user = new User({
//       email: email,
//       building: building,
//       phone: phone,
//       displayName: displayName,
//     });
//     user.save(function (err) {
//       if (err) return handleError(err);
//       // saved!
//     });
//     return user;
//   } catch (err) {
//     console.log(err.response);
//   }
// }

module.exports = {
  signIn,
};
