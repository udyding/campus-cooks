const Posting = require("../models/Posting");
const User = require("../models/User");

// gets and displays all the postings of a user
async function updateInfo(email, building, phone) {
  try {
    email = decodeURIComponent(email);
    building = decodeURIComponent(building);
    phone = decodeURIComponent(phone);
    await User.updateOne(
      { email: email },
      { $set: { building: building, phone: phone } }
    );
    return email;
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  updateInfo,
};
