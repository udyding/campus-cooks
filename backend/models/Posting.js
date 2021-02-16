const mongoose = require("mongoose");

const postingSchema = new mongoose.Schema({
  postTitle: String,
  displayName: String,
  date: String,
  email: String,
  // images: [Object],
  phone: String,
  building: String,
  price: Number,
  description: String,
});

const Posting = mongoose.model("postings", postingSchema);
module.exports = Posting;
