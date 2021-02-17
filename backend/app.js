require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { DATABASE_URI } = require("./config");
const mongoose = require("mongoose");

let app = express();
const PORT = 5555;

const login = require("./signIn/routes");
const postings = require("./postings/routes");
const post = require("./post/routes");
const user = require("./userInfo/routes");
const updateInfo = require("./updateInfo/routes");

const router = express.Router();
// third party middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/login", login);
app.use("/postings", postings);
app.use("/post", post);
app.use("/user", user);
app.use("/updateInfo", updateInfo);

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
