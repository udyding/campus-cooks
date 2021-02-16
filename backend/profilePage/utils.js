const Posting = require("../models/Posting");

// gets and displays all the postings of a user
async function userPostings(email) {
  try {
    const postings = await Posting.find({
      email: email,
    });
    console.log(postings);
    return postings;
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  userPostings,
};
