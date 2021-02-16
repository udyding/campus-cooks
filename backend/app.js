require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { DATABASE_URI } = require("./config");
const mongoose = require("mongoose");

let app = express();
const PORT = 5555;

//const home = require("./home/routes");
const users = require("./users/routes");
const postings = require("./postings/routes");
const post = require("./post/routes");
const profilePage = require("./profilePage/routes");

const router = express.Router();
// third party middleware
app.use(bodyParser.json());

//app.get("/", home);
app.use("/users", users);
app.use("/postings", postings);
app.use("/post", post);
app.use("/profilePage", profilePage);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

// connect to the database
mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(`Failed to connect to database. ${err}`));
