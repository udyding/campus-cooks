const express = require("express");
const app = express();
const router = express.Router();

const { createNewPost } = require("./utils");

router.post("", async (req, res) => {
  try {
    const { email, displayName, posting } = req.body;
    await createNewPost(email, displayName, posting);
    res.status(200).send("Successfully added new post!");
  } catch (err) {
    console.log(error);
  }
});

module.exports = router;
