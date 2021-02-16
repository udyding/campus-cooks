const express = require("express");
const app = express();
const router = express.Router();

const { userPostings } = require("./utils");

// the profile page just displays all the postings of a user
router.get("", async (req, res) => {
  try {
    const { emailURI } = req.query;
    let postings = await userPostings(emailURI);
    res.status(200).send(postings);
  } catch (err) {
    console.log(error);
  }
});

module.exports = router;
