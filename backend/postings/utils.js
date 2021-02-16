const Posting = require("../models/Posting");

async function getPostings(maxPrice, building) {
  try {
    const query = {};
    if (maxPrice) {
      query.price = {
        $lte: parseFloat(maxPrice),
      };
    }
    if (building) {
      query.building = building;
    }
    const postings = await Posting.find(query);
    console.log(postings);
    return postings;
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  getPostings,
};
