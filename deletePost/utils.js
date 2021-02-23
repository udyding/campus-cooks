const Posting = require("../models/Posting");
const mongoose = require("mongoose");

// This function creates a new post given the query params
async function deletePost(postingId) {
  Posting.findOneAndDelete({ _id: postingId })
    .then((deletedDocument) => {
      if (deletedDocument) {
        console.log(`Successfully deleted document: ${deletedDocument}`);
      } else {
        console.log("Did not find any posts to delete");
      }
      return deletedDocument;
    })
    .catch((err) => console.log(err));
}

module.exports = {
  deletePost,
};
