const mongoose = require("mongoose");

const postingSchema = new mongoose.Schema({
  email: String,
  building: String,
  phone: String,
  postTitle: String,
  price: Number,
  description: String,
  date: String,
});

const Posting = mongoose.model("postings", postingSchema);
module.exports = Posting;
