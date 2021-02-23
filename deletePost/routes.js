const express = require("express");
const app = express();
const router = express.Router();

const { deletePost } = require("./utils");

router.get("", async (req, res) => {
  try {
    const { postingId } = req.query;
    await deletePost(postingId);
    res.status(200).send("Successfully deleted post!");
  } catch (err) {
    console.log(error);
  }
});

module.exports = router;
