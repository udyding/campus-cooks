const express = require("express");
const app = express();
const router = express.Router();

const { getPostings } = require("./utils");

// displays all results from database
router.get("", async (req, res) => {
  try {
    // filter by: price, building
    const { maxPrice, building } = req.query;
    const allPostings = await getPostings(maxPrice, building);
    res.status(200).send(allPostings);
  } catch (err) {
    console.log(error);
  }
});

module.exports = router;
