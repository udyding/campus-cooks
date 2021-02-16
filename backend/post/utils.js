const Posting = require("../models/Posting");

// This function creates a new post given the query params
async function createNewPost(
  postTitle,
  displayName,
  date,
  email,
  phone,
  building,
  price,
  description
) {
  try {
    let posting = new Posting({
      postTitle: postTitle,
      displayName: displayName,
      date: date,
      email: email,
      phone: phone,
      building: building,
      price: price,
      description: description,
    });
    posting.save(function (err) {
      if (err) return handleError(err);
      // saved!
    });
    console.log(posting);
    return posting;
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  createNewPost,
};
