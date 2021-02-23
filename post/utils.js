const Posting = require("../models/Posting");
const { userInfo } = require("../userInfo/utils");

// This function creates a new post given the query params
async function createNewPost(email, displayName, posting) {
  try {
    let info = await userInfo(email);
    let newPosting = new Posting({
      email: email,
      displayName: displayName,
      building: info.building,
      phone: info.phone,
      postTitle: posting.dishName,
      price: posting.price,
      description: posting.description,
      date: posting.date,
    });
    newPosting.save(function (err) {
      if (err) return handleError(err);
      // saved!
    });
    return posting;
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  createNewPost,
};
