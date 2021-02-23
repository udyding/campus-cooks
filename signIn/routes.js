const express = require("express");
const app = express();
const router = express.Router();

const { signIn, checkFirst } = require("./utils");

// checks if it's user's first time loggin in
router.get("/checkUser", async (req, res) => {
  try {
    const { email } = req.query;
    let result = await checkFirst(email);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

// adds user to database
router.get("/signIn", async (req, res) => {
  try {
    const { email } = req.query;
    let result = await signIn(email);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
