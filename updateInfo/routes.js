const express = require("express");
const app = express();
const router = express.Router();

const { updateInfo } = require("./utils");

router.get("", async (req, res) => {
  try {
    const { email, building, phone } = req.query;
    await updateInfo(email, building, phone);
    res.status(200).send("Successfully updated user information!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
