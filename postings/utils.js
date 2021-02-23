const Posting = require("../models/Posting");

async function getPostings(maxPrice, buildingFilter) {
  try {
    const query = {};
    if (maxPrice !== "") {
      query.price = {
        $lte: parseFloat(maxPrice),
      };
    }
    if (buildingFilter !== "") {
      query.building = buildingFilter;
    }
    let postings;
    if (maxPrice || buildingFilter) {
      postings = await Posting.find(query);
    } else {
      postings = await Posting.find();
    }
    return postings;
  } catch (err) {
    console.log(err.response);
  }
}

module.exports = {
  getPostings,
};
