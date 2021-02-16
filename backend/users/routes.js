const express = require("express");
const app = express();
const router = express.Router();

const { login } = require("./utils");

// displays all results from database
router.get("", async (req, res) => {
  try {
    // takes in an email address
    const { email, displayName } = req.query;
    // runs login using this email
    await login(email, displayName);
    res.status(200).send("Logged in!");
    // redirects user to profile page to see their postings
    // let emailURI = encodeURIComponent(email);
    // res.redirect("/profilePage" + emailURI);
  } catch (err) {
    console.log(error);
  }
});

module.exports = router;
