const express = require("express");
const app = express();
const router = express.Router();

const { signUp } = require("./utils");

// displays all results from database
router.get("", async (req, res) => {
  try {
    // takes in an email address
    const { email, displayName, building, phone } = req.query;
    // checks if user exists etc and does the necessary actions
    let user = await signUp(email, displayName, building, phone); // all postings, which is an empty list
    res.status(200).send(user); // send these postings to the frontend
  } catch (err) {
    console.log(error);
  }
});

module.exports = router;
