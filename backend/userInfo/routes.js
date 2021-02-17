const express = require("express");
const app = express();
const router = express.Router();

const { userPostings, userInfo } = require("./utils");

// the profile page just displays all the postings of a user
router.get("/getPostings", async (req, res) => {
  try {
    const { email } = req.query;
    let postings = await userPostings(email);
    res.status(200).send(postings);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getUserInfo", async (req, res) => {
  try {
    const { email } = req.query;
    let info = await userInfo(email);
    res.status(200).send(info);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
