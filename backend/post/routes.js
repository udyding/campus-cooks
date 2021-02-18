const express = require("express");
const app = express();
const router = express.Router();

const { createNewPost } = require("./utils");

// displays all results from database
router.post("", async (req, res) => {
  try {
    const { email, posting } = req.body;
    await createNewPost(email, posting);
    res.status(200).send("Successfully added new post!");
  } catch (err) {
    console.log(error);
  }
});

module.exports = router;
