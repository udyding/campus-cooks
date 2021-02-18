const express = require("express");
const app = express();
const router = express.Router();

const { getPostings } = require("./utils");

// displays all results from database
router.get("", async (req, res) => {
  try {
    // filter by: price, building
    const { maxPrice, buildingFilter } = req.query;
    console.log(maxPrice);
    const allPostings = await getPostings(maxPrice, buildingFilter);
    res.status(200).send(allPostings);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
